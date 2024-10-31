<?php
/**
 * PeachPay Payment Threshold UI Functions.
 *
 * @deprecated
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/** Returns the transaction min/max cart total for the given payment method.
 *
 * @param string $payment_method   the payment method of which to return the transaction min/max.
 *
 * @deprecated
 */
function peachpay_get_transaction_thresholds( $payment_method ) {
	$options    = array( 'pm_min', 'pm_max', 'merchant_min', 'merchant_max', 'default_currency' );
	$thresholds = array();
	foreach ( $options as $option ) {
		$value                 = peachpay_get_settings_option( 'peachpay_payment_options', $payment_method . '_' . $option );
		$thresholds[ $option ] = $value;
	}
	return $thresholds;
}
