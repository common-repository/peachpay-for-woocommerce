<?php
/**
 * Handles Apple Pay domain registration
 *
 * @package peachpay
 */

if ( ! defined( 'PEACHPAY_ABSPATH' ) ) {
	exit;
}

/**
 * PeachPay class to check and handle domain registration with apple pay
 */
class PeachPay_Stripe_Apple_Pay {

	const DOMAIN_ASSOCIATION_FILE_NAME = 'apple-developer-merchantid-domain-association';
	const DOMAIN_ASSOCIATION_FILE_DIR  = '.well-known';
	const SETTINGS_KEY                 = 'peachpay_apple_pay_settings_v2';

	/**
	 * Array containing information about
	 * apple pay settings.
	 *
	 * @var array
	 */
	public $apple_pay_settings;

	/**
	 * Whether the apple pay domain is set.
	 *
	 * @var bool
	 */
	public $apple_pay_domain_set;

	/**
	 * Current domain name.
	 *
	 * @var bool
	 */
	private $domain_name;

	/**
	 * Constructor function for Stripe Apple Pay registration.
	 */
	public function __construct() {
		add_action( 'peachpay_check_apple_pay_domain', [$this, 'check_domain_on_domain_change'] ); // phpcs:ignore
		add_action( 'admin_init', [$this, 'update_domain_association_file']); // phpcs:ignore

		$this->apple_pay_settings   = get_option( self::SETTINGS_KEY, array() );
		$this->domain_name          = peachpay_get_site_url( false );
		$this->apple_pay_domain_set = 'yes' === $this->get_option( 'apple_pay_domain_set', 'no' );

	}

	/**
	 * Returns a value from Stripe Settings.
	 *
	 * @param string $setting Setting to check.
	 * @param string $default Default value.
	 * @return string $value
	 */
	public function get_option( $setting = '', $default = '' ) {
		if ( empty( $this->apple_pay_settings ) ) {
			return $default;
		}

		if ( ! empty( $this->apple_pay_settings[ $setting ] ) ) {
			return $this->apple_pay_settings[ $setting ];
		}

		return $default;
	}

	/**
	 * Sends Apple Pay registration if a domain name change is detected.
	 */
	public function check_domain_on_domain_change() {
		if ( strcmp( $this->domain_name, $this->get_option( 'apple_pay_verified_domain' ) ) !== 0 || ! $this->apple_pay_domain_set ) {
			$this->verify_domain_if_configured();
		}
	}

	/**
	 * Processes the Apple Pay domain verification.
	 */
	public function verify_domain_if_configured() {

		flush_rewrite_rules();

		// This method exists incase permalinks are set to Plain and a fallback is needed.
		if ( $this->update_domain_association_file() ) {
			$this->register_domain();
		}
	}

	/**
	 * Handles creation of the fallback domain assocation file.
	 *
	 * @return bool $domain_file_setup
	 */
	public function update_domain_association_file() {
		return $this->verify_hosted_domain_association_file();
	}

	/**
	 * Verifies that the domain association file matches
	 * the file from the plugin directory.
	 *
	 * @return bool $correct
	 */
	private function verify_hosted_domain_association_file() {
		try {
			$fullpath = untrailingslashit( PEACHPAY_ABSPATH ) . '/' . self::DOMAIN_ASSOCIATION_FILE_DIR . '/' . self::DOMAIN_ASSOCIATION_FILE_NAME;
			if ( ! file_exists( $fullpath ) ) {
				return false;
			}
			$local_contents  = file_get_contents( $fullpath ); // phpcs:ignore

			$url             = get_site_url() . '/' . self::DOMAIN_ASSOCIATION_FILE_DIR . '/' . self::DOMAIN_ASSOCIATION_FILE_NAME;
			$response        = wp_remote_get( $url );
			$remote_contents = wp_remote_retrieve_body( $response );

			return $local_contents === $remote_contents;
		} catch ( Exception $e ) {
			return false;
		}
	}

	/**
	 * Processes the Apply Pay domain verification.
	 *
	 * @return bool Verification succeeded
	 */
	public function register_domain() {
		try {
			$this->domain_registration_request();

			$this->apple_pay_settings['apple_pay_verified_domain'] = $this->domain_name;
			$this->apple_pay_settings['apple_pay_domain_set']      = 'yes';
			$this->apple_pay_domain_set                            = true;

			update_option( self::SETTINGS_KEY, $this->apple_pay_settings );

			return true;

		} catch ( Exception $e ) {
			$this->apple_pay_settings['apple_pay_verified_domain'] = $this->domain_name;
			$this->apple_pay_settings['apple_pay_domain_set']      = 'no';
			$this->apple_pay_domain_set                            = false;

			update_option( self::SETTINGS_KEY, $this->apple_pay_settings );

			return false;
		}
	}

	/**
	 * Makes the request to register the domain.
	 *
	 * @throws Exception If there's an error registering domain.
	 */
	private function domain_registration_request() {
		// This only works with the live mode key so always target the production api-server.
		$endpoint = 'https://prod.peachpay.app/api/v1/stripe/apple-pay/merchant/register';

		$data = array(
			'session' => array(
				'merchant_url'    => peachpay_get_site_url(),
				'merchant_domain' => $this->domain_name,
				'stripe'          => array(
					'connect_id' => peachpay_stripe_connect_id(),
				),
			),
		);

		$response = wp_remote_post(
			$endpoint,
			array(
				'body'    => $data,
				'timeout' => 60,
			)
		);

		if ( ! peachpay_response_ok( $response ) ) {
			throw new Exception( 'Non 200 response while attempting to register domain for Apple Pay' );
		}

		$body = wp_remote_retrieve_body( $response );
		if ( is_wp_error( $body ) ) {
			throw new Exception( 'Failed to retrieve the response body for registering Apple Pay domain' );
		}

		$data = json_decode( $body, true );
		if ( ! $data['success'] ) {
			throw new Exception( 'Unable to register domain' );
		}
	}
}

/**
 * Version 1 of the apple pay settings are sometimes broken so we will register everyone again.
 */
if ( get_option( 'peachpay_apple_pay_settings' ) ) {
	delete_option( 'peachpay_apple_pay_settings' );
}

/**
 * Apple Pay registration should only be attempted if the merchant has connected a stripe account.
 */
if ( peachpay_stripe_connected() && '' !== peachpay_stripe_connect_id() && peachpay_stripe_supported_applepay_url() ) {
	new PeachPay_Stripe_Apple_Pay();
}
