<?php
/**
 * PeachPay WooCommerce Gateway that is a single gateway for all payment
 * methods, at least for now. It's likely that we'll need to make separate
 * gateways for each payment method later on.
 *
 * @phpcs:disable WordPress.Security.NonceVerification.Missing
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Adds the peachpay gateway class to wc.
 *
 * @param Array $gateways The gateway array.
 * @return Array
 */
function peachpay_add_gateway_class( $gateways ) {
	$gateways[] = 'PeachPay_Old_Stripe_Gateway';
	$gateways[] = 'PeachPay_Stripe_Gateway';
	$gateways[] = 'PeachPay_PayPal_Gateway';
	$gateways[] = 'PeachPay_Purchase_Order_Gateway';

	return $gateways;
}
add_filter( 'woocommerce_payment_gateways', 'peachpay_add_gateway_class' );
add_action( 'woocommerce_admin_order_totals_after_total', 'peachpay_display_stripe_fee' );
add_action( 'woocommerce_admin_order_data_after_billing_address', 'peachpay_display_charge_info' );
add_action( 'woocommerce_order_status_changed', 'peachpay_stripe_handle_order_complete', 10, 4 );

/**
 * Captures the payment if the order payment was authorized and not captured immediately.
 *
 * @param int      $order_id The order id.
 * @param string   $status_from The order status the order is being changed from.
 * @param string   $status_to The order status the order is being changed too.
 * @param WC_Order $order The instance of the order.
 */
function peachpay_stripe_handle_order_complete( $order_id, $status_from, $status_to, $order ) {
	$transaction_id        = $order->get_transaction_id();
	$peachpay_stripe_order = 'peachpay_stripe' === $order->get_payment_method();
	if ( ! $transaction_id || ! $peachpay_stripe_order || 'completed' !== $status_to ) {
		return;
	}

	$amount_capturable = peachpay_stripe_order_capturable_amount( $order, 'raw' );
	if ( $amount_capturable <= 0 ) {
		return;
	}

	peachpay_stripe_capture_payment( $order, $amount_capturable );
}
/**
 * Displays some stripe charge details for a order.
 *
 * @param WC_Order $order The given order to display information for.
 */
