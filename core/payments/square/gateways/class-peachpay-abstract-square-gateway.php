<?php
/**
 * Abstract PeachPay Square WC gateway.
 *
 * @PHPCS:disable Squiz.Commenting.VariableComment.Missing
 *
 * @package PeachPay
 */

defined( 'PEACHPAY_ABSPATH' ) || exit;
require_once PEACHPAY_ABSPATH . 'core/payments/class-peachpay-abstract-gateway.php';

/**
 * .
 */
abstract class PeachPay_Abstract_Square_Gateway extends PeachPay_Abstract_Gateway {

	public $payment_provider            = 'Square';
	protected $requires_verification_id = false;

	/**
	 * .
	 */
	public function __construct() {
		if ( ! $this->method_title ) {
			// translators: %s: gateway title
			$this->method_title = sprintf( __( '%s via Square (PeachPay)', 'peachpay-for-woocommerce' ), $this->title );
		}
		if ( ! $this->method_description ) {
			// translators: %s: gateway title
			$this->method_description = sprintf( __( 'Accept %s payments through Square', 'peachpay-for-woocommerce' ), $this->title );
		}

		$this->max_amount = 50000;
		$this->currencies = array( peachpay_square_currency() );
		$this->supports   = array(
			'products',
			'refunds',
		);

		parent::__construct();
	}

	/**
	 * Validates a PeachPay Square order
	 */
	public function validate_fields() {
		// PHPCS:disable WordPress.Security.NonceVerification.Missing
		$result = parent::validate_fields();

		$source_id = isset( $_POST['peachpay_square_source_id'] ) ? sanitize_text_field( wp_unslash( $_POST['peachpay_square_source_id'] ) ) : null;
		if ( ! $source_id ) {
			wc_add_notice( __( 'Missing required field "peachpay_square_source_id"', 'peachpay-for-woocommerce' ), 'error' );
			$result = false;
		}

		if ( ! $this->requires_verification_id ) {
			return $result;
		}

		$verification_id = isset( $_POST['peachpay_square_verification_id'] ) ? sanitize_text_field( wp_unslash( $_POST['peachpay_square_verification_id'] ) ) : null;
		if ( ! $verification_id ) {
			wc_add_notice( __( 'Missing required field "peachpay_square_verification_id"', 'peachpay-for-woocommerce' ), 'error' );
			$result = false;
		}

		// PHPCS:enable

		return $result;
	}

	/**
	 * Process the PeachPay Square Payment.
	 *
	 * @param int $order_id The id of the order.
	 */
	public function process_payment( $order_id ) {
		$order = parent::process_payment( $order_id );

		// PHPCS:disable WordPress.Security.NonceVerification.Missing
		$session_id         = isset( $_POST['peachpay_session_id'] ) ? sanitize_text_field( wp_unslash( $_POST['peachpay_session_id'] ) ) : null;
		$transaction_id     = isset( $_POST['peachpay_transaction_id'] ) ? sanitize_text_field( wp_unslash( $_POST['peachpay_transaction_id'] ) ) : null;
		$source_id          = isset( $_POST['peachpay_square_source_id'] ) ? sanitize_text_field( wp_unslash( $_POST['peachpay_square_source_id'] ) ) : null;
		$verification_token = isset( $_POST['peachpay_square_verification_id'] ) ? sanitize_text_field( wp_unslash( $_POST['peachpay_square_verification_id'] ) ) : null;
		// PHPCS:enable

		$response = wp_remote_post(
			peachpay_api_url() . 'api/v1/square/payment/create',
			array(
				'data_format' => 'body',
				'headers'     => array(
					'Content-Type' => 'application/json; charset=utf-8',
				),
				'body'        => wp_json_encode(
					array(
						'session'     => array(
							'id'             => $session_id,
							'merchant_id'    => peachpay_plugin_merchant_id(),
							'merchant_url'   => get_site_url(),
							'merchant_name'  => get_bloginfo( 'name' ),
							'plugin_version' => PEACHPAY_VERSION,
						),
						'transaction' => array(
							'id'                  => $transaction_id,
							'square'              => array(
								'source_id'          => $source_id,
								'verification_token' => $verification_token,
							),
							'status_callback_url' => home_url( '/wp-json/peachpay/v1/order/status' ),
						),
						'order'       => array(
							'id'       => $order_id,
							'amount'   => $order->get_total(),
							'currency' => peachpay_currency_code(),
							'data'     => $this->prepare_payment_result( $order ),
						),
					)
				),
			)
		);

		$json = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! $json['success'] ) {
			wc_add_notice( __( 'Payment error: ', 'peachpay-for-woocommerce' ) . $json['message'], 'error' );
			return null;
		}

