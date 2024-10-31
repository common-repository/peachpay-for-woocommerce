<?php

function peachpay_settings_general() {
	add_settings_section(
		'peachpay_section_general',
		__( 'General', 'peachpay' ),
		'peachpay_section_general_cb',
		'peachpay'
	);

	// WordPress has magic interaction with the following keys: label_for, class.
	// - the "label_for" key value is used for the "for" attribute of the <label>.
	// - the "class" key value is used for the "class" attribute of the <tr> containing the field.
	// Note: you can add custom key value pairs to be used inside your callbacks.

	add_settings_field(
		'peachpay_field_language',
		__( 'Language', 'peachpay' ),
		'peachpay_field_language_cb',
		'peachpay',
		'peachpay_section_general',
		array( 'label_for' => 'peachpay_language' )
	);

	add_settings_field(
		'peachpay_field_enable_coupons',
		__( 'Coupons', 'peachpay' ),
		'peachpay_field_enable_coupons_cb',
		'peachpay',
		'peachpay_section_general',
		array( 'label_for' => 'peachpay_enable_coupons' )
	);

	add_settings_field(
		'peachpay_field_test_mode',
		__( 'Stripe test mode', 'peachpay' ),
		'peachpay_field_test_mode_cb',
		'peachpay',
		'peachpay_section_general',
		array( 'label_for' => 'peachpay_test_mode' )
	);
}

function peachpay_section_general_cb() {
	?>
	<div class="notice notice-info">
		<p>Questions? We are happy to help! Email us at <a href="mailto:support@peachpay.app">support@peachpay.app</a> or leave a message in the <a href="https://wordpress.org/support/plugin/peachpay-for-woocommerce/">support forum</a></p>
	</div>
	<?php
}

function peachpay_field_language_cb() {
	$options = get_option( 'peachpay_options' );
	?>
	<select
		id="peachpay_language"
		name="peachpay_options[language]">
		<?php foreach ( LANGUAGES as $language => $value ) { ?>
			<option
				value="<?php echo esc_attr( $value ); ?>"
				<?php echo isset( $options['language'] ) ? ( selected( $options['language'], $value, false ) ) : ( '' ); ?>
			>
				<?php echo esc_html( $language ); ?>
			</option>
		<?php } ?>
	</select>
	<p class="description">This will change the language on the button and in the checkout flow.</p>
	<?php
}

function peachpay_field_enable_coupons_cb() {
	?>
	<input
		id="peachpay_enable_coupons"
		name="peachpay_options[enable_coupons]"
		type="checkbox"
		value="1"
		<?php checked( 1, peachpay_get_option( 'enable_coupons' ), true ); ?>
	>
	<label for="peachpay_enable_coupons">Enable coupons</label>
	<p class="description">Allow customers to enter coupon codes inside the checkout window.</p>
	<?php
}

function peachpay_field_test_mode_cb() {
	?>
	<input
		id="peachpay_test_mode"
		name="peachpay_options[test_mode]"
		type="checkbox"
		value="1"
		<?php checked( 1, peachpay_get_option( 'test_mode' ), true ); ?>
	>
	<label for="peachpay_test_mode">Enable test mode</label>
	<p class="description">Test mode allows you to make purchases using the <b>4242 4242 4242 4242</b> test card, with expiration <b>04/24</b> and CVC <b>444</b>. This helps you see how PeachPay works on your store. You do not need to connect a Stripe account to use test mode.
	<?php
}
