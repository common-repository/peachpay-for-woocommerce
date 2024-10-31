<?php
/**
 * PeachPay Square payment settings.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

require_once PEACHPAY_ABSPATH . 'core/payments/payment-threshold.php';

/**
 * PeachPay Square admin settings.
 */
function peachpay_square_admin_settings_section() {
	peachpay_square_register_apple_pay_domain();

	add_settings_field(
		'peachpay_square_setting',
		__( 'Square', 'peachpay-for-woocommerce' ),
		'peachpay_square_setting_section',
		'peachpay',
		'peachpay_section_payment',
		array( 'class' => 'pp-header' )
	);
}
add_action( 'peachpay_admin_add_payment_setting_section', 'peachpay_square_admin_settings_section' );

/**
 * Renders the square settings sections
 */
function peachpay_square_setting_section() {
	?>
	<div id="square" class="peachpay peachpay-setting-section">
		<div>
			<?php
			require PeachPay::get_plugin_path() . '/core/payments/square/admin/views/html-square-connect.php';
			?>
		</div>
		<div>
			<?php
			$gateway_list = peachpay_square_payment_gateways();
			require PeachPay::get_plugin_path() . '/core/admin/views/html-gateways.php';
			?>
		</div>
	<?php
}
