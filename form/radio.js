class Radio extends Form{
    constructor(question, subquestions,category, id) {
		super(question,subquestions,category,id)
		this.answers = [];
        this.isOneChecked = false;
	}

    createInput() {
		this.renderBox();
		this.updateBox();
		this.saveFormToQuestions();
	}


    setAnswers() {
		this.answers = this.subquestions.map(sbq => {
			return {question: this.question, subquestion: sbq, isChecked: false };
		});
	}

	getAnswers(){
		return this.answers.map(answer => answer.isChecked)
	}


    renderBox() {
		this.setAnswers();

		const box = document.getElementById(this.id);

		const questionHTML = `<h4>${this.question}</h4>`;
		let subquestionsHTML = "";
		this.subquestions.forEach((subq, index) => {
			subquestionsHTML += `
			<label class="container-radio">${subq}
				<input data-ch="${index + 1}" type="radio"  name="${this.id}"> 
				<span class="checkmark"> </span> 
			</label>`;
		});

		const validateInfo = `<p class="is-not-validate-info">zaznacz przynajmniej jedną odpowiedź</p>`


		box.innerHTML = `
        ${questionHTML} 
        <div data-radio class="sbq-${this.id}">${subquestionsHTML}</div>
		${validateInfo}
		${this.getButtonsHTML(parseInt(box.dataset.step-1))}`;
	}


    updateBox() {
		const checkbox_box = document.querySelector(`.sbq-${this.id}`);
		checkbox_box.addEventListener("input", e => {
			this.hideInfoIfIsValidate()
            this.isOneChecked = true;
			const indexInput = e.target.dataset.ch - 1;
			const isChecked = e.target.checked;
            this.answers.forEach(answer => {
                answer.isChecked = false;
            });
			this.answers[indexInput].isChecked = isChecked;

		});
	}

    isValidate() {
        if(this.isOneChecked) return true;
        else return false;
	}


}