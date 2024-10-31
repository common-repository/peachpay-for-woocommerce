<?php

function peachpay_variation_name_rest( WP_REST_Request $request ) {
	return peachpay_variation_name( $request['id'] );
}

function peachpay_variation_details_rest( WP_REST_Request $request ) {
	$id      = $request['id'];
	$product = wc_get_product( $id );
	return array(
		'variation_title' => peachpay_variation_name( $id ),
		'price'           => peachpay_get_price( $product ),
		'full_wc_product' => $product->get_data(),
		'attributes'      => peachpay_variation_attributes( $id ),
	);
}

/**
 * Takes in a product ID and if that product has variations will return an array
 * of all the product's variations. If no variations exist it returns an empty
 * string.
 *
 * @param $id the product ID.
 * @return array of variation attributes including both the label and value.
 */
function peachpay_variation_attributes( $id ) {
	$variations = '';
	$product    = wc_get_product( $id );
	if ( ! $product ) {
		return '';
	}
	if ( $product instanceof WC_Product_Variation ) {
		$variations = $product->get_variation_attributes( true );
	}
	return $variations;
}

function peachpay_variation_name( $id ) {
	$product = wc_get_product( $id );
	if ( ! $product ) {
		return '';
	}
	return wc_get_formatted_variation( $product, true, false );
}

function peachpay_product_price_rest( $data ) {
	$currency = $data->get_param( 'currency' );
	$price    = peachpay_get_price( wc_get_product( $data['id'] ) );
	return peachpay_compatibility_for_currency_switchers( $price, $currency );
}

function peachpay_coupon_rest( WP_REST_Request $request ) {
	return peachpay_coupon_get_by_code( $request['code'] );
}

function peachpay_coupon_get_by_code( $code ) {
	$args    = array(
		'posts_per_page' => -1,
		'orderby'        => 'ID',
		'order'          => 'desc',
		'post_type'      => 'shop_coupon',
		'post_status'    => 'publish',
	);
	$coupons = get_posts( $args );
	foreach ( $coupons as $coupon ) {
		if ( strcasecmp( $coupon->post_title, $code ) === 0 ) {
			return ( new WC_Coupon( $coupon->ID ) )->get_data();
		}
	}
	return new WP_Error( 'no_coupon', 'This coupon does not exist.', array( 'status' => 404 ) );
}

function peachpay_validate_checkout_rest( WP_REST_Request $request ) {
	// This is needed because there was a theme which had a filter that ran upon
	// the hook `woocommerce_checkout_fields`. This also helps in preventing
	// other errors where filters try to load the cart.
	peachpay_wc_load_cart();

	include_once plugin_dir_path( __FILE__ ) . 'checkout.php';
	$checkout_validator = new peachpay_WC_Checkout();
	$errors             = new WP_Error();
	$checkout_validator->validate_posted_data( $request, $errors );
	if ( $errors->has_errors() ) {
		return $errors;
	}
}

/**
 * Returns the store's timings which the server will use to generate available
 * pickup slots.
 */
function peachpay_pickup_hours_rest() {
	 $options = get_option( 'peachpay_options' );

	return array(
		'sunday'    => array(
			'open'  => $options['Sunday_open'],
			'close' => $options['Sunday_close'],
		),
		'monday'    => array(
			'open'  => $options['Monday_open'],
			'close' => $options['Monday_close'],
		),
		'tuesday'   => array(
			'open'  => $options['Tuesday_open'],
			'close' => $options['Tuesday_close'],
		),
		'wednesday' => array(
			'open'  => $options['Wednesday_open'],
			'close' => $options['Wednesday_close'],
		),
		'thursday'  => array(
			'open'  => $options['Thursday_open'],
			'close' => $options['Thursday_close'],
		),
		'friday'    => array(
			'open'  => $options['Friday_open'],
			'close' => $options['Friday_close'],
		),
		'saturday'  => array(
			'open'  => $options['Saturday_open'],
			'close' => $options['Saturday_close'],
		),
	);
}

/**
 * Forces the cart class to load in the REST endpoints because it normally does
 * not. It also clears out the cart in case it has already been loaded.
 */
function peachpay_wc_cart_for_rest() {
	peachpay_wc_load_cart();
	WC()->cart->empty_cart();
}

function peachpay_wc_load_cart() {
	include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
	include_once WC_ABSPATH . 'includes/class-wc-cart.php';
	if ( is_null( WC()->cart ) ) {
		wc_load_cart();
	}
}

/**
 * Returns the tax information for a given location and set of products.
 */
