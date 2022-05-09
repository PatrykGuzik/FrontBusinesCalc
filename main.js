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

const data = parseData(mainData)

generateForm(data, conditionalQuestions);



// funkcje pomocnicze
function generateForm(data, conditionalQuestions) {
	Form.conditionalQuestions = conditionalQuestions;
	Form.generateMultiformStepFormHTML(data.length);
	Form.createInputs(data);
	const multiStepForm = new MultistepForm();
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
