<?php
/**
 * PeachPay Square payment method.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

require_once PEACHPAY_ABSPATH . 'core/payments/square/util.php';

/**
 * Sets up the PeachPay Square payment methods/gateway.
 *
 * @param array $supported_gateways An array of supported gateways and there configuration.
 */
function peachpay_action_register_square_gateway( $supported_gateways ) {

	require_once PEACHPAY_ABSPATH . 'core/payments/square/class-peachpay-square-gateway.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/square/routes/payment-create.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/payment-threshold.php';

	add_action( 'wc_ajax_pp-create-square-payment', 'peachpay_wc_ajax_create_square_payment' );

	if ( is_admin() ) {
		require_once PEACHPAY_ABSPATH . 'core/payments/square/admin/actions.php';
		require_once PEACHPAY_ABSPATH . 'core/payments/square/admin/settings.php';
	}

	$supported_gateways[] = array(
		'gateway_id'    => 'peachpay_square',
		'gateway_class' => 'PeachPay_Square_Gateway',
		'features'      => array(
			'square_payment_method' => array(
				'enabled'  => peachpay_square_enabled(),
				'version'  => 1,
				'metadata' => array(
					'card_payments'       => array(
						'enabled' => true,
						'limits'  => peachpay_get_transaction_thresholds( 'square_card_payments' ),
					),
					'apple_pay_payments'  => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'square_apple_pay_payments', false ) && peachpay_square_apple_pay_domain_registered(),
					),
					'google_pay_payments' => array(
						'enabled' => '1' === peachpay_get_settings_option( 'peachpay_payment_options', 'square_google_pay_payments', false ),
					),
				),
			),
		),
	);

	return $supported_gateways;
}
add_filter( 'peachpay_register_supported_gateways', 'peachpay_action_register_square_gateway', 10, 1 );
