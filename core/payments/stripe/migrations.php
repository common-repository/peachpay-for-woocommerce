<?php
/**
 * PeachPay stripe Migrations.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * After introducing the "Enable Stripe" checkbox, we will need to automatically
 * check this box for any merchant who is upgrading from an older version of the
 * plugin.
 */
function peachpay_migrate_enable_stripe_checkbox() {
	if ( get_option( 'peachpay_migrated_to_enable_stripe_checkbox' ) ) {
		return;
	}

	if ( ! peachpay_stripe_connected() ) {
		update_option( 'peachpay_migrated_to_enable_stripe_checkbox', 1 );
		return;
	}

	if ( ! is_array( get_option( 'peachpay_payment_options' ) ) ) {
		update_option( 'peachpay_payment_options', array() );
	}

	peachpay_set_settings_option( 'peachpay_payment_options', 'enable_stripe', 1 );

	update_option( 'peachpay_migrated_to_enable_stripe_checkbox', 1 );
}


// Migrations should run immediately
peachpay_migrate_enable_stripe_checkbox();
