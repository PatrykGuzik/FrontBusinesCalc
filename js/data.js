const employeeConditionalQuestions = [
	{ indexQuestion: 0, type: "radio", ifIsChecked: 0, hide: [1,13,14,15,16,17] },
	// przeskoczenie z 0 na 2 jeżeli zaznaczona praca w biurze
	{ indexQuestion: 0, type: "radio", ifIsChecked: 2, hide: [6,7,8] },
	{ indexQuestion: 2, type: "radio", ifIsChecked: 1, hide: [3] },
	{ indexQuestion: 4, type: "radio", ifIsChecked: 1, hide: [5] },
	{ indexQuestion: 9, type: "radio", ifIsChecked: 1, hide: [10, 11, 12] },
	{ indexQuestion: 13,type: "checkbox", ifIsChecked: [6,0],hide: [15, 16, 17]},
];

const managerConditionalQuestions = [
	{ indexQuestion: 2, type: "text", ifIsValue: "0", hide: [3] },
	{ indexQuestion: 4, type: "radio", ifIsChecked: 1, hide: [5] },
];

let rawDataToSend=[]
let calcDataToSend=[]