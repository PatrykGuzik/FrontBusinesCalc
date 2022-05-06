const jsonProject = [
	{type: "radio", question: "lorem ipsum", subquestions: ["dolor", "mit", "amet"], unit: null},
	{type: "number", question: "lorem ipsum", subquestions: ["dolor", "mit", "amet"], unit: "km"},
	{type: "checkbox", question: "lorem ipsum", subquestions: ["dolor", "mit", "amet"], unit: "km"},
	{type: "radio", question: "lorem ipsum", subquestions: ["dolor", "mit", "amet"], unit: null},
	{type: "range", question: "lorem ipsum", subquestions: null, unit: null},
]

let endpoint = "http://127.0.0.1:8000/api/questions/?format=json";


fetch(endpoint)
	.then(blob => blob.json())
	.then(data => getQuestions(data));

function getQuestions(data) {
	const parseData = data.map(d => {
		sbq = d.subquestions.split(';')
		if (sbq[0] === '') sbq=null;

		return {type: d.type, question: d.question, subquestions: sbq, min: d.min, max: d.max, unit: d.unit}
	})
	console.log(parseData);

	Form.generateMultiformStepFormHTML(parseData.length);
	Form.createInputs(parseData);
	const multiStepForm = new MultistepForm()
	multiStepForm.changePage();
}





