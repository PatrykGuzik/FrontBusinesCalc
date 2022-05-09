class Checkbox extends Form{
	constructor(question, subquestions,category, id) {
		super(question,subquestions,category,id)
		this.answers = [];
		this.checked = [];
		this.sumValues = 0;
	}

	createInput() {
		this.renderBox();
		this.updateBox();
		this.saveFormToQuestions();
	}

	setChecked() {
		for (let i = 0; i < this.subquestions.length; i++) {
			this.checked.push(false);
		}
	}
	setAnswers() {
		this.answers = this.subquestions.map(sbq => {
			return {question: this.question, subquestion: sbq, value: 0, isChecked: false };
		});
	}
	getAnswers(){
		return this.answers.map(answer => answer.isChecked)
	}
	updateSumValues() {
		this.sumValues = this.answers.reduce((pr, curr) => pr + curr.value, 0);
	}

	renderBox() {
		this.setChecked();
		this.setAnswers();
		this.updateSumValues();

		const box = document.getElementById(this.id);

		const questionHTML = `<h4>${this.question}</h4>`;
		let subquestionsHTML = "";
		this.subquestions.forEach((subq, index) => {
			subquestionsHTML += `<label><input data-ch="${
				index + 1
			}" type="checkbox"  name="${this.id}">${subq}</label>`;
		});
		const progressHTML = `
        <div data-pr=${this.id}>
            <div class="progress-nr">0%</div>
            <div  class="progress">
                <div class="fill"></div>
            </div>

        </div>
        `;

		let checkedSub = "";
		this.subquestions.forEach((subq, index) => {
			checkedSub += `
            <div data-chb="${index + 1}" class="f-${this.id} hidden">
                <div>${subq}</div> 
                <div class="btns">
                    <button data-btn-up="${index + 1}"></button>
                    <div data-nr="${index + 1}">0%</div>
                    <button data-btn-down="${index + 1}"></button>
                </div>
            </div>
            `;
		});

		const validateInfo = `<p class="is-not-validate-info">wskaźnik musi wynosić 100%</p>`

		box.innerHTML = `
        ${questionHTML} 
        <div class="sbq-${this.id}">${subquestionsHTML}</div>
        ${progressHTML}
		${validateInfo}
        <div data-chk class="chk-${this.id}">${checkedSub}
		${this.getButtonsHTML(parseInt(box.dataset.step-1))}`;
	}


	updateBox() {
		const checkbox_box = document.querySelector(`.sbq-${this.id}`);
		checkbox_box.addEventListener("input", e => {
			this.hideInfoIfIsValidate()
			const indexInput = e.target.dataset.ch - 1;
			const isChecked = e.target.checked;
			this.checked[indexInput] = isChecked;
			this.answers[indexInput].isChecked = isChecked;

			// Pokazuje i ukrywa input procentowy
			const thisInputPercent = document.querySelector(
				`#${this.id} [data-chb="${indexInput + 1}"]`
			);
			thisInputPercent.classList.toggle("hidden");

			// update wartości procentowych
			this.updateSumValues();
			this.resetPercentValueIfUnchecked();
			this.updateProgressBar();
		});
		this.updateValues()
	}

	updateValues() {
		const percentBox = document.querySelector(`.chk-${this.id}`);

		percentBox.addEventListener("click", e => {
			if (e.target.dataset.btnUp) {
				this.hideInfoIfIsValidate()
				const thisBtnNr = e.target.dataset.btnUp;

				if (this.sumValues < 100) {
					this.answers[thisBtnNr - 1].value += 10;
				}

				//update wartości %
				this.updatePercentValue(thisBtnNr);
			} else if (e.target.dataset.btnDown) {
				this.hideInfoIfIsValidate()
				const thisBtnNr = e.target.dataset.btnDown;

				if (this.answers[thisBtnNr - 1].value > 0) {
					this.answers[thisBtnNr - 1].value -= 10;
				}

				//update wartości %
				this.updatePercentValue(thisBtnNr);
			}
			this.updateProgressBar();
		});
	}

	updateProgressBar() {
		this.updateSumValues();
		const progress = document.querySelector(`[data-pr=${this.id}]`);
		const progressBarFill = progress.querySelector(".fill");
		const progressValue = progress.querySelector(".progress-nr");
		progressBarFill.style.width = `${this.sumValues}%`;
		progressValue.innerHTML = `${this.sumValues}%`;
	}

	updatePercentValue(thisBtnNr) {
		this.updateSumValues();
		const thisBox = document.querySelector(`.chk-${this.id}`);
		const thisPercent = thisBox.querySelector(`[data-nr='${thisBtnNr}']`);
		thisPercent.innerHTML = this.answers[thisBtnNr - 1].value + "%";
	}

	resetPercentValueIfUnchecked() {
		this.answers.forEach((answer, index) => {
			if (!answer.isChecked) {
				answer.value = 0;
			}

			this.updatePercentValue(index + 1);
		});
	}

	isValidate() {
		if (this.sumValues === 100) return true;
		else return false;
	}


}

