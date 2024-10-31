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

require_once PEACHPAY_ABSPATH . 'core/admin/class-peachpay-admin-section.php';
require_once PEACHPAY_ABSPATH . 'core/traits/trait-peachpay-extension.php';

require_once PEACHPAY_ABSPATH . 'core/admin/class-peachpay-onboarding-tour.php';

/**
 * Initializer for the PeachPay analytics page.
 */
class PeachPay_Analytics {
	use PeachPay_Extension;

	/**
	 * Simple date format concats that will give the necessary format.
	 *
	 * @var array $date_format.
	 */
	public static $date_format = array(
		'all.daily'     => 'M j, Y',
		'all.weekly'    => 'M j, Y',
		'all.monthly'   => 'M Y',
		'all.yearly'    => 'Y',
		'5year.daily'   => 'M j, Y',
		'5year.weekly'  => 'M j, Y',
		'5year.monthly' => 'M Y',
		'5year.yearly'  => 'Y',
		'year.daily'    => 'M j, Y',
		'year.weekly'   => 'M j',
		'year.monthly'  => 'M',
		'year.yearly'   => 'Y',
		'month.daily'   => 'M j',
		'month.weekly'  => 'M j',
		'month.monthly' => 'M',
		'month.yearly'  => 'M Y',
		'week.daily'    => 'M j',
		'week.weekly'   => 'M j',
		'week.monthly'  => 'M',
		'week.yearly'   => 'M Y',
	);

	/**
	 * Should the extension load?
	 */
	public static function should_load() {
		return true;
	}

	/**
	 * Is the integration enabled?
	 */
	public static function enabled() {
		return true;
	}

	/**
	 * .
	 *
	 * @param boolean $enabled If the extension is enabled.
	 */
	private function includes( $enabled ) {}

	/**
	 * On plugins load.
	 *
	 * @param boolean $enabled If the extension is enabled.
	 */
	public function plugins_loaded( $enabled ) {
		// Specific analytics tabs to include.
		require_once PEACHPAY_ABSPATH . 'core/modules/analytics/class-peachpay-analytics-payment-methods.php';
		require_once PEACHPAY_ABSPATH . 'core/modules/analytics/class-peachpay-analytics-device-breakdown.php';
		require_once PEACHPAY_ABSPATH . 'core/modules/analytics/class-peachpay-analytics-abandoned-carts.php';

		PeachPay_Admin_Section::create(
			'analytics',
			array(
				new PeachPay_Analytics_Payment_Methods(),
				new PeachPay_Analytics_Device_Breakdown(),
				new PeachPay_Analytics_Abandoned_Carts(),
			),
			array(),
			false
		);

		PeachPay_Onboarding_Tour::complete_section( 'analytics' );
	}
}
PeachPay_Analytics::instance();
