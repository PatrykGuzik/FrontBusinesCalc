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



function showQuestionInfo(dataManager, dataEmployee) {
    const manager = JSON.parse(dataManager[0].raw_answers) 
    const employee = JSON.parse(dataEmployee[0].raw_answers)
    // wszystkie pytania (dla pracowników i menagerów)
    const allQuestions = manager
    employee.forEach(d => {
        allQuestions.push(d)
    });
    


    const tables = document.querySelector(".tables")
    const infoBox = document.querySelector(".info-box")
    const infoBoxContent = infoBox.querySelector(".content")
    const infoBoxName = infoBox.querySelector(".name")
    tables.addEventListener("mouseover", (e)=>{
        
        if(e.target.dataset.name){
            console.log(e.target.dataset.name, e.target.dataset.type);
            infoBox.classList.add("active")
            infoBoxName.innerHTML = e.target.dataset.name
            infoBoxContent.innerHTML = getInfoByName(allQuestions, e.target.dataset.name, e.target.dataset)
        }else{
            infoBox.classList.remove("active")
        }
    })
}

function getInfoByName(data, name, dataset) {
    console.log(data);
    const question = data.find(a => a.name==name)
    console.log(question);



    if(question.type == "input"){
        if(!Array.isArray(question.answers)) return `
        <ul>
            <li>typ pytania: input</li>
            <li>pytanie: ${question.answers.question}</li>
        </ul>
        `
        else{
            return `
            <ul>
                <li>typ pytania: input</li>
                <li>pytanie: ${question.answers[0].question} - ${dataset.sub}</li>
            </ul>
            `
        }
    } 
    if(question.type == "range"){
        return `
        <ul>
            <li>typ pytania: range</li>
            <li>pytanie: ${question.answers.question}</li>
        </ul>
        `
    } 

    if(question.type == "radio") {
        let ans = "0-brak odpowiedzi "
        question.answers.forEach((answer, index) => {
            console.log(answer.subquestion );
            ans += `${index+1}-${answer.subquestion} `
        });
        
        return `
        <ul>
            <li>typ pytania: radio</li>
            <li>pytanie: ${question.answers[0].question}</li>
            <li>odpowiedzi: ${ans} </li>
        </ul>
        `
    } 

    if(question.type == "checkbox"){
        return `
        <ul>
            <li>typ pytania: checkbox</li>
            <li>pytanie: ${question.answers[0].question} - ${dataset.sub}</li>
        </ul>
        `
    } 

}