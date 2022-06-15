function drawTableCalc(data, table, role) {
    const tableCalc = table

	let headerTable = `${getHeader(["lp", "kod", "data", "czas"])}`;
	let bodyTable = "";

    let headerCSV = `${getHeaderCSV(["lp", "kod", "data", "czas"])}`;

    let bodyCSV = ''
    

	data.forEach((d, index) => {
		const rows = JSON.parse(d.calc_answers);
		const customer = d.customer;
		const date = d.date;
		const time = d.time

		calcCell = `${getHeader([index + 1, customer, date, time])}`;
        calcCellCSV = `${getHeaderCSV([index + 1, customer, date, time])}`;

		rows.forEach((row,index) => {
			calcCell += `<td>${row.co2}</td>`;

            // CSV
            let space = ','
            if(index == rows.length-1) space = "\n"
            calcCellCSV += `${row.co2}${space}`
		});


        bodyCSV += `${calcCellCSV}`
		bodyTable += `<tr>${calcCell}</tr>`;

		// HEADER
		if (index == 0) {
			rows.forEach(row => {
				headerTable += `<td>${row.name}</td>`;
			});

            //CSV
            rows.forEach((row, index) => {
                let space = ',';
                if(index == rows.length-1) space = "\n";
				headerCSV += `${row.name}${space}`;
			});
		}
	});


    if(role == "manager") dataToDownloadManager = `${headerCSV}${bodyCSV}`
    if(role == "employee") dataToDownloadEmployee = `${headerCSV}${bodyCSV}`
	
	tableCalc.innerHTML = `<tr>${headerTable}</tr> ${bodyTable}`;
}