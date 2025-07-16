class Subscribe {
    selectors = {
        subscribeHeaders: '[data-js-subscribe-headers]',
        footerHeaders: '[data-js-footer-headers]',
        emailInput: '[data-js-email-input]',
        errorMassege: '[data-js-error-message]',
        btnSubmit: '[data-js-btn-submit]',
        recommendation: '[data-js-footer-recommendation]',
    }

    stateClasses = {
        visible: 'visible',
        activeError: 'active-error',
        done: 'done',
    }

    constructor() {
        this.subscribeHeadersElements = document.querySelectorAll(this.selectors.subscribeHeaders + ' .subscribe__title');
        this.footerHeadersElements = document.querySelectorAll(this.selectors.footerHeaders + ' .footer__menu-column-title');
        this.recommendationElement = document.querySelector(this.selectors.recommendation);
        this.btnSubmitElements = document.querySelectorAll(this.selectors.btnSubmit);
        this.bindEvents();

        if (this.subscribeHeadersElements.length > 0) {
            this.subscribeHeadersElements[0].classList.add(this.stateClasses.visible)
        }
    }

    bindEvents() {
        this.btnSubmitElements.forEach(button => {
            button.addEventListener('click', this.checkEmailInput);
        });
    }

    checkEmailInput = (event) => {
        event.preventDefault();

        const button = event.target;
        const index = parseInt(button.getAttribute('index'));

        const emailInput = document.querySelector(`${this.selectors.emailInput}[index="${index}"]`);
        const errorMessage = document.querySelector(`${this.selectors.errorMassege}[index="${index}"]`);

        const emailContent = emailInput ? emailInput.value : '';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(emailContent)) {
            emailInput.classList.add(this.stateClasses.activeError);
            errorMessage.classList.add(this.stateClasses.activeError);
        } else {
            emailInput.classList.remove(this.stateClasses.activeError);
            errorMessage.classList.remove(this.stateClasses.activeError);
            emailInput.classList.add(this.stateClasses.done);

            if (index === 0) {
                if (this.subscribeHeadersElements.length > 1) {
                    this.subscribeHeadersElements[0].classList.remove(this.stateClasses.visible);
                    this.subscribeHeadersElements[1].classList.add(this.stateClasses.visible);
                }
            }
            else if (index === 1) {
                if (this.footerHeadersElements.length > 1) {
                    this.footerHeadersElements[0].classList.remove(this.stateClasses.visible);
                    this.footerHeadersElements[1].classList.add(this.stateClasses.visible);
                    this.recommendationElement.classList.remove(this.stateClasses.visible);
                }
            }
        }
    }
}

export default Subscribe