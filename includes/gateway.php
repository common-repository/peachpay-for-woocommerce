<?php
/**
 * PeachPay Gateway.
 *
 * @package PeachPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Logs in a user and/or creates an account first if an account already exist.
 */
function peachpay_login_user() {
	if ( ! isset( $_POST['account_password'] ) || ! isset( $_POST['billing_email'] ) ) { // If password is not set then nothing left to do here.
		return false;
	}

	$email    = $_POST['billing_email'];
	$password = $_POST['account_password'];

	if ( is_user_logged_in() ) {
		unset( $_POST['account_password'] ); // Causes issues if already logged in and the password is present. Shouldn't happen but lets make sure.
		return false;
	}

	if ( email_exists( $email ) ) { // If the username/email already exist then lets log them in.

		$info = array(
			'user_login'    => $email,
			'user_password' => $password,
			'remember'      => true,
		);

		$user = wp_signon( $info, is_ssl() );

		if ( ! is_wp_error( $user ) ) {
			$id = $user->ID;

			wc_set_customer_auth_cookie( $id );
			WC()->session->set( 'reload_checkout', true );

			do_action( 'wp_login', $user->user_login, $user );

			$_REQUEST['_wpnonce'] = wp_create_nonce( 'woocommerce-process_checkout' );
		} else {
			return wp_send_json_error( 'Login Failed to existing account' );
		}

		unset( $_POST['account_password'] );
		return true;
	}

	// If it makes it here then that means a password is present and the email is not an existing account. The account will be created by order.
}

/**
 * PeachPay endpoint for creating an order.
 */
function peachpay_ajax_create_order() {
	peachpay_login_user();

	if ( WC()->cart->is_empty() ) {
		return wp_send_json_error( 'Empty cart' );
	}
	if ( ! defined( 'WOOCOMMERCE_CHECKOUT' ) ) {
		define( 'WOOCOMMERCE_CHECKOUT', true );
	}

	try {
		WC()->checkout()->process_checkout();
	} catch ( Exception $error ) {
		error_log( print_r( $error->getMessage(), true ) );
	}

	wp_die();
}

/**
 * Adds the peachpay gateway class to wc.
 *
 * @param Array $gateways The gateway array.
 * @return Array
 */
function peachpay_add_gateway_class( $gateways ) {
	$gateways[] = 'WC_PeachPay_Gateway';
	return $gateways;
}
add_filter( 'woocommerce_payment_gateways', 'peachpay_add_gateway_class' );

/**
 * Intilizes the PeachPay Gateway class.
 */
function peachpay_init_gateway_class() {

	/**
	 * PeachPay Gateway class
	 */
	class WC_PeachPay_Gateway extends WC_Payment_Gateway {

		/**
		 * Default constructor.
		 */
		public function __construct() {
			$this->id    = 'peachpay';
			$this->title = 'PeachPay';
			// This needs to be here even though it's blank.
			$this->description        = '';
			$this->has_fields         = false;
			$this->method_title       = 'PeachPay';
			$this->method_description = 'PeachPay enables one-click checkout on your store. For now, please use the other <a href="/wp-admin/admin.php?page=peachpay">PeachPay settings</a>';
			// Gateways can support subscriptions, refunds, saved payment methods,
			// for now handle simple payments only.
			$this->supports = array(
				'products',
				'subscriptions',
				'subscription_cancellation',
				'subscription_suspension',
				'subscription_reactivation',
				'subscription_amount_changes',
				'subscription_date_changes',
				'refunds',
				// 'subscription_payment_method_change',
				// 'subscription_payment_method_change_customer',
				// 'subscription_payment_method_change_admin',
				// 'multiple_subscriptions'
			);
		}

		/**
		 * Unused.
		 */
		public function init_form_fields() {        }

		/**
		 * Unused.
		 */
		public function payment_fields() {      }

		/**
		 * Unused.
		 */
		public function payment_scripts() {         }

		/**
		 * Unused.
		 */
		public function validate_fields() {
			// The way we have it set up right now, where we don't use process payment
			// below but rather handle it through our server entirely, we have to validate
			// the address before this step anyway, so at this point it should be valid.
			return true;
		}

		/**
		 *
		 */
		public function process_payment( $order_id ) {
			global $woocommerce;
			$order = wc_get_order( $order_id );

			if ( ! should_place_order_before_payment() ) {
				// Payment is processed first in older versions of the plugin,
				// so by this point the payment must have completed successfully.
				$order->payment_complete();
			}

			return array(
				'result'   => 'success',
				'redirect' => $this->get_return_url( $order ),
				'number'   => $order->get_order_number(),
				'orderID'  => $order_id,
				'details'  => $order->get_data(),
			);
		}

		/**
		 * Unused.
		 */
		public function webhook() {         }

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
			$url = peachpay_api_url() . 'api/v1/refund';

			$data = array (
				'order_id' => $order_id,
				'amount'   => $amount,
				'reason'   => $reason,
				'merchant_url' => get_site_url(),
			);
			$params = array(
				'body'   => $data,
				'timeout' => 60,
			);
			$status = wp_remote_post( $url, $params );

			if ( is_wp_error( $status ) ) {
				return false;
			}

			$response = wp_remote_retrieve_body( $status );
			
			return (filter_var($response,FILTER_VALIDATE_BOOLEAN));
		}
	}
}
add_action( 'plugins_loaded', 'peachpay_init_gateway_class' );

/**
 * Compares versions to determine if orders should be placed before payment.
 *
 * @return boolean
 */
function should_place_order_before_payment() {
	return version_compare( PEACHPAY_VERSION, '1.41.0', '>=' );
}


