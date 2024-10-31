<?php

require_once plugin_dir_path( __FILE__ ) . 'settings-general.php';
require_once plugin_dir_path( __FILE__ ) . 'settings-payment.php';
require_once plugin_dir_path( __FILE__ ) . 'settings-button.php';

define(
	'LANGUAGES_LOOKUP',
	array(
		'de-DE' => 'Deutsch',
		'en-US' => 'English (US)',
		'es-ES' => 'Español',
		'fr'    => 'Français',
		'it'    => 'Italiano',
		'ro-RO' => 'Română',
	)
);

define(
	'LANGUAGES',
	array(
		'Auto - ' . LANGUAGES_LOOKUP[ peachpay_default_language() ] => peachpay_default_language(),
		'Deutsch'      => 'de-DE',
		'English (US)' => 'en-US',
		'Español'      => 'es-ES',
		'Français'     => 'fr',
		'Italiano'     => 'it',
		'Română'       => 'ro-RO',
	)
);

/**
 * Loads the CSS for the button preview
 */
function enqueue_button_style( $hook ) {
	if ( 'toplevel_page_peachpay' !== $hook ) {
		return;
	}
	wp_enqueue_style(
		'peachpay.css',
		plugin_dir_url( __DIR__ ). 'css/peachpay.css',
		array(),
		peachpay_file_version( 'css/peachpay.css' )
	);
}
add_action('admin_enqueue_scripts','enqueue_button_style');

/**
 * Loads admin-settings.js for button preview
 */
function enqueue_button_js( $hook ) {
	if ( 'toplevel_page_peachpay' !== $hook ) {
		return;
	}
	wp_enqueue_script(
		'admin-settings.js',
		plugin_dir_url(__DIR__). 'js/admin-settings.js',
		array(),
		peachpay_file_version('js/admin-settings.js')
	);
}
add_action('admin_enqueue_scripts','enqueue_button_js');

/**
 * We have to use this instead of the null coalescing operator (??) due to
 * compatibility requirements for WooCommerce Marketplace.
 *
 * @param string $name The name of the option in the PeachPay settings.
 * @return mixed|false Returns false if the option does not exist; otherwise
 * returns the option.
 */
function peachpay_get_option( $name ) {
	$options = get_option( 'peachpay_options' );
	return isset( $options[ $name ] ) ? $options[ $name ] : false;
}

function peachpay_settings_init() {
	register_setting( 'peachpay', 'peachpay_options' );
	peachpay_settings_general();
	peachpay_settings_payment();
	peachpay_settings_button();
}
add_action( 'admin_init', 'peachpay_settings_init' );

function peachpay_options_page() {
	add_menu_page(
		'PeachPay settings',
		'PeachPay',
		'read',
		'peachpay',
		'peachpay_options_page_html',
		'dashicons-cart',
		56
	);
}
add_action( 'admin_menu', 'peachpay_options_page' );

/**
 * Get Unlink Merchant Paypal Status
 */
function peachpay_unlink_paypal_request() {
	$merchant_hostname = wp_parse_url( get_site_url(), PHP_URL_HOST );
	$response = wp_remote_get( peachpay_api_url() . 'api/v1/paypal/merchant/unlink?merchantHostname=' . $merchant_hostname );

	if ( is_wp_error( $response ) ) {
		return 0;
	}
	$body = wp_remote_retrieve_body( $response );
	$data = json_decode( $body, true );

	if ( is_wp_error( $data ) ) {
		return 0;
	}
	return $data['unlink_success'];
}

/**
 * Unlink merchant PayPal Account
 */
function peachpay_unlink_paypal() {
	if ( peachpay_unlink_paypal_request() ) {
		update_option( 'peachpay_paypal_signup', false );
		$options = get_option( 'peachpay_options' );
		$options['paypal'] = 0;
		update_option( 'peachpay_options', $options );
		add_settings_error( 'peachpay_messages', 'peachpay_message', __( 'You have successfully unlinked your PayPal account. Please revoke the API permissions in your PayPal account settings as well.', 'peachpay' ), 'success' );
	} else {
		add_settings_error( 'peachpay_messages', 'peachpay_message', __( 'Unable to unlink PayPal account. Please try again or contact us if you need help.', 'peachpay' ), 'error' );
	}
}