function peachpay_tax_rest( WP_REST_Request $request ) {
	// There are hooks that echo HTML upon actions like adding to cart or applying coupons.
	// ob_start() is an output buffering hack where we buffer the output and then
	// discard it with ob_get_clean() so that we don't break the REST API by
	// outputting HTML along with the response.
	ob_start();

	// For some reason this part has to come before the cart reset, otherwise the
	// coupons will fail to save.
	$coupons = array();

	if ( isset( $request['coupons'] ) ) {
		foreach ( $request['coupons'] as $coupon_code => $amount ) {
			if ( substr( $coupon_code, 0, 9 ) === 'wc_points' ) {
				$coupon = new WC_Coupon();
				$coupon->set_code( $coupon_code );
				$coupon->set_discount_type( 'fixed_cart' );
				$coupon->set_amount( $amount );
				$coupon->save();
			}
			array_push( $coupons, $coupon_code );
		}
	}

	peachpay_wc_cart_for_rest();

	WC()->customer->set_shipping_location(
		$request['country'],
		$request['state'],
		$request['postcode'],
		$request['city']
	);

	foreach ( $request['products'] as $pp_cart_item ) {
		if ( strpos( get_site_url(), 'backpackrack.nl' ) !== false ) {
			// See comment in peachpay_shipping_options_rest. This store's prices
			// include tax, so this is okay.
			break;
		}

		// The validation added here for WC 5.2.0 doesn't allow passing in the
		// product_id as the variation_id like we have been doing
		// https://github.com/woocommerce/woocommerce/commit/918750fffbbb36974190efeeb4ae0de280756741
		// Set variation_id to the default value in this case.
		if ( $pp_cart_item['product_id'] === $pp_cart_item['variation_id'] ) {
			$pp_cart_item['variation_id'] = 0;
		}

		$extra_cart_item_data = array();
		if ( isset( $pp_cart_item['wc_addons'] ) ) {
			// This will populate the wc cart product below with any selected product addons.
			$extra_cart_item_data['addons'] = $pp_cart_item['wc_addons'];
		}

		WC()->cart->add_to_cart(
			$pp_cart_item['product_id'],
			intval( $pp_cart_item['quantity'] ),
			$pp_cart_item['variation_id'],
			array(),
			$extra_cart_item_data
		);
	}

	foreach ( $coupons as $coupon_code ) {
		WC()->cart->apply_coupon( $coupon_code );
	}

	if ( isset( $request['selectedShipping'] ) && '' !== $request['selectedShipping'] ) {
		WC()->session->set( 'chosen_shipping_methods', array( $request['selectedShipping'] ) );
	}

	WC()->cart->calculate_totals();

	$tax         = WC()->cart->get_total_tax();
	$to_currency = $request['overriddenCurrency'] ? $request['overriddenCurrency'] : null;
	$tax         = peachpay_compatibility_for_currency_switchers( $tax, $to_currency );

	ob_get_clean();

	return $tax;
}

function peachpay_compatibility_for_currency_switchers( $amount, $to_currency ) {
	if ( ! isset( $to_currency ) || '' === $to_currency ) {
		return $amount;
	}

	if ( is_plugin_active( 'currency-switcher-woocommerce/currency-switcher-woocommerce.php' ) ) {
		return peachpay_currency_switcher_woocommerce_convert( $amount, $to_currency );
	}

	if (
		is_plugin_active( 'woocommerce-jetpack/woocommerce-jetpack.php' ) ||
		is_plugin_active( 'booster-plus-for-woocommerce/booster-plus-for-woocommerce.php' ) ||
		is_plugin_active( 'booster-plus-for-woocommerce-1/booster-plus-for-woocommerce.php' )
	) {
		return peachpay_booster_for_woocommerce_currency_convert( $amount, $to_currency );
	}

	// Convert currencies using this filter going forward.
	return apply_filters( 'peachpay_convert_from_default_currency', $amount, $to_currency );
}

function peachpay_currency_switcher_woocommerce_convert( $amount, $to_currency ) {
	if ( 'yes' !== get_option( 'alg_wc_currency_switcher_enabled', 'yes' ) ) {
		return $amount;
	}

	$result                    = $amount;
	$currency_based_on_address = alg_get_current_currency_code();

	// The plugin has a switcher widget where the user can change the currency.
	// The REST API endpoint has no knowledge of their session, so we must receive
	// that data explicitly.
	if ( $to_currency !== $currency_based_on_address && '' !== $to_currency ) {
		// Undo the applied exchange rate that was incorrectly assumed.
		$result /= alg_wc_cs_get_currency_exchange_rate( $currency_based_on_address );
		// Apply the exchange rate that the customer selected on the screen.
		$result *= alg_wc_cs_get_currency_exchange_rate( $to_currency );
	}

	return round( $result, 2 );
}

