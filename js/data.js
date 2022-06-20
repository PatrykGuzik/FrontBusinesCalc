const employeeConditionalQuestions = [
	{ indexQuestion: 0, type: "radio", ifIsChecked: 0, hide: [1] },
	{ indexQuestion: 2, type: "radio", ifIsChecked: 1, hide: [3] },
	{ indexQuestion: 4, type: "radio", ifIsChecked: 1, hide: [5] },
	{ indexQuestion: 9, type: "radio", ifIsChecked: 1, hide: [10, 11, 12] },
	{ indexQuestion: 13,type: "checkbox",ifIsChecked: 0,hide: [15, 16, 17]},
	{ indexQuestion: 13,type: "checkbox",ifIsChecked: 6,hide: [15, 16, 17]},
];


const managerConditionalQuestions = [
	{ indexQuestion: 2, type: "text", ifIsValue: "0", hide: [3] },
	{ indexQuestion: 4, type: "radio", ifIsChecked: 1, hide: [5] },
];

let rawDataToSend=[]
let calcDataToSend=[]