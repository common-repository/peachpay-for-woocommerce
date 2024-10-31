<?php
/**
 * PeachPay API Access status.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Updates the plugin api access status.
 */
function peachpay_api_key_admin_action() {
	// WooCommerce API permissions.
	if ( PeachPay_Capabilities::connected( 'woocommerce' ) ) {
		update_option( 'peachpay_valid_key', 1 );
		delete_option( 'peachpay_api_access_denied' );
	} else {
		update_option( 'peachpay_valid_key', 0 );
	}
}
add_action( 'peachpay_settings_admin_action', 'peachpay_api_key_admin_action' );
