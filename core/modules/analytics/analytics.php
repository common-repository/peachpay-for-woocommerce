<?php
/**
 * Handles the routing for the analytics section of the PeachPay admin panel
 *
 * @phpcs:disable WordPress.Security.NonceVerification.Recommended
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

require_once PEACHPAY_ABSPATH . 'core/modules/analytics/pages/payment-methods.php';
require_once PEACHPAY_ABSPATH . 'core/modules/analytics/pages/device-breakdown.php';

/**
 * Enqueues CSS style for the PeachPay analytics.
 *
 * @param string $hook Page level hook.
 */
function peachpay_enqueue_analytics_styles( $hook ) {
	if ( 'peachpay_page_peachpay_analytics' === $hook ) {
		wp_enqueue_style(
			'peachpay-settings',
			peachpay_url( 'core/admin/assets/css/admin.css' ),
			array(),
			peachpay_file_version( 'core/admin/assets/css/admin.css' )
		);
		wp_enqueue_style(
			'peachpay-analytics-styles',
			peachpay_url( 'core/modules/analytics/assets/css/analytics.css' ),
			array(),
			peachpay_file_version( 'core/modules/analytics/assets/css/analytics.css' )
		);
	}
}
add_action( 'admin_enqueue_scripts', 'peachpay_enqueue_analytics_styles' );

/**
 * Enqueues the chart scripts for peachpay payment analytics.
 *
 * @param string $hook Page level hook.
 */
function peachpay_enqueue_analytics_charts( $hook ) {
	if ( 'peachpay_page_peachpay_analytics' === $hook ) {
		wp_enqueue_script(
			'peachpay-analytics-charts',
			'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js',
			array(),
			peachpay_file_version( 'core/modules/analytics/analytics.php' ),
			false
		);
		wp_enqueue_script(
			'peachpay-analytics-uaparser',
			'https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.20/ua-parser.min.js',
			array(),
			peachpay_file_version( 'core/modules/analytics/analytics.php' ),
			false
		);
	}
}
add_action( 'admin_enqueue_scripts', 'peachpay_enqueue_analytics_charts' );

/**
 * Tab determining function
 */
function peachpay_analytics_page_init() {
	//phpcs:ignore
	$tab = isset( $_GET['tab'] ) ? $_GET['tab'] : 'payment_methods';
	if ( ( ( isset( $_GET['tab'] ) ) || ! isset( $_GET['tab'] ) ) && peachpay_user_role( 'administrator' ) ) {
		$plugin_capabilities = peachpay_fetch_plugin_capabilities();

		/**
		 * Allows modules/base actions to check if they should perform actions based on get parameters or based on the plugin capability.
		 *
		 * @param array $plugin_capabilities Array of capabilities the plugin currently has.
		 */
		do_action( 'peachpay_settings_admin_action', $plugin_capabilities );

		?>
			<div style='overflow-x: auto;'>
				<?php
				peachpay_analytics_nav_bar();
				if ( 'payment_methods' === $tab ) {
					peachpay_analytics_payment_methods_html();
				}
				if ( 'device_breakdown' === $tab ) {
					peachpay_analytics_device_breakdown_html();
				}
				?>
			</div>
		<?php
	}
}

/**
 * Analytics nav bar
 */
function peachpay_analytics_nav_bar() {
	//phpcs:ignore
	$tab = isset( $_GET['tab'] ) ? $_GET['tab'] : 'payment_methods';
	?>
		<div class='pp-analytics-nav-bar'>
			<span class='pp-analytics-nav-bar-logo'>
				<?php esc_html( include PEACHPAY_ABSPATH . 'core/modules/analytics/assets/svg/logo.svg' ); ?>
			</span>
			<h1 class='pp-analytics-title'>PeachPay Analytics</h1>
			<a
				href="<?php echo esc_url( add_query_arg( array( 'tab' => 'payment_methods' ), admin_url( 'admin.php?page=peachpay_analytics' ) ) ); ?>"
				class="pp-analytics-navtab <?php echo ( 'payment_methods' === $tab || ! isset( $tab ) ) ? 'pp-analytics-navtab-active' : ''; ?>"
			>
				<?php esc_html_e( 'Payment methods', 'peachpay-for-woocommerce' ); ?>
			</a>
			<a
				href="<?php echo esc_url( add_query_arg( array( 'tab' => 'device_breakdown' ), admin_url( 'admin.php?page=peachpay_analytics' ) ) ); ?>"
				class="pp-analytics-navtab <?php echo ( 'device_breakdown' === $tab || ! isset( $tab ) ) ? 'pp-analytics-navtab-active' : ''; ?>"
			>
				<?php esc_html_e( 'Device breakdown', 'peachpay-for-woocommerce' ); ?>
			</a>
		</div>
	<?php
}
