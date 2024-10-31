<?php
/**
 * PeachPay paypal payment method.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

require_once PEACHPAY_ABSPATH . 'core/payments/paypal/util.php';

/**
 * Sets up the PeachPay paypal payment methods/gateway.
 *
 * @param array $supported_gateways An array of supported gateways and there configuration.
 */
function peachpay_action_register_paypal_gateway( $supported_gateways ) {

	require_once PEACHPAY_ABSPATH . 'core/payments/paypal/class-peachpay-paypal-gateway.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/paypal/routes/order-payment-status-hooks.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/payment-threshold.php';

	if ( is_admin() ) {
		require_once PEACHPAY_ABSPATH . 'core/payments/paypal/admin/actions.php';
		require_once PEACHPAY_ABSPATH . 'core/payments/paypal/admin/settings.php';
	}

	if ( peachpay_get_settings_option( 'peachpay_payment_options', 'refund_on_cancel', false ) ) {
		add_action( 'woocommerce_order_status_cancelled', 'peachpay_paypal_order_cancelled', 10, 1 );
	}

	$supported_gateways[] = array(
		'gateway_id'    => 'peachpay_paypal',
		'gateway_class' => 'PeachPay_PayPal_Gateway',
		'features'      => array(
			'paypal_payment_method' => array(
				'enabled'  => (bool) peachpay_paypal_enabled(),
				'version'  => 1,
				'metadata' => array(
					'default_currency' => null,
					'limits'           => peachpay_get_transaction_thresholds( 'paypal' ),
				),
			),
		),
	);

	return $supported_gateways;
}
add_filter( 'peachpay_register_supported_gateways', 'peachpay_action_register_paypal_gateway', 10, 1 );

/**
 * Callback function that gets activated when merchant changes order status to cancelled.
 *
 * @param string $order_id The order id of the order that was cancelled.
 */
function peachpay_paypal_order_cancelled( $order_id ) {
	$order = wc_get_order( $order_id );

	if ( $order->get_payment_method() !== 'peachpay_paypal' ) {
		return;
	}

	$params = array(
		'timeout' => 60,
		'body'    => array(
			'order_id'     => $order_id,
			'amount'       => $order->get_total(),
			'reason'       => 'Payment was cancelled.',
			'merchant_url' => get_site_url(),
			'merchant_id'  => peachpay_plugin_merchant_id(),
		),
	);

	$is_test_mode = $order->get_meta( 'peachpay_is_test_mode' );
	$response     = wp_remote_post( peachpay_api_url( $is_test_mode ? 'test' : 'prod' ) . 'api/v1/paypal/refund', $params );

	if ( ! is_wp_error( $response ) ) {
		$order->add_order_note( 'Payment refunded. Reason: Order was cancelled' );
	}
}
