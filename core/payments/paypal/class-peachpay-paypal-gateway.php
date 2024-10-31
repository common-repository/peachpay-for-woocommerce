<?php
/**
 * Stripe WC gateway.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * This class allows us to submit orders with the PeachPay PayPal gateway.
 */
class PeachPay_PayPal_Gateway extends PeachPay_Abstract_WC_Gateway {
	/**
	 * Default constructor.
	 */
	public function __construct() {
		$this->id    = 'peachpay_paypal';
		$this->title = 'PeachPay (PayPal)';
		// This needs to be here even though it's blank. Some plugins assume
		// gateways have a description and crash if they do not.
		$this->description  = '';
		$this->has_fields   = false;
		$this->method_title = 'PeachPay (PayPal)';
		$this->supports     = array(
			'products',
			'refunds',
		);
	}

	/**
	 * Handles fetching the PayPal transaction URL
	 *
	 * The woocommerce plugin fetches the url from calling this function on the payment gateway.
	 *
	 * @param order $order Order object related to transaction.
	 * @return string URL linking the transaction ID with the PayPal merchant dashboard.
	 */
	public function get_transaction_url( $order ) {
		if ( $order->get_meta( 'peachpay_is_test_mode' ) === 'true' ) {
			return sprintf( 'https://www.sandbox.paypal.com/activity/payment/%s', $order->get_transaction_id() );
		} else {
			return sprintf( 'https://www.paypal.com/activity/payment/%s', $order->get_transaction_id() );
		}
	}

	/**
	 * Process refund.
	 *
	 * If the gateway declares 'refunds' support, this will allow it to refund.
	 * a passed in amount.
	 *
	 * @param  int        $order_id Order ID.
	 * @param  float|null $amount Refund amount.
	 * @param  string     $reason Refund reason.
	 * @return boolean True or false based on success, or a WP_Error object.
	 */
	public function process_refund( $order_id, $amount = null, $reason = '' ) {
		$is_test_mode = 'true' === wc_get_order( $order_id )->get_meta( 'peachpay_is_test_mode' );
		$url          = peachpay_api_url( $is_test_mode ? 'test' : 'prod' ) . 'api/v1/paypal/refund';

		$data = array(
			'order_id'       => $order_id,
			'amount'         => $amount,
			'reason'         => $reason,
			'merchant_url'   => get_site_url(),
			'plugin_version' => PEACHPAY_VERSION,
		);

		$params = array(
			'body'    => $data,
			'timeout' => 60,
		);

		$status = wp_remote_post( $url, $params );

		if ( is_wp_error( $status ) ) {
			return false;
		}

		$response = json_decode( wp_remote_retrieve_body( $status ), true );
		$success  = false;

		if ( isset( $response['status'] ) ) {
			if ( 'ERROR' === $response['status'] ) {
				$message = 'An unknown error has occured when attempting to refund this transaction through PeachPay PayPal.';
				if ( isset( $response['message'] ) ) {
					$message = $response['message'];
				}
				return new WP_Error( $response['type'], $message );
			}
			if ( 'SUCCESS' === $response['status'] ) {
				return true;
			}
		}

		return ( $success );
	}
}
