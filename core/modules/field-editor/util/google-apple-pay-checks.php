<?php
/**
 * Checks to warn merchant about no additonal fields if google pay apple pay active.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

check_no_additonal_apple_google_pay();

/**
 * Google and Apple pay do not support additonal fields so we have to warn merchants when their additonal fields will not show up with these payment options.
 */
function check_no_additonal_apple_google_pay() {
	if ( ! peachpay_get_settings_option( 'peachpay_payment_options', 'stripe_payment_request', false ) ) {
		return;
	}

	$all_fields = peachpay_all_additional_enabled_field_list();

	foreach ( $all_fields as $field ) {
		if ( ! empty( $field['field_required'] ) && 'yes' === $field['field_required'] ) {
			add_filter( 'admin_notices', 'peachpay_strong_google_apple_pay_warning' );
			return;
		}
	}
	if ( count( $all_fields ) > 0 ) {
		add_filter( 'admin_notices', 'peachpay_weak_google_apple_pay_warning' );
	}
}

/**
 * A persistent message that is not dismissable and a warning that Google/Apple pay do not support required additional fields.
 */
function peachpay_strong_google_apple_pay_warning() {
	?>
	<div class="notice notice-error">
		<p><?php echo esc_html_e( 'Apple/Google Pay through PeachPay does not support required additional fields. Shoppers will not see these fields when checking out with Apple/Google Pay.', 'peachpay-for-woocommerce' ); ?></p>
	</div>
	<?php
}

/**
 * A persistent dismissable message that lets merchants know that Apple/Google pay non required additional are not supported by Google/Apple pay.
 */
function peachpay_weak_google_apple_pay_warning() {
	?>
	<div class="notice notice-warning is-dismissible">
		<p><?php echo esc_html_e( 'Apple/Google Pay through PeachPay does not support additional fields. Shoppers will not see these fields when checking out with Apple/Google Pay.', 'peachpay-for-woocommerce' ); ?></p>
	</div>
	<?php
}

