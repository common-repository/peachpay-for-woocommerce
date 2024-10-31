<?php
/**
 * Support for the Woocommerce-Subscriptions Plugin Actions
 * Plugin: https://woocommerce.com/products/woocommerce-subscriptions/
 *
 * @package PeachPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sets up the renewal action for PeachPay Woocommerce Subscriptions plugin support.
 *
 * @since 1.44.0
 */
function peachpay_wcs_actions() {
	add_action( 'woocommerce_scheduled_subscription_payment_peachpay', 'peachpay_wcs_scheduled_payment_peachpay', null, 2 );
}

/**
 * This is fired for every renewal that was initially paid for with peachpay.
 *
 * @since 1.44.0
 * @param float    $renewal_total The order total.
 * @param WC_Order $renewal_order The order to pay for.
 * @return void
 */
function peachpay_wcs_scheduled_payment_peachpay( float $renewal_total, WC_Order $renewal_order ) {
	$subscriptions = wcs_get_subscriptions_for_renewal_order( $renewal_order );
	$subscription  = array_pop( $subscriptions );

	$endpoint = peachpay_api_url() . 'api/v1/subscription-renewal';

	$body    = array(
		'merchant-url'  => wp_parse_url( get_site_url() )['host'],
		'merchant-name' => get_bloginfo( 'name' ),
		'amount'        => $renewal_total,
		'payment'       => array(
			'method' => 'stripe',
			'id'     => peachpay_get_stripe_order_payment_meta( $subscription->get_parent_id() ),
		),
		'wc-order'      => $renewal_order->get_data(),
	);
	$options = array(
		'headers' => array(
			'Content-Type' => 'application/json',
		),
		'body'    => wp_json_encode( $body ),
	);

	$response = wp_remote_post( $endpoint, $options );

	if ( is_wp_error( $response ) ) {
		$renewal_order->update_status( 'failed', 'Peachpay scheduled renewal payment: ' . $response->get_error_message() );
	} else {

		if ( wp_remote_retrieve_body( $response ) === 'Success' ) {
			$renewal_order->payment_complete();
		} else {
			$renewal_order->update_status( 'failed', 'Peachpay scheduled renewal payment: ' . wp_remote_retrieve_body( $response ) );
		}
	}
}

/**
 * Adds any needed meta data to a cart item if it is a subscription
 *
 * @since 1.44.0
 * @param array      $pp_cart_item The item to add meta details related to subscriptions.
 * @param WC_Product $product   The WC Product object to source details from.
 */
function peachpay_wcs_add_cart_item_meta( array &$pp_cart_item, WC_Product $product ) {
	if ( $product->get_type() === 'subscription' ) {
		$pp_cart_item['is_subscription']                  = true;
		$pp_cart_item['price']                            = ( WC_Subscriptions_Product::get_price( $product ) + WC_Subscriptions_Product::get_sign_up_fee( $product ) ) . ''; // overriding price as the subPrice+ subSignupFee.
		$pp_cart_item['subscription_price_string']        = WC_Subscriptions_Product::get_price_string( $product );
		$pp_cart_item['subscription_signup_fee']          = WC_Subscriptions_Product::get_sign_up_fee( $product );
		$pp_cart_item['subscription_price']               = WC_Subscriptions_Product::get_price( $product );
		$pp_cart_item['subscription_period']              = WC_Subscriptions_Product::get_period( $product ); // day, month, or year.
		$pp_cart_item['subscription_renewal_date']        = WC_Subscriptions_Product::get_first_renewal_payment_date( $product );
		$pp_cart_item['subscription_period_interval']     = WC_Subscriptions_Product::get_interval( $product ); // How many "periods" between billing.
		$pp_cart_item['subscription_length']              = WC_Subscriptions_Product::get_length( $product );
		$recurring_cart_key                               = WC_Subscriptions_Cart::get_recurring_cart_key( array( 'data' => $product ) );
		$pp_cart_item['subscription_shipping_method_key'] = WC_Subscriptions_Cart::get_recurring_shipping_package_key( $recurring_cart_key, 0 );
	}
}


