/**
 * Support for changing product's quantity
 * @param event Product data that includes product id and an action which could be either increase/decrease.
 * @returns true if changing quantity succeed, otherwise return false if it fails
 */

ppOnWindowDataFetch('pp-change-quantity', async (data) => {
	const response = await peachpay_changeQuantity(data);

	if (!response.ok) {
		throw new Error('Quantity failed to change.');
	}

	const responseData = await response.json(); // As ICartCalculationResponse
	if (responseData.success && responseData.data) {
		peachpay_data.cart = responseData.data.cart_calculation_record[0].cart;
		const floatButton = document.querySelector('.pp-float-container');
		floatButton && window.matchMedia('(max-width: 900px)').matches && peachpay_data.cart.length === 0 ? floatButton.classList.add('hide') : '';
	}
	return responseData;
});

// deno-lint-ignore camelcase
async function peachpay_changeQuantity(change) {
	const formData = new FormData();

	formData.append('cart_item_key', change.key);
	formData.append('quantity', change.amount);
	formData.append('absolute', change.set);

	const response = await fetch(`${peachpay_data.wp_home_url}/?wc-ajax=pp-cart-item-quantity`, {
		method: 'POST',
		body: formData,
	});

	return response;
}
