class Form{

	static questions = []
	static nbOfQuestions = 0
	static conditionalQuestions = []

    constructor(question, subquestions = null, category, id) {
		this.question = question;
		this.subquestions = subquestions;
		this.category = category;
		this.id = id;
		this.answers = [];
	}

	static createInputs(jsonData) {
		jsonData.forEach((element, index) => {
			switch (element.type) {
				case "radio":
					new Radio(element.question, element.subquestions, element.category, `card${index+1}`).createInput()
					break;
				case "input":
					new InputNumber(element.question, element.subquestions, element.category, `card${index+1}`, element.min, element.max, element.unit).createInput()
					break;
				case "checkbox":
					new Checkbox(element.question, element.subquestions, element.category, `card${index+1}`).createInput()
					break;
				case "range":
					new Range(element.question, element.subquestions, element.category, `card${index+1}`, element.min, element.max, element.unit).createInput()
					break;
				default:
					break;
			}
		});
	}

	static generateMultiformStepFormHTML(nbOfQuestions){
		Form.nbOfQuestions = nbOfQuestions;
		const multiStepForm = document.querySelector(".multi-step-form")
		let formInner = ''
		for (let i = 0; i < nbOfQuestions; i++) {
			if(i===0){
				formInner += `
				<div class="card center" data-step="${i+1}" id="card${i+1}"></div>
				`
			}else{
				formInner += `
				<div class="card left" data-step="${i+1}" id="card${i+1}"></div>
				`
			}
			
		}
	
		multiStepForm.innerHTML = formInner
	}
	
	static getCategoryName(questionIndex) {
		return Form.questions[questionIndex].category
	}

	saveFormToQuestions(){
		Form.questions.push(this)
	}

    drawButtons(){
		return `<div> <button data-previous>poprzedni</button> <button data-next>następny</button> </div>`
	}

    getButtonsHTML(index) {
		
		if (index == 0) return `<div class="btns-step"><button data-next type='button'>NASTĘPNY KROK</button></div>`;
		else if (index == Form.nbOfQuestions-1)
			return `
			<div class="btns-step">
				<div class="btns-step"><button data-previous type='button'></button> 
				<button data-send type='button'>SEND</button></div>
			</div>
			
			`;
		else
			return `
			<div class="btns-step">
				<div class="btns-step"><button data-previous type='button'></button> 
        		<button data-next type='button'>NASTĘPNY KROK</button></div>
			</div>`;
	}

    getAnswers(){
		return this.answers
	}

	showInfoIfIsNotValidate(){
		const card = document.querySelector(`#${this.id}`)
		const validateInfo = card.querySelector(".is-not-validate-info")
		validateInfo.classList.add("active")
	}

	hideInfoIfIsValidate(){
		const card = document.querySelector(`#${this.id}`)
		const validateInfo = card.querySelector(".is-not-validate-info")
		validateInfo.classList.remove("active")
	}

	hideCards(){
		
	}
}