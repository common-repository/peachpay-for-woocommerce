<?php
/**
 * Support for the YayCurrency Plugin
 * Plugin: https://wordpress.org/plugins/yaycurrency/
 *
 * @package PeachPay
 */

use Yay_Currency\WooCommerceCurrency;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function yc_calculate_price( float $price, string $to_currency ) {
	$obj            = WooCommerceCurrency::getInstance();
	$apply_currency = $obj->get_currency_by_id( yc_get_currency_id( $to_currency ) );

	if ( 'percentage' === $apply_currency['fee']['type'] ) {
		$rate_after_fee = (float) $apply_currency['rate'] + ( (float) $apply_currency['rate'] * ( (float) $apply_currency['fee']['value'] / 100 ) );
	} else {
		$rate_after_fee = (float) $apply_currency['rate'] + (float) $apply_currency['fee']['value'];
	}
	$price = ( (float) $price * $rate_after_fee );

	if ( 'disabled' !== $apply_currency['roundingType'] ) {

		$rounding_type   = $apply_currency['roundingType'];
		$rounding_value  = $apply_currency['roundingValue'];
		$subtract_amount = $apply_currency['subtractAmount'];

		switch ( $rounding_type ) {
			case 'up':
				$price = ceil( $price / $rounding_value ) * $rounding_value - $subtract_amount;
				return $price;
			case 'down':
				$price = floor( $price / $rounding_value ) * $rounding_value - $subtract_amount;
				return $price;
			case 'nearest':
				$price = round( $price / $rounding_value ) * $rounding_value - $subtract_amount;
				return $price;
			default:
				return;
		}
	}
	return $price;
}

function yc_get_currency_id( string $currency_code ) {
	$obj        = WooCommerceCurrency::getInstance();
	$currencies = $obj->get_currencies_post_type();

	if ( $currencies ) {
		foreach ( $currencies as $currency ) {
			if ( $currency->post_title === $currency_code ) {
				return $currency->ID;
			}
		}
	}

	return 0;
}

/**
 * Transforms values from default currency to a different currency
 *
 * @param float  $amount .
 * @param string $to_currency .
 * */
function peachpay_currency_switcher_yaycurrency_convert( float $amount, string $to_currency ) {
	return yc_calculate_price( $amount, $to_currency );
}
