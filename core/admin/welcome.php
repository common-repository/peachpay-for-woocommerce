<?php
/**
 * This file handles the PeachPay welcome page that shows after the plugin is
 * activated for the first time.
 *
 * @phpcs:disable WordPress.Security.NonceVerification.Recommended
 *
 * @package PeachPay
 */

add_action( 'admin_menu', 'peachpay_register_welcome_page' );
add_action( 'admin_init', 'peachpay_welcome_next_steps' );

/**
 * Add a page (but on the menu) that we can use for the welcome page.
 */
function peachpay_register_welcome_page() {
	add_submenu_page(
		null,
		'Welcome to PeachPay',
		'Welcome to PeachPay',
		'administrator',
		'peachpay-welcome',
		'peachpay_welcome_page_html'
	);
}

/**
 * Trigger the onboarding flow.
 *
 * @param string $plugin The name of the plugin being activated.
 */
function peachpay_show_welcome_page( $plugin ) {
	if ( PEACHPAY_BASENAME !== $plugin ) {
		// Because we run this on the activated_plugin hook, it fires
		// when any plugin is activated, not just ours. Exit if not ours.
		return;
	}

	// If the merchant has already given us WC API permissions, then we will
	// assume they have accepted the usage tracking disclaimer.
	if ( peachpay_has_valid_key() ) {
		update_option( 'peachpay_api_access_denied', false );
		return;
	}

	if ( ! get_option( 'peachpay_answered_usage_tracking' ) ) {
		wp_safe_redirect( admin_url( 'admin.php?page=peachpay-welcome' ) );
		exit();
	}

	peachpay_ask_for_wc_permission();
}

/**
 * Output the welcome page template.
 */
function peachpay_welcome_page_html() {
	$track_usage_url = admin_url( 'admin.php?page=peachpay-welcome&peachpay_track_usage=' );
	?>
	<style>
		.notice-container {
			background-color: white;
			border-radius: 0.75rem;
			line-height: 1.15;
			margin: 25px 25px 20px 10px;
			padding: 10rem;
		}
	</style>
	<div class="notice-container">
		<h1><?php esc_html_e( 'Build a better checkout & payment experience with PeachPay' ); ?></h1>
		<p><?php esc_html_e( 'Get improved features and faster fixes by sharing non-sensitive data via' ); ?> <a href="https://peachpay.app/privacy" target="_blank"><?php esc_html_e( 'usage tracking' ); ?></a> <?php echo esc_html_e( 'that shows us how you’re using PeachPay. No personal data is tracked or stored.' ); ?></p>
		<a
			class="button"
			href="<?php echo esc_url( $track_usage_url . 0 ); ?>">
			<?php esc_html_e( 'No thanks' ); ?>
		</a>
		<a
			class="button button-primary"
			href="<?php echo esc_url( $track_usage_url . 1 ); ?>">
			<?php esc_html_e( 'I want better support' ); ?>
		</a>
	</div>
	<?php
}

/**
 * Record the merchant's response to the usage tracking question.
 */
function peachpay_welcome_next_steps() {
	if ( ! isset( $_GET['peachpay_track_usage'] ) ) {
		return;
	}

	update_option( 'peachpay_answered_usage_tracking', 1 );

	if ( '1' === $_GET['peachpay_track_usage'] ) {
		update_option( 'peachpay_track_usage', 1 );
	} else {
		update_option( 'peachpay_track_usage', 0 );
	}

	peachpay_ask_for_wc_permission();
}
