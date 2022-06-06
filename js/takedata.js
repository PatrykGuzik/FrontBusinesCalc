fetch("http://127.0.0.1:8000/api/answers/?format=json")
	.then(blob => blob.json())
	.then(data => getQuestions(data));

fetch("http://127.0.0.1:8000/api/customers/?format=json")
	.then(blob => blob.json())
	.then(data => getCustomers(data));

	
function getQuestions(data) {
	const dataManager = data.filter(d => d.role == "menager");
	const dataEmployee = data.filter(d => d.role == "employee");

	drawTableForManager(dataManager);
	drawTableForEmployee(dataEmployee);
}

function getCustomers(data) {
	const customersBox = document.querySelector(".customers");

	let customersList = "";
	data.forEach(d => {
		customersList += `<li>${d.name}</li>`;
	});
	customersBox.innerHTML = customersList;
}

function drawTableForManager(data) {
	const tableManager = document.querySelector("[data-manager]");

	let headerCalcTable = `${getHeader(["lp", "kod", "data"])}`;
	let calcTable = "";

	data.forEach((d, index) => {
		const rows = JSON.parse(d.calc_answers);
		const customer = d.customer;
		const date = d.date;

		calcCell = `${getHeader([index + 1, customer, date])}`;

		rows.forEach(row => {
			calcCell += `<td>${row.co2}</td>`;
		});

		calcTable += `<tr>${calcCell}</tr>`;

		// HEADER
		if (index == 0) {
			rows.forEach(row => {
				headerCalcTable += `<td>${row.name}</td>`;
			});
		}
	});

	tableManager.innerHTML = `<tr>${headerCalcTable}</tr> ${calcTable}`;
}


function drawTableForEmployee(data) {
	console.log(data);
	const tableEmployee = document.querySelector("[data-employee]");

	let headerCalcTable = `${getHeader(["lp", "kod", "data"])}`;
	let calcTable = "";

	data.forEach((d, index) => {
		const rows = JSON.parse(d.calc_answers);
		const customer = d.customer;
		const date = d.date;

		calcCell = `${getHeader([index + 1, customer, date])}`;

		rows.forEach(row => {
			calcCell += `<td>${row.co2}</td>`;
		});

		calcTable += `<tr>${calcCell}</tr>`;

		// HEADER
		if (index == 0) {
			rows.forEach(row => {
				headerCalcTable += `<td>${row.name}</td>`;
			});
		}
	});

	tableEmployee.innerHTML = `<tr>${headerCalcTable}</tr> ${calcTable}`;

}

function getHeader(array) {
	let header = "";
	array.forEach(element => {
		header += `<td>${element}</td>`;
	});
	return header;
}
