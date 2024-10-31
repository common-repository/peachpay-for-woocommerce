<?php
/**
 * Cancels a payment intent for a given order.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Creates a stripe payment intent for the given cart.
 */
function peachpay_wc_ajax_cancel_stripe_payment_intent() {

	// phpcs:disable WordPress.Security.NonceVerification.Missing

	$order_id = 0;
	if ( isset( $_POST['order_id'] ) ) {
		$order_id = intval( wp_unslash( $_POST['order_id'] ) );
	}

	//phpcs:enable

	$order = wc_get_order( $order_id );
	if ( ! $order ) {
		wp_send_json_error( 'Order not found', 404 );
	}

	$was_test_mode = $order->get_meta( 'peachpay_is_test_mode' );

	$response = wp_remote_post(
		peachpay_api_url( $was_test_mode ? 'test' : 'prod' ) . 'api/v1/stripe/payment-intent/cancel',
		array(
			'body' => array(
				'session' => array(
					'id'             => '',
					'plugin_version' => PEACHPAY_VERSION,
					'merchant_url'   => get_site_url(),
					'merchant_name'  => get_bloginfo( 'name' ),
					'stripe'         => array(
						'connect_id'        => peachpay_stripe_connect_id(),
						'payment_intent_id' => peachpay_stripe_order_payment_intent_id( $order ),
					),
				),
			),
		)
	);

	if ( ! peachpay_response_ok( $response ) ) {
		wp_send_json_error( 'Non 200 response from API', 500 );
		wp_die();
		return;
	}

	$order->set_status( 'cancelled' );
	$order->save();
	$order->add_meta_data( '_pp_stripe_amount_capturable', 0, true );
	$order->add_order_note( 'Payment was voided.' );
	$order->save();

	wp_send_json( array( 'success' => true ) );
	wp_die();
}
