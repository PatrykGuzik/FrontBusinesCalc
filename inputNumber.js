class InputNumber extends Form {
	constructor(question, subquestions = null,category, id, min, max, unit) {
		super(question,subquestions,category,id)
		this.min = min;
		this.max = max;
		this.unit = unit;
		this.answers = [];
	}

	createInput() {
		this.renderBox();
		this.updateBox();
		this.saveFormToQuestions();
	}

	setAnswers() {
		if (this.subquestions) {
			this.answers = this.subquestions.map(sbq => {
				return { question: this.question, subquestion: sbq, value: null };
			});
		} else {
			console.log("set");
			this.answers = { question: this.question, value: null };
		}
	}


	renderBox() {
		this.setAnswers();
		const box = document.getElementById(this.id);

		const questionHTML = `<h4>${this.question}</h4>`;
		let subquestionsHTML = "";
		if (this.subquestions) {
			this.subquestions.forEach((subq, index) => {
				subquestionsHTML += `<p>${subq}</p> <label class="number-box"><input data-chb="${
					index + 1
				}" type="number" min="${this.min}" max="${this.max}"><span>${this.unit}</span></label>`;
			});
		} else {
			subquestionsHTML += `<label class="number-box"><input data-chb type="number" min="${this.min}" max="${this.max}"><span>${this.unit}</span></label>`;
		}

		const validateInfo = `<p class="is-not-validate-info">uzupełnij wszystkie pola wartościami pomiędzy ${this.min} a ${this.max}</p>`

		box.innerHTML = `
        ${questionHTML} 
        <div class="sbq-${this.id}">${subquestionsHTML}</div>
		${validateInfo}
		${this.getButtonsHTML(parseInt(box.dataset.step-1))}`;
	}


	updateBox() {
		const input_box = document.querySelector(`.sbq-${this.id}`);
		if (this.subquestions) {
			input_box.addEventListener("input", e => {
				this.hideInfoIfIsValidate()

				const indexInput = e.target.dataset.chb - 1;
				const inputValue = input_box.querySelector(
					`[data-chb='${indexInput + 1}']`
				).value;
	
				this.answers[indexInput].value = inputValue;
			});
		}else{
			input_box.addEventListener("input", e => {
				this.hideInfoIfIsValidate()

				const inputValue = input_box.querySelector(
					`[data-chb]`
				).value;

				this.answers.value = inputValue;
			});
		}
	}

	isValidate() {
		if (this.subquestions) {
			if (this.answers.every(answer => answer.value != null)) return true
			else return false
		} else {
			if (this.answers.value !== null && this.valueIsOffScale()) return true;
			else return false;
		}
	}

	valueIsOffScale(){
		if (this.answers.value < this.min || this.answers.value > this.max) return false
		else return true
	}


}