function peachpay_display_charge_info( $order ) {
	if ( did_action( 'woocommerce_admin_order_data_after_billing_address' ) >= 2 ) {
		return;
	}

	$transaction_id    = $order->get_transaction_id();
	$payment_intent_id = peachpay_stripe_order_payment_intent_id( $order );

	$peachpay_stripe_order = 'peachpay_stripe' === $order->get_payment_method();
	if ( ! $transaction_id || ! $payment_intent_id || ! $peachpay_stripe_order ) {
		return;
	}

	$amount_capturable = peachpay_stripe_order_capturable_amount( $order );
	if ( $amount_capturable <= 0 ) {
		return;
	}

	?>
	<div>
		<h3><?php esc_html_e( 'Charge Details', 'peachpay-for-woocommerce' ); ?></h3>
		<p>
			Charge Id: <a href="<?php echo esc_attr( peachpay_stripe_transaction_url( $order ) ); ?>"><?php echo esc_html( $transaction_id ); ?></a>
			<br/>
			Authorized amount: 
			<?php
			// phpcs:ignore
			echo wc_price( $amount_capturable, array( 'currency' => $order->get_currency() ) );
			?>
		</p>
		<div id="pp-stripe-actions">
			<div style="white-space:nowrap; display: inline-block;">
				<?php echo esc_html( get_woocommerce_currency_symbol( $order->get_currency() ) ); ?>
				<input type="number" name="amount" value="<?php echo esc_attr( $amount_capturable ); ?>" max="<?php echo esc_attr( $amount_capturable ); ?>" min="0" step='0.01'>
			</div>

			<button class="button" type="button" name="capture" value="1">Capture</button>
			<button class="button" type="button" name="void" value="1">Void</button>
			<div class="pp-stripe-auth-error-message">

			</div>
		</div>
		<script>
			(function() {
				const $divForm = document.querySelector("#pp-stripe-actions");
				if(!$divForm){
					return;
				}

				const $amountInput = $divForm.querySelector(`input[name="amount"]`);
				const $captureButton = $divForm.querySelector(`button[name="capture"]`); 
				const $voidButton = $divForm.querySelector(`button[name="void"]`);

				if(!$amountInput || !$captureButton || !$voidButton){
					return;
				}

				$captureButton.addEventListener("click", async (e) => {
					e.preventDefault();
					peachpay_startLoadingCaptureForm($divForm);

					const formData = new FormData();
					formData.append('order_id', <?php echo esc_html( $order->get_id() ); ?> );
					formData.append('capture_amount', peachpay_convertToStripeAmount(Number.parseFloat($amountInput.value), "<?php echo esc_html( $order->get_currency() ); ?>") );

					const response = await fetch("/?wc-ajax=pp-capture-stripe-payment-intent", {
						method: 'POST',
						body: formData
					});

					if(!response.ok){
						$divForm.querySelector(".pp-stripe-auth-error-message").insertAdjacentHTML("beforeend", /*html*/`<span class="pp-stripe-authorization-error" style="color: red;">Payment already captured or expired.</span>`)
						setTimeout(() => {
							$divForm.querySelector(".pp-stripe-auth-error-message").innerHTML = "";
						}, 5000);
						peachpay_stopLoadingCaptureForm($divForm);
						return;
					}

					location.reload();
				});

				$voidButton.addEventListener("click", async (e) => {
					e.preventDefault();
					peachpay_startLoadingCaptureForm($divForm);

					const formData = new FormData();
					formData.append("order_id", <?php echo esc_html( $order->get_id() ); ?> );

					const response = await fetch("/?wc-ajax=pp-cancel-stripe-payment-intent", {
						method: 'POST',
						body: formData
					});

					if(!response.ok){
						$divForm.querySelector(".pp-stripe-auth-error-message").insertAdjacentHTML("beforeend", /*html*/`<span class="pp-stripe-authorization-error" style="color: red;">Payment already voided or authorization is expired.</span>`)
						setTimeout(() => {
							$divForm.querySelector(".pp-stripe-auth-error-message").innerHTML = "";
						}, 5000);
						peachpay_stopLoadingCaptureForm($divForm);
						return;
					}

					location.reload();
				})
			})();

			function peachpay_startLoadingCaptureForm($form){
				$form.querySelectorAll("input,button").forEach(($el) => {
					$el.disabled = true;
				})
			}

			function peachpay_stopLoadingCaptureForm($form){
				$form.querySelectorAll("input,button").forEach(($el) => {
					$el.disabled = false;
				})
			}

			function peachpay_convertToStripeAmount(amount, currencyCode) {
				const zeroDecimalCurrencies = new Set([
					'BIF',
					'CLP',
					'DJF',
					'GNF',
					'JPY',
					'KMF',
					'KRW',
					'MGA',
					'PYG',
					'RWF',
					'UGX',
					'VND',
					'VUV',
					'XAF',
					'XOF',
					'XPF',
					'TWD'
				]);

				if (!zeroDecimalCurrencies.has(currencyCode)) {
					return Math.round(amount * 100);
				}

				return Math.round(amount);
			}
		</script>
	</div>
	<?php
}

/**
 * Displays the Stripe fee and net payout
 *
 * @param int $order_id ID for the order.
 */
function peachpay_display_stripe_fee( $order_id ) {
	if ( did_action( 'woocommerce_admin_order_totals_after_total' ) >= 2 ) {
		return;
	}

	$order    = wc_get_order( $order_id );
	$refunded = floatval( $order->get_total_refunded() );

	if ( 'peachpay_stripe' !== $order->get_payment_method() || ( ! ( $order->is_paid() ) && 0 === $refunded ) ) {
		return;
	}

	if ( $refunded > 0 ) {
		$fee   = floatval( $order->get_meta( '_pp_stripe_charge_fee' ) );
		$total = $order->get_total();
		$net   = $total - $refunded - $fee;
	} else {
		$fee = $order->get_meta( '_pp_stripe_charge_fee' );
		$net = $order->get_meta( '_pp_stripe_charge_net' );
	}

	if ( null === $fee || null === $net ) {
		return;
	}

	$currency = peachpay_get_base_currency();

	if ( ! $fee || ! $currency ) {
		return;
	}

	?>

	<tr>
		<td class="label stripe-fee">
			<?php esc_html_e( 'Stripe Fee:', 'peachpay-for-woocommerce' ); ?>
		</td>
		<td width="1%"></td>
		<td class="total">
			-<?php echo wc_price( $fee, [ 'currency' => $currency ] ); // phpcs:ignore ?> 
		</td>
	</tr>
	<tr>
		<td class="label payout">
			<?php esc_html_e( 'Net Payout:', 'peachpay-for-woocommerce' ); ?>
		</td>
		<td width="1%"></td>
		<td class="total">
			<?php echo wc_price( $net, [ 'currency' => $currency ] ); // phpcs:ignore ?>
		</td>
	</tr>

	<?php
}

