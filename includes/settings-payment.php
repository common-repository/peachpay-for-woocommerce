<?php

function peachpay_settings_payment() {
	add_settings_section(
		'peachpay_section_payment',
		__( 'Payment methods', 'peachpay' ),
		null,
		'peachpay'
	);

	add_settings_field(
		'peachpay_field_stripe',
		__( 'Stripe', 'peachpay' ),
		'peachpay_field_stripe_cb',
		'peachpay',
		'peachpay_section_payment'
	);

	// Temporarily hide this feature on all stores but our own
	if ( strpos( get_site_url(), 'peachpay.app' ) !== false || strpos( get_site_url(), 'localhost' ) !== false ) {
		add_settings_field(
			'peachpay_field_paypal',
			__( 'PayPal', 'peachpay' ),
			'peachpay_field_paypal_cb',
			'peachpay',
			'peachpay_section_payment'
		);

		add_settings_field(
			'peachpay_field_paypal_box',
			__( 'PayPal button', 'peachpay' ),
			'peachpay_field_paypal_box_cb',
			'peachpay',
			'peachpay_section_payment',
			array( 'label_for' => 'peachpay_paypal_box' )
		);
	}
}

function peachpay_field_stripe_cb() {
	if ( get_option( 'peachpay_connected_stripe_account' ) ) {
		?>
		<p><span class="dashicons dashicons-yes-alt"></span> You've successfully connected the Stripe account associated with <strong><?php echo get_option( 'peachpay_connected_stripe_account' )['email'] ?></strong>
	<?php } else { ?>
		<a
			href="https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_HHK0N5DreIcJJAyqGbeOE77hAZD9gCFg&scope=read_write&state=<?php echo esc_url( get_site_url() ); ?>&stripe_user[url]=<?php echo esc_url( get_site_url() ); ?>"
			class="stripe-connect"
		>
			<span>Connect with</span>
		</a>
		<style>
			.stripe-connect {
				background: #635bff;
				display: inline-block;
				height: 38px;
				text-decoration: none;
				width: 180px;

				border-radius: 4px;
				-moz-border-radius: 4px;
				-webkit-border-radius: 4px;

				user-select: none;
				-moz-user-select: none;
				-webkit-user-select: none;
				-ms-user-select: none;

				-webkit-font-smoothing: antialiased;
			}

			.stripe-connect span {
				color: #ffffff;
				display: block;
				font-family: sohne-var, "Helvetica Neue", Arial, sans-serif;
				font-size: 15px;
				font-weight: 400;
				line-height: 14px;
				padding: 11px 0px 0px 24px;
				position: relative;
				text-align: left;
			}

			.stripe-connect:hover {
				background: #7a73ff;
			}

			.stripe-connect.slate {
				background: #0a2540;
			}

			.stripe-connect.slate:hover {
				background: #425466;
			}

			.stripe-connect.white {
				background: #ffffff;
			}

			.stripe-connect.white span {
				color: #0a2540;
			}

			.stripe-connect.white:hover {
				background: #f6f9fc;
			}

			.stripe-connect span::after {
				background-repeat: no-repeat;
				background-size: 49.58px;
				content: "";
				height: 20px;
				left: 62%;
				position: absolute;
				top: 28.95%;
				width: 49.58px;
			}

			/* Logos */
			.stripe-connect span::after {
				background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 23.0.4, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 468 222.5' style='enable-background:new 0 0 468 222.5;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill-rule:evenodd;clip-rule:evenodd;fill:%23FFFFFF;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3 c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z'/%3E%3Cpath class='st0' d='M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3 c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1 c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z'/%3E%3Cpolygon class='st0' points='223.8,61.7 248.9,56.3 248.9,36 223.8,41.3 '/%3E%3Crect x='223.8' y='69.3' class='st0' width='25.1' height='87.5'/%3E%3Cpath class='st0' d='M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z'/%3E%3Cpath class='st0' d='M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135 c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z'/%3E%3Cpath class='st0' d='M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6 C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7 c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z'/%3E%3C/g%3E%3C/svg%3E");
			}

			.stripe-connect.white span::after {
				background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 24.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 468 222.5' style='enable-background:new 0 0 468 222.5;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill-rule:evenodd;clip-rule:evenodd;fill:%230A2540;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3 c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z'/%3E%3Cpath class='st0' d='M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3 c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1 c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z'/%3E%3Cpolygon class='st0' points='223.8,61.7 248.9,56.3 248.9,36 223.8,41.3 '/%3E%3Crect x='223.8' y='69.3' class='st0' width='25.1' height='87.5'/%3E%3Cpath class='st0' d='M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z'/%3E%3Cpath class='st0' d='M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135 c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z'/%3E%3Cpath class='st0' d='M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6 C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7 c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z'/%3E%3C/g%3E%3C/svg%3E");
			}
		</style>
	<?php
	}
}

function peachpay_field_paypal_cb() {
	if ( get_option( 'peachpay_paypal_signup' ) ) {
		?>
		<p>
			<span class="dashicons dashicons-yes-alt"></span> You've successfully connected your PayPal account
			<br>
			Merchant ID: <?php echo esc_html( peachpay_get_paypal_merchant_id() ); ?>
		</p>
		<a class="button button-unlink-paypal" href="?page=peachpay&unlink_paypal" >Unlink PayPal</a> 
		<?php
	} else {
		?>
		<a href=<?php echo esc_url( peachpay_get_paypal_link() ); ?> >Sign in with your PayPal account to start accepting payments through PayPal</a>
		<?php
	}
}

function peachpay_get_paypal_merchant_id() {
	$merchant_hostname = wp_parse_url( get_site_url(), PHP_URL_HOST );
	$response = wp_remote_get( peachpay_api_url() . 'api/v1/paypal/merchantAndClient?merchantHostname=' . $merchant_hostname );

	if ( is_wp_error( $response ) ) {
		return 'Merchant ID not found.';
	}
	$body = wp_remote_retrieve_body( $response );
	$data = json_decode( $body, true );

	if ( is_wp_error( $data ) || '' === $data['paypalMerchantID'] ) {
		return 'Merchant ID not found.';
	}
	return $data['paypalMerchantID'];
}

function peachpay_get_paypal_link() {
	$response = wp_remote_get( peachpay_api_url() . 'api/v1/paypal/signup?merchantURL=' . get_site_url() );

	if ( is_wp_error( $response ) ) {
		return;
	}
	$data = wp_remote_retrieve_body( $response );

	if ( is_wp_error( $data ) ) {
		return;
	}
	return $data;
}

function peachpay_field_paypal_box_cb() {
	?>
	<input
		id="peachpay_paypal_box"
		name="peachpay_options[paypal]"
		type="checkbox"
		value="1"
		<?php
		checked( 1, peachpay_get_option( 'paypal' ), true );
		disabled( false, get_option( 'peachpay_paypal_signup' ), true );
		?>
	>
	<label for="peachpay_paypal_box">Enable PayPal button</label>
	<?php
}
