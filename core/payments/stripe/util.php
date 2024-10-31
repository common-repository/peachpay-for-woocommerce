<?php
/**
 * PeachPay Stripe helpers
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Gets a stripe payment capability status.
 *
 * @param string $payment_key The payment capability to retrieve a status for.
 */
function peachpay_stripe_capability( $payment_key ) {
	$account = peachpay_stripe_connected();

	if ( ! $account ) {
		return 'inactive';
	}

	if ( ! array_key_exists( 'capabilities', $account ) ) {
		return 'inactive';
	}

	$capabilities = $account['capabilities'];

	if ( ! array_key_exists( $payment_key, $capabilities ) ) {
		return 'inactive';
	}

	return $capabilities[ $payment_key ];
}

/**
 * Creates the Stripe connect signup link.
 *
 * @param string $site_url The admin URL of the current site.
 * @param string $home_url The home URL of the current site.
 */
function peachpay_stripe_signup_url( $site_url, $home_url ) {
	// phpcs:ignore
	$TEST_STRIPE_CLIENT_ID = 'ca_HHK0LPM3N7jbW1aV610tueC8zVOBtW2D';
	// phpcs:ignore
	$LIVE_STRIPE_CLIENT_ID = 'ca_HHK0N5DreIcJJAyqGbeOE77hAZD9gCFg';
	// phpcs:ignore
	$stripe_client_id = ( peachpay_is_local_development_site() || peachpay_is_staging_site() ) ? $TEST_STRIPE_CLIENT_ID : $LIVE_STRIPE_CLIENT_ID;

	$state               = new stdClass();
	$state->merchant_url = $home_url;
	$state->wp_admin_url = $site_url;

	// Using JSON to pass multiple parameters through state.
	$state_json = wp_json_encode( $state );
	// Base64 encode as JSON includes chars removed by esc_url().
	// phpcs:ignore
	$state_base64 = base64_encode( $state_json );

	$redirect_uri = peachpay_determine_stripe_redirect_uri();

	return "https://dashboard.stripe.com/oauth/v2/authorize?response_type=code&client_id=$stripe_client_id&scope=read_write&state=$state_base64&stripe_user[url]=$home_url&redirect_uri=$redirect_uri";
}

/**
 * Get the correct redirect URI that will be given to Stripe based on the
 * current environment.
 */
function peachpay_determine_stripe_redirect_uri() {
	if ( peachpay_is_local_development_site() ) {
		return 'https://dev.peachpay.local/connect/oauth';
	}

	if ( peachpay_is_staging_site() ) {
		return 'https://dev.peachpay.app/connect/oauth';
	}

	return 'https://prod.peachpay.app/connect/oauth';
}

/**
 * Determines if the given URL is supported for Apple Pay though stripe.
 */
function peachpay_stripe_supported_applepay_url() {
	return (
		! peachpay_is_localhost_url() && peachpay_is_https_url()
	);
}

/**
 * Gets a link of the stripe order transaction id link.
 *
 * @param WC_Order $order The order object.
 */
function peachpay_stripe_transaction_url( $order ) {
	if ( ! $order->get_transaction_id() ) {
		return '';
	}

	if ( $order->get_meta( 'peachpay_is_test_mode' ) === 'true' || peachpay_is_staging_site() || peachpay_is_local_development_site() ) {
		return sprintf( 'https://dashboard.stripe.com/test/payments/%s', $order->get_transaction_id() );
	} else {
		return sprintf( 'https://dashboard.stripe.com/payments/%s', $order->get_transaction_id() );
	}
}

/**
 * Gets the pending payment amount that can be captured for the order.
 *
 * @param WC_Order $order The order to check for the amount to capture.
 * @param string   $context Optional parameter to indicate if the raw value or display value should be returned.
 */
function peachpay_stripe_order_capturable_amount( $order, $context = 'display' ) {
	if ( ! $order->meta_exists( '_pp_stripe_amount_capturable' ) ) {
		return 0;
	}

	$amount = intval( $order->get_meta( '_pp_stripe_amount_capturable', true ) );

	if ( 'display' !== $context ) {
		return $amount;
	}

	return peachpay_convert_from_stripe_format( $amount, $order->get_currency() );
}

/**
 * Converts the stripe amount to a readable decimal format for display taking into account the currency of the order.
 *
 * @example  peachpay_convert_from_stripe_format(5961, "USD") // -> 59.61
 * @param int    $amount The integer amount from stripe.
 * @param string $currency The currency of the integer type from stripe.
 */
