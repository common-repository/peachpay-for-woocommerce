<?php
/**
 * PeachPay purchase order gateway.
 *
 * @phpcs:disable WordPress.Security.NonceVerification.Missing
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * This class allows us to submit orders with the PeachPay Purchase Order gateway.
 */
	// phpcs:ignore
	class PeachPay_Purchase_Order_Gateway extends PeachPay_Abstract_WC_Gateway {
	/**
	 * Default constructor.
	 */
	public function __construct() {
		$this->id    = 'peachpay_purchase_order';
		$this->title = 'PeachPay (Purchase Order)';
		// This needs to be here even though it's blank. Some plugins assume
		// gateways have a description and crash if they do not.
		$this->description  = '';
		$this->has_fields   = false;
		$this->method_title = 'PeachPay (Purchase Order)';
		$this->supports     = array(
			'products',
		);
	}

	/**
	 * Processes payment for Purchase Order orders.
	 *
	 * @param int $order_id order id.
	 * @return array result.
	 */
	public function process_payment( $order_id ) {
		$order = wc_get_order( $order_id );

		if ( isset( $_POST['purchase_order_number'] ) ) {
			//phpcs:ignore
			$purchase_order_number = wc_sanitize_coupon_code( wp_unslash( $_POST['purchase_order_number'] ) );
			$order->set_transaction_id( $purchase_order_number );
			add_post_meta( $order_id, 'Purchase Order #', $purchase_order_number );
		} else {
			$order->delete( true );
			return array( 'result' => 'failure' );
		}

		// Mark on-hold for the marketplace to resolve.
		$order->update_status( 'on-hold', __( 'Awaiting Purchase Order completion.', 'woocommerce' ) );

		$order->save();

		return $this->prepare_payment_result( $order );
	}
}
