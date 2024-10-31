<?php
// phpcs:ignoreFile

// Mock version of WC_Cart
class mockWC_Cart {
	function needs_shipping_address() {
		return false;
	}
}

// A general Mock for WooCommerce class 
class mockWooCommerce {
	public $cart = null;

	private function setClassVariables() {
		$this->cart = new mockWC_Cart();
	}
	
	public function __construct() {
		$this -> setClassVariables();
	}
}

// A general Mock for WooCommerce class 
// Todo: Null Cart test
// class mockWooCommerceNullCart {
// 	public $cart = null;

// 	private function setClassVariables() {
// 		$this->cart = null;
// 	}
	
// 	public function __construct() {
// 		$this -> setClassVariables();
// 	}
// }

// PeachPay Specific Mock
function peachpay_get_settings_option($arg1, $arg2) {
	return true;
}

// Exposes an instance of Mocked WooCommerce  
function WC() {
	return new mockWooCommerce;
}
