const jsonProject = [
	{type: "radio", category:"lorem1", question: "lorem ipsum", subquestions: ["dolor", "mit", "amet"], min:0, max:100, unit: null},
	{type: "input", category:"lorem1", question: "lorem ipsum", subquestions: ["dolor", "mit", "amet"], min:0, max:100, unit: "km"},
	{type: "checkbox", category:"lorem3", question: "lorem ipsum", subquestions: ["dolor", "mit", "amet"], min:0, max:100, unit: "km"},
	{type: "radio", category:"lorem4", question: "lorem ipsum", subquestions: ["dolor", "mit", "amet"], min:0, max:100, unit: "km"},
	{type: "range", category:"lorem5", question: "lorem ipsum", subquestions: null, min:0, max:100, unit: "km"},
]

// Dla danych z Backendu
// let endpoint = "http://127.0.0.1:8000/api/questions/?format=json";

// fetch(endpoint)
// 	.then(blob => blob.json())
// 	.then(data => getQuestions(data));

// function getQuestions(data) {
// 	const parseData = data.map(d => {
// 		sbq = d.subquestions.split(';')
// 		if (sbq[0] === '') sbq=null;

// 		return {type: d.type, question: d.question, subquestions: sbq, min: d.min, max: d.max, unit: d.unit}
// 	})
// 	console.log(parseData);

// 	Form.generateMultiformStepFormHTML(parseData.length);
// 	Form.createInputs(parseData);
// 	const multiStepForm = new MultistepForm();
// 	multiStepForm.changePage();
// }




generateForm(jsonProject)


function generateForm(data) {
	Form.generateMultiformStepFormHTML(data.length);
	Form.createInputs(data);
	const multiStepForm = new MultistepForm();
	multiStepForm.changePage();
}


