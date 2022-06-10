function getHeader(array) {
	let header = "";
	array.forEach(element => {
		header += `<td>${element}</td>`;
	});
	return header;
}

function getHeaderCSV(array) {
    let header = "";
	array.forEach(element => {
		header += `${element},`;
	});
	return header;
}




let dataToDownloadManager = ""
let dataToDownloadEmployee = ""



// Pobieranie danych
const dBtnManager = document.querySelector(".download-button-manager");
const dBtnEmployee = document.querySelector(".download-button-employee");

dBtnManager.addEventListener("click", () => {
    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(dataToDownloadManager);
    hiddenElement.target = "_blank";
    hiddenElement.download = `dataCalculatorManager.csv`;
    hiddenElement.click();
});

dBtnEmployee.addEventListener("click", () => {
    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(dataToDownloadEmployee);
    hiddenElement.target = "_blank";
    hiddenElement.download = `dataCalculatorEmployee.csv`;
    hiddenElement.click();
});