		$order->set_transaction_id( $json['data']['payment_id'] );
		$order->payment_complete();

		return array(
			'result'          => 'success',
			'redirect'        => $this->get_return_url( $order ),
			'payment_details' => array(
				'type'       => $this->id,
				'status'     => 'success',
				'payment_id' => $json['data']['payment_id'],
			),
		);
	}

	/**
	 * Square gateways require setup if Square is not connected.
	 */
	public function needs_setup() {
		return ! peachpay_square_connected();
	}

	/**
	 * If Square is not connected we should prompt the merchant to connect while viewing any square gateway.
	 */
	protected function action_needed_form() {
		if ( ! peachpay_square_connected() ) {
			?>
			<div class="settings-container">
				<h1><?php esc_html_e( 'Action needed', 'peachpay-for-woocommerce' ); ?></h1>
				<hr/>
				<p><?php esc_html_e( 'Please connect Square to use this payment gateway.', 'peachpay-for-woocommerce' ); ?></p>
				<?php require PeachPay::get_plugin_path() . 'core/payments/square/admin/views/html-square-connect.php'; ?>
			</div>
			<?php
		}
	}

	/**
	 * Square gateways require square to be connected in order to use.x
	 */
	public function is_available() {
		$is_available = parent::is_available();

		if ( ! peachpay_square_connected() ) {
			$is_available = false;
		}

		return $is_available;
	}

	/**
	 * Enqueue native checkout scripts. Enqueueing data here will result in duplication so only enqueue static scripts here.
	 */
	public function enqueue_checkout_scripts() {
		PeachPay::enqueue_script( 'peachpay-native-checkout-square-api-js', $this->square_script_src(), array(), false, true );
	}

	/**
	 * .
	 */
	public function enqueue_admin_scripts() { }

	/**
	 * Gets the Square script src URL.
	 */
	public function square_script_src() {
		if ( peachpay_is_test_mode() || peachpay_is_local_development_site() || peachpay_is_staging_site() ) {
			return 'https://sandbox.web.squarecdn.com/v1/square.js';
		} else {
			return 'https://web.squarecdn.com/v1/square.js';
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

		if ( ! is_numeric( $amount ) || floatval( $amount ) <= 0 ) {
			return new \WP_Error( 'wc_' . $order_id . '_refund_failed', __( 'Refund amount must be greater then 0', 'peachpay-for-woocommerce' ) );
		}

		$is_test_mode = wc_get_order( $order_id )->get_meta( 'peachpay_is_test_mode' );
		$url          = peachpay_api_url( $is_test_mode ? 'test' : 'prod' ) . 'api/v1/square/refund';
		$wc_order     = wc_get_order( $order_id );

		$data = array(
			'order_id'    => $order_id,
			'amount'      => floatval( $amount ),
			'reason'      => $reason,
			'merchant_id' => peachpay_plugin_merchant_id(),
			'currency'    => $wc_order->get_currency(),
			'payment_id'  => $wc_order->get_transaction_id(),
		);

		$params = array(
			'body'    => $data,
			'timeout' => 60,
		);

		$status = wp_remote_post( $url, $params );

		if ( is_wp_error( $status ) ) {
			return false;
		}

		$raw_response = wp_remote_retrieve_body( $status );
		$response     = json_decode( $raw_response, true );
		$wc_order->add_order_note( $response['message'] );
		if ( $response['success'] ) {
			return true;
		} else {
			return new \WP_Error( 'wc_' . $order_id . '_refund_failed', $response['message'] );
		}
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
		return peachpay_square_transaction_url( $order );
	}
}
