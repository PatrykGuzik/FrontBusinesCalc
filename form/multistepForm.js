class MultistepForm {
	constructor() {
		this.form = document.querySelector("[data-multi-step]");
		this.formSteps = [...document.querySelectorAll("[data-step]")];
		this.currentStep = this.formSteps.findIndex(step =>
			step.classList.contains("center")
		);
		this.visibleSteps = this.formSteps.map(
			step => parseInt(step.dataset.step) - 1
		);
	}

	getCurrentStep() {
		return this.currentStep();
	}

	changePage() {
		this.clickBtnsEvents();
		this.showCurrentStep();
		// this.drawCategoryName(0);
	}

	setCurrentStep(currentStep){
		this.currentStep = currentStep
	}

	clickBtnsEvents() {
		this.form.addEventListener("click", e => {
			// Go if is validate
			this.setConditionalQuestions();
			if (Form.questions[this.currentStep].isValidate()) {
				if (e.target.matches("[data-next]")) {
					this.currentStep += this.skipStepUp();
					this.showCurrentStep();
					this.drawCategoryName(this.currentStep);
				} else if (e.target.matches("[data-previous]")) {
					this.currentStep += this.skipStepDown();
					this.showCurrentStep();
					this.drawCategoryName(this.currentStep);
				} else if (e.target.matches("[data-send]")) {
					this.goToFinish();
					return;
				} else {
					return;
				}
			} else {
				if (
					e.target.matches("[data-next]") ||
					e.target.matches("[data-previous]") ||
					e.target.matches("[data-send]")
				) {
					Form.questions[this.currentStep].showInfoIfIsNotValidate();
				}
			}
			this.updateProgressBar();
		});
	}

	skipStepUp() {
		let skip = 1;
		while (true) {
			if (this.visibleSteps.includes(this.currentStep + skip)) return skip;
			else skip++;
		}
	}

	skipStepDown() {
		let skip = -1;
		while (true) {
			if (this.visibleSteps.includes(this.currentStep + skip)) return skip;
			else skip--;
		}
	}

	showCurrentStep() {
		this.formSteps.forEach((step, index) => {
			step.classList.toggle("left", index > this.currentStep);
			step.classList.toggle("right", index < this.currentStep);
			step.classList.toggle("center", index === this.currentStep);
		});
		this.updateProgressBar()
	}

	goToFinish() {
		showAnswers();
	}

	// progress bar
	updateProgressBar() {
		const progressBarCover = document.querySelector(".progress-bar .cover");
		progressBarCover.style.width = `${
			100 - this.getProgressValue(this.formSteps.length, this.currentStep)
		}%`;
	}
	getProgressValue(numberOfQuestions, currentQuestion) {
		return parseInt((currentQuestion * 100) / (numberOfQuestions - 1));
	}

	// category name

	drawCategoryName(nextQuestion) {
		const categoryName = document.querySelector(".category-name");
		const currentCategory = categoryName.innerHTML;
		const nextCategory = Form.getCategoryName(nextQuestion);

		if (!nextCategory) {
			return;
		}

		if (currentCategory == nextCategory) return;
		else {
			categoryName.classList.add("turn");
			categoryName.addEventListener("transitionend", () => {
				categoryName.classList.remove("turn");
				categoryName.innerHTML = nextCategory;
			});
		}
	}

	hideQuestion(dataStepIndex) {
		this.visibleSteps = this.arrayRemove(this.visibleSteps, dataStepIndex);
	}

	showQuestion(dataStep) {
		if (this.visibleSteps.includes(dataStep)) return;
		this.visibleSteps.push(dataStep);
		this.visibleSteps.sort((a, b) => a - b);
	}

	arrayRemove(arr, value) {
		return arr.filter(function (geeks) {
			return geeks != value;
		});
	}

	setConditionalQuestions() {
		Form.conditionalQuestions.map(q => {
			switch (q.type) {
				case "radio":
					if (this.isCheckedInRadio(q.indexQuestion, q.ifIsChecked)) {
						q.hide.forEach(element => {
							this.hideQuestion(element);
						});
					} else {
						q.hide.forEach(element => {
							this.showQuestion(element);
						});
					}
					break;

				case "checkbox":
					if (this.isCheckedInCheckbox(q.indexQuestion, q.ifIsChecked)) {
						q.hide.forEach(element => {
							this.hideQuestion(element);
						});
					} else {
						q.hide.forEach(element => {
							this.showQuestion(element);
						});
					}
					break;

				case "text":
					console.log(this.isValueInTextInput(q.indexQuestion, q.ifIsValue));
					if (this.isValueInTextInput(q.indexQuestion, q.ifIsValue)) {
						q.hide.forEach(element => {
							this.hideQuestion(element);
						});
					} else {
						q.hide.forEach(element => {
							this.showQuestion(element);
						});
					}
					break

				default:
					break;
			}
		});


	}

	// UKRYWA Jeżeli zaznaczone
	isCheckedInRadio(questionIndex, answerIndex) {
		return Form.questions[questionIndex].getAnswers()[answerIndex] === true;
	}

	// POKAZUJE Jeżeli zaznaczone
	isCheckedInCheckbox(questionIndex, answerIndex){
		return Form.questions[questionIndex].getAnswers()[answerIndex] === false;
	}

	// POKAZUJE Jeżeli zgodne z wartoścą
	isValueInTextInput(questionIndex, isValue){
		return Form.questions[questionIndex].getAnswers().value !== isValue;
	}


}
