<?php
/**
 * PeachPay Stripe payment settings.
 *
 * @package PeachPay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

require_once PEACHPAY_ABSPATH . 'core/payments/payment-threshold.php';

/**
 * PeachPay Stripe admin settings.
 */
function peachpay_stripe_admin_settings_section() {
	add_settings_field(
		'peachpay_stripe_setting',
		peachpay_build_section_header( __( 'Stripe', 'peachpay-for-woocommerce' ), 'https://youtu.be/SrTykTIzwHo' ),
		'peachpay_stripe_setting_section',
		'peachpay',
		'peachpay_section_payment',
		array( 'class' => 'pp-header' )
	);
}
add_action( 'peachpay_admin_add_payment_setting_section', 'peachpay_stripe_admin_settings_section' );


/**
 * Renders the stripe settings section.
 */
function peachpay_stripe_setting_section() {
	add_action( 'peachpay_action_stripe_card_payments_extra_settings', 'peachpay_stripe_card_payments_extra_settings' );

	?>
	<div class="peachpay-setting-section">
		<?php
		// Stripe connect option.
		peachpay_field_stripe_cb();

		// Stripe PeachPay checkout enable.
		peachpay_admin_input(
			'stripe-enable',
			'peachpay_payment_options',
			'enable_stripe',
			1,
			__( 'Show Stripe in the checkout window', 'peachpay-for-woocommerce' ),
			'',
			array(
				'input_type' => 'checkbox',
				'disabled'   => ! peachpay_is_test_mode() && ! peachpay_stripe_connected(),
			)
		);

		// Cancel on dispute.
		peachpay_admin_input(
			'dispute-cancel-order',
			'peachpay_payment_options',
			'cancel_order_on_dispute',
			1,
			__( 'Change order status to "cancelled" when payment is disputed', 'peachpay-for-woocommerce' ),
			'',
			array(
				'input_type' => 'checkbox',
			)
		);

		// Card Payment method.
		peachpay_stripe_payment_option(
			'card_payments',
			__( 'Credit card / Debit card', 'peachpay-for-woocommerce' ),
			array(
				peachpay_url( 'public/img/marks/mini-visa.svg' ),
				peachpay_url( 'public/img/marks/mini-master.svg' ),
				peachpay_url( 'public/img/marks/mini-amex.svg' ),
				peachpay_url( 'public/img/marks/mini-diners.svg' ),
			),
			__( 'Credit and debit cards (Visa, Mastercard, American Express, Discover and Diners, China UnionPay, JCB, Cartes Bancaires, Interac) are a dominant payment method globally, accounting for 41% of online payments.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'class'                       => 'pp-card-top',
				'no-input'                    => true,
				'data-stripe-capability-type' => 'card_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'card_payments' ),
			)
		);

		// Apple Pay/ Google Pay payment method.
		peachpay_stripe_payment_option(
			'stripe_payment_request',
			'Apple Pay / Google Pay',
			peachpay_url( 'public/img/marks/apple-google.svg' ),
			__( 'Apple Pay is a wallet that allows customers to pay using payment details stored on their iPhone, iPad, or Apple Watch. Google Pay allows customers to pay with any payment method saved to their Google account.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type'     => 'card_payments',
				'data-stripe-capability'          => peachpay_stripe_capability( 'card_payments' ),
				'data-stripe-applepay-configured' => peachpay_get_settings_option( 'peachpay_apple_pay_settings_v2', 'apple_pay_domain_set', 'no' ) === 'yes',
			)
		);

		// Affirm payment method.
		peachpay_stripe_payment_option(
			'affirm_payments',
			'Affirm',
			peachpay_url( 'public/img/marks/affirm.svg' ),
			__( 'Affirm has a network of more than six million shoppers in the US. Customers can choose from one of two options for payment: Split Pay and Installments. Businesses offering Affirm receive the full payment upfront and are protected against fraud and customer payment risk.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'affirm_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'affirm_payments' ),
			)
		);

		// Klarna payment method.
		peachpay_stripe_payment_option(
			'klarna_payments',
			'Klarna',
			peachpay_url( 'public/img/marks/klarna.svg' ),
			__( 'Klarna offers flexible payment options that give customers more freedom to choose when and how to pay for a purchase. Klarna provides payment solutions for 90 million consumers and over 200,000 businesses across 19 markets.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'klarna_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'klarna_payments' ),
			)
		);

		// Afterpay / Clearpay payment method.
		peachpay_stripe_payment_option(
			'afterpay_clearpay_payments',
			'Afterpay / Clearpay',
			peachpay_url( 'public/img/marks/afterpay.svg' ),
			__( 'Afterpay (also known as Clearpay in the UK) offers customers more payment flexibility with no credit checks, no upfront fees, and no interest for on-time payments. Afterpay has more than 13M global customers and works with 75,000 brands and retailers.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'afterpay_clearpay_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'afterpay_clearpay_payments' ),
			)
		);

		// US Bank account payment method.
		peachpay_stripe_payment_option(
			'us_bank_account_ach_payments',
			'US bank account',
			peachpay_url( 'public/img/marks/bank.svg' ),
			__( 'Stripe users in the United States can accept ACH Direct Debit payments from customers with a US bank account using the Automated Clearing House (ACH) payments system operated by Nacha.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'us_bank_account_ach_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'us_bank_account_ach_payments' ),
			)
		);

		// Bancontact Payment method.
		peachpay_stripe_payment_option(
			'bancontact_payments',
			'Bancontact',
			peachpay_url( 'public/img/marks/bancontact.svg' ),
			__( 'Bancontact is the most popular online payment method in Belgium, with over 15 million cards in circulation. Customers use a Bancontact card or mobile app linked to a Belgian bank account to make online payments that are secure, guaranteed, and confirmed immediately', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'bancontact_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'bancontact_payments' ),
			)
		);

		// Giropay payment method.
		peachpay_stripe_payment_option(
			'giropay_payments',
			'Giropay',
			peachpay_url( 'public/img/marks/giropay.svg' ),
			__( 'giropay is a German payment method based on online banking, introduced in 2006. It allows customers to complete transactions online using their online banking environment, with funds debited from their bank account. Depending on their bank, customers confirm payments on giropay using a second factor of authentication or a PIN. giropay accounts for 10% of online checkouts in Germany', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'giropay_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'giropay_payments' ),
			)
		);

		// iDEAL payment method.
		peachpay_stripe_payment_option(
			'ideal_payments',
			'iDEAL',
			peachpay_url( 'public/img/marks/ideal.svg' ),
			__( 'iDEAL is a Netherlands-based payment method that allows customers to complete transactions online using their bank credentials. All major Dutch banks are members of Currence, the scheme that operates iDEAL, making it the most popular online payment method in the Netherlands with a share of online transactions close to 55%.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'ideal_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'ideal_payments' ),
			)
		);

		// Sofort payment method.
		peachpay_stripe_payment_option(
			'sofort_payments',
			'Sofort',
			peachpay_url( 'public/img/marks/sofort.svg' ),
			__( 'Sofort is a single use, delayed notification payment method that requires customers to authenticate their payment. It redirects them to their bank’s portal to authenticate the payment, and it typically takes 2 to 14 days to receive notification of success or failure.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'sofort_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'sofort_payments' ),
			)
		);

		// Przelewy24 method.
		peachpay_stripe_payment_option(
			'p24_payments',
			'Przelewy24',
			peachpay_url( 'public/img/marks/p24.svg' ),
			__( 'Przelewy24 is a Poland-based payment method aggregator that allows customers to complete transactions online using bank transfers and other methods. Bank transfers account for 30% of online payments in Poland and Przelewy24 provides a way for customers to pay with over 165 banks.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'p24_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'p24_payments' ),
			)
		);

		// EPS payment method.
		peachpay_stripe_payment_option(
			'eps_payments',
			'EPS',
			peachpay_url( 'public/img/marks/eps.svg' ),
			__( 'EPS is an Austria-based payment method that allows customers to complete transactions online using their bank credentials. EPS is supported by all Austrian banks and is accepted by over 80% of Austrian online retailers.', 'peachpay-for-woocommerce' ),
			'https://stripe.com/pricing/local-payment-methods',
			array(
				'data-stripe-capability-type' => 'eps_payments',
				'data-stripe-capability'      => peachpay_stripe_capability( 'eps_payments' ),
			)
		);

		peachpay_field_stripe_more_info_cb();
		?>
		<div class="pp-save-button-section">
			<?php submit_button( 'Save changes', 'pp-button-primary' ); ?>
		</div>
	</div>
	<?php
}