/**
 * This function is called via the add_action below it to initialize the
 * PeachPay_WC_Gateway class.
 */
function peachpay_init_gateway_class() {
	/**
	 * Base class from which specific payment processors gateways can inherit from.
	 */
	abstract class PeachPay_WC_Gateway extends WC_Payment_Gateway {
		/**
		 * Not used, but there in case WooCommerce code tries to call it.
		 * See https://docs.woocommerce.com/document/payment-gateway-api/
		 */
		public function init_form_fields() {}

		/**
		 * Same as above.
		 */
		public function payment_scripts() {}

		/**
		 * Same as above.
		 */
		public function webhook() {}

		/**
		 * We don't actually process the payment here, but this is a critical
		 * part of our checkout that returns information about the order that
		 * has just been placed so that we can continue working with it on the
		 * client side.
		 *
		 * @param int $order_id The order that was just placed.
		 */
		public function process_payment( $order_id ) {
			$order = wc_get_order( $order_id );

			return $this->prepare_payment_result( $order );
		}

		/**
		 * Collects the information required about the order for use on the
		 * frontend. The main piece was originally the redirect url, but it has
		 * since expanded to include all data about the order for which we just
		 * confirmed that payment.
		 *
		 * @param WC_Order $order The WooCommerce order.
		 * @return array The associative array of order data that is turned
		 * into JSON when it's returned to the frontend.
		 */
		protected function prepare_payment_result( WC_Order $order ) {
			$result = array(
				'result'   => 'success',
				'redirect' => $this->get_return_url( $order ),
				'number'   => $order->get_order_number(),
				'orderID'  => $order->get_id(),
				'details'  => $order->get_data(),
			);

			// If we don't do the below, the end result will be something like
			// "line_items": {"972": {}}, which is not useful because we can't
			// see the line item details. This is because json_encode which runs
			// behind the scenes ignores protected data. We can forcefully
			// unprotect these.
			$result['details']['line_items']     = $this->get_protected( $order->get_items() );
			$result['details']['shipping_lines'] = $this->get_protected( $order->get_shipping_methods() );
			$result['details']['fee_lines']      = $this->get_protected( $order->get_fees() );
			$result['details']['coupon_lines']   = $this->get_protected( $order->get_coupons() );

			// This is not usually part of the WooCommerce order object, but
			// we want to avoid doing math on money whenever possible and so
			// would rather set it here.
			$result['details']['fee_total'] = number_format( $order->get_total_fees() ?? '0', 2 );

			return $result;
		}

		/**
		 * Helper "hack" to get expose protected array items.
		 *
		 * @param array $protected_items The items to expose.
		 */
		private function get_protected( $protected_items ) {
			return array_map(
				function ( WC_Data $item ) {
					return $item->get_data();
				},
				$protected_items
			);
		}
	}

	/**
	 * This class allows us to submit orders with the PeachPay Stripe gateway.
	 */
	// phpcs:ignore
	class PeachPay_Stripe_Gateway extends PeachPay_WC_Gateway {
		/**
		 * Default constructor.
		 */
		public function __construct() {
			$this->id    = 'peachpay_stripe';
			$this->title = 'PeachPay (Stripe)';
			// This needs to be here even though it's blank. Some plugins assume
			// gateways have a description and crash if they do not.
			$this->description  = '';
			$this->has_fields   = false;
			$this->method_title = 'PeachPay (Stripe)';
			$this->supports     = array(
				'products',
				'subscriptions',
				'subscription_cancellation',
				'subscription_suspension',
				'subscription_reactivation',
				'subscription_amount_changes',
				'multiple_subscriptions',
				'subscription_date_changes',
				'refunds',
			);
		}

		/**
		 * Handles fetching the Stripe transaction URL
		 *
		 * The woocommerce plugin fetches the url from calling this function on the payment gateway.
		 *
		 * @param order $order Order object related to transaction.
		 * @return string URL linking the transaction ID with the Stripe merchant dashboard.
		 */
		public function get_transaction_url( $order ) {
			return peachpay_stripe_transaction_url( $order );
		}

		/**
		 * Process refund.
		 *
		 * If the gateway declares 'refunds' support, this will allow it to refund.
		 * a passed in amount.
		 *
		 * @param  int        $order_id Order ID.
		 * @param  float|null $amount Refund amount.
		 * @param  string     $reason Refund reason.
		 * @return boolean True or false based on success, or a WP_Error object.
		 */
		public function process_refund( $order_id, $amount = null, $reason = '' ) {
			$is_test_mode = wc_get_order( $order_id )->get_meta( 'peachpay_is_test_mode' );

			$url = peachpay_api_url( $is_test_mode ) . 'api/v1/stripe/refund';

			$data = array(
				'order_id'     => $order_id,
				'amount'       => $amount,
				'reason'       => $reason,
				'merchant_url' => get_home_url(),
			);

			$params = array(
				'body'    => $data,
				'timeout' => 60,
			);

			$status = wp_remote_post( $url, $params );

			if ( is_wp_error( $status ) ) {
				return false;
			}

			$response = wp_remote_retrieve_body( $status );

			return ( filter_var( $response, FILTER_VALIDATE_BOOLEAN ) );
		}
	}

	/**
	 * This class allows us to submit orders with the PeachPay PayPal gateway.
	 */
	// phpcs:ignore
	class PeachPay_PayPal_Gateway extends PeachPay_WC_Gateway {
		/**
		 * Default constructor.
		 */
		public function __construct() {
			$this->id    = 'peachpay_paypal';
			$this->title = 'PeachPay (PayPal)';
			// This needs to be here even though it's blank. Some plugins assume
			// gateways have a description and crash if they do not.
			$this->description  = '';
			$this->has_fields   = false;
			$this->method_title = 'PeachPay (PayPal)';
			$this->supports     = array(
				'products',
				'refunds',
			);
		}

		/**
		 * Handles fetching the PayPal transaction URL
		 *
		 * The woocommerce plugin fetches the url from calling this function on the payment gateway.
		 *
		 * @param order $order Order object related to transaction.
		 * @return string URL linking the transaction ID with the PayPal merchant dashboard.
		 */
		public function get_transaction_url( $order ) {
			if ( $order->get_meta( 'peachpay_is_test_mode' ) === 'true' ) {
				return sprintf( 'https://www.sandbox.paypal.com/activity/payment/%s', $order->get_transaction_id() );
			} else {
				return sprintf( 'https://www.paypal.com/activity/payment/%s', $order->get_transaction_id() );
			}
		}

		/**
		 * Process refund.
		 *
		 * If the gateway declares 'refunds' support, this will allow it to refund.
		 * a passed in amount.
		 *
		 * @param  int        $order_id Order ID.
		 * @param  float|null $amount Refund amount.
		 * @param  string     $reason Refund reason.
		 * @return boolean True or false based on success, or a WP_Error object.
		 */
		public function process_refund( $order_id, $amount = null, $reason = '' ) {
			$is_test_mode = wc_get_order( $order_id )->get_meta( 'peachpay_is_test_mode' );
			$url          = peachpay_api_url( $is_test_mode ) . 'api/v1/paypal/refund';

			$data = array(
				'order_id'     => $order_id,
				'amount'       => $amount,
				'reason'       => $reason,
				'merchant_url' => get_site_url(),
			);

			$params = array(
				'body'    => $data,
				'timeout' => 60,
			);

			$status = wp_remote_post( $url, $params );

			if ( is_wp_error( $status ) ) {
				return false;
			}

			$response = wp_remote_retrieve_body( $status );

			return ( filter_var( $response, FILTER_VALIDATE_BOOLEAN ) );
		}
	}

	/**
	 * This class allows us to submit orders with the PeachPay Purchase Order gateway.
	 */
	// phpcs:ignore
	class PeachPay_Purchase_Order_Gateway extends PeachPay_WC_Gateway {
		/**
		 * Default constructor.
		 */
		public function __construct() {
			$this->id    = 'peachpay_purchase_order';
			$this->title = 'PeachPay (Purchase Order)';
			// This needs to be here even though it's blank. Some plugins assume
			// gateways have a description and crash if they do not.
			$this->description  = '';
			$this->has_fields   = false;
			$this->method_title = 'PeachPay (Purchase Order)';
			$this->supports     = array(
				'products',
			);
		}

		/**
		 * Processes payment for Purchase Order orders.
		 *
		 * @param int $order_id order id.
		 * @return array result.
		 */
		public function process_payment( $order_id ) {
			$order = wc_get_order( $order_id );

			if ( isset( $_POST['purchase_order_number'] ) ) {
				//phpcs:ignore
				$purchase_order_number = wc_sanitize_coupon_code( wp_unslash( $_POST['purchase_order_number'] ) );
				$order->set_transaction_id( $purchase_order_number );
				add_post_meta( $order_id, 'Purchase Order #', $purchase_order_number );
			} else {
				$order->delete( true );
				return array( 'result' => 'failure' );
			}

			// Mark on-hold for the marketplace to resolve.
			$order->update_status( 'on-hold', __( 'Awaiting Purchase Order completion.', 'woocommerce' ) );

			$order->save();

			return $this->prepare_payment_result( $order );
		}
	}

	/**
	 * This is here for backwards compatibility with orders placed before we
	 * split peachpay into peachpay_stripe and peachpay_paypal. If we don't have
	 * this, merchants won't be able to refund orders made prior to the switch
	 * since the payment gateway id is no longer valid. This class makes it a
	 * valid one.
	 *
	 * When viewed from the WooCommerce payment settings, this gateway can be
	 * seen as the "parent" gateway and is the only one to show a description,
	 * which prevents clutter on all of our payment gateways.
	 *
	 * @deprecated
	 */
	// phpcs:ignore
	class PeachPay_Old_Stripe_Gateway extends PeachPay_Stripe_Gateway {
		/**
		 * Default constructor.
		 */
		public function __construct() {
			parent::__construct();
			$this->id                 = 'peachpay';
			$this->title              = 'PeachPay';
			$this->method_title       = 'PeachPay';
			$this->method_description = 'All-in-one checkout. <a href="/wp-admin/admin.php?page=peachpay">Manage PeachPay settings</a>';
		}
	}
}
add_action( 'plugins_loaded', 'peachpay_init_gateway_class', 11 );

