const endpoint = `${serv}/api/customers/?format=json`;



fetch(endpoint, {
	headers: {
		Authorization: apiKey,
	},
})
	.then(response => response.json())
	.then(data => checkCode(data));


function checkCode(data) {
	hideLoading()


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
        mainCustomerText.innerHTML = ""
        customerName.innerHTML = ""
        
	}

	goToCalc()
}


function goToCalc() {
	const buttons = document.querySelectorAll("button")

	buttons.forEach(btn => {
		btn.addEventListener('click', function(e){
			if (e.target.classList.contains("employeeBtn")){
				sessionStorage.setItem("role", "employee")
			}else if (e.target.classList.contains("menagerBtn")){
				sessionStorage.setItem("role", "menager")
			}
			location.href = "calc.html";
		})
	});
}


function hideLoading(){
	const loading = document.querySelector(".loading-calc")
	const container =  document.querySelector(".main-panel")
	setTimeout(() => {
		loading.style.display = "none"
		container.style.opacity = "1"
	}, 0);
}