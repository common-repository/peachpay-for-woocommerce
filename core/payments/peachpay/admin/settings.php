<?php
/**
 * PeachPay payment settings.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * PeachPay provider admin settings.
 */
function peachpay_provider_admin_settings_section() {
	add_settings_field(
		'peachpay_provider_settings',
		__( 'PeachPay', 'peachpay-for-woocommerce' ),
		'peachpay_provider_setting_section',
		'peachpay',
		'peachpay_section_payment',
		array( 'class' => 'pp-header' )
	);
}
add_action( 'peachpay_admin_add_payment_setting_section', 'peachpay_provider_admin_settings_section' );

/**
 * Renders the purchase order settings sections
 */
function peachpay_provider_setting_section() {
	?>
	<div id="peachpay" class="peachpay peachpay-setting-section">
		<div>
			<div class='row'>
				<div class="col-3" style="text-align: center;">
					<span style="width: 100%; display:inline-flex; border-radius: 0.3rem; justify-content: center;">
						<?php get_peachpay_logo_primary_peach_svg(); ?>
					</span>
				</div>
			</div>
		</div>
		<div>
			<?php
				$gateway_list = peachpay_provider_gateways(
					array(
						'peachpay_purchase_order',
					),
				);
				require PeachPay::get_plugin_path() . '/core/admin/views/html-gateways.php';
			?>
		</div>
	</div>
	<?php
}
