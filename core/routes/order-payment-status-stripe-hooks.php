<?php
/**
 * PeachPay stripe order-status endpoints hooks.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Stripe webhook payment success hook.
 *
 * @param WC_Order $order The order to operate on.
 * @param array    $request The webhook request data.
 */
function peachpay_handle_stripe_success_status( $order, $request ) {

	$stripe_meta_result = peachpay_order_add_stripe_meta( $order, $request );

	if ( 'success' !== $stripe_meta_result[0] ) {
		wp_send_json_error( $stripe_meta_result[2], 400 );
		return;
	}

	return '';
}

/**
 * Stripe webhook payment on-hold hook.
 *
 * @param WC_Order $order The order to operate on.
 * @param array    $request The webhook request data.
 */
function peachpay_handle_stripe_onhold_status( $order, $request ) {

	$stripe_meta_result = peachpay_order_add_stripe_meta( $order, $request );

	if ( 'success' !== $stripe_meta_result[0] ) {
		wp_send_json_error( $stripe_meta_result[2], 400 );
		return;
	}

	return 'Order authorization successful in Stripe. Charge: ' . $stripe_meta_result[1] . '. Change the order status to completed or manually specify an amount in the charge section to capture the payment. The authorized payment will expire after 7 days.';
}


/**
 * Updates the order status on a dispute. Currently on "canceled" is supported.
 *
 * @param WC_Order $order The order to operate on.
 * @param array    $request The webhook request data.
 */
function peachpay_handle_stripe_canceled_status( $order, $request ) {
	$message = peachpay_handle_default_cancelled_status( $order, $request );

	if ( ! peachpay_get_settings_option( 'peachpay_payment_options', 'cancel_order_on_dispute', false ) ) {
		return $message;
	}

	// value must be string.
	$order->add_meta_data( '_pp_stripe_auto_cancelled_on_dispute', 'true', true );

	return $message;
}

/**
 * Adds stripe metadata to a order.
 *
 * @param WC_Order $order The WC order to add metadata too.
 * @param array    $request The structured request object.
 * @return array Tuple type of [status: string,charge_id: string|null, error_message: string|null ]
 */
function peachpay_order_add_stripe_meta( $order, $request ) {
	$stripe          = peachpay_array_value( $request, 'stripe' );
	$is_setup_intent = ! peachpay_array_value( $stripe, 'payment_intent_id' );

	if ( ! $stripe ) {
		return array( 'fail', null, 'Missing required Stripe details.' );
	}

	$charge_id = false;
	if ( $is_setup_intent ) {
		$setup_intent_id = peachpay_array_value( $stripe, 'setup_intent_id' );
		if ( $setup_intent_id ) {
			$order->add_meta_data( '_pp_stripe_setup_intent_id', $setup_intent_id, true );
		}
	} else {
		$charge_id = peachpay_array_value( $stripe, 'charge_id' );
		if ( ! $charge_id && ! $is_setup_intent ) {
			return array( 'fail', null, 'Missing required field "stripe.charge_id".' );
		}
		$order->set_transaction_id( $charge_id );

		$payment_intent_id = peachpay_array_value( $stripe, 'payment_intent_id' );
		if ( $payment_intent_id ) {
			$order->add_meta_data( '_pp_stripe_payment_intent_id', $payment_intent_id, true );
		}
	}

	$customer_id = peachpay_array_value( $stripe, 'customer_id' );
	if ( $customer_id ) {
		$order->add_meta_data( PEACHPAY_PAYMENT_META_KEY, peachpay_build_stripe_order_payment_meta( $customer_id ) );
	}

	$order->add_meta_data( '_pp_stripe_amount_capturable', peachpay_array_value( $stripe, 'amount_capturable' ), true );

	if ( ! $is_setup_intent ) {
		$charge_fee = peachpay_array_value( $stripe, 'charge_fee' );
		$charge_net = peachpay_array_value( $stripe, 'charge_net' );
		if ( ! $charge_fee || ! $charge_net ) {
			return array( 'success', $charge_id, 'Missing fields "stripe.charge_fee" and/or "stripe.charge_net" for stripe fee details.' );
		}

		$charge_fee = peachpay_convert_from_stripe_format( $charge_fee, $order->get_currency() );
		$charge_net = peachpay_convert_from_stripe_format( $charge_net, $order->get_currency() );

		$order->add_meta_data( '_pp_stripe_charge_fee', $charge_fee, true );
		$order->add_meta_data( '_pp_stripe_charge_net', $charge_net, true );
	}

	return array( 'success', $charge_id, null );
}
