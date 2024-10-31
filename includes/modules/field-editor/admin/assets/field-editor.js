/**
 * @file Adds the deactivation popup and handles The necessary fields editor functionality for the whole modal and the buttons
 * @author Brendan Yeong
 */

document.addEventListener('DOMContentLoaded', () => {
	addNewField();
	enableField();
	disableField();
	removeField();
	editField();
	reorderFields();
	selectAllCheckbox();
});

function reorderFields() {
	const drag = document.querySelectorAll('#field-table tbody tr');
	let	dragged = null;

	for (const i of drag) {
		i.addEventListener('dragstart', event => {
			dragged = event.target;
		});

		i.addEventListener('dragover', event => {
			// Prevent default to allow drop
			event.preventDefault();
		}, false);

		i.addEventListener('drop', function (event) {
			// Prevent default action (open as link for some elements)
			event.preventDefault();
			if (dragged !== this) {
				const all = document.querySelectorAll('#field-table tbody tr');
				let currentpos = 0;
				let droppedpos = 0;
				for (const [i, element] of all.entries()) {
					if (dragged === element) {
						currentpos = i;
					}

					if (this === element) {
						droppedpos = i;
					}
				}

				this.parentNode.insertBefore(dragged, currentpos < droppedpos ? this.nextSibling : this);
			}
		});
	}
}

function addNewField() {
	const newFieldPopUp = document.querySelectorAll('#field-table .field-button');

	for (const button of newFieldPopUp) {
		button.addEventListener('click', event => showModal(event));
	}
}

function editField() {
	const editFieldButton = document.querySelectorAll('#field-table .edit-field');

	for (const button of editFieldButton) {
		button.addEventListener('click', editModal);
	}

	function editModal(event) {
		const selectedEditButton = document.querySelector(
			'#field-table #' + event.target.value,
		);
		showModal(event);
		insertEditData(selectedEditButton.value);
	}
}

function showModal(event) {
	event.preventDefault();
	const $modal = document.querySelector('#ppModal');
	$modal.style.display = 'block';
	if (document.querySelector('#modal-content')) {
		return;
	}

	const $modalContent = `
	<div id="modal-content" class="modal-new-field-content">
	<div id="modal-header" class="new-field-modal-header">
		<span id="deactivation-header" class="new-field-header bold"
			>Field Details
		</span>
		<i class="dashicon-close" id="close" aria-hidden="true"></i>
	</div>
	<div>
		<form id="field-info" class="modal-add-field form" method="post">
			<label for="field-type" class ="select-lable"
					>Type: <abbr class="required" title="required">*</abbr>
			</label><br />
			<div class="input-field">
				<select id="field_type" class="input-box" name="type_list" form="field-info">
					<option value="text">Text</option>
					<!-- <option value="textarea">Textarea</option> -->
				</select>
				<br />
			</div>
			<div class="input-field">
				<input
					id="field_name"
					class="input-box"
					type="text"
					name="field_name"
					value="additional_"
					placeholder=" "
					pattern="[a-z_]+[a-z0-9_]*"
					oninvalid="setCustomValidity('The name should start with a lowercase letter or underscore and be followed by any number of lowercase letters, digits or underscores.')"
					oninput="setCustomValidity('')"
					required
				/>
				<label for="field_name" class="form-label">
					Name: &#40;must be unique&#41;
					<abbr class="required" title="required">*</abbr> </label
				><br />
			</div>
			<div class="input-field">
				<input
					id="field_label"
					class="input-box"
					type="text"
					name="field_label"
					placeholder=" "
					required
				/>
				<label for="field_label" class="form-label">
					Label: <abbr class="required" title="required">*</abbr> </label><br />
			</div>
			<div class="input-field">
				<input
					id="field_default"
					class="input-box"
					type="text"
					name="field_default"
					placeholder=" "
				/><label for="field_default" class="form-label">Default value: </label
				><br />
			</div>
			<div class="input-checkboxes">
				<div class="input-checkboxes">
					<input
						id="field_required"
						type="checkbox"
						name="field_required"
						value="yes"
					/>
					<label for="field_required" >Required </label><br />
				</div>
				<div class="input-checkboxes">
					<input
						id="field_enable"
						type="checkbox"
						name="field_enable"
						value="yes"
					/>
					<label for="field_enable"> Enable </label><br />
				</div>
				<!-- <div class="input-checkboxes">
					<input
						id="field_display_email"
						type="checkbox"
						name="field_display_email"
						value="yes"
					/>
					<label for="field_display_email"> Display in email </label><br />
				</div>
				<div class="input-checkboxes">
					<input
						id="field_display_order_details"
						type="checkbox"
						name="field_display_order_details"
						value="yes"
					/>
					<label for="field_display_order_details"> Display in Order Detail </label><br />
				</div> -->
			</div>
			<div class="submit-field">
				<input
					type="submit"
					value="Submit"
					class="field-button-submit button-primary"
				/>
			</div>
		</form>
	</div>
</div>
`;

	$modal.insertAdjacentHTML('afterbegin', $modalContent);
	$modal.addEventListener('click', hideAddFieldModal);
}