function peachpay_booster_for_woocommerce_currency_convert( $amount, $to_currency ) {
	$result = $amount;
	if ( '' !== $to_currency ) {
		$result *= wcj_get_currency_exchange_rate( 'multicurrency', $to_currency );
	}
	return round( $result, 2 );
}

/**
 * Returns the shipping options for a given location and set of products.
 */
function peachpay_shipping_options_rest( WP_REST_Request $request ) {
	ob_start();

	peachpay_wc_cart_for_rest();

	$at_least_one_item_has_vendor = false;

	foreach ( $request['products'] as $product ) {
		if ( strpos( get_site_url(), 'backpackrack.nl' ) !== false ) {
			// This site has an issue where a redirect gets triggered upon adding
			// items to the cart, even though this code is called from our server.
			// It returns HTML and breaks the checkout. However, items to not
			// affect shipping cost on this site, so we can safely skip it.
			break;
		}
		// Defaulting quantity to 1 if it is invalid or set to 0 for UGOPro. Unsure if it
		// will resolve the issue but I was able to recreate the exact behavior by setting
		// the quantity to 0 for specific products.
		WC()->cart->add_to_cart( $product['variation_id'], $product['quantity'] || 1 );
		if ( isset( $product['vendor_id'] ) ) {
			$at_least_one_item_has_vendor = true;
		}
	}

	WC()->customer->set_shipping_location(
		$request['country'],
		$request['state'],
		$request['postcode'],
		$request['city']
	);

	$params = array(
		'address'  => $request['address'],
		'city'     => $request['city'],
		'state'    => $request['state'],
		'country'  => $request['country'],
		'postcode' => $request['postcode'],
	);

	if ( isset( $request['coupons'] ) ) {
		foreach ( array_keys( $request['coupons'] ) as $coupon_code ) {
			WC()->cart->apply_coupon( $coupon_code );
		}
	}

	WC()->shipping->calculate_shipping( get_shipping_packages( $params ) );
	$shipping_methods    = WC()->shipping->packages;
	$overridden_currency = $request['overriddenCurrency'] ? $request['overriddenCurrency'] : null;

	if ( $at_least_one_item_has_vendor ) {
		return peachpay_collect_vendor_shipping_options( $shipping_methods, $overridden_currency );
	}

	ob_get_clean();

	return peachpay_collect_shipping_options( $shipping_methods, $overridden_currency );
}

function peachpay_collect_vendor_shipping_options( $shipping_methods, $overridden_currency ) {
	$shipping_options_all_vendors = array();
	foreach ( $shipping_methods as $vendor_id => $vendor_shipping_method ) {
		$shipping_options = array();
		foreach ( $vendor_shipping_method['rates'] as $shipping_method ) {
			$cost = $shipping_method->cost;

			$cost = strval( round( peachpay_compatibility_for_currency_switchers( $cost, $overridden_currency ), 2 ) );

			$shipping_options[] = array(
				'method_id'    => $shipping_method->method_id,
				'method_title' => $shipping_method->label,
				'total'        => $cost,
			);
		}
		$shipping_options_all_vendors[ $vendor_id ] = $shipping_options;
	}
	return $shipping_options_all_vendors;
}

function peachpay_collect_shipping_options( $shipping_methods, $overridden_currency ) {
	$shipping_options = array();
	foreach ( $shipping_methods[0]['rates'] as $full_method_id => $shipping_method ) {
		$cost = $shipping_method->cost;

		$cost = strval( round( peachpay_compatibility_for_currency_switchers( $cost, $overridden_currency ), 2 ) );
		// we use full_method_id and not $shipping_method->method_id because the former
		// includes a "sub" ID which is necessary if there is more than one flat_rate
		// shipping, for example.
		$shipping_options[] = array(
			'method_id'    => $full_method_id,
			'method_title' => $shipping_method->label,
			'total'        => $cost,
		);
	}
	return $shipping_options;
}

function get_shipping_packages( $params ) {
	// Packages for storing "carts"
	// This was copied from somewhere and I really don't understand how this WC
	// shipping stuff works, but it has worked perfectly since the start!
	$packages                               = array();
	$packages[0]['contents']                = WC()->cart->cart_contents;
	$packages[0]['contents_cost']           = WC()->cart->get_cart_contents_total();
	$packages[0]['applied_coupons']         = WC()->session->applied_coupon;
	$packages[0]['destination']['address']  = $params['address'];
	$packages[0]['destination']['city']     = $params['city'];
	$packages[0]['destination']['state']    = $params['state'];
	$packages[0]['destination']['country']  = $params['country'];
	$packages[0]['destination']['postcode'] = $params['postcode'];
	// $packages[0]['destination']['address_2']= '';

	return apply_filters( 'woocommerce_cart_shipping_packages', $packages );
}

