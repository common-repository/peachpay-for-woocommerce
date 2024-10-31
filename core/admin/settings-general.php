<?php
/**
 * PeachPay General Settings.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * Calls the functions that implement the subsections under General preferences.
 */
function peachpay_settings_general() {
	peachpay_settings_general_main();
	peachpay_general_section_message();
	peachpay_general_section_product();
	peachpay_general_section_field_editor();
}

/**
 * Registers general settings options.
 */
function peachpay_settings_general_main() {
	add_settings_section(
		'peachpay_section_general',
		'',
		'peachpay_feedback_cb',
		'peachpay'
	);

	// WordPress has magic interaction with the following keys: label_for, class.
	// - the "label_for" key value is used for the "for" attribute of the <label>.
	// - the "class" key value is used for the "class" attribute of the <tr> containing the field.
	// Note: you can add custom key value pairs to be used inside your callbacks.

	add_settings_field(
		'peachpay_general_appearance_field',
		peachpay_build_section_header( __( 'General', 'peachpay-for-woocommerce' ), 'https://youtu.be/K6jWDBVEyCU' ),
		'peachpay_general_appearance',
		'peachpay',
		'peachpay_section_general',
		array( 'class' => 'pp-header' )
	);
}

/**
 * Render all general setting fields which includes:
 * language selection options, enabling order notes, support message setting HTML, data retention option.
 */
