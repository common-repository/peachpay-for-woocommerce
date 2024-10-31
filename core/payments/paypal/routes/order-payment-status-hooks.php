<?php
/**
 * PeachPay PayPal order-status endpoints hooks.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Hook for custom PayPal success order-status.
 *
 * @param WC_Order $order The order to operate on.
 * @param array    $request The request data.
 */
function peachpay_handle_paypal_success_status( $order, $request ) {

	$paypal = peachpay_array_value( $request, 'paypal' );
	if ( ! $paypal ) {
		wp_send_json_error( 'Required field "paypal" is missing or invalid', 400 );
	}

	$transaction_id = peachpay_array_value( $paypal, 'transaction_id' );
	if ( ! $transaction_id ) {
		wp_send_json_error( 'Required field "paypal.transaction_id" is missing or invalid', 400 );
	}

	$order->set_transaction_id( $transaction_id );
}

/**
 * Set an order to processing if need be.
 *
 * @param WC_Order $order The order to operate on.
 * @param array    $request The request data.
 */
function peachpay_handle_paypal_processing_status( $order, $request ) {
	$paypal = peachpay_array_value( $request, 'paypal' );
	if ( ! $paypal ) {
		wp_send_json_error( 'Required field "paypal" is missing or invalid', 400 );
	}

	$transaction_id = peachpay_array_value( $paypal, 'transaction_id' );
	if ( ! $transaction_id ) {
		wp_send_json_error( 'Required field "paypal.transaction_id" is missing or invalid', 400 );
	}

	$order->set_transaction_id( $transaction_id );
}

/**
 * Hook for pending order paypal status
 *
 * @param WC_order $order the order we are working on.
 * @param array    $request the request data.
 */
function peachpay_handle_paypal_pending_status( $order, $request ) {
	$paypal = peachpay_array_value( $request, 'paypal' );
	if ( ! $paypal ) {
		wp_send_json_error( 'Required field "paypal" is missing or invalid', 400 );
	}

	$transaction_id = peachpay_array_value( $paypal, 'transaction_id' );
	if ( ! $transaction_id ) {
		wp_send_json_error( 'Required field "paypal.transaction_id" is missing or invalid', 400 );
	}

	$order->set_transaction_id( $transaction_id );

	return 'PayPal transaction ' . $request['paypal']['transaction_id'] . ' is pending. Please check PayPal for more information.';
}

