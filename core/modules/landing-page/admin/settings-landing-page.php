<?php
/**
 * Settings Section for PeachPay landing page that allows products to be linked to the landing site.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * New settings section for landing page.
 */
function peachpay_settings_landing_page() {
	add_settings_section(
		'peachpay_landing_page',
		'',
		'',
		'peachpay',
		'peachpay_section_landing_page'
	);

	add_settings_section(
		'',
		'',
		'peachpay_feedback_cb',
		'peachpay',
		'peachpay_section_landing_page'
	);

	if ( ! peachpay_get_settings_option( 'peachpay_landing_page', 'key', null ) ) {
		add_settings_field(
			'peachpay_landing_page_socials',
			__( 'Store details', 'peachpay-for-woocommerce' ),
			'peachpay_unregistered_landing',
			'peachpay',
			'peachpay_landing_page',
			array( 'class' => 'pp-header' )
		);
		return;
	}

	add_settings_field(
		'peachpay_landing_page_socials',
		__( 'Store details', 'peachpay-for-woocommerce' ),
		'peachpay_landing_page_details_section',
		'peachpay',
		'peachpay_landing_page',
		array( 'class' => 'pp-header' )
	);

	add_settings_field(
		'peachpay_landing_page_active_product',
		__( 'Active products', 'peachpay-for-woocommerce' ),
		'peachpay_landing_page_active_product_section',
		'peachpay',
		'peachpay_landing_page',
		array( 'class' => 'pp-header' )
	);

	add_settings_field(
		'peachpay_landing_page_add_product',
		__( 'Add products', 'peachpay-for-woocommerce' ),
		'peachpay_landing_page_add_product_section',
		'peachpay',
		'peachpay_landing_page',
		array( 'class' => 'pp-header' )
	);
}

/**
 * The landing page section for editing social media links.
 */
function peachpay_landing_page_details_section() {
	?>
	<div class="peachpay-setting-section landing-page">
		<h3>
			<?php echo esc_html_e( 'Store identifier' ); ?>
		</h3>
		<p>
			<?php echo esc_html( peachpay_get_settings_option( 'peachpay_landing_page', 'store_name' ) ); ?>
		</p>
		<h3>
			<?php echo esc_html_e( 'Landing page URL' ); ?>
		</h3>
		<a 
			href=<?php echo esc_html( ( peachpay_is_local_development_site() ? 'https://headless.peachpay.local/merchant/' : 'https://fast.peachpay.app/merchant' ) . peachpay_get_settings_option( 'peachpay_landing_page', 'store_name' ) ); ?>
			target="_blank"
		>
			<?php echo esc_html( ( peachpay_is_local_development_site() ? 'https://headless.peachpay.local/merchant/' : 'https://fast.peachpay.app/merchant' ) . peachpay_get_settings_option( 'peachpay_landing_page', 'store_name' ) ); ?>
		</a>
		<h3>
			<?php echo esc_html_e( 'Store key' ); ?>
		</h3>
		<input
			type='password'
			id="landingKey"
			name='peachpay_landing_page[key]'
			value = <?php echo esc_html( peachpay_get_settings_option( 'peachpay_landing_page', 'key', false ) ); ?>
			readonly
		>
		<input
			type="hidden"
			id="store_name"
			name="peachpay_landing_page[store_name]"
			value=<?php echo esc_html( peachpay_get_settings_option( 'peachpay_landing_page', 'store_name' ) ); ?>
		>
	</div>
	<?php
}

/**
 * If a store is not registered let them register or link.
 */
function peachpay_unregistered_landing() {
	?>
	<p style="padding-bottom:5px">
		<?php echo esc_html_e( 'To build your landing page, please enter a short identifier that will be used in the URL of the landing page. Don’t use capital letters or spaces.', 'peachpay' ); ?>
	<p>
	<input
	id="store_slug"
	name="peachpay_landing_page[store_name]"
	pattern="(^[^\sA-Z]*)([a-z0-9]+)$"
	>
	</input>
	<input
		type="button"
		id='peachpay-register-landing'
		class='pp-button-primary'
		value=<?php echo esc_html_e( 'Register', 'peachpay' ); ?>
	>
	</input>
	<input
	type='hidden'
	id='landing_page_key'
	name='peachpay_landing_page[key]'
	value=<?php esc_html( peachpay_get_settings_option( 'peachpay_landing_page', 'key', null ) ); ?>
	>
	<input
		type='hidden'
		value=<?php echo esc_html( get_home_url() ); ?>
		id='site_url'
	>
	<input
		type="submit"
		id="hidden_submit"
		class="hide"
	>
	<input
	type="hidden"
	id="store_name"
	value="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>"
	>
	<?php
}

/**
 * Active product section we will leave pretty empty and fill with calls to peachpay landing api.
 */
function peachpay_landing_page_active_product_section() {
	?>
	<div class="peachpay-setting-section pp-load">
		<div id="active_product_container">
		</div>
		<div class='ppModal' id='pp-landing-modal'>

		</div>
	</div>
	<?php
}

/**
 * Allow users to specify new products to add to their store.
 */
function peachpay_landing_page_add_product_section() {
	?>
	<div class="peachpay-setting-section landing-page">
		<select
			id="pp_landing_page_add"
			data-security="<?php echo esc_attr( wp_create_nonce( 'search-products' ) ); ?>" 
			style="width: 300px;" 
			class="pp-display-product-search"
			name="peachpay_landing_page[new_products][]"
			multiple="multiple"
		>
		</select>
		<p class="description">
			<?php echo esc_html_e( "Add products to your landing page (variable products must have variations configured for it to work properly)" ); ?>
		</p>
		<?php submit_button( 'Add prodcuts', 'pp-button-primary' ); ?>
	</div>
	<?php
}

add_action( 'admin_enqueue_scripts', 'peachpay_enqueue_landing_page_script' );

/**
 * Enqueues scripts for landing page admin.
 *
 * @param string $hook the current page name.
 */
function peachpay_enqueue_landing_page_script( $hook ) {
	if ( 'toplevel_page_peachpay' !== $hook ) {
		return;
	}

	wp_enqueue_script(
		'pp_landing_page',
		peachpay_url( 'core/modules/landing-page/admin/js/landing-page.js' ),
		array(),
		peachpay_file_version( 'core/modules/landing-page/admin/js/landing-page.js' ),
		true
	);

	wp_localize_script(
		'pp_landing_page',
		'pp_landing_data',
		array(
			'URL' => peachpay_is_local_development_site() ? 'https://headless.peachpay.local' : 'https://fast.peachpay.app',
		)
	);
}

add_action( 'admin_enqueue_scripts', 'peachpay_enqueue_landing_page_style' );

/**
 * Enque a stylesheet for landing page section.
 *
 * @param string $hook the current page name.
 */
function peachpay_enqueue_landing_page_style( $hook ) {
	if ( 'toplevel_page_peachpay' !== $hook ) {
		return;
	}
	wp_enqueue_style(
		'pp_landing_style',
		plugin_dir_url( __FILE__ ) . 'style/landing-page.css',
		array(),
		true
	);
}
