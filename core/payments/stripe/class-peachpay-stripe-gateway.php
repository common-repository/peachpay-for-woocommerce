<?php
/**
 * Stripe WC gateway.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * This class allows us to submit orders with the PeachPay Stripe gateway.
 */
class PeachPay_Stripe_Gateway extends PeachPay_Abstract_WC_Gateway {
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
		$url          = peachpay_api_url( $is_test_mode ? 'test' : 'prod' ) . 'api/v1/stripe/refund';

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

	$currency = $order->get_currency();

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
add_action( 'woocommerce_admin_order_totals_after_total', 'peachpay_display_stripe_fee' );

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
add_action( 'woocommerce_order_status_changed', 'peachpay_stripe_handle_order_complete', 10, 4 );

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
add_action( 'woocommerce_admin_order_data_after_billing_address', 'peachpay_display_charge_info' );
