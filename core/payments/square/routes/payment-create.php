<?php
/**
 * Creates a square payment for the current cart.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Creates a square payment for the given cart.
 */
function peachpay_wc_ajax_create_square_payment() {
	// phpcs:disable WordPress.Security.NonceVerification.Missing
	$session_id = '';
	if ( isset( $_POST['session']['id'] ) ) {
		$session_id = sanitize_text_field( wp_unslash( $_POST['session']['id'] ) );
	}

	$transaction_id = '';
	if ( isset( $_POST['transaction']['id'] ) ) {
		$transaction_id = sanitize_text_field( wp_unslash( $_POST['transaction']['id'] ) );
	}

	$source_id = '';
	if ( isset( $_POST['transaction']['square'] ) && isset( $_POST['transaction']['square']['source_id'] ) ) {
		$source_id = sanitize_text_field( wp_unslash( $_POST['transaction']['square']['source_id'] ) );
	}

	$verification_token = '';
	if ( isset( $_POST['transaction']['square'] ) && isset( $_POST['transaction']['square']['verification_token'] ) ) {
		$verification_token = sanitize_text_field( wp_unslash( $_POST['transaction']['square']['verification_token'] ) );
	}

	$order_id = 0;
	if ( isset( $_POST['order']['id'] ) ) {
		$order_id = sanitize_text_field( wp_unslash( $_POST['order']['id'] ) );
	}

	$order_data = null;
	if ( isset( $_POST['order']['data'] ) ) {
		$order_data = json_decode( sanitize_text_field( wp_unslash( $_POST['order']['data'] ) ), true );
	}

	//phpcs:enable

	$order = wc_get_order( $order_id );
	if ( ! $order ) {
		wp_send_json_error( 'Order not found', 404 );
	}

	// Make sure every attempt the order status is the default ("pending").
	$default_status = apply_filters( 'woocommerce_default_order_status', 'pending' );
	if ( $order->get_status() !== $default_status ) {
		$order->set_status( $default_status );
		$order->add_order_note( __( 'Customer attempting payment again.', 'peachpay-for-woocommerce' ) );
		$order->save();
	}

	$cart_amount = $order->get_total( 'raw' );

	$response = wp_remote_post(
		peachpay_api_url() . 'api/v1/square/payment/create',
		array(
			'body' => array(
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
						'verification_token' => 'null' === $verification_token ? null : $verification_token,
					),
					'status_callback_url' => home_url( '/wp-json/peachpay/v1/order/status' ),
				),
				'order'       => array(
					'id'       => $order_id,
					'amount'   => $cart_amount,
					'currency' => peachpay_currency_code(),
					'data'     => $order_data,
				),
			),
		)
	);

	$data = wp_remote_retrieve_body( $response );

	if ( is_wp_error( $data ) ) {
		wp_send_json(
			array(
				'success' => false,
				'message' => __( 'An unexpected error occured. Please refresh the page and try again.', 'peachpay-for-woocommerce' ),
			)
		);
	}

	wp_send_json( json_decode( $data ) );
	wp_die();
}
