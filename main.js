const page = 8

let conditionalQuestions = employeeConditionalQuestions
const role = sessionStorage.getItem("role")




// Dla danych z Backendu
let endpoint_questions = "http://127.0.0.1:8000/api/questions/?format=json";
const endpoint_values = "http://127.0.0.1:8000/api/values/?format=json"; 



if(role == "menager"){
	endpoint_questions = "http://127.0.0.1:8000/api/questionsmanager/?format=json"
	conditionalQuestions = managerConditionalQuestions
}

fetch(endpoint_questions)
	.then(blob => blob.json())
	.then(data => getQuestions(data));

function getQuestions(data) {
	const sortData = data.sort((a,b)=>(a.number - b.number))

	console.log(sortData);
	const parseData = sortData.map(d => {
		sbq = d.subquestions.split(';')
		if (sbq[0] === '') sbq=null;
		return {type: d.type, question: d.question, subquestions: sbq, min: d.min, max: d.max, unit: d.unit}
	})
	

	generateForm(parseData, conditionalQuestions);
}






//dla danych lokalnych ---------------------------------------------

// let data = parseData(managerData)
// if(role == "employee"){
// 	data = parseData(employeeData)
// 	conditionalQuestions = employeeConditionalQuestions
// }
// generateForm(data, managerConditionalQuestions);



// funkcje pomocnicze -------------------------------------------------------------------------------------
function getValuesFromEndpoint(endpoint){
	fetch(endpoint)
	.then(blob => blob.json())
	.then(data => getValues(data));
}

function getValues(data) {
	if (role == "employee") {
		calcEmployeeCarbonFootprint(data)
	}else{
		calcManagerCarbonFootprint(data)
	}
}



function generateForm(data, conditionalQuestions) {
	Form.conditionalQuestions = conditionalQuestions;
	Form.generateMultiformStepFormHTML(data.length);
	Form.createInputs(data);
	const multiStepForm = new MultistepForm();

	// Ustawienie pierwszej planszy (DEV)
	multiStepForm.setCurrentStep(page)
	// ----------------------------------

	multiStepForm.changePage();
}

function parseData(data) {
	const sortData = data.sort((a,b)=>{
		return a.number - b.number
	})

	const parseData = sortData.map(d => {
		sbq = d.subquestions.split(";");
		if (sbq[0] === "") sbq = null;

		return {
			type: d.type,
			question: d.question,
			subquestions: sbq,
			min: d.min,
			max: d.max,
			unit: d.unit,
			category: d.category
		};
	});

	return parseData
}


function showAnswers(){
	getValuesFromEndpoint(endpoint_values)
}