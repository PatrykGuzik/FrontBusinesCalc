class Range extends Form{
	constructor(question,subquestions=null,category,id,min=0, max=1000, unit) {
		super(question,subquestions,category,id)
		this.min = min;
		this.max = max;
		this.unit = unit;
		this.answers = [];
        this.startValue = parseInt((this.max - this.min)/2).toString() 
	}

	createInput() {
		this.renderBox();
		this.updateBox();
		this.saveFormToQuestions();
	}

	setAnswers() {
		if (this.subquestions) {
			this.answers = this.subquestions.map(sbq => {
				return { question: this.question, subquestion: sbq, value: this.startValue };
			});
		} else {
			this.answers = { question: this.question, value: this.startValue };
		}
	}


	renderBox() {
		this.setAnswers();
		const box = document.getElementById(this.id);

		const questionHTML = `<h4>${this.question}</h4>`;
		
		let subquestionsHTML = "";
		const percentValue = `${this.startValue}`
		if (this.subquestions) {
			
			this.subquestions.forEach((subq, index) => {
				subquestionsHTML += `<p>${subq}</p><p data-chf="${
					index + 1
				}" class="pc-v">${percentValue} ${this.unit}</p><input data-chb="${
					index + 1
				}" type="range" min="${this.min}" max="${this.max}">`;
			});
		} else {
			subquestionsHTML += `<p data-chf class="pc-v">${percentValue} ${this.unit}</p><input data-chb type="range" min="${this.min}" max="${this.max}">`;
		}

		box.innerHTML = `
        ${questionHTML} 
        <div class="sbq-${this.id}">${subquestionsHTML}</div>
		${this.getButtonsHTML(parseInt(box.dataset.step-1))}`;
	}


	updateBox() {
		const input_box = document.querySelector(`.sbq-${this.id}`);
		if (this.subquestions) {
			input_box.addEventListener("input", e => {
				const indexInput = e.target.dataset.chb - 1;
				const inputValue = input_box.querySelector(
					`[data-chb='${indexInput + 1}']`
				).value;
				const percentValue = input_box.querySelector(
					`[data-chf='${indexInput + 1}']`
				)

				this.answers[indexInput].value = inputValue;
				percentValue.innerHTML = `${inputValue} ${this.unit}`
			});
		}else{
			input_box.addEventListener("input", () => {
				
				const inputValue = input_box.querySelector(
					`[data-chb]`
				).value;
				const percentValue = input_box.querySelector(
					`[data-chf]`
				)

				this.answers.value = inputValue;
				percentValue.innerHTML = `${inputValue} ${this.unit}`
			});
		}
	}

	isValidate() {
		return true
	}
}