/**
 * Template function for rendering stripe payment methods.
 *
 * @param string       $key The payment type key.
 * @param string       $name The name of the payment method.
 * @param string|array $image The URL of the image for the payment method.
 * @param string       $description The description for the payment method.
 * @param string       $fees The fees short string details.
 * @param array        $options Any extra information needed for rendering.
 */
function peachpay_stripe_payment_option( $key, $name, $image, $description, $fees, $options = array() ) {
	$has_capability = ( peachpay_is_test_mode() && peachpay_get_settings_option( 'peachpay_payment_options', 'enable_stripe' ) ) || ( peachpay_stripe_enabled() && 'active' === $options['data-stripe-capability'] );
	?>
	<div class="pp-pm-container <?php peachpay_echo_exist( 'class', $options ); ?>" data-stripe-payment="<?php echo esc_html( $key ); ?>" data-stripe-capability-type="<?php echo esc_html( $options['data-stripe-capability-type'] ); ?>" data-stripe-capability="<?php echo esc_html( $options['data-stripe-capability'] ); ?>"
														<?php
														if ( array_key_exists( 'data-stripe-applepay-configured', $options ) ) {
															?>
		data-stripe-applepay-configured="<?php echo esc_html( $options['data-stripe-applepay-configured'] ); ?>" <?php } ?>>

		<?php if ( ! ( array_key_exists( 'no-input', $options ) && $options['no-input'] ) ) { ?>
			<label>
			<?php } ?>

			<div class="pp-pm-main">
				<div class="pp-pm-input-section-left">
					<?php if ( ! ( array_key_exists( 'no-input', $options ) && $options['no-input'] ) ) { /* //TODO followup(fix): Do not remove this but just make input type hidden otherwise a migration will be required when credit cards are given an option to be disabled. */ ?>
						<input id="peachpay_stripe_<?php echo esc_html( $key ); ?>" name="peachpay_payment_options[<?php echo esc_html( $key ); /* // TODO followup(migrate): Namespace all stripe payment method options so they do not conflict with payment methods from square or others. */ ?>]" type="checkbox" value="1"
															<?php
																checked( 1, peachpay_get_settings_option( 'peachpay_payment_options', $key, false ) ? 1 : 0, true );
																																																																															disabled( false, $has_capability, true );
															?>
																																																																															>
					<?php } ?>
					<?php if ( ! is_array( $image ) ) { ?>
						<div class="pp-pm-badge">
							<img src="<?php echo esc_url( $image ); ?>">
						</div>
					<?php } else { ?>
						<div class="pp-pm-mini-badge">
							<?php
							$length = count( $image ) - 1;
							for ( $index = 0; $index < $length; $index += 2 ) {
								?>
								<div>
									<img src="<?php echo esc_url( $image[ $index ] ); ?>">
									<img src="<?php echo esc_url( $image[ $index + 1 ] ); ?>">
								</div>
							<?php } ?>
						</div>
					<?php } ?>
				</div>
				<div class="pp-mobile-vertical pp-fill">
					<div class="pp-pm-body">
						<div>
							<h3>
								<?php echo esc_html( $name ); ?>
							</h3>
						</div>
						<div>
							<p>
								<?php echo esc_html( $description ); ?>
							</p>
						</div>
					</div>
					<div class="pp-pm-right-col">
						<div class="pp-pm-fees">
							<a href="<?php echo esc_url( $fees ); ?>" target="_blank">
								<?php echo esc_html_e( 'View Stripe fees', 'peachpay-for-woocommerce' ); ?>
							</a>
						</div>
						<?php peachpay_render_min_max_section( 'stripe_' . $key ); ?>
					</div>
				</div>
			</div>

			<?php do_action( 'peachpay_action_stripe_' . $key . '_extra_settings' ); ?>

			<?php if ( ! ( array_key_exists( 'no-input', $options ) && $options['no-input'] ) ) { ?>
			</label>
		<?php } ?>
	</div>
	<?php
}

