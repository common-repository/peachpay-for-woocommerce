<?php
/**
 * PeachPay Square utility functions
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Square signup URL.
 */
function peachpay_square_signup_url() {
	// PHPCS:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
	$state = base64_encode(
		wp_json_encode(
			array(
				'return_url'         => admin_url( 'admin.php?page=peachpay&tab=payment#square' ),
				'merchant_id'        => peachpay_plugin_merchant_id(),
				'merchant_url'       => get_site_url(),
				'permission_version' => peachpay_square_permission_version(),
			)
		)
	);

	return peachpay_square_connect_url() . "&state=$state";
}

/**
 * Gets the correct square application id for signup purposes.
 */
function peachpay_square_application_id() {
	$account = peachpay_square_config();

	if ( ! $account ) {
		return '';
	}

	return $account['application_id'];
}

/**
 * Gets the square location id for the signed up store.
 */
function peachpay_square_location_id() {
	$account = peachpay_square_connected();

	if ( ! $account ) {
		return '';
	}

	return $account['location_id'];
}

/**
 * Gets the square country for the signed up store.
 */
function peachpay_square_country() {
	$account = peachpay_square_connected();

	if ( ! $account ) {
		return '';
	}

	return $account['country'];
}

/**
 * Gets the square currency for the signed up store.
 */
function peachpay_square_currency() {
	$account = peachpay_square_connected();

	if ( ! $account ) {
		return '';
	}

	return $account['currency'];
}

/**
 * Determines if square is connected.
 */
function peachpay_square_connected() {
	return get_option( 'peachpay_connected_square_account', 0 );
}

/**
 * Gets square configuration values.
 */
function peachpay_square_config() {
	return get_option( 'peachpay_connected_square_config', 0 );
}

/**
 * Gets the square merchant id or returns an empty string if not already connected.
 */
function peachpay_square_merchant_id() {
	$account = peachpay_square_connected();

	if ( ! $account ) {
		return '';
	}

	return $account['merchant_id'];
}

/**
 * Gets Square Apple Pay domain config.
 */
function peachpay_square_get_apple_pay_config() {

	$suffix = peachpay_is_test_mode() ? '_test' : '_live';

	$config = get_option(
		'peachpay_square_apple_pay_config' . $suffix,
		array(
			'domain'       => wp_parse_url( get_site_url(), PHP_URL_HOST ),
			'registered'   => false,
			'auto_attempt' => false,
		)
	);

	return $config;
}

/**
 * Updates the Apple Pay domain registration config.
 *
 * @param array $config The Apple Pay domain config.
 */
function peachpay_square_update_apple_pay_config( $config ) {
	if ( ! $config || ! is_array( $config ) ) {
		return;
	}

	$suffix = peachpay_is_test_mode() ? '_test' : '_live';

	update_option( 'peachpay_square_apple_pay_config' . $suffix, $config );
}

/**
 * Indicates if Square Apple Pay domain is registered or now.
 */
function peachpay_square_apple_pay_domain_registered() {
	$config = peachpay_square_get_apple_pay_config();

	return $config['registered'];
}

/**
 * Attempts to automatically register the domain for Square Apple Pay.
 */
function peachpay_square_register_apple_pay_domain() {
	if ( ! peachpay_square_connected() ) {
		return;
	}

	$current_domain = wp_parse_url( get_site_url(), PHP_URL_HOST );
	$config         = peachpay_square_get_apple_pay_config();

	if ( $current_domain !== $config['domain'] ) {
		$config['domain']       = $current_domain;
		$config['registered']   = false;
		$config['auto_attempt'] = false;

		peachpay_square_update_apple_pay_config( $config );
	}

	if ( $config['registered'] || $config['auto_attempt'] ) {
		return;
	}

	$response = wp_remote_post(
		peachpay_api_url() . 'api/v1/square/applepay/verify-domain',
		array(
			'headers' => array( 'Content-Type' => 'application/json' ),
			'body'    => array(
				'domain'      => $current_domain,
				'merchant_id' => peachpay_plugin_merchant_id(),
			),
		)
	);

	$data = wp_remote_retrieve_body( $response );

	if ( is_wp_error( $data ) ) {
		$config['registered']   = false;
		$config['auto_attempt'] = true;
		peachpay_square_update_apple_pay_config( $config );
		return;
	}

	$data = json_decode( $data, true );

	if ( ! isset( $data['success'] ) || ! $data['success'] ) {
		$config['registered']   = false;
		$config['auto_attempt'] = true;
		peachpay_square_update_apple_pay_config( $config );
		return;
	}

	$config['registered']   = true;
	$config['auto_attempt'] = true;
	peachpay_square_update_apple_pay_config( $config );
}

/**
 * Gets a stripe payment capability status.
 *
 * @param string $payment_key The payment capability to retrieve a status for.
 */
function peachpay_square_capability( $payment_key ) {
	$account = peachpay_square_connected();

	if ( ! $account ) {
		return false;
	}

	if ( ! array_key_exists( 'capabilities', $account ) ) {
		return false;
	}

	$capabilities = $account['capabilities'];

	switch ( $payment_key ) {
		case 'square_card_payments':
		case 'square_google_pay_payments':
		case 'square_apple_pay_payments':
			return in_array( 'CREDIT_CARD_PROCESSING', $capabilities, true );
		default:
			return false;
	}
}

/**
 * Returns latest square connect URL from config
 */
function peachpay_square_connect_url() {
	return peachpay_get_settings_option( 'peachpay_connected_square_config', 'connect_url' );
}

/**
 * Returns the latest server square permissions version from config.
 */
function peachpay_square_permission_version() {
	return peachpay_get_settings_option( 'peachpay_connected_square_config', 'permission_version', 0 );
}


/**
 * Returns the square permissions version for the merchant.
 */
function peachpay_square_merchant_permission_version() {
	return peachpay_get_settings_option( 'peachpay_connected_square_account', 'permission_version', 0 );
}

/**
 * Gets the instance of each PeachPay Square gateway.
 */
function peachpay_square_payment_gateways() {
	$square_gateways = array();

	foreach ( WC()->payment_gateways->payment_gateways() as $gateway ) {
		if ( str_starts_with( $gateway->id, 'peachpay_square_' ) ) {
			$square_gateways[] = $gateway;
		}
	}

	// sorting the gateways so the settings order is always consistent.
	usort(
		$square_gateways,
		function( $a, $b ) {
			return $a->settings_priority - $b->settings_priority;
		}
	);

	return $square_gateways;
}

/**
 * Gets a link of the stripe order transaction id link.
 *
 * @param WC_Order $order The order object.
 */
function peachpay_square_transaction_url( $order ) {
	if ( ! $order->get_transaction_id() ) {
		return '';
	}

	if ( $order->get_meta( 'peachpay_is_test_mode' ) === 'true' || peachpay_is_staging_site() || peachpay_is_local_development_site() ) {
		return sprintf( 'https://squareupsandbox.com/dashboard/sales/transactions/%s', $order->get_transaction_id() );
	} else {
		return sprintf( 'https://squareup.com/dashboard/sales/transactions/%s', $order->get_transaction_id() );
	}
}