function enableField() {
	const enableButtonField = document.querySelectorAll(
		'#field-table .enable-button',
	);
	for (const button of enableButtonField) {
		button.addEventListener('click', () => {
			disableOrEnable('yes');
		});
	}
}

function disableField() {
	const disableFieldButton = document.querySelectorAll(
		'#field-table .disable-button',
	);
	for (const button of disableFieldButton) {
		button.addEventListener('click', () => {
			disableOrEnable('');
		});
	}
}

function disableOrEnable(value) {
	for (const $input of document.querySelectorAll(
		'#field-table tbody input[type=checkbox]:checked',
	)) {
		const doc = document.querySelector(
			'#field-table tbody #field_' + $input.value + '.th_field_enable',
		);
		doc.innerHTML = value === 'yes' ? '&#10003;' : '-';
		const doc2 = document.querySelector(
			'#field-table tbody .field_' + $input.value + '#field_enable' + $input.id,
		);
		doc2.value = value;
		const row = document.querySelector(
			'#field-table tbody .row_' + $input.value,
		);
		if (value) {
			row.classList.remove('row-disabled');
		} else {
			row.classList.add('row-disabled');
		}
	}
}

function removeField() {
	const removeFieldButton = document.querySelectorAll(
		'#field-table .remove-button',
	);
	for (const button of removeFieldButton) {
		button.addEventListener('click', removeSelectedField);
	}

	function removeSelectedField() {
		for (const $input of document.querySelectorAll(
			'#field-table tbody input[type=checkbox]:checked',
		)) {
			const doc = document.querySelectorAll(
				'#field-table tbody .field_' + $input.value,
			);
			Array.prototype.forEach.call(doc, node => {
				node.remove();
			});
			const row = document.querySelector(
				'#field-table tbody .row_' + $input.value,
			);
			row.classList.add('row-removed');
		}
	}
}

function selectAllCheckbox() {
	const selectAllcheckbox = document.querySelectorAll(
		'#field-table .select-all',
	);
	for (const selectAll of selectAllcheckbox) {
		selectAll.addEventListener('change', event => {
			for (const checkbox of document.querySelectorAll(
				'#field-table input[type=checkbox]',
			)) {
				if (checkbox.checked === event.target.checked) {
					continue;
				}

				checkbox.checked = event.target.checked ? true : !checkbox.checked;
			}
		});
	}
}

/**
 * This method inserts the current field data into the modal that is to be updated.
 *
 * @param rawData the field data that is to be updated in raw JSON format.
 */
function insertEditData(rawData) {
	try {
		const data = JSON.parse(rawData);

		document.querySelector('#modal-content #field_type').value = data.type_list;
		document.querySelector('#modal-content #field_name').value
			= data.field_name;
		document.querySelector('#modal-content #field_label').value
			= data.field_label;
		document.querySelector('#modal-content #field_default').value
			= data.field_default;
		document.querySelector('#modal-content #field_required').checked = Boolean(
			data.field_required,
		);
		document.querySelector('#modal-content #field_enable').checked = Boolean(
			data.field_enable,
		);
		// For future function use.
		// document.querySelector('#modal-content #field_display_email').checked
		// 	= Boolean(data.field_display_email);
		// document.querySelector(
		// 	'#modal-content #field_display_order_details',
		// ).checked = Boolean(data.field_display_order_details);
		document
			.querySelector('#modal-content #field-info')
			.insertAdjacentHTML(
				'beforeend',
				`<input type="hidden" name="edit-row" value="${data.row}"/>`,
			);
	} catch (error) {
		console.log(error);
	}
}

/**
 * Hides the modal and resets the form.
 * @param {object} event
 */
function hideAddFieldModal(event) {
	if (
		!event.target.id
		|| (event.target.id !== 'ppModal' && event.target.id !== 'close')
	) {
		return;
	}

	document.querySelector('#modal-content #field_type').value = 'text';
	document.querySelector('#modal-content #field_name').value = 'additional_';
	document.querySelector('#modal-content #field_label').value = '';
	document.querySelector('#modal-content #field_default').value = '';
	document.querySelector('#modal-content #field_required').checked = false;
	document.querySelector('#modal-content #field_enable').checked = false;
	// Future uses.
	// document.querySelector('#modal-content #field_display_email').checked = false;
	// document.querySelector('#modal-content #field_display_order_details').checked = false;
	if (document.querySelector('#modal-content #field-info input[type=hidden]')) {
		const hidden = document.querySelector(
			'#modal-content #field-info input[type=hidden]',
		);
		hidden.remove();
	}

	if (event.target.id === 'close') {
		const modal = document.querySelector('#ppModal');
		modal.style.display = 'none';
		return;
	}

	event.target.style.display = 'none';
}
