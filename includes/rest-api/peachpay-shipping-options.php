<?php
/**
 * Rest-API for Peachpay Shipping
 *
 * @package PeachPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Rest API endpoint for gathering shipping options for a given location and set of products.
 *
 * @param WP_REST_Request $request The ajax request object.
 */
function peachpay_shipping_options_rest( WP_REST_Request $request ) {
	ob_start();

	$pp_cart                      = $request['products'];
	$at_least_one_item_has_vendor = false;

	peachpay_rebuild_wc_cart( $pp_cart );

	if ( wc_notice_count( 'error' ) > 0 && ! peachpay_is_site( 'skregear.com' ) ) {
		ob_get_clean();
		return wc_get_notices(); // Indicate something went wrong.
	}

	// Vendor shipping support.
	foreach ( $pp_cart as $pp_line_item ) {
		if ( isset( $pp_line_item['vendor_id'] ) ) {
			$at_least_one_item_has_vendor = true;
			break;
		}
	}

	WC()->customer->set_shipping_location(
		$request['country'],
		$request['state'],
		$request['postcode'],
		$request['city']
	);

	$params = array(
		'address'  => $request['address'],
		'city'     => $request['city'],
		'state'    => $request['state'],
		'country'  => $request['country'],
		'postcode' => $request['postcode'],
	);

	if ( isset( $request['coupons'] ) ) {
		foreach ( array_keys( $request['coupons'] ) as $coupon_code ) {
			WC()->cart->apply_coupon( $coupon_code );
		}
	}

	$calculated_packages = WC()->shipping->calculate_shipping( get_shipping_packages( $params ) );
	$overridden_currency = $request['overriddenCurrency'] ? $request['overriddenCurrency'] : null;

	if ( $at_least_one_item_has_vendor ) {
		ob_get_clean();
		return peachpay_collect_vendor_shipping_options( $calculated_packages, $overridden_currency );
	}

	ob_get_clean();
	return peachpay_collect_shipping_options( $calculated_packages, $overridden_currency );
}

/**
 * Collects shipping options for a store with multiple vendors.
 *
 * @param array  $calculated_packages The packages array with each package having a calculated "rate" key.
 * @param string $overridden_currency The current overridden currency code.
 */
function peachpay_collect_vendor_shipping_options( $calculated_packages, $overridden_currency ) {
	$shipping_options_all_vendors = array();
	foreach ( $calculated_packages as $package_key => $package ) {
		$shipping_options = array();
		foreach ( $package['rates'] as $shipping_method ) {
			$cost = $shipping_method->cost;

			$cost = strval( round( peachpay_compatibility_for_currency_switchers( $cost, $overridden_currency ), 2 ) );

			$shipping_options[] = array(
				'method_id'    => $shipping_method->method_id,
				'method_title' => $shipping_method->label,
				'total'        => $cost,
			);
		}

		$shipping_options_all_vendors[ $package_key ] = $shipping_options;
	}
	return $shipping_options_all_vendors;
}

/**
 * Collects shipping options to choose from.
 *
 * @param array  $calculated_packages The packages array with each package having a calculated "rate" key.
 * @param string $overridden_currency The current overridden currency code.
 */
function peachpay_collect_shipping_options( $calculated_packages, $overridden_currency ) {
	$shipping_options = array();
	foreach ( $calculated_packages[0]['rates'] as $full_method_id => $shipping_method ) {
		$cost = $shipping_method->cost;

		$cost = strval( round( peachpay_compatibility_for_currency_switchers( $cost, $overridden_currency ), 2 ) );
		// we use full_method_id and not $shipping_method->method_id because the former
		// includes a "sub" ID which is necessary if there is more than one flat_rate
		// shipping, for example.
		$shipping_options[] = array(
			'method_id'    => $full_method_id,
			'method_title' => $shipping_method->label,
			'total'        => $cost,
		);
	}
	return $shipping_options;
}

/**
 * Gets and filters the shipping packages.
 *
 * @param array $params The address info for shipping.
 */
function get_shipping_packages( $params ) {
	// Packages for storing "carts"
	// This was copied from somewhere and I really don't understand how this WC
	// shipping stuff works, but it has worked perfectly since the start!
	$packages                               = array();
	$packages[0]['contents']                = WC()->cart->cart_contents;
	$packages[0]['contents_cost']           = WC()->cart->get_cart_contents_total();
	$packages[0]['applied_coupons']         = WC()->session->applied_coupon;
	$packages[0]['destination']['address']  = $params['address'];
	$packages[0]['destination']['city']     = $params['city'];
	$packages[0]['destination']['state']    = $params['state'];
	$packages[0]['destination']['country']  = $params['country'];
	$packages[0]['destination']['postcode'] = $params['postcode'];

	return apply_filters( 'woocommerce_cart_shipping_packages', $packages );
}