/**
 * Gets whether the PeachPay gateway is enabled.
 */
function peachpay_gateway_enabled() {
	$gateways          = WC()->payment_gateways->get_available_payment_gateways();
	$peachpay_gateways = array( 'peachpay', 'peachpay_stripe', 'peachpay_paypal', 'peachpay_payment_order' );

	foreach ( $peachpay_gateways as $gateway ) {
		if ( isset( $gateways[ $gateway ] ) ) {
			return 'yes' === $gateways[ $gateway ]->enabled;
		}

		return false;
	}
}

/**
 * Filters out the available gateways for on the checkout page.
 *
 * @param array $available_gateways The available gateways to filter.
 */
function hide_peachpay_gateways( $available_gateways ) {
	if ( defined( 'WOOCOMMERCE_CHECKOUT' ) && ! defined( 'PEACHPAY_CHECKOUT' ) ) {
		foreach ( $available_gateways as $key => $gateway ) {
			if ( 'peachpay' === $gateway->id ) {
				unset( $available_gateways[ $key ] );
			} elseif ( 'peachpay_stripe' === $gateway->id ) {
				unset( $available_gateways[ $key ] );
			} elseif ( 'peachpay_paypal' === $gateway->id ) {
				unset( $available_gateways[ $key ] );
			} elseif ( 'peachpay_purchase_order' === $gateway->id ) {
				unset( $available_gateways[ $key ] );
			}
		}
	}

	return $available_gateways;
}
add_filter( 'woocommerce_available_payment_gateways', 'hide_peachpay_gateways', 10, 2 );

