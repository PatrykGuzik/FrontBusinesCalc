fetch(`${serv}/api/answers/?format=json`, {
	headers: {
		Authorization: apiKey,
	},
})
	.then(response => response.json())
	.then(data => getQuestions(data));

fetch(`${serv}/api/customers/?format=json`, {
	headers: {
		Authorization: apiKey,
	},
})
	.then(response => response.json())
	.then(data => getCustomers(data));

// fetch("http://127.0.0.1:8000/api/answers/?format=json")
// 	.then(blob => blob.json())
// 	.then(data => getQuestions(data));

// fetch("http://127.0.0.1:8000/api/customers/?format=json")
// 	.then(blob => blob.json())
// 	.then(data => getCustomers(data));

function getQuestions(data) {
	const tables = document.querySelector(".tables");
	const loadingTables = document.querySelector(".loading-tables");

	setTimeout(() => {
		tables.style.display = "block";
		loadingTables.style.display = "none";
	}, 1000);

	let dataManager = data.filter(d => d.role == "menager");
	let dataEmployee = data.filter(d => d.role == "employee");

	drawTableCalc(
		dataManager,
		document.querySelector("[data-manager]"),
		"manager"
	);
	drawTableCalc(
		dataEmployee,
		document.querySelector("[data-employee]"),
		"employee"
	);

	//wybór klienta
	const customers = document.querySelector(".customers");
	customers.addEventListener("click", e => {
		if (!e.target.dataset.code) return;

		dataManager = data.filter(d => d.role == "menager");
		dataEmployee = data.filter(d => d.role == "employee");

		const code = e.target.dataset.code;
		if (code == "all") {
			dataManager = data.filter(d => d.role == "menager");
			dataEmployee = data.filter(d => d.role == "employee");
		} else {
			dataEmployee = dataEmployee.filter(d => d.customer == code);
			dataManager = dataManager.filter(d => d.customer == code);
		}

		drawTabs();
	});

	// zmiana typu danych
	let isRaw = false;
	drawTabs();

	const btnDataType = document.querySelector("[data-data-type]");
	btnDataType.addEventListener("click", () => {
		isRaw = !isRaw;
		drawTabs();
	});

	function drawTabs() {
		const dataTypeName = document.querySelector(".data-type-name");
		if (isRaw) {
			drawTableRaw(
				dataManager,
				document.querySelector("[data-manager]"),
				"manager"
			);
			drawTableRaw(
				dataEmployee,
				document.querySelector("[data-employee]"),
				"employee"
			);
			dataTypeName.innerHTML = "dane surowe";
		} else {
			drawTableCalc(
				dataManager,
				document.querySelector("[data-manager]"),
				"manager"
			);
			drawTableCalc(
				dataEmployee,
				document.querySelector("[data-employee]"),
				"employee"
			);
			dataTypeName.innerHTML = "dane przeliczone";
		}
	}

	showQuestionInfo(dataManager, dataEmployee);
}

// pokazuje wszystkich klientów
function getCustomers(data) {
	const customers = document.querySelector(".customers");
	const loadingCustomers = document.querySelector(".loading-customers");

	setTimeout(() => {
		customers.style.display = "flex";
		loadingCustomers.style.display = "none";
	}, 1000);

	drawCustomerList(data);

	// wyszukiwanie
	const search = document.querySelector(".search-input");
	search.addEventListener("input", () => {
		const newData = data.filter(a => isInString(a.name, search.value));
		drawCustomerList(newData);
	});

	// zmiana nazwy klienta
	customers.addEventListener("click", e => {
		if (!e.target.dataset.code) return;
		if (e.target.dataset.code == "all") {
			document.querySelector(".customer-name").innerHTML = "Wszystkie";
		} else {
			const code = e.target.dataset.code;

			const name = data.find(d => d.code == code).name;
			const info = data.find(d => d.code == code).info;
			document.querySelector(".customer-name").innerHTML = name;
			document.querySelector(".customer-info").innerHTML = info;
		}
	});
}

function isInString(string, part) {
	return string.toLowerCase().includes(part.toLowerCase());
}

function drawCustomerList(data) {
	const customersBox = document.querySelector(".customers");
	let customersList = `<div><img data-code="all" width="30px" src="img/home.svg" alt="homepage"></div>`;
	data.forEach(d => {
		customersList += `<div data-code="${d.code}">${d.name}</div>`;
	});
	customersBox.innerHTML = customersList;
}