function peachpay_general_appearance() {
	$options = get_option( 'peachpay_general_options' );

	?>
	<div class="peachpay-setting-section">
		<div>
			<h3><?php esc_html_e( 'Language', 'peachpay-for-woocommerce' ); ?></h3>
			<select
				id="peachpay_language"
				name="peachpay_general_options[language]">
				<?php foreach ( LANGUAGE_TO_LOCALE as $language => $value ) { ?>
					<option
						value="<?php echo esc_attr( $value ); ?>"
						<?php echo isset( $options['language'] ) ? ( selected( $options['language'], $value, false ) ) : ( '' ); ?>
					>
						<?php echo esc_html( $language ); ?>
					</option>
				<?php } ?>
			</select>
			<p class="description"><?php esc_html_e( 'This will change the language on the button and in the checkout flow. Use the option', 'peachpay-for-woocommerce' ); ?>&nbsp<strong><?php esc_html_e( 'Detect from page', 'peachpay-for-woocommerce' ); ?></strong>&nbsp<?php esc_html_e( 'if you are using a language switcher plugin.', 'peachpay-for-woocommerce' ); ?></p>
		</div>
		<div>
		<?php
		peachpay_admin_input(
			'peachpay_enable_order_notes',
			'peachpay_general_options',
			'enable_order_notes',
			1,
			__( 'Enable order notes', 'peachpay-for-woocommerce' ),
			__( 'Allow customers to enter order notes inside the checkout window.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);

		peachpay_admin_input(
			'peachpay_data_retention',
			'peachpay_general_options',
			'data_retention',
			1,
			__( 'Remove data on uninstall', 'peachpay-for-woocommerce' ),
			__( 'PeachPay settings and data will be removed if the plugin is uninstalled.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);
		?>
		</div>
		<div>
			<?php peachpay_render_merchant_logo_field(); ?>
		</div>
		<div class="pp-save-button-section">
			<?php submit_button( 'Save changes', 'pp-button-primary' ); ?>
		</div>
	</div>
	<?php
}

/**
 * Renders the merchant logo field input.
 */
function peachpay_render_merchant_logo_field() {
	$merchant_logo_id  = peachpay_get_merchant_logo_id();
	$merchant_logo_src = peachpay_get_merchant_logo_src();

	$img_field_value = null === $merchant_logo_id ? '' : $merchant_logo_id;

	$img_src   = null === $merchant_logo_src ? '' : $merchant_logo_src;
	$img_class = null === $merchant_logo_src ? 'hide' : '';

	?>
	<h3><?php esc_html_e( 'Merchant logo', 'peachpay-for-woocommerce' ); ?></h3>
	<p class="description"><?php esc_html_e( 'Add your logo at the top of the checkout window.', 'peachpay-for-woocommerce' ); ?></p>
	<input id="pp-merchant-logo-img-field" type="hidden" name="peachpay_general_options[merchant_logo]" value="<?php echo esc_attr( $img_field_value ); ?>">
	<div style="display: inline-flex; vertical-align: top; line-height: 1;">
		<img id="pp-merchant-logo-img" class="<?php echo esc_attr( $img_class ); ?>" src="<?php echo esc_url( $img_src ); ?>"  height="100px"/>
		<span id="pp-merchant-logo-remove" class="<?php echo esc_attr( $img_class ); ?> pp-delete-field" style="margin-left: 0.5rem; margin-top: -0.5rem;">×</span>
	</div>
	<div></div>
	<button id="pp-merchant-logo-select" type="button" class="button pp-button-secondary" style="margin-top: 1rem;">
		<?php esc_html_e( 'Choose image', 'peachpay-for-woocommerce' ); ?>
	</button>
	<?php
}

/**
 * Renders the fields for editing the support message shown at checkout.
 */
function peachpay_general_section_message() {
	add_settings_section(
		'peachpay_section_message',
		'',
		null,
		'peachpay'
	);

	add_settings_field(
		'peachpay_support_message_section',
		peachpay_build_section_header( __( 'Support message', 'peachpay-for-woocommerce' ), 'https://youtu.be/i_QLzpUJJjc' ),
		'peachpay_support_message',
		'peachpay',
		'peachpay_section_message',
		array( 'class' => 'pp-header' )
	);
}

/**
 * Render support message settings fields for:
 * editing support messsage and selecting how support message is displayed (inline/hover or tap)
 */
function peachpay_support_message() {
	$message_types = array(
		'inline',
		'hover/tap',
	);

	$options = get_option( 'peachpay_general_options' );
	if ( ! isset( $options['support_message_type'] ) ) {
		peachpay_set_settings_option( 'peachpay_general_options', 'support_message_type', 'inline' );

		if ( isset( $options['support_message'] ) && '' !== $options['support_message'] ) {
			peachpay_set_settings_option( 'peachpay_general_options', 'enable_store_support_message', true );
		} else {
			peachpay_set_settings_option( 'peachpay_general_options', 'enable_store_support_message', false );
		}
	}

	?>
	<div class="peachpay-setting-section">
		<?php
		peachpay_admin_input(
			'peachpay_enable_store_support_message',
			'peachpay_general_options',
			'enable_store_support_message',
			1,
			__( 'Enable support message', 'peachpay-for-woocommerce' ),
			__( 'Show customers a custom message on the checkout payment page.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);
		?>
		<div>
			<h3><?php esc_html_e( 'Type', 'peachpay-for-woocommerce' ); ?></h3>
			<select
				id="peachpay_support_message_type"
				name="peachpay_general_options[support_message_type]">
				<?php foreach ( $message_types as $value ) { ?>
					<option
						value="<?php echo esc_attr( $value ); ?>"
						<?php echo isset( $options['language'] ) ? ( selected( peachpay_get_settings_option( 'peachpay_general_options', 'support_message_type', 'inline' ), $value, false ) ) : ( '' ); ?>
					>
						<?php echo esc_html( $value ); ?>
					</option>
				<?php } ?>
			</select>
			<p class="description"><?php esc_html_e( 'Displays the support message', 'peachpay-for-woocommerce' ); ?>&nbsp<strong><?php esc_html_e( 'inline', 'peachpay-for-woocommerce' ); ?>&nbsp</strong><?php esc_html_e( 'or as a', 'peachpay-for-woocommerce' ); ?>&nbsp<strong><?php esc_html_e( 'hover/tap', 'peachpay-for-woocommerce' ); ?></strong>&nbsp<?php esc_html_e( 'button in the PeachPay checkout.', 'peachpay-for-woocommerce' ); ?></p>
		</div>
		<div>
			<?php
			peachpay_field_support_message_cb()
			?>
		</div>
		<div class="pp-save-button-section">
			<?php submit_button( 'Save changes', 'pp-button-primary' ); ?>
		</div>
	</div>
	<?php
}

/**
 * Renders the Support message setting HTML.
 */
function peachpay_field_support_message_cb() {
	?>
	<h3>Text</h3>
	<textarea id="peachpay-support-message" name="peachpay_general_options[support_message]" style="width: 400px; min-height: 200px;"><?php echo esc_html( peachpay_get_settings_option( 'peachpay_general_options', 'support_message' ) ); ?></textarea>
	<p class="description">
		<?php esc_html_e( 'This additional messaging will be shown on the checkout payment page. Only a, br, h1, h2, h3, h4, h5, p, div, li, ul, ol, span, and img HTML tags are permitted.', 'peachpay-for-woocommerce' ); ?>
	</p>
	<?php
}

/**
 * Adds the fields for toggling product images and quantiy changer
 */
function peachpay_general_section_product() {
	add_settings_section(
		'peachpay_section_product',
		'',
		null,
		'peachpay'
	);

	add_settings_field(
		'peachpay_order_summary_section',
		peachpay_build_section_header( __( 'Order summary', 'peachpay-for-woocommerce' ), 'https://youtu.be/eNlQ541WlxA' ),
		'peachpay_order_summary',
		'peachpay',
		'peachpay_section_product',
		array( 'class' => 'pp-header' )
	);
}

/**
 * Render order summary settings fields which includes:
 * Hiding product images, disabling in modal quantity changer.
 */
function peachpay_order_summary() {
	?>
	<div class="peachpay-setting-section">
		<?php
		peachpay_admin_input(
			'peachpay_product_images',
			'peachpay_general_options',
			'display_product_images',
			1,
			__( 'Display product images', 'peachpay-for-woocommerce' ),
			__( 'Display product images in the checkout window.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);

		peachpay_admin_input(
			'peachpay_quantity_toggle',
			'peachpay_general_options',
			'enable_quantity_changer',
			1,
			__( 'Enable quantity changer', 'peachpay-for-woocommerce' ),
			__( 'Display the quantity changer next to items in the checkout window order summary.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);
		?>
		<div class="pp-save-button-section">
			<?php submit_button( 'Save changes', 'pp-button-primary' ); ?>
		</div>
	</div>
	<?php
}

/**
 * Adds the fields for general checkout field settings.
 */
function peachpay_general_section_field_editor() {
	add_settings_section(
		'peachpay_section_field',
		'',
		null,
		'peachpay'
	);

	add_settings_field(
		'peachpay_field_editor_section',
		peachpay_build_section_header( __( 'Checkout fields', 'peachpay-for-woocommerce' ), 'https://youtu.be/S-oYexkeaog' ),
		'peachpay_field_editor_general',
		'peachpay',
		'peachpay_section_field',
		array( 'class' => 'pp-header' )
	);
}

/**
 * Render checkout field settings.
 */
function peachpay_field_editor_general() {
	?>
	<div class="peachpay-setting-section">
		<?php
		peachpay_admin_input(
			'peachpay_enable_preset_virtual_product_fields',
			'peachpay_general_options',
			'enable_virtual_product_fields',
			1,
			__( 'Hide the shipping/billing fields for virtual products', 'peachpay-for-woocommerce' ),
			__( 'If the cart only consists of virtual products, don\'t show the shipping/billing address fields.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);

		peachpay_admin_input(
			'peachpay_address_autocomplete',
			'peachpay_general_options',
			'address_autocomplete',
			1,
			__( 'Google Maps address autocomplete', 'peachpay-for-woocommerce' ),
			__( 'When a shopper starts typing the street address, they will get autocomplete suggestions.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);

		peachpay_admin_input(
			'peachpay_wc_locale_rule',
			'peachpay_general_options',
			'use_wc_country_locale',
			1,
			__( 'Enable country locale rules', 'peachpay-for-woocommerce' ),
			__( 'By default, PeachPay will follow the WooCommerce rules for when to show postal codes, province fields, etc.', 'peachpay-for-woocommerce' ),
			array( 'input_type' => 'checkbox' )
		);

		?>
		<div class="pp-save-button-section">
			<?php submit_button( 'Save changes', 'pp-button-primary' ); ?>
		</div>
	</div>
	<?php
}

/**
 * Help add our support videos to the actual settings pages so people can first checkout a video and if they need more help they can reach out.
 *
 * @param string $video the video url.
 * @param string $center style attribute contents.
 */
function peachpay_build_video_help_section( $video, $center = '' ) {
	$escaped_video = esc_html( $video );
	$video_svg     = esc_url( peachpay_url( 'core/admin/assets/img/video.svg' ) );
	$video_text    = __( 'Watch tutorial', 'peachpay-for-woocommerce' );

	return "
		<div class='peachpay'>
			<div class='help-container' style='$center'>
				<a href='$escaped_video' target='__blank' class='help-link'>
					<div class='tutorial-button'>
						<img
						src='$video_svg'
						class='help-video-img'
						>
						<p class='tutorial-text' style='padding-left: 5px !important;'>
							$video_text
						</p>
					</div>
				</a>
			</div>
		</div>
	";
}

/**
 * Make the header for the section
 *
 * @param String $title the section title.
 * @param String $video the video url.
 */
function peachpay_build_section_header( $title, $video = null ) {
	if ( is_null( $video ) ) {
		$video_html = '';
	} else {
		$video_html = peachpay_build_video_help_section( $video );
	}

	return "
		<div class='pp-section-header'>
			$title
			$video_html
		</div>
	";
}
