const endpoint = "http://127.0.0.1:8000/api/customers/?format=json";

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => checkCode(data));

function checkCode(data) {
	console.log(data);
	const companies = data;

	const getCoName = code => {
		findCompany = companies.find(customer => customer.code === code);
		if (findCompany) findCompany = findCompany.name;
		return findCompany;
	};


	const myUrl = new URL(window.location.href);
	const code = myUrl.searchParams.get("code");
	const customerName = document.querySelector(".customer-name");
	const mainCustomerText = document.querySelector("#main-customer-text");
	sessionStorage.setItem("code", code)


	if (code && getCoName(code)) {
        customerName.innerHTML = getCoName(code)
	}else{
	    console.log("nie wybrano firmy")
        mainCustomerText.innerHTML = ""
        customerName.innerHTML = ""
        
	}

	goToCalc()
}



function goToCalc() {
	const buttons = document.querySelectorAll("button")
	console.log(buttons);

	buttons.forEach(btn => {
		btn.addEventListener('click', function(e){
			if (e.target.classList.contains("employeeBtn")){
				console.log("employee");
				sessionStorage.setItem("role", "employee")
			}else if (e.target.classList.contains("menagerBtn")){
				console.log("menager")
				sessionStorage.setItem("role", "menager")
			}
			location.href = "calc.html";
		})
	});
	
	
}