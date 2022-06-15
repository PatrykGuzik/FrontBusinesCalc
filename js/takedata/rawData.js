function drawTableRaw(data, table, role) {
	// const tableManager = document.querySelector("[data-manager]");
    const tableRaw = table

	let headerTable = `${getHeader(["lp", "kod", "data", "czas"])}`;
	let bodyTable = "";

    let headerCSV = `${getHeaderCSV(["lp", "kod", "data", "czas"])}`;

    let bodyCSV = ''
    

	data.forEach((d, index) => {
		// console.log(JSON.parse(d.raw_answers));
		const rows = JSON.parse(d.raw_answers);
		const customer = d.customer;
		const date = d.date;
		const time = d.time

		calcCell = `${getHeader([index + 1, customer, date, time])}`;
        calcCellCSV = `${getHeaderCSV([index + 1, customer, date, time])}`;

		// CSV
		rows.forEach((row,index) => {
			let sp = ','
        	if(index == rows.length-1) sp = "\n"
			switch (row.type) {
				case "input":
					calcCell += `${getAnswerForInput(row.answers)}`;
					calcCellCSV += getAnswerForInputCSV(row.answers, sp)
					break;

				case "radio":
					calcCell += `${getAnswerForRadio(row.answers)}`;
					calcCellCSV += getAnswerForRadioCSV(row.answers, sp)
					break;

				case "range":
					calcCell += `${getAnswerForRange(row.answers)}`;
					calcCellCSV += getAnswerForRangeCSV(row.answers, sp)
					break;

				case "checkbox":
					calcCell += `${getAnswerForCheckbox(row.answers)}`;
					calcCellCSV += getAnswerForCheckboxCSV(row.answers, sp)
					break;


			
				default:
					calcCell += `<td>${row.type}</td>`;
					break;
			}
			

            // CSV
            // let space = ','
            // if(index == rows.length-1) space = "\n"
            // calcCellCSV += `${row.co2}${space}`

		});


        bodyCSV += `${calcCellCSV}`
		bodyTable += `<tr>${calcCell}</tr>`;

		// HEADER
		if (index == 0) {
			rows.forEach(row => {
				switch (row.type) {
					case "input":
						if(!Array.isArray(row.answers)) headerTable += `<td data-name="${row.name}" data-type="${row.type}">${row.name}</td>`;
						else{
							temp = ""
							row.answers.forEach(ans => {
								temp += `<td data-name="${row.name}" data-sub="${ans.subquestion}" data-type="${row.type}">${row.name}${ans.subquestion}</td>`
							});
							headerTable += `${temp}`
						}
						break;

					case "checkbox":
						temp = ""
						row.answers.forEach(ans => {
							temp += `<td data-name="${row.name}" data-sub="${ans.subquestion}" data-type="${row.type}">${row.name}${ans.subquestion}</td>`
						});
						headerTable += `${temp}`
						break;
				
					default:
						headerTable += `<td data-name="${row.name}" data-type="${row.type}">${row.name}</td>`;
						break;
				}

				
			});

            //CSV
            rows.forEach((row, index) => {
				let space = ','
                if(index == rows.length-1) space = "\n"

				if(Array.isArray(row.answers) && (row.type=="input" || row.type=="checkbox")){
					temp = "";
					row.answers.forEach(ans => {
						temp += `${row.name}${ans.subquestion}${space}`;
					});
					headerCSV += `${temp}`;
				} 
				else{
					headerCSV += `${row.name}${space}`;
				}
			});
		}
	});


    
 
	if(role == "manager") dataToDownloadManager = `${headerCSV}${bodyCSV}`
    if(role == "employee") dataToDownloadEmployee = `${headerCSV}${bodyCSV}`

	tableRaw.innerHTML = `<tr>${headerTable}</tr> ${bodyTable}`;
}


function getAnswerForInput(answer) {
	if(!Array.isArray(answer)) return `<td>${answer.value}</td>`
	else{
		temp = ''
		answer.forEach(a => {
			temp += `<td>${a.value}</td>`
		});

		return `${temp}`
	} 
}
function getAnswerForInputCSV(answer, space){
	if(!Array.isArray(answer)) return `${answer.value}${space}`
	else{
		temp = ''
		answer.forEach(a => {
			temp += `${a.value}${space}`
		});

		return `${temp}`
	} 
}


function getAnswerForRadio(answer) {
	return `<td>${answer.findIndex(a => a.isChecked)+1}</td>`
}
function getAnswerForRadioCSV(answer, space) {
	return `${answer.findIndex(a => a.isChecked)+1}${space}`
}


function getAnswerForRange(answer) {
	return `<td>${answer.value}</td>`
}
function getAnswerForRangeCSV(answer,space) {
	return `${answer.value}${space}`
}

function getAnswerForCheckbox(answer) {
	temp = ''
	answer.forEach(a => {
		temp += `<td>${a.value}</td>`
	});

	return `${temp}`
}

function getAnswerForCheckboxCSV(answer, space) {
	temp = ''
	answer.forEach(a => {
		temp += `${a.value}${space}`
	});

	return `${temp}`
}