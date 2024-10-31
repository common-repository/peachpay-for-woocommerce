<?php
/**
 * Abstract PeachPay payment gateway
 *
 * Handles PeachPay's generic payment gateway functionality
 * which is extended by individual payment gateways.
 *
 * @class PeachPay_Abstract_Gateway
 * @package PeachPay
 */

defined( 'PEACHPAY_ABSPATH' ) || exit;

/**
 * PeachPay Payment Gateway class.
 *
 * Extended by PeachPay's gateways
 *
 * @class       PeachPay_Abstract_Gateway
 * @extends     WC_Payment_Gateway
 * @package     PeachPay
 */
abstract class PeachPay_Abstract_Gateway extends WC_Payment_Gateway {
	/**
	 * Absolute maximum limit, set by the gateway.
	 *
	 * @var float
	 */
	public $max_amount = INF;

	/**
	 * Absolute minimum limit, set by the gateway.
	 *
	 * @var float
	 */
	public $min_amount = 0;

	/**
	 * Custom maximum, set by the merchant. Zero means unrestricted.
	 *
	 * @var float
	 */
	public $custom_max_amount = 0;

	/**
	 * Custom minimum, set by the merchant.
	 *
	 * @var float
	 */
	public $custom_min_amount = 0;

	/**
	 * The currency used when rendering the min/max.
	 *
	 * @var string
	 */
	public $min_max_currency = 'USD';

	/**
	 * Country list, set by the gateway.
	 *
	 * @var null|array
	 */
	public $countries = null;

	/**
	 * Whitelist or blacklist the countries list, set by the gateway.
	 *
	 * @var string "allow" or "block"
	 */
	public $country_availability = 'allow';

	/**
	 * Custom country list, set by the merchant.
	 *
	 * @var null|array
	 */
	public $custom_countries = null;

	/**
	 * Whitelist or blacklist the custom countries list, set by the merchant.
	 *
	 * @var string "allow" or "block"
	 */
	public $custom_countries_availability = 'allow';

	/**
	 * Currency list, set by the gateway.
	 *
	 * @var null|array
	 */
	public $currencies = null;

	/**
	 * Whitelist or blacklist the currencies list, set by the merchant.
	 *
	 * @var string "allow" or "block"
	 */
	public $currency_availability = 'allow';

	/**
	 * Custom currency list, set by the merchant.
	 *
	 * @var null|array
	 */
	public $custom_currencies = null;

	/**
	 * Whitelist or blacklist the custom currencies list, set by the merchant.
	 *
	 * @var string "allow" or "block"
	 */
	public $custom_currency_availability = 'allow';

	/**
	 * To be used if a payment provider needs it.
	 *
	 * @var int
	 */
	public $settings_priority = 0;

	/**
	 * List of the form fields to display on the gateway settings page.
	 *
	 * A gateway should array merge the parent form fields to the top
	 * of its form fields.
	 *
	 * @var array
	 */
	public $form_fields = array();

	/**
	 * Payment provider title used for breadcrumbs
	 *
	 * @var string
	 */
	public $payment_provider;

	/**
	 * Specify what variety of gateway this is.
	 *
	 * Ex: "Cards", "Digital wallet"
	 *
	 * @var void|string
	 */
	public $payment_method_family;

