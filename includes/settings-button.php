<?php

function peachpay_settings_button() {
	peachpay_button_section_overall();
	peachpay_button_section_product_page();
	peachpay_button_section_cart_page();
}

function peachpay_button_section_overall() {
	add_settings_section(
		'peachpay_section_button',
		__( 'Button preferences', 'peachpay' ),
		null,
		'peachpay'
	);

	add_settings_field(
		'peachpay_field_button_color',
		__( 'Color', 'peachpay' ),
		'peachpay_field_button_color_cb',
		'peachpay',
		'peachpay_section_button',
		array( 'label_for' => 'peachpay_button_color' )
	);

	add_settings_field(
		'peachpay_button_text',
		__( 'Text', 'peachpay' ),
		'peachpay_field_button_text_cb',
		'peachpay',
		'peachpay_section_button',
		array( 'label_for' => 'peachpay_button_text' )
	);

	add_settings_field(
		'peachpay_field_button_sheen',
		__( 'Shine', 'peachpay' ),
		'peachpay_field_button_sheen_cb',
		'peachpay',
		'peachpay_section_button',
		array( 'label_for' => 'peachpay_button_sheen' )
	);

	add_settings_field(
		'peachpay_field_hide_on_product_page',
		__( 'Hide on product page', 'peachpay' ),
		'peachpay_field_hide_on_product_page_cb',
		'peachpay',
		'peachpay_section_button',
		array( 'label_for' => 'peachpay_hide_on_product_page' )
	);
}

function peachpay_field_button_color_cb() {
	$options = get_option( 'peachpay_options' );
	?>
	<input
		id='peachpay_button_color'
		name='peachpay_options[button_color]'
		type='color'
		value='<?php echo esc_attr( $options ? $options['button_color'] : '#FF876C' ); ?>'
		style='width: 75px'
		list='presets'
	/>
	<datalist id="presets">
		<option>#FF876C</option>
		<option>#ff8ba8</option>
		<option>#ff4d39</option>
		<option>#5cab5e</option>
		<option>#0286e7</option>
		<option>#af57ec</option>
		<option>#111111</option>
	</datalist>
	<?php
}

function peachpay_field_button_text_cb() {
	?>
	<input
		id="peachpay_button_text"
		name="peachpay_options[peachpay_button_text]"
		type="text"
		value='<?php echo esc_attr( peachpay_get_option( 'peachpay_button_text' ) ); ?>'
		style='width: 300px'
	>
	<p class="description">Customize the text of the PeachPay button. Leaving it blank defaults it to "Express checkout" in your chosen language.</p>
	<?php
}

function peachpay_field_button_sheen_cb() {
	?>
	<input
		id="peachpay_button_sheen"
		name="peachpay_options[button_sheen]"
		type="checkbox"
		value="1"
		<?php checked( 1, peachpay_get_option( 'button_sheen' ), true ); ?>
	>
	<label for='peachpay_button_sheen'>Turn off button shine</label>
	<?php
}

function peachpay_field_hide_on_product_page_cb() {
	?>
	<input
		id="peachpay_hide_on_product_page"
		name="peachpay_options[hide_on_product_page]"
		type="checkbox"
		value="1"
		<?php checked( 1, peachpay_get_option( 'hide_on_product_page' ), true ); ?>
	>
	<label for='peachpay_hide_on_product_page'>Don’t show the PeachPay button on individual product pages</label>
	<?php
}

function peachpay_button_section_product_page() {
	add_settings_section(
		'peachpay_product_page_button',
		__( 'Product page', 'peachpay' ),
		null,
		'peachpay'
	);

	add_settings_field(
		'peachpay_field_product_button_position',
		'Position',
		'peachpay_field_button_position_cb',
		'peachpay',
		'peachpay_product_page_button',
		array(
			'label_for' => 'product_button_position',
			'key'       => 'product_button_position',
		)
	);

	add_settings_field(
		'peachpay_field_button_width_product_page',
		'Width',
		'peachpay_field_button_width_cb',
		'peachpay',
		'peachpay_product_page_button',
		array(
			'label_for' => 'button_width_product_page',
			'key'       => 'button_width_product_page',
		)
	);

	add_settings_field(
		'peachpay_field_button_preview',
		'Preview',
		'peachpay_field_product_button_preview_cb',
		'peachpay',
		'peachpay_product_page_button',
		array( 'label_for' => 'peachpay_field_button_preview' )
	);
}

