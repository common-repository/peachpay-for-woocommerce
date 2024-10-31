<?php
// phpcs:ignoreFile

// Import Required Code
include_once 'mockCode.php';
include_once  __DIR__ . '/../core/modules/field-editor/pp-field-editor-functions.php';


// Mock Test
test('peachpay-field-editor-mocking', function() {
    // Setting Test Object
    $fields['billing']['billing_company'] = 'Union Drive Community Center';
    $fields['billing']['billing_phone'] = '5152940664';
    $fields['billing']['billing_address_1'] = '207 Beyer Ct';
    $fields['billing']['billing_address_2'] = 'Near Iowa State University Admissions';
    $fields['billing']['billing_city'] = 'Ames';
    $fields['billing']['billing_postcode']  = '50011';
    $fields['billing']['billing_country'] = 'US';
    $fields['billing']['billing_state'] = 'IA';
    // Returning Test Result
    $new_fields = peachpay_virtual_product_fields_preset($fields);
    // Setting Expectation
    $expected = [];
    $expected['billing'] = []; 
    // Match Expectation with Test Result
    $this->assertEquals($new_fields, $expected);
});
