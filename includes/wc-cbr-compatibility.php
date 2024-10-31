<?php
/**
 * Support for the Country Based Restrictions for WooCommerce
 * Plugin: https://wordpress.org/plugins/woo-product-country-base-restrictions/
 *
 * @package PeachPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Gets any needed meta data for the peachpay modal rendering of the cart item.
 *
 * @param array $pp_cart_item Peachpay cart line item.
 * @param array $wc_line_item Woocommerce Cart line item.
 */
function peachpay_cbr_add_cart_item_meta( array &$pp_cart_item, array $wc_line_item ) {
	$product = $wc_line_item['data'];

	if ( PeachPay_CBR_Product::product_has_restrictions( $product ) ) {
		$pp_cart_item['wc_country_base_restrictions'] = PeachPay_CBR_Product::product_restrictions_meta( $product );
	}
}

/**
 * No API is provided for accessing what we needed so this now exist.
 * If the plugin is public a merge request to add this interface would
 * be a good idea to prevent breaking our code if the plugin changes
 * in the future.
 */
class PeachPay_CBR_Product {

	/**
	 * Gets the restricted countries for a given wc product id.
	 *
	 * @param int $product_id The WC Product id.
	 */
	private static function product_restricted_countries( int $product_id ) {
		$countries = get_post_meta( $product_id, '_restricted_countries', true );
		if ( empty( $countries ) || ! is_array( $countries ) ) {
			$countries = array();
		}

		return $countries;
	}

	/**
	 * Gets the country restriction type for a given wc product id.
	 *
	 * @param int $product_id The WC Product id.
	 */
	private static function product_restriction_type( int $product_id ) {
		return get_post_meta( $product_id, '_fz_country_restriction_type', true );
	}

	/**
	 * Indicates if a product has any country restrictions.
	 *
	 * @param WC_Product $product The WC Product.
	 */
	public static function product_has_restrictions( WC_Product $product ) {
		return self::product_id_has_restrictions( $product->get_id() );
	}

	/**
	 * Indicates if a product id has any country restrictions.
	 *
	 * @param int $product_id The WC Product id.
	 */
	public static function product_id_has_restrictions( int $product_id ) {
		return self::product_restriction_type( $product_id ) !== 'all';
	}

	/**
	 * Gets the product restriction meta data using a product.
	 *
	 * @param WC_Product $product The WC Product.
	 */
	public static function product_restrictions_meta( WC_Product $product ) {
		return self::product_id_restrictions_meta( $product->get_id() );
	}

	/**
	 * Gets the product restriction meta data using a product id
	 *
	 * @param int $product_id The WC Product id.
	 */
	public static function product_id_restrictions_meta( int $product_id ) {
		return array(
			// Values are always 'specific', 'excluded', or 'all'.
			'type'      => self::product_restriction_type( $product_id ),
			// Country codes that are restricted using above restriction type.
			'countries' => self::product_restricted_countries( $product_id ),
		);
	}
}
