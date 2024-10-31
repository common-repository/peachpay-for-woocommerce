<?php
/**
 * Rest-API for Peachpay Tax
 *
 * @package PeachPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Returns the tax information for a given location and set of products.
 *
 * @param WP_REST_Request $request RestAPI object.
 */
function peachpay_tax_rest( WP_REST_Request $request ) {
	// There are hooks that echo HTML upon actions like adding to cart or applying coupons.
	// ob_start() is an output buffering hack where we buffer the output and then
	// discard it with ob_get_clean() so that we don't break the REST API by
	// outputting HTML along with the response.
	ob_start();

	// For some reason this part has to come before the cart reset, otherwise the
	// coupons will fail to save.
	$coupons = array();

	if ( isset( $request['coupons'] ) ) {
		foreach ( $request['coupons'] as $coupon_code => $amount ) {
			if ( substr( $coupon_code, 0, 9 ) === 'wc_points' ) {
				$coupon = new WC_Coupon();
				$coupon->set_code( $coupon_code );
				$coupon->set_discount_type( 'fixed_cart' );
				$coupon->set_amount( $amount );
				$coupon->save();
			}
			array_push( $coupons, $coupon_code );
		}
	}

	peachpay_rebuild_wc_cart(
		$request['products'],
		array(
			'country'  => $request['country'],
			'state'    => $request['state'],
			'postcode' => $request['postcode'],
			'city'     => $request['city'],
		)
	);

	if ( wc_notice_count( 'error' ) > 0 && ! peachpay_is_site( 'skregear.com' ) ) {
		ob_get_clean();
		return wc_get_notices(); // Indicate something went wrong.
	}

	foreach ( $coupons as $coupon_code ) {
		WC()->cart->apply_coupon( $coupon_code );
	}

	if ( isset( $request['selectedShipping'] ) && '' !== $request['selectedShipping'] ) {
		WC()->session->set( 'chosen_shipping_methods', array( $request['selectedShipping'] ) );
	}

	WC()->cart->calculate_totals();

	$tax         = WC()->cart->get_total_tax();
	$to_currency = $request['overriddenCurrency'] ? $request['overriddenCurrency'] : null;
	$tax         = peachpay_compatibility_for_currency_switchers( $tax, $to_currency );

	ob_get_clean();
	return $tax;
}
