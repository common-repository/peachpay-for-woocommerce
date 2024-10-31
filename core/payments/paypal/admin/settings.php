<?php
/**
 * PeachPay PayPal payment settings.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

require_once PEACHPAY_ABSPATH . 'core/payments/payment-threshold.php';

/**
 * PeachPay Stripe admin settings.
 *
 * @param string $current The key of the current payment section tab.
 */
function peachpay_paypal_admin_settings_section( $current ) {
	$class = 'pp-header pp-sub-nav-paypal';
	if ( 'pp-sub-nav-paypal' !== $current ) {
		$class .= ' hide';
	}
	add_settings_field(
		'peachpay_paypal_setting',
		peachpay_build_section_header( __( 'PayPal', 'peachpay-for-woocommerce' ), 'https://youtu.be/3yHFi0A3Jw8' ),
		'peachpay_paypal_setting_section',
		'peachpay',
		'peachpay_payment_settings_section',
		array( 'class' => $class )
	);
}

add_action( 'peachpay_admin_add_payment_setting_section', 'peachpay_paypal_admin_settings_section' );

/**
 * Renders the paypal settings section.
 */
function peachpay_paypal_setting_section() {    ?>
	<div class="peachpay-setting-section">
		<div>
			<div class="pp-pm-main">
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<?php
					peachpay_field_paypal_cb();

					peachpay_admin_input(
						'paypal-enable',
						'peachpay_payment_options',
						'paypal',
						1,
						__( 'Show PayPal in the checkout window', 'peachpay-for-woocommerce' ),
						'',
						array(
							'input_type' => 'checkbox',
							'disabled'   => ! peachpay_is_test_mode() && ! get_option( 'peachpay_paypal_signup' ),
						)
					);
					?>
					<?php do_action( 'peachpay_paypal_extra_settings' ); ?>
				</div>
				<div class="pp-pm-right-col">
					<?php peachpay_render_min_max_section( 'paypal' ); ?>
				</div>
			</div>
			<div class="pp-save-button-section">
				<?php submit_button( 'Save changes', 'pp-button-primary' ); ?>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Renders the PayPal signup link or connected PayPal account info.
 */
function peachpay_field_paypal_cb() {
	?>
	<div>
		<?php
		$paypal_merchant_id = '';
		if ( get_option( 'peachpay_paypal_signup' ) ) {
			$paypal_merchant_id = peachpay_get_paypal_merchant_id();
		}

		if ( get_option( 'peachpay_paypal_signup' ) ) {
			?>
			<p>
				<span class="dashicons dashicons-yes-alt"></span> <?php esc_html_e( "You've successfully connected your PayPal account with Merchant ID", 'peachpay-for-woocommerce' ); ?>&nbsp<b><?php echo esc_html( $paypal_merchant_id ); ?></b>
			</p>
			<br>
			<a class="button pp-button-unlink" href="?page=peachpay&tab=payment&unlink_paypal"><?php esc_html_e( 'Unlink PayPal', 'peachpay-for-woocommerce' ); ?></a>
			<?php
		} else {
			?>
			<a href="<?php echo esc_url( peachpay_paypal_signup_url() ); ?>" title="PayPal" target="_blank">
				<img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-150px.png" alt="PayPal Logo" width="150" height="38">
				<div style="margin-top: 0.5rem;">
					<?php esc_html_e( 'Connect your PayPal business account to start accepting payments through PayPal', 'peachpay-for-woocommerce' ); ?>
				</div>
			</a>
			<?php
		}

		?>
	</div>
	<?php
}
