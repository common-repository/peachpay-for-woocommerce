<?php
/**
 * PeachPay provider utility functions
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Gets the instance of each PeachPay provided gateway.
 *
 * @param array $ids available payment method id strings.
 * @return array of gateways.
 */
function peachpay_provider_gateways( $ids = array() ) {
	$purchase_order_gateways = array();

	foreach ( WC()->payment_gateways->payment_gateways() as $gateway ) {
		if ( in_array( $gateway->id, $ids, true ) ) {
			$purchase_order_gateways[] = $gateway;
		}
	}

	return $purchase_order_gateways;
}

/**
 * For updating a PeachPay purchase order transaction
 *
 * @param WC_Order $order to complete.
 * @param string   $session_id for the order.
 * @param string   $transaction_id of the order.
 * @param string   $purchase_order_number of the order.
 * @return array   indicating success or failure with with a message.
 */
function update_purchase_order_transaction( $order, $session_id, $transaction_id, $purchase_order_number ) {
	$response = wp_remote_post(
		peachpay_api_url() . 'api/v1/transaction/update',
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
						'merchant_url'   => peachpay_get_site_url(),
						'merchant_name'  => get_bloginfo( 'name' ),
						'plugin_version' => PEACHPAY_VERSION,
					),
					'transaction' => array(
						'id'             => $transaction_id,
						'purchase_order' => array(
							'purchase_order_number' => $purchase_order_number,
						),
						'note'           => 'We do not track the status after on-hold for this Payment Method.',
					),
					'order'       => array(
						'payment_status' => $order->get_status(),
						'order_status'   => $order->get_status(),
						'data'           => array(
							'id'      => $order->get_id(),
							'result'  => 'success',
							'details' => $order->get_data(),
						),
					),
				),
			),
		)
	);

	$json = json_decode( wp_remote_retrieve_body( $response ), true );

	if ( ! $json['success'] ) {
		return array(
			'success' => false,
			'message' => $json['message'],
		);
	}

	return array(
		'success' => true,
	);
}
