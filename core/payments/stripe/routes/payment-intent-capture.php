<?php
/**
 * Captures a payment intent for a given order.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Creates a stripe payment intent for the given cart.
 */
function peachpay_wc_ajax_capture_stripe_payment_intent() {

	// phpcs:disable WordPress.Security.NonceVerification.Missing

	$order_id = 0;
	if ( isset( $_POST['order_id'] ) ) {
		$order_id = intval( wp_unslash( $_POST['order_id'] ) );
	}

	$capture_amount = 0;
	if ( isset( $_POST['capture_amount'] ) ) {
		$capture_amount = intval( wp_unslash( $_POST['capture_amount'] ) );
	}

	//phpcs:enable

	$order = wc_get_order( $order_id );
	if ( ! $order ) {
		wp_send_json_error( 'Order not found', 404 );
	}

	if ( ! peachpay_stripe_capture_payment( $order, $capture_amount ) ) {
		wp_send_json_error( 'Failed to capture order', 400 );
	}

	wp_send_json( array( 'success' => true ) );
	wp_die();
}
