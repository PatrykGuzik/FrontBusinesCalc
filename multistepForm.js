class MultistepForm {
	constructor() {
		this.form = document.querySelector("[data-multi-step]");
		this.formSteps = [...document.querySelectorAll("[data-step]")];
		this.currentStep = this.formSteps.findIndex(step =>
			step.classList.contains("center")
		);
	}

	getCurrentStep() {
		return this.currentStep();
	}

	changePage() {
		this.clickBtnsEvents();
		this.showCurrentStep();
		this.drawCategoryName(0)
	}

	clickBtnsEvents() {
		this.form.addEventListener("click", e => {
			// Go if is validate

			if (Form.questions[this.currentStep].isValidate()) {
				if (e.target.matches("[data-next]")) {
					this.currentStep++;
					this.showCurrentStep();
					this.drawCategoryName(this.currentStep);
				} else if (e.target.matches("[data-previous]")) {
					this.currentStep--;
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

	showCurrentStep() {
		this.formSteps.forEach((step, index) => {
			step.classList.toggle("left", index > this.currentStep);
			step.classList.toggle("right", index < this.currentStep);
			step.classList.toggle("center", index === this.currentStep);
		});
	}

	goToFinish() {
		console.log(Form.questions);
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
		const nextCategory = Form.getCategoryName(nextQuestion)// Question.getCategoryName(nextQuestion).category

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
}
