class Subscribe{
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
        this.emailInputElement = document.querySelector(this.selectors.emailInput);
        this.errorMassegeElement = document.querySelector(this.selectors.errorMassege);
        this.btnSubmitElement = document.querySelector(this.selectors.btnSubmit);
        this.bindEvents();

        if(this.subscribeHeadersElements.length > 0) {
            this.subscribeHeadersElements[0].classList.add(this.stateClasses.visible)
        }
    }

    bindEvents() {
        if(this.btnSubmitElement) {
            this.btnSubmitElement.addEventListener('click', this.checkEmailInput)
        }
    }

    checkEmailInput = (event) => {
        event.preventDefault();

        this.emailContent = this.emailInputElement ? this.emailInputElement.value : '';
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!this.emailRegex.test(this.emailContent)) {
            this.emailInputElement.classList.add(this.stateClasses.activeError);
            this.errorMassegeElement.classList.add(this.stateClasses.activeError);
        }else if (this.emailRegex.test(this.emailContent)) {
            this.emailInputElement.classList.remove(this.stateClasses.activeError);
            this.errorMassegeElement.classList.remove(this.stateClasses.activeError);
            this.emailInputElement.classList.add(this.stateClasses.done);
            this.subscribeHeadersElements[0].classList.remove(this.stateClasses.visible);
            this.subscribeHeadersElements[1].classList.add(this.stateClasses.visible);
        }
    }
}

export default Subscribe