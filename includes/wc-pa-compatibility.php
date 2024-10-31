<?php
/**
 * Support for the Woocommerce Product Addons Plugin
 * Plugin: https://woocommerce.com/products/product-add-ons/
 *
 * @package PeachPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adds any needed meta data to cart item if has any product addons
 *
 * @since 1.47.0
 * @param array $pp_cart_item The item to add meta details related to product addons.
 * @param array $wc_line_item   Cart Line item data.
 */
function peachpay_wcpa_add_cart_item_meta( array &$pp_cart_item, array $wc_line_item ) {
	if ( isset( $wc_line_item['addons'] ) && count( $wc_line_item['addons'] ) > 0 ) {
		$pp_cart_item['wc_addons'] = $wc_line_item['addons'];
	}
}

/**
 * Adds any needed meta data to cart item if it has any product addons
 *
 * @since 1.47.0
 * @param array      $pp_cart_item The peachpay cart line item.
 * @param WC_Product $product The woocommerce product object.
 */
function peachpay_wcpa_add_product_page_cart_item_meta( array &$pp_cart_item, WC_Product $product ) {
	// Gets available options for product.
	$pp_cart_item['wc_addons_options'] = WC_Product_Addons_Helper::get_product_addons( $product->get_id() );
}
