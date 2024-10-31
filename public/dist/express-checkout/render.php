<?php
/**
 * PeachPay express checkout button block renderer.
 *
 * @package PeachPay
 */

defined( 'PEACHPAY_ABSPATH' ) || exit;

if ( isset( WC()->cart ) && '' !== WC()->cart && is_array( WC()->cart->cart_contents ) && count( WC()->cart->cart_contents ) ) {
    require_once PEACHPAY_ABSPATH . 'core/modules/express-checkout/functions.php';
    /**
	 * Perform action before the PeachPay express checkout button is rendered on the checkout page.
	 */
	do_action( 'pp_checkout_before_checkout_page_button_html' );

	//PHPCS:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo pp_checkout_button_template(
		apply_filters(
			'pp_checkout_checkout_page_button_args',
			array(
				'text'                            => peachpay_get_settings_option( 'peachpay_express_checkout_button', 'peachpay_button_text', __( 'Express Checkout', 'peachpay-for-woocommerce' ) ),
				'text_color'                      => peachpay_get_settings_option( 'peachpay_express_checkout_branding', 'button_text_color', PEACHPAY_DEFAULT_TEXT_COLOR ),
				'background_color'                => peachpay_get_settings_option( 'peachpay_express_checkout_branding', 'button_color', PEACHPAY_DEFAULT_BACKGROUND_COLOR ),
				'icon_class'                      => peachpay_get_settings_option( 'peachpay_express_checkout_button', 'button_icon', '' ),
				'effect_class'                    => peachpay_get_settings_option( 'peachpay_express_checkout_button', 'button_effect', 'none' ),
				'border_radius'                   => intval( peachpay_get_settings_option( 'peachpay_express_checkout_button', 'button_border_radius', 5 ) ),
				'width'                           => intval( peachpay_get_settings_option( 'peachpay_express_checkout_button', 'button_width_checkout_page', 220 ) ),
				'custom_styles'                   => 'margin: 0 auto 8px;',

				'display_available_payment_icons' => false,

				'header_text'                     => peachpay_get_settings_option( 'peachpay_express_checkout_button', 'checkout_header_text', '' ),
				'additional_text'                 => peachpay_get_settings_option( 'peachpay_express_checkout_button', 'checkout_subtext_text', '' ),

				'custom_attributes'               => array(
					'href' => pp_checkout_permalink(),
				),
			)
		)
	);

	/**
	 * Perform action after the PeachPay express checkout button is rendered on the checkout page.
	 */
	do_action( 'pp_checkout_after_checkout_page_button_html' );
}
