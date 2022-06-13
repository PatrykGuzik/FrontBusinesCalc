fetch("http://127.0.0.1:8000/api/answers/?format=json")
	.then(blob => blob.json())
	.then(data => getQuestions(data));

fetch("http://127.0.0.1:8000/api/customers/?format=json")
	.then(blob => blob.json())
	.then(data => getCustomers(data));

function getQuestions(data) {


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
		if(!e.target.dataset.code) return

		dataManager = data.filter(d => d.role == "menager");
		dataEmployee = data.filter(d => d.role == "employee");

		const code = e.target.dataset.code;

		dataEmployee = dataEmployee.filter(d => d.customer == code);
		dataManager = dataManager.filter(d => d.customer == code);

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


	showQuestionInfo(dataManager, dataEmployee)
}

// pokazuje wszystkich klientów
function getCustomers(data) {
	drawCustomerList(data)


	// wyszukiwanie
	const search = document.querySelector(".search-input");
	search.addEventListener("input", () => {
		const newData = data.filter(a => isInString(a.name, search.value))
		drawCustomerList(newData)
	});


	// zmiana nazwy klienta
	const customers = document.querySelector(".customers");
	customers.addEventListener("click", e => {
		if(!e.target.dataset.code) return
		const code = e.target.dataset.code

		const name = data.find(d => d.code == code).name
		document.querySelector('.customer-name').innerHTML = name
	})

}


function isInString(string, part){
	return string.toLowerCase().includes(part.toLowerCase())
}

function drawCustomerList(data) {
		const customersBox = document.querySelector(".customers");
		let customersList = "";
		data.forEach(d => {
			customersList += `<div data-code="${d.code}">${d.name}</div>`;
		});
		customersBox.innerHTML = customersList;
	}