<?php
/**
 * PeachPay PayPal helpers
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Gets the current PayPal merchant id.
 */
function peachpay_get_paypal_merchant_id() {
	$merchant_hostname = preg_replace( '(^https?://)', '', home_url() );
	$response          = wp_remote_get( peachpay_api_url( peachpay_is_test_mode() ) . 'api/v1/paypal/merchantAndClient?merchantHostname=' . $merchant_hostname );

	if ( ! peachpay_response_ok( $response ) ) {
		return __( 'An error occurred while looking up your PayPal account.', 'peachpay-for-woocommerce' );
	}

	$body = wp_remote_retrieve_body( $response );
	$data = json_decode( $body, true );

	if ( is_wp_error( $data ) || '' === $data['paypalMerchantID'] ) {
		delete_option( 'peachpay_paypal_signup' );
		return 'not found';
	}
	return $data['paypalMerchantID'];
}

/**
 * Creates a PayPal signup link.
 */
function peachpay_paypal_signup_url() {
	$response = wp_remote_get( peachpay_api_url( peachpay_is_test_mode() ) . 'api/v1/paypal/signup?merchant_url=' . get_home_url() . '&wp_admin_url=' . get_site_url() );

	if ( ! peachpay_response_ok( $response ) ) {
		return;
	}

	$data = wp_remote_retrieve_body( $response );

	if ( is_wp_error( $data ) ) {
		return;
	}
	return $data;
}

/**
 * Determines whether Paypal is enabled meaning both a paypal account is connected (ignored when test mode enabled) and paypal is enabled.
 */
function peachpay_paypal_enabled() {
	return ( peachpay_is_test_mode() || get_option( 'peachpay_paypal_signup' ) ) && peachpay_get_settings_option( 'peachpay_payment_options', 'paypal' );
}