function peachpay_options_page_html() {
	if ( ! current_user_can( 'read' ) ) {
		return;
	}

	if ( isset( $_GET['paypal'] ) ) {
		$signup = $_GET['paypal'];
		if ( 'success' === $signup ) {
			update_option( 'peachpay_paypal_signup', true );
			add_settings_error( 'peachpay_messages', 'peachpay_message', __( 'You have successfully connected your PayPal account.', 'peachpay' ), 'success' );
		}
	}

	if ( isset( $_GET['stripe_connect_success'] ) ) {
		if ( 'true' === $_GET['stripe_connect_success'] ) {
			add_settings_error( 'peachpay_messages', 'peachpay_message', __( 'You have successfully connected your Stripe account.', 'peachpay' ), 'success' );
		}
	}

	if ( ! peachpay_get_option( 'test_mode' ) ) {
		if ( $account = peachpay_fetch_connected_stripe_account() ) {
			add_user_meta( get_current_user_id(), 'peachpay_notice_dismissed', 'true', true );
			update_option( 'peachpay_valid_key', true );
			update_option( 'peachpay_connected_stripe_account', $account );
		} else {
			update_option( 'peachpay_valid_key', false );
			delete_option( 'peachpay_connected_stripe_account' );
		}
	}

	// Check if the user has submitted the settings.
	// WordPress will add the "settings-updated" $_GET parameter to the url
	if ( isset( $_GET['settings-updated'] ) ) {
		add_settings_error( 'peachpay_messages', 'peachpay_message', __( 'Success! Your settings have been saved.', 'peachpay' ), 'success' );
	}

	if ( isset( $_GET['unlink_paypal'] ) ) {
		peachpay_unlink_paypal();
	}

	// Show error/success messages
	settings_errors( 'peachpay_messages' );
	?>
	<div class="wrap">
		<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		<form action="options.php" method="post">
			<?php
			// output security fields for the registered setting "peachpay"
			settings_fields( 'peachpay' );

			// output setting sections and their fields
			// (sections are registered for "peachpay", each field is registered to a specific section)
			do_settings_sections( 'peachpay' );

			// output save settings button
			submit_button( 'Save settings' );
			?>
		</form>
	</div>
	<?php
}

function peachpay_fetch_connected_stripe_account() {
	$args = array(
		'body'        => array( 'domain' => get_site_url() ),
		'httpversion' => '2.0',
		'blocking'    => true,
	);

	$response = wp_remote_post( peachpay_api_url() . 'api/v1/plugin/auth', $args );

	if ( is_wp_error( $response ) ) {
		add_settings_error( 'peachpay_messages', 'peachpay_message', __( 'Something went wrong while trying to validate your plugin activation status.', 'peachpay' ), 'error' );
		return false;
	}

	if ( 200 !== $response['response']['code'] ) {
		return false;
	}

	$body = wp_remote_retrieve_body( $response );
	return json_decode( $body, true );
}

/**
 * Adds the "Settings" link for PeachPay in the list of installed plugins.
 *
 * @param array $links
 * @return array
 */
function peachpay_add_settings_link( $links ) {
	$settings_link = '<a href="admin.php?page=peachpay">' . __( 'Settings' ) . '</a>';
	array_unshift( $links, $settings_link );
	return $links;
}

function peachpay_default_language() {
	return peachpay_wp_lang_to_ours( get_bloginfo( 'language' ) );
}

function peachpay_wp_lang_to_ours( $wp_lang_code ) {
	switch ( $wp_lang_code ) {
		case 'de-AT':
		case 'de-DE':
		case 'de-CH':
			return 'de-DE';
		case 'es':
		case 'es-MX':
		case 'es-AR':
		case 'es-CL':
		case 'es-PE':
		case 'es-PR':
		case 'es-GT':
		case 'es-CO':
		case 'es-EC':
		case 'es-VE':
		case 'es-UY':
		case 'es-CR':
			return 'es-ES';
		case 'fr-BE':
		case 'fr-CA':
		case 'fr-FR':
			return 'fr';
		case 'it-IT':
			return 'it';
		case 'ro-RO':
			return 'ro-RO';
		default:
			return 'en-US';
	}
}