function peachpay_convert_from_stripe_format( $amount, $currency ) {
	$zero_decimal_currencies = array(
		'BIF',
		'CLP',
		'DJF',
		'GNF',
		'JPY',
		'KMF',
		'KRW',
		'MGA',
		'PYG',
		'RWF',
		'UGX',
		'VND',
		'VUV',
		'XAF',
		'XOF',
		'XPF',
		'TWD',
	);

	if ( in_array( $currency, $zero_decimal_currencies, true ) ) {
		return $amount;
	}

	return floatval( $amount ) / 100;
}

/**
 * Gets the payment intent for a PeachPay stripe order.
 *
 * @param WC_Order $order The WC order to retrieve the payment intent id for.
 */
function peachpay_stripe_order_payment_intent_id( $order ) {
	if ( ! $order->meta_exists( '_pp_stripe_payment_intent_id' ) ) {
		return '';
	}

	return $order->get_meta( '_pp_stripe_payment_intent_id', true );
}

/**
 * Gets the setup intent for a PeachPay stripe order.
 *
 * @param WC_Order $order The WC order to retrieve the payment intent id for.
 */
function peachpay_stripe_order_setup_intent_id( $order ) {
	if ( ! $order->meta_exists( '_pp_stripe_setup_intent_id' ) ) {
		return '';
	}

	return $order->get_meta( '_pp_stripe_setup_intent_id', true );
}

/**
 * Captures a stripe payment.
 *
 * @param WC_order $order The order to capture a payment intent for.
 * @param int      $capture_amount The amount of the order to capture in stripe amount format.
 */
function peachpay_stripe_capture_payment( $order, $capture_amount ) {
	$was_test_mode = $order->get_meta( 'peachpay_is_test_mode' );

	$response = wp_remote_post(
		peachpay_api_url( $was_test_mode ? 'test' : 'prod' ) . 'api/v1/stripe/payment-intent/capture',
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
						'amount_to_capture' => $capture_amount,
					),
				),
			),
		)
	);

	if ( ! peachpay_response_ok( $response ) ) {
		$order->add_order_note( 'Failed to capture ' . wc_price( peachpay_convert_from_stripe_format( $capture_amount, $order->get_currency() ), array( 'currency' => $order->get_currency() ) ) . '.' );
		return false;
	}

	$order->payment_complete();
	$order->save();
	$order->add_meta_data( '_pp_stripe_amount_capturable', 0, true );
	$order->add_order_note( wc_price( peachpay_convert_from_stripe_format( $capture_amount, $order->get_currency() ), array( 'currency' => $order->get_currency() ) ) . ' was captured.' );
	$order->save();

	return true;
}

/**
 * Determines whether Stripe is enabled meaning both a stripe account is active and stripe is enabled.
 */
function peachpay_stripe_enabled() {
	return ( peachpay_is_test_mode() || peachpay_stripe_connected() ) && peachpay_get_settings_option( 'peachpay_payment_options', 'enable_stripe' );
}

/**
 * Determines whether Stripe is connected.
 */
function peachpay_stripe_connected() {
	return get_option( 'peachpay_connected_stripe_account', 0 );
}

/**
 * Gets Stripe connect id.
 *
 * @param string $default A default stripe connect Id.
 */
function peachpay_stripe_connect_id( $default = '' ) {
	$account = peachpay_stripe_connected();

	if ( ! $account ) {
		return $default;
	}

	// @deprecated property but checking its existence to ensure if the merchant has not visited the PeachPay settings things do not break.
	if ( isset( $account['id'] ) ) {
		return $account['id'];
	}

	return $account['connect_id'];
}

/**
 * Gets the connected stripe email.
 */
function peachpay_stripe_connect_email() {
	$account = peachpay_stripe_connected();

	if ( ! $account ) {
		return '';
	}

	if ( isset( $account['email'] ) ) {
		return $account['email'];
	}

	return '';
}

/**
 * Creates a link to the connected stripe payments page.
 */
function peachpay_stripe_connect_account_link() {
	$url_base = peachpay_is_test_mode() ? 'https://dashboard.stripe.com/connect/accounts/' : 'https://dashboard.stripe.com/test/connect/accounts/';

	return $url_base . peachpay_stripe_connect_id() . '/payments';
}