add_action( 'woocommerce_order_status_cancelled', 'peachpay_order_cancelled', 10, 1 );

/**
 * Callback function that gets activated when merchant changes order status to cancelled.
 *
 * @param string $order_id The order id of the order that was cancelled.
 */
function peachpay_order_cancelled( $order_id ) {
	$order = wc_get_order( $order_id );

	if ( $order->meta_exists( '_pp_stripe_auto_cancelled_on_dispute' ) && 'true' === $order->get_meta( '_pp_stripe_auto_cancelled_on_dispute', true ) ) {
		return;
	}

	if ( $order && peachpay_get_settings_option( 'peachpay_payment_options', 'refund_on_cancel', false ) ) {
		$data = array(
			'order_id' => $order_id,
			'amount'   => $order->get_total(),
			'reason'   => 'Payment was cancelled.',
		);

		$payment_method = $order->get_payment_method();
		$is_test_mode   = wc_get_order( $order_id )->get_meta( 'peachpay_is_test_mode' );

		if ( 'peachpay_paypal' === $payment_method ) {
			$data['merchant_url'] = get_site_url();

			$url = peachpay_api_url( $is_test_mode ) . 'api/v1/paypal/refund';
		} else {
			$data['merchant_url'] = get_home_url();

			$url = peachpay_api_url( $is_test_mode ) . 'api/v1/stripe/refund';
		}

		$params = array(
			'body'    => $data,
			'timeout' => 60,
		);

		$status = wp_remote_post( $url, $params );

		if ( ! is_wp_error( $status ) ) {
			$order->add_order_note( 'Payment refunded. Reason: Order was cancelled' );
		}
	}
}
