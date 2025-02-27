<?php
/**
 * Sets up and defines the PeachPay rest api for calculating the cart details.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

const PP_SELECTED_SHIPPING = 'selected_shipping';
const PP_SHIPPING_LOCATION = 'shipping_location';

/**
 * Collects the request information and validates it.
 */
function peachpay_collect_cart_request_info() {

	// phpcs:disable
	if ( ! isset( $_POST['order'] ) ) {
		return null;
	}

	$order = $_POST['order'];

	if ( ! isset( $_POST['order'][ PP_SHIPPING_LOCATION ] )
		|| ! isset( $_POST['order'][ PP_SHIPPING_LOCATION ]['country'] )
		|| '' === $_POST['order'][ PP_SHIPPING_LOCATION ]['country']
		) {
		return null;
	}

	if ( ! isset( $_POST['order'][ PP_SELECTED_SHIPPING ] ) ) {
		$order[ PP_SELECTED_SHIPPING ] = array();
	}

	return $order;
}

/**
 * Returns all details needed to represent the current woocommerce cart in the peachpay modal.
 */
function peachpay_cart_calculation_rest_api() {
	try {
		$order_info = peachpay_collect_cart_request_info();

		$response = peachpay_cart_calculation( $order_info );

		wp_send_json( $response );

	} catch ( Exception $error ) {

		wp_send_json(
			array(
				'success'       => false,
				'error_message' => $error->getMessage(),
				'notices'       => wc_get_notices(),
			)
		);
	}

	wp_die();
}