	/**
	 * Base PeachPay gateway.
	 */
	public function __construct() {
		$this->plugin_id = 'peachpay_';

		$this->has_fields = true;
		$this->init_form_fields();
		$this->init_settings();
		$this->hooks();

		if ( ! $this->title ) {
			$this->title = $this->method_title;
		}

		$this->custom_max_amount = floatval( $this->get_option( 'custom_max_amount', $this->max_amount ) );
		$this->custom_min_amount = floatval( $this->get_option( 'custom_min_amount', $this->min_amount ) );

		// translators: %s gateway maximum.
		$max_field_description = sprintf( __( 'If the cart total is more than this amount, this payment method will not show. The maximum cannot be more than %s', 'peachpay-for-woocommerce' ), wc_price( $this->max_amount, array( 'currency' => $this->min_max_currency ) ) );
		if ( INF === $this->max_amount ) {
			$max_field_description = __( 'If the cart total is more than this amount, this payment method will not show.' );
		}

		// It is important form_fields is defined last. If it is not last some field defaults may not yet be set or output unexpected values.
		$this->form_fields = array_merge(
			$this->form_fields,
			array(
				'enabled'           => array(
					'title'   => __( 'Enable/Disable', 'peachpay-for-woocommerce' ),
					'type'    => 'checkbox',
					// translators: %s gateway title.
					'label'   => sprintf( __( 'Enable %s', 'peachpay-for-woocommerce' ), $this->title ),
					'default' => 'yes',
					'class'   => 'toggle',
				),
				'custom_min_amount' => array(
					'title'             => __( 'Minimum charge', 'peachpay-for-woocommerce' ),
					// translators: %s gateway minimum.
					'description'       => sprintf( __( 'If the cart total is less than this amount, this payment method will not show. The minimum cannot be less than %s', 'peachpay-for-woocommerce' ), wc_price( $this->min_amount, array( 'currency' => $this->min_max_currency ) ) ),
					'type'              => 'number',
					'default'           => $this->minimum_charge(),
					'class'             => '',
					'custom_attributes' => array(
						'min'  => $this->min_amount,
						'max'  => INF === $this->max_amount ? '' : $this->max_amount,
						'step' => '0.01',
					),
				),
				'custom_max_amount' => array(
					'title'             => __( 'Maximum charge', 'peachpay-for-woocommerce' ),
					'description'       => $max_field_description,
					'type'              => 'number',
					'default'           => $this->maximum_charge(),
					'placeholder'       => INF === $this->max_amount ? 'Not restricted' : '',
					'class'             => '',
					'custom_attributes' => array(
						'min'  => $this->min_amount,
						'max'  => INF === $this->max_amount ? '' : $this->max_amount,
						'step' => '0.01',
					),
				),
			)
		);
	}

	/**
	 * Common gateway hooks.
	 */
	public function hooks() {
		add_filter( 'peachpay_register_feature', array( $this, 'register_feature' ) );
		add_action( 'woocommerce_settings_checkout', array( $this, 'enqueue_admin_scripts' ) );
		add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );

		if ( ! is_admin() ) {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_checkout_scripts' ) );
		}
	}

	/**
	 * Registers the gateway as a feature for the PeachPay SDK. Override in child
	 * classes to add special metadata if needed.
	 *
	 * @param array $feature_list The list of features.
	 */
	public function register_feature( $feature_list ) {
		$feature_list[ $this->id . '_gateway' ] = array(
			'enabled'  => 'yes' === $this->enabled,
			'version'  => 1,
			'metadata' => array(
				'minimum_charge'       => floatval( $this->minimum_charge() ),
				// Checkout modal treats 0 as unrestricted
				'maximum_charge'       => INF === $this->maximum_charge() ? 0 : floatval( $this->maximum_charge() ),
				'supported_currencies' => $this->supported_currencies(),
				'supported_countries'  => $this->supported_countries(),
			),
		);

		return $feature_list;
	}

	/**
	 * Handles determining if the gateway should be shown or not.
	 */
	public function is_available() {
		// Handles max amount by default.
		$is_available = true;

		if ( ! $this->enabled || 'no' === $this->enabled ) {
			$is_available = false;
		}

		// Ensure gateway is not seen when PeachPay is in test mode.
		if ( peachpay_is_test_mode() && ! ( current_user_can( 'editor' ) || current_user_can( 'administrator' ) ) ) {
			$is_available = false;
		}

		if ( WC()->cart ) {
			$order_total = $this->get_order_total();

			// Minimum charge
			$minimum_charge = $this->minimum_charge();
			if ( 0 < $order_total && 0 < $minimum_charge && $minimum_charge > $order_total ) {
				$is_available = false;
			}

			// Maximum charge
			$maximum_charge = $this->maximum_charge();
			if ( 0 < $order_total && 0 < $maximum_charge && $maximum_charge < $order_total ) {
				$is_available = false;
			}
		}

		$currencies = $this->supported_currencies();
		if ( is_array( $currencies ) && ! in_array( get_woocommerce_currency(), $currencies, true ) ) {
			$is_available = false;
		}

		if ( is_object( WC()->customer ) && method_exists( WC()->customer, 'get_billing_country' ) ) {

			$countries = $this->supported_countries();
			if ( is_array( $countries ) && ! in_array( WC()->customer->get_billing_country(), $this->supported_countries(), true ) ) {
				$is_available = false;
			}
		}

		return $is_available;
	}

	/**
	 * Validate gateway specific order fields.
	 */
	public function validate_fields() {
        // PHPCS:disable WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$result = true;

		$transaction_id = isset( $_POST['peachpay_session_id'] ) ? wp_unslash( $_POST['peachpay_session_id'] ) : null;
		if ( ! $transaction_id ) {
			wc_add_notice( __( 'Missing required field "peachpay_session_id"', 'peachpay-for-woocommerce' ), 'error' );
			$result = false;
		}

		$transaction_id = isset( $_POST['peachpay_transaction_id'] ) ? wp_unslash( $_POST['peachpay_transaction_id'] ) : null;
		if ( ! $transaction_id ) {
			wc_add_notice( __( 'Missing required field "peachpay_transaction_id"', 'peachpay-for-woocommerce' ), 'error' );
			$result = false;
		}

        // PHPCS:enable

		return $result;
	}

	/**
	 * This should be used by the child classes to start the process_payment cycle.
	 *
	 * @param int $order_id The order id to process.
	 * @return WC_Order
	 */
	public function process_payment( $order_id ) {
		$order = wc_get_order( $order_id );

		// Make sure every attempt the order status is in the default ("pending") status.
		$default_status = apply_filters( 'woocommerce_default_order_status', 'pending' );
		if ( $order->get_status() !== $default_status ) {
			$order->update_status( $default_status, __( 'Customer attempting payment again.', 'peachpay-for-woocommerce' ) );
			$order->save();
		}

		return $order;
	}

	/**
	 * Messaging to indicate if the payment method is in test mode or not.
	 */
	protected function payment_field_test_mode_notice() {
		if ( peachpay_is_test_mode() ) {
			?>
			<div class="peachpay-testmode">
				<?php esc_html_e( 'Test mode enabled.', 'peachpay-for-woocommerce' ); ?>
				<br>
				<?php esc_html_e( 'Customers cannot see this payment method.', 'peachpay-for-woocommerce' ); ?>
			</div>
			<?php
		}
	}

	/**
	 * Template for displaying tokenize errors to customers.
	 */
	protected function payment_field_tokenize_error_notice() {
		?>
		<div class="peachpay-tokenize-error hide"></div>
		<?php
	}

	/**
	 * Renders the default payment fields.
	 */
	public function payment_fields() {
		$this->payment_field_test_mode_notice();
		$this->payment_field_tokenize_error_notice();
		?>
		<div>
			<img style="display: block; text-align: left; height: 1.5rem; float: unset;" src="<?php echo esc_url( $this->icon ); ?>">
			<p style="text-align: left; margin: 0.5rem 0 0;">
			<?php
			// translators: %s: gateway title
			echo esc_html( sprintf( __( '%s selected for checkout.', 'peachpay-for-woocommerce' ), $this->title ) );
			?>
			</p>
			<?php if ( $this->description ) : ?>
				<hr style="margin: 0.5rem 0;"/>
				<p style="text-align: left; margin: 0;" class="muted">
					<?php echo esc_html( $this->description ); ?>
				<p>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Outputs the admin settings html.
	 */
	public function admin_options() {
		$bread_crumbs = array(
			array(
				'name' => __( 'Payments', 'peachpay-for-woocommerce' ),
				'url'  => PeachPay_Admin::admin_settings_url( 'peachpay', 'payment', '#' . strtolower( $this->payment_provider ), false ),
			),
			array(
				'name' => $this->title,
			),
		);
		$gateway      = $this;

		?>
			<div class="peachpay">
				<?php require PeachPay::get_plugin_path() . '/core/admin/views/html-navigation.php'; ?>
				<?php require PeachPay::get_plugin_path() . '/core/admin/views/html-gateway-details.php'; ?>
				<?php $this->action_needed_form(); ?>
				<div id="peachpay-gateway-settings" class="settings-container">
					<h1><?php esc_html_e( 'Settings', 'peachpay-for-woocommerce' ); ?></h1>
					<hr>
					<table class="form-table">
						<?php echo $this->generate_settings_html( $this->get_form_fields(), false ); // PHPCS:ignore ?>
					</table>
				</div>
			</div>
		<?php
	}

	/**
	 * Adds scripts and styles for Gateway Admin settings.
	 */
	public function enqueue_admin_scripts() {}

	/**
	 * Enqueue frontend scripts for gateway payments.
	 */
	public function enqueue_checkout_scripts() {}

	/**
	 * Render a needs action message for the gateway.
	 */
	protected function action_needed_form(){}

	/**
	 * Gets the minimum charge taking into account the custom and absolute minimum.
	 */
	public function minimum_charge() {
		$min        = $this->min_amount;
		$custom_min = $this->custom_min_amount;

		// Custom cannot be lower then absolute min.
		if ( $custom_min < $min ) {
			return $min;
		}

		if ( $custom_min > $min ) {
			return $custom_min;
		}

		return $min;
	}

	/**
	 * Gets the maximum charge taking into account the custom and absolute maximum. If zero then no maximum is defined.
	 */
	public function maximum_charge() {
		$max        = $this->max_amount;
		$custom_max = $this->custom_max_amount;

		// INF is unrestricted
		if ( INF === $max ) {
			return $custom_max;
		}

		// Custom cannot be higher then absolute max.
		if ( $custom_max > $max ) {
			return $max;
		}

		if ( 0 !== $custom_max && $custom_max < $max ) {
			return $custom_max;
		}

		return $max;
	}

	/**
	 * Gets an array of supported currencies taking into account the custom and absolute supported
	 * currencies.
	 *
	 * @return array|null Empty array indicates no supported currencies. null represents not restricted.
	 */
	public function supported_currencies() {
		$result = null;

		if ( is_array( $this->currencies ) ) {
			if ( 'allow' === $this->currency_availability ) {
				$result = $this->currencies;
			} elseif ( 'block' === $this->currency_availability ) {
				$result = array_diff( array_keys( get_woocommerce_currencies() ), $this->currencies );
			}
		}

		if ( is_array( $this->custom_currencies ) ) {
			if ( 'allow' === $this->custom_currency_availability ) {
				$result = array_intersect( $this->custom_currencies, $result );
			} elseif ( 'block' === $this->custom_currency_availability ) {
				if ( is_array( $result ) ) {
					$result = array_diff( $result, $this->custom_currencies );
				} else {
					$result = array_diff( array_keys( get_woocommerce_currencies() ), $this->custom_currencies );
				}
			}
		}

		return $result;
	}

	/**
	 * Gets an array of supported countries taking into account the custom and absolute supported
	 * countries.
	 *
	 * @return array|null Empty array indicates no supported countries. null represents not restricted.
	 */
	public function supported_countries() {
		$result = null;

		if ( is_array( $this->countries ) ) {
			if ( 'allow' === $this->country_availability ) {
				$result = $this->countries;
			} elseif ( 'block' === $this->country_availability ) {
				$result = array_diff( array_keys( WC()->countries->get_countries() ), $this->countries );
			}
		}

		if ( is_array( $this->custom_countries ) ) {
			if ( 'allow' === $this->custom_country_availability ) {
				$result = array_intersect( $this->custom_countries, $result );
			} elseif ( 'block' === $this->custom_country_availability ) {
				if ( is_array( $result ) ) {
					$result = array_diff( $result, $this->custom_countries );
				} else {
					$result = array_diff( array_keys( WC()->countries->get_countries() ), $this->custom_countries );
				}
			}
		}

		return $result;
	}

	/**
	 * Return the gateway's icon.
	 *
	 * @return string
	 */
	public function get_icon() {
		$icon = '<span class="peachpay-gateway-icons">';
		if ( is_array( $this->icon ) ) {
			$icon .= '';
			foreach ( $this->icon as $url ) {
				$icon .= $url ? '<img src="' . WC_HTTPS::force_https_url( $url ) . '" />' : '';
			}
		} else {
			$icon .= $this->icon ? '<img src="' . WC_HTTPS::force_https_url( $this->icon ) . '" alt="' . esc_attr( $this->get_title() ) . '" />' : '';
		}
		$icon .= '</span>';

		return apply_filters( 'woocommerce_gateway_icon', $icon, $this->id );
	}

	/**
	 * Gets a link to this gateways settings.
	 */
	public function settings_url() {
		return admin_url( 'admin.php?page=wc-settings&tab=checkout&section=' . $this->id );
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

	/**
	 * Gets the expected order data result for a successful order.
	 * In the future this should be rethought how its structured and what to actually include.
	 *
	 * @param WC_Order $order .
	 */
	protected function prepare_payment_result( $order ) {
		$result = array(
			'id'       => $order->get_id(),
			'result'   => 'success',
			'redirect' => $this->get_return_url( $order ),
			'number'   => $order->get_order_number(),
			'details'  => $order->get_data(),
		);

		// If we don't do the below, the end result will be something like
		// "line_items": {"972": {}}, which is not useful because we can't
		// see the line item details. This is because json_encode which runs
		// behind the scenes ignores protected data. We can forcefully
		// un-protect these.
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
}
