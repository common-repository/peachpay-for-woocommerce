<?php
/**
 * PeachPay Purchase Order payment method.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Sets up the PeachPay purchase order payment methods/gateway.
 *
 * @param array $supported_gateways An array of supported gateways and there configuration.
 */
function peachpay_action_register_purchase_order_gateway( $supported_gateways ) {

	require_once PEACHPAY_ABSPATH . 'core/payments/peachpay/class-peachpay-purchase-order-gateway.php';
	require_once PEACHPAY_ABSPATH . 'core/payments/payment-threshold.php';

	$supported_gateways[] = array(
		'gateway_id'    => 'peachpay_purchase_order',
		'gateway_class' => 'PeachPay_Purchase_Order_Gateway',
		'features'      => array(
			'purchase_order_payment_method' => array(
				'enabled'  => (bool) peachpay_get_settings_option( 'peachpay_payment_options', 'enable_purchase_order' ),
				'version'  => 1,
				'metadata' => array(
					'field_name'  => peachpay_get_settings_option(
						'peachpay_payment_options',
						'purchase_order_field_name',
						__( 'Purchase order', 'peachpay-for-woocommerce' )
					),
					'description' => peachpay_get_settings_option(
						'peachpay_payment_options',
						'purchase_order_description',
						''
					),
					'limits'      => peachpay_get_transaction_thresholds( 'peachpay_purchase_order' ),
				),
			),
		),
	);

	return $supported_gateways;
}
add_filter( 'peachpay_register_supported_gateways', 'peachpay_action_register_purchase_order_gateway', 10, 1 );