function peachpay_cart_fees_rest( WP_REST_Request $request ) {
	ob_start();

	peachpay_wc_cart_for_rest();

	WC()->customer->set_shipping_location(
		$request['address']['country'],
		$request['address']['state'],
		$request['address']['postcode'],
		$request['address']['city']
	);

	foreach ( $request['items'] as $item ) {
		if ( strpos( get_site_url(), 'backpackrack.nl' ) !== false ) {
			// See comment in peachpay_shipping_options_rest.
			break;
		}
		WC()->cart->add_to_cart( $item['product_id'], $item['quantity'] );
	}

	ob_get_clean();

	return WC()->cart->get_fees();
}

function peachpay_woo_discount_rules_discount_rest( WP_REST_Request $request ) {
	return peachpay_woo_discount_rules_get_discount( $request['id'] );
}

function peachpay_woo_discount_rules_get_discount( $product_id ) {
	if ( is_plugin_active( 'woo-discount-rules/woo-discount-rules.php' ) ) {
		include_once WP_PLUGIN_DIR . '/woo-discount-rules/woo-discount-rules.php';
		$manage_discount     = new Wdr\App\Controllers\ManageDiscount();
		$discount_calculator = new Wdr\App\Controllers\DiscountCalculator( $manage_discount->getDiscountRules() );
		$discount_info       = $discount_calculator->getProductPriceToDisplay( (int) $product_id, 1 );
		if ( ! isset( $discount_info['discounted_price'] ) || ( isset( $discount_info['discounted_price'] ) && ! $discount_info['discounted_price'] ) ) {
			return false;
		}
		return $discount_info['discounted_price'];
	}
	return false;
}

function peachpay_pw_wc_gift_cards_card_rest( WP_REST_Request $request ) {
	return peachpay_pw_wc_gift_cards_card( $request['card_number'] );
}

function peachpay_pw_wc_gift_cards_card( $card_number ) {
	$balance = ( new PW_Gift_Card( $card_number ) )->get_balance();
	if ( ! $balance ) {
		return new WP_Error( 'no_gift_card', 'Invalid gift card number', array( 'status' => 404 ) );
	}
	return array(
		'card_number' => $card_number,
		'balance'     => $balance,
	);
}

function peachpay_check_plugin_status() {
	return array(
		'merchantName'  => get_bloginfo( 'name' ),
		'hasValidKey'   => peachpay_has_valid_key(),
		'pluginVersion' => PEACHPAY_VERSION,
	);
}

function peachpay_cart_list() {
	 include_once WP_PLUGIN_DIR . '/peachpay-for-woocommerce/peachpay.php';
	peachpay_wc_load_cart();
	return array(
		'product_or_full_cart' => peachpay_get_cart(),
		'full_cart'            => peachpay_make_cart_from_WC_cart( WC()->cart->get_cart() ),
		'coupons'              => WC()->cart->get_coupon_discount_totals(),
	);
}

define( 'PEACHPAY_ROUTE_BASE', 'peachpay/v1' );

function peachpay_rest_api_init() {
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/tax',
		array(
			'methods'             => 'POST',
			'callback'            => 'peachpay_tax_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/shipping',
		array(
			'methods'             => 'POST',
			'callback'            => 'peachpay_shipping_options_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'cart/fees',
		array(
			'methods'             => 'POST',
			'callback'            => 'peachpay_cart_fees_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/variation',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_variation_name_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/variation/details',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_variation_details_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/product/(?P<id>\d+)/price',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_product_price_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/coupon/(?P<code>\w+)',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_coupon_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/checkout/validate',
		array(
			'methods'             => 'POST',
			'callback'            => 'peachpay_validate_checkout_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/pickup/hours',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_pickup_hours_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/woo-discount-rules/discount/product',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_woo_discount_rules_discount_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'compatibility/pw-wc-gift-cards/card/(?P<card_number>.+)',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_pw_wc_gift_cards_card_rest',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/plugin',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_check_plugin_status',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route(
		PEACHPAY_ROUTE_BASE,
		'/cart/list',
		array(
			'methods'             => 'GET',
			'callback'            => 'peachpay_cart_list',
			'permission_callback' => '__return_true',
		)
	);
}

add_action( 'rest_api_init', 'peachpay_rest_api_init' );
