<?php
/**
 * PeachPay stripe payment method.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

require_once PEACHPAY_ABSPATH . 'core/payments/stripe/util.php';
require_once PEACHPAY_ABSPATH . 'core/payments/stripe/migrations.php';

/**
 * Sets up the PeachPay stripe payment methods/gateway.
 *
 * @param array $supported_gateways An array of supported gateways and there configuration.
 */
function peachpay_action_register_stripe_gateway( $supported_gateways ) {
	require_once PEACHPAY_ABSPATH . 'core/payments/stripe/class-peachpay-stripe-gateway.php';

	require_once PEACHPAY_ABSPATH . 'core/payments/stripe/routes/payment-intent-create.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/stripe/routes/payment-intent-capture.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/stripe/routes/payment-intent-cancel.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/stripe/routes/order-payment-status-hooks.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/payment-threshold.php';

	add_action( 'wc_ajax_pp-create-stripe-setup-intent', 'peachpay_wc_ajax_create_stripe_setup_intent' );
	add_action( 'wc_ajax_pp-create-stripe-payment-intent', 'peachpay_wc_ajax_create_stripe_payment_intent' );
	add_action( 'wc_ajax_pp-capture-stripe-payment-intent', 'peachpay_wc_ajax_capture_stripe_payment_intent' );
	add_action( 'wc_ajax_pp-cancel-stripe-payment-intent', 'peachpay_wc_ajax_cancel_stripe_payment_intent' );

	if ( is_admin() ) {
		require_once PEACHPAY_ABSPATH . 'core/payments/stripe/admin/actions.php';
		require_once PEACHPAY_ABSPATH . 'core/payments/stripe/admin/settings.php';
	}

	if ( peachpay_get_settings_option( 'peachpay_payment_options', 'refund_on_cancel', false ) ) {
		add_action( 'woocommerce_order_status_cancelled', 'peachpay_stripe_order_cancelled', 10, 1 );
	}

	$supported_gateways[] = array(
		'gateway_id'    => 'peachpay_stripe',
		'gateway_class' => 'PeachPay_Stripe_Gateway',
		'features'      => array(
			'stripe_payment_method'  => array(
				'enabled'  => (bool) peachpay_stripe_enabled(),
				'version'  => 1,
				'metadata' => array(
					'redirect_url_base'            => peachpay_url( 'public/stripe-redirect.html' ),
					'card_payments'                => array(
						'enabled' => true,
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_card_payments' ),
					),
					'affirm_payments'              => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'affirm_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_affirm_payments' ),
					),
					'klarna_payments'              => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'klarna_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_klarna_payments' ),
					),
					'afterpay_clearpay_payments'   => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'afterpay_clearpay_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_afterpay_clearpay_payments' ),
					),
					'giropay_payments'             => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'giropay_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_giropay_payments' ),
					),
					'us_bank_account_ach_payments' => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'us_bank_account_ach_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_us_bank_account_ach_payments' ),
					),
					'eps_payments'                 => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'eps_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_eps_payments' ),
					),
					'p24_payments'                 => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'p24_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_p24_payments' ),
					),
					'bancontact_payments'          => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'bancontact_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_bancontact_payments' ),
					),
					'sofort_payments'              => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'sofort_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_sofort_payments' ),
					),
					'ideal_payments'               => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'ideal_payments', false ),
						'limits'  => peachpay_get_transaction_thresholds( 'stripe_ideal_payments' ),
					),
				),
			),
			'stripe_payment_request' => array(
				'enabled'  => ( peachpay_get_settings_option( 'peachpay_payment_options', 'stripe_payment_request' ) && peachpay_has_valid_key() ),
				'version'  => 1,
				'metadata' => array(
					'apple_pay'  => peachpay_get_settings_option( 'peachpay_apple_pay_settings_v2', 'apple_pay_domain_set', 'no' ) === 'yes',
					'google_pay' => true, // Google Pay does not require any special activation so this can always be true.
				),
			),
		),
	);

	return $supported_gateways;
}
add_filter( 'peachpay_register_supported_gateways', 'peachpay_action_register_stripe_gateway', 10, 1 );

/**
 * Callback function that gets activated when merchant changes order status to cancelled.
 *
 * @param string $order_id The order id of the order that was cancelled.
 */
function peachpay_stripe_order_cancelled( $order_id ) {
	$order = wc_get_order( $order_id );

	if ( $order->meta_exists( '_pp_stripe_auto_cancelled_on_dispute' ) && 'true' === $order->get_meta( '_pp_stripe_auto_cancelled_on_dispute', true ) ) {
		return;
	}

	if ( $order->get_payment_method() !== 'peachpay_stripe' ) {
		return;
	}
	$params       = array(
		'timeout' => 60,
		'body'    => array(
			'order_id'     => $order_id,
			'amount'       => $order->get_total(),
			'reason'       => 'Payment was cancelled.',
			'merchant_url' => get_home_url(),
			'merchant_id'  => peachpay_plugin_merchant_id(),
		),
	);
	$is_test_mode = $order->get_meta( 'peachpay_is_test_mode' );
	$response     = wp_remote_post( peachpay_api_url( $is_test_mode ? 'test' : 'prod' ) . 'api/v1/stripe/refund', $params );

	if ( ! is_wp_error( $response ) ) {
		$order->add_order_note( 'Payment refunded. Reason: Order was cancelled' );
	}
}