/**
 * Renders the more stripe info.
 */
function peachpay_field_stripe_more_info_cb() {
	?>
	<div class="pp-pm-container pp-card-bottom" style="display: block; text-align: center; min-height: 35px;">
		<p style="width: 100%;">
			<?php esc_html_e( 'Learn more about', 'peachpay-for-woocommerce' ); ?>
			<a href="https://stripe.com/payments/payment-methods-guide" target="_blank"><?php esc_html_e( 'payment methods', 'peachpay-for-woocommerce' ); ?></a>
			<?php esc_html_e( 'powered by Stripe and any associated', 'peachpay-for-woocommerce' ); ?>
			<a href="https://stripe.com/pricing/local-payment-methods" target="_blank">
				<?php esc_html_e( 'fees', 'peachpay-for-woocommerce' ); ?>
			</a>
		</p>
	</div>
	<script>
		function peachpay_markActionNeeded(stripeMethod) {
			const $input = document.querySelector(`input[name="peachpay_payment_options[${stripeMethod}]"]`);
			if (!$input) {
				return;
			}

			const $container = $input.closest(".pp-pm-container");
			if (!$container) {
				return;
			}

			$container.insertAdjacentHTML("beforeend", `
<span class="pp-needs-action">
	<h4>
		<?php esc_html_e( 'Action required:', 'peachpay-for-woocommerce' ); ?>
	</h4>
	<p>
		<?php esc_html_e( 'This payment method must be activated in your', 'peachpay-for-woocommerce' ); ?>
		<a target="_blank" href="https://dashboard.stripe.com/test/settings/payment_methods">Stripe <?php esc_html_e( 'dashboard', 'peachpay-for-woocommerce' ); ?></a>
		<?php esc_html_e( 'settings to be used in the PeachPay checkout.', 'peachpay-for-woocommerce' ); ?>
	</p>
</span>`);
		}

		function peachpay_markApplePayConfigError() {
			const $container = document.querySelector("[data-stripe-applepay-configured]");
			if (!$container) {
				return;
			}

			const $input = $container.querySelector('input[type="checkbox"]');

			if (!$input || !$input.checked) {
				return;
			}

			const status = $container.dataset.stripeApplepayConfigured;
			if (status) {
				return
			}


			$container.insertAdjacentHTML("beforeend", `
<span class="pp-needs-action">
<b>
	<?php esc_html_e( 'Setup failure:', 'peachpay-for-woocommerce' ); ?>
</b>
</br>
	<?php
	if ( peachpay_stripe_supported_applepay_url() ) {
		esc_html_e( 'Apple Pay domain registration failed. Apple Pay will not be shown to customers but Google Pay will continue to work.', 'peachpay-for-woocommerce' );
	} else {
		esc_html_e( 'Apple Pay is not supported on localhost sites. Google Pay will continue to work normally.', 'peachpay-for-woocommerce' );
	}
	?>
</span>`);
		}

		const $targets = document.querySelectorAll("[data-stripe-payment]");
		$targets.forEach(($el) => {
			const type = $el.dataset.stripePayment;
			const capabilityType = $el.dataset.stripeCapabilityType;
			const capability = $el.dataset.stripeCapability;

			if (capability !== "active") {
				peachpay_markActionNeeded(type);
			}
		});

		peachpay_markApplePayConfigError();
	</script>
	<?php
}

