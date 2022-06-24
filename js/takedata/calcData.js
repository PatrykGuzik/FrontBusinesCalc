function drawTableCalc(data, table, role) {
	const tableCalc = table;

	// console.log(data);
	if(!data[0]){
		tableCalc.innerHTML = ''
		return	
	} 

	
	const lengthOfTable = JSON.parse(data[0].calc_answers).length
	const lengthOfRows = data.length
	console.log(lengthOfTable);


	// let sumForAny = JSON.parse(data[0].calc_answers).map(d => {
	// 	return {name:d.name, sum:0}
	// }) ;


	

	


	//_________________________________________

	const lengthOfData = data.length

	let headerTable = `${getHeader(["lp", "kod", "data", "czas"])}`;
	let bodyTable = "";

	let headerCSV = `${getHeaderCSV(["lp", "kod", "data", "czas"])}`;

	let bodyCSV = "";

	data.forEach((d, index) => {
		const rows = JSON.parse(d.calc_answers);

		// sumForAny[index].sum += rows[0].co2;

		const customer = d.customer;
		const date = d.date;
		const time = d.time;

		calcCell = `${getHeader([index + 1, customer, date, time])}`;
		calcCellCSV = `${getHeaderCSV([index + 1, customer, date, time])}`;

		rows.forEach((row, index) => {
			calcCell += `<td>${row.co2}</td>`;

			// CSV
			let space = ",";
			if (index == rows.length - 1) space = "\n";
			calcCellCSV += `${row.co2}${space}`;



		});

		bodyCSV += `${calcCellCSV}`;
		bodyTable += `<tr>${calcCell}</tr>`;

		// HEADER
		if (index == 0) {
			rows.forEach(row => {
				headerTable += `<td>${row.name}</td>`;
			});

			//CSV
			rows.forEach((row, index) => {
				let space = ",";
				if (index == rows.length - 1) space = "\n";
				headerCSV += `${row.name}${space}`;
			});
			
		}
	});

	// ostatni wiersz

	// SUMA
	function getSumByIndex(index){
		const rows = data.map(d=> JSON.parse(d.calc_answers))
		return rows.map(row => row[index].co2).reduce((p,c) => p+c)
	}
	console.log(getSumByIndex(2));

	let lastRow = ``

	for (let i = 0; i < lengthOfTable; i++) {
		lastRow += `<td>${getSumByIndex(i)/lengthOfRows}</td>`
	}


	bodyTable += `<tr class="average">${getHeader(["średnia", "", "", ""])}${lastRow}</tr>`;
	// console.log("suma", sumForAny);

	if (role == "manager") dataToDownloadManager = `${headerCSV}${bodyCSV}`;
	if (role == "employee") dataToDownloadEmployee = `${headerCSV}${bodyCSV}`;

	tableCalc.innerHTML = `<tr>${headerTable}</tr> ${bodyTable}`;
}
