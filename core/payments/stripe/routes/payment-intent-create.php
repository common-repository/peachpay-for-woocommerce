<?php
/**
 * Updates a payment intent for the current cart.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Creates a stripe payment intent for the given cart.
 */
function peachpay_wc_ajax_create_stripe_payment_intent() {
	peachpay_create_stripe_intent( 'payment' );
}

/**
 * Creates a stripe setup intent for the given cart.
 */
function peachpay_wc_ajax_create_stripe_setup_intent() {
	peachpay_create_stripe_intent( 'setup' );
}

/**
 * Creates a payment or setup intent since both require same data.
 *
 * @param string $intent_type 'payment' or 'setup'.
 */
function peachpay_create_stripe_intent( $intent_type ) {
	// phpcs:ignore WordPress.Security.NonceVerification.Missing
	$post_data = peachpay_filter_stripe_create_intent_post_data( $_POST );
	$response  = wp_remote_post(
		peachpay_api_url() . "api/v1/stripe/{$intent_type}-intent/create",
		array(
			'body' => $post_data,
		)
	);

	$data = wp_remote_retrieve_body( $response );

	if ( is_wp_error( $data ) ) {
		wp_send_json(
			array(
				'success' => false,
			)
		);
		wp_die();
	}

	// Optimal would be not to decode -> encode but I know this works for now.
	wp_send_json( json_decode( $data ) );
	wp_die();
}

/**
 * Used by peachpay_wc_ajax_create_stripe_payment_intent and peachpay_wc_ajax_create_stripe_setup_intent
 * to grab and sanitize post data before making API request.
 *
 * @param array $post $_POST array.
 */
function peachpay_filter_stripe_create_intent_post_data( $post ) {
	// phpcs:disable WordPress.Security.NonceVerification.Missing
	$session_id = '';
	if ( isset( $post['session']['id'] ) ) {
		$session_id = sanitize_text_field( wp_unslash( $post['session']['id'] ) );
	}

	$customer_id = '';
	if ( isset( $post['session']['stripe'] ) && isset( $post['session']['stripe']['customer_id'] ) ) {
		$customer_id = sanitize_text_field( wp_unslash( $post['session']['stripe']['customer_id'] ) );
	}

	$connect_id = '';
	if ( isset( $post['session']['stripe'] ) && isset( $post['session']['stripe']['connect_id'] ) ) {
		$connect_id = sanitize_text_field( wp_unslash( $post['session']['stripe']['connect_id'] ) );
	}

	$payment_method_id = '';
	if ( isset( $post['session']['stripe'] ) && isset( $post['session']['stripe']['payment_method_id'] ) ) {
		$payment_method_id = sanitize_text_field( wp_unslash( $post['session']['stripe']['payment_method_id'] ) );
	}

	$payment_method_type = '';
	if ( isset( $post['session']['stripe'] ) && isset( $post['session']['stripe']['payment_method_type'] ) ) {
		$payment_method_type = sanitize_text_field( wp_unslash( $post['session']['stripe']['payment_method_type'] ) );
	}

	$transaction_id = '';
	if ( isset( $post['transaction']['id'] ) && isset( $post['transaction']['id'] ) ) {
		$transaction_id = sanitize_text_field( wp_unslash( $post['transaction']['id'] ) );
	}

	$order_id = 0;
	if ( isset( $post['order']['id'] ) ) {
		$order_id = sanitize_text_field( wp_unslash( $post['order']['id'] ) );
	}

	$order_data = null;
	if ( isset( $post['order']['data'] ) ) {
		$order_data = json_decode( sanitize_text_field( wp_unslash( $post['order']['data'] ) ), true );
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

	$body = array(
		'session'     => array(
			'id'             => $session_id,
			'plugin_version' => PEACHPAY_VERSION,
			'merchant_url'   => get_home_url(),
			'merchant_name'  => get_bloginfo( 'name' ),
			'stripe'         => array(
				'customer_id'         => $customer_id,
				'connect_id'          => $connect_id,
				'payment_method_id'   => $payment_method_id,
				'payment_method_type' => $payment_method_type,
				'capture_method'      => peachpay_get_stripe_charge_type( $payment_method_type ),
				'force_3d_secure'     => peachpay_get_settings_option( 'peachpay_payment_options', 'stripe_card_force_3d_secure', 0 ),
			),
		),
		'transaction' => array(
			'id' => $transaction_id,
		),
		'order'       => array(
			'id'       => $order_id,
			'amount'   => $cart_amount,
			'currency' => peachpay_currency_code(),
			'data'     => $order_data,
		),
	);

	if ( $order->get_meta( 'has_subscription' ) === '1' ) {
		// For WCS support and eliminate any PM friction when renewing.
		$body['session']['stripe']['setup_future_usage'] = 'off_session';
	}

	return $body;
}

/**
 * Gets the correct charge type setting based on which payment method is being used.
 *
 * @param string $payment_method_type The type of stripe payment.
 */
function peachpay_get_stripe_charge_type( $payment_method_type ) {
	switch ( $payment_method_type ) {
		case 'card':
			return peachpay_get_settings_option( 'peachpay_payment_options', 'stripe_card_capture_method', 'automatic' );
		default:
			return 'automatic';
	}
}