/**
 * Renders the stripe signup or stripe connect details.
 */
function peachpay_field_stripe_cb() {
	?>
	<div>
		<?php
		if ( peachpay_stripe_connected() && '' !== trim( peachpay_stripe_connect_id() ) ) {
			?>
			<p>
				<span class="dashicons dashicons-yes-alt"></span> <?php esc_html_e( "You've successfully connected the Stripe account", 'peachpay-for-woocommerce' ); ?>&nbsp<a href="<?php echo esc_url( peachpay_stripe_connect_account_link() ); ?>" target="_blank"><?php echo esc_html( peachpay_stripe_connect_id() ); ?></a>
			</p>
			<br>
			<a class="button pp-button-unlink" href="?page=peachpay&tab=payment&unlink_stripe&merchant_store=<?php echo esc_url( get_home_url() ); ?>"><?php esc_html_e( 'Unlink Stripe', 'peachpay-for-woocommerce' ); ?></a>
			<?php
		} else {
			?>
			<a href="<?php echo esc_url( peachpay_stripe_signup_url( get_site_url(), get_home_url() ) ); ?>" class="pp-stripe-connect" target="_blank">
				<span><?php esc_html_e( 'Connect with', 'peachpay-for-woocommerce' ); ?></span>
			</a>
			<?php
		}
		?>
	</div>
	<?php
}

/**
 * Extra settings for the Stripe card_payments method.
 */
function peachpay_stripe_card_payments_extra_settings() {
	?>
	<br>
	<?php

	peachpay_admin_input(
		'stripe_card_force_3d_secure',
		'peachpay_payment_options',
		'stripe_card_force_3d_secure',
		1,
		__( 'Force 3D Secure', 'peachpay-for-woocommerce' ),
		__( 'Stripe normally determines when 3D Secure should be shown automatically. If "Force 3D Secure" is enabled, 3D Secure will be shown for all card transactions. In test mode, 3D Secure is only shown for 3DS test cards regardless of the setting.', 'peachpay-for-woocommerce' ),
		array(
			'input_type' => 'checkbox',
		)
	);

	?>
	<br />
	<?php

	peachpay_admin_input(
		'stripe_card_capture_method',
		'peachpay_payment_options',
		'stripe_card_capture_method',
		'automatic',
		__( 'Charge type', 'peachpay-for-woocommerce' ),
		__( 'This option determines if the customers funds are captured immediately or only authorized for capture at a later time. Authorized payments expire and cannot be captured after 7 days.', 'peachpay-for-woocommerce' ),
		array(
			'input_type'     => 'select',
			'select_options' => array(
				'automatic' => __( 'Capture', 'peachpay-for-woocommerce' ),
				'manual'    => __( 'Authorize', 'peachpay-for-woocommerce' ),
			),
		)
	);
}