function peachpay_field_button_position_cb( $args ) {
	$options                = get_option( 'peachpay_options' );
	$key                    = $args['key'];
	$positions_product_page = array(
		'Left'   => 'left',
		'Right'  => 'right',
		'Full'   => 'full',
		'Center' => 'center',
	);
	$positions_cart_page    = array(
		'Full'   => 'full',
		'Left'   => 'left',
		'Right'  => 'right',
		'Center' => 'center',
	);
	$positions              = 'cart_button_position' === $key ? $positions_cart_page : $positions_product_page;
	?>
	<select
		id="<?php echo esc_attr( $key ); ?>"
		name="peachpay_options[<?php echo esc_attr( $key ); ?>]">
		<?php foreach ( $positions as $position => $value ) { ?>
			<option
				value="<?php echo esc_attr( $value ); ?>"
				<?php echo isset( $options[ $key ] ) ? ( selected( $options[ $key ], $value, false ) ) : ( '' ); ?>
			>
				<?php echo esc_html( $position ); ?>
			</option>
		<?php } ?>
	</select>
	<?php
}

function peachpay_field_button_width_cb( $args ) {
	$options  = get_option( 'peachpay_options' );
	$key      = $args['key'];
	$page     = 'button_width_cart_page' === $key ? 'cart' : 'product';
	$disabled = peachpay_get_option( $page . '_button_position' ) !== 'full' ? '' : 'disabled';

	// If the hidden field is not here then the second time the form is saved
	// while the field is set to "full" the value is lost because disabled
	// inputs are not submitted.
	if ( $disabled ) {
		?>
		<input
			id="<?php echo esc_attr( $key ); ?>"
			name="peachpay_options[<?php echo esc_attr( $key ); ?>]"
			type="hidden"
			value="<?php echo esc_attr( ( $options && $options[ $key ] ) ? $options[ $key ] : 220 ); ?>"
		>
		<?php
	}

	?>
		<input
			id="<?php echo esc_attr( $key ); ?>"
			name="peachpay_options[<?php echo esc_attr( $key ); ?>]"
			type="number"
			value="<?php echo esc_attr( ( $options && $options[ $key ] ) ? $options[ $key ] : 220 ); ?>"
			style="width: 75px" <?php echo $disabled; ?>
		> px
	<?php
}

function peachpay_field_product_button_preview_cb() {
	$options     = get_option( 'peachpay_options' );
	$button_text = ( isset( $options['peachpay_button_text'] ) && $options['peachpay_button_text'] !== '' ) ? $options['peachpay_button_text'] : peachpay_get_button_text();
	?>
		<div id="pp-button-container" class="pp-button-container margin-0">
			<button
				id="pp-button-product" class="pp-button" type="button"
				style='--button-color:<?php echo esc_attr( $options ? $options['button_color'] : '#ffa500' ); ?>'>
				<div id="pp-button-content">
					<span id="pp-button-text"> <?php echo $button_text; ?> </span>
				</div>
			</button>
		</div>
	<?php
}

function peachpay_button_section_cart_page() {
	add_settings_section(
		'peachpay_cart_page_button',
		__( 'Cart page', 'peachpay' ),
		null,
		'peachpay'
	);

	add_settings_field(
		'peachpay_field_cart_button_position',
		'Position',
		'peachpay_field_button_position_cb',
		'peachpay',
		'peachpay_cart_page_button',
		array(
			'label_for' => 'cart_button_position',
			'key'       => 'cart_button_position',
		)
	);

	add_settings_field(
		'peachpay_field_button_width_cart_page',
		'Width',
		'peachpay_field_button_width_cb',
		'peachpay',
		'peachpay_cart_page_button',
		array(
			'label_for' => 'button_width_cart_page',
			'key'       => 'button_width_cart_page',
		)
	);

	add_settings_field(
		'peachpay_field_button_preview',
		'Preview',
		'peachpay_field_cart_button_preview_cb',
		'peachpay',
		'peachpay_cart_page_button',
		array( 'label_for' => 'peachpay_field_button_preview' )
	);
}

function peachpay_field_cart_button_preview_cb() {
	$options     = get_option( 'peachpay_options' );
	$button_text = ( isset( $options['peachpay_button_text'] ) && $options['peachpay_button_text'] !== '' ) ? $options['peachpay_button_text'] : peachpay_get_button_text();
	?>
		<div id="pp-button-container" class="pp-button-container margin-0">
			<button
				id="pp-button-cart" class="pp-button" type="button"
				style='--button-color:<?php echo esc_attr( $options ? $options['button_color'] : '#ffa500' ); ?>'>
				<div id="pp-button-content">
					<span id="pp-button-text"> <?php echo $button_text; ?></span>
				</div>
			</button>
		</div>
	<?php
}
