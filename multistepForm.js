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
	}

	clickBtnsEvents() {
		this.form.addEventListener("click", e => {

            // Go if is validate
			if (Form.questions[this.currentStep].isValidate()) {
				if (e.target.matches("[data-next]")) {
					this.currentStep++;
					this.showCurrentStep();
				} else if (e.target.matches("[data-previous]")) {
					this.currentStep--;
					this.showCurrentStep();
				} else if (e.target.matches("[data-send]")) {
					this.goToFinish();
					return;
				} else {
					return;
				}
            }else{
				if (e.target.matches("[data-next]") || e.target.matches("[data-previous]") || e.target.matches("[data-send]")){
					Form.questions[this.currentStep].showInfoIfIsNotValidate()
				}
                
            }
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
}
