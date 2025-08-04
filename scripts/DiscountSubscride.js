class DiscountSubscride {
    selectors = {
        fieldEmail: '[data-js-field-email]',
        fieldPhone: '[data-js-field-phone]',
        inputName: '[data-js-input-name]',
        inputEmail: '[data-js-input-email]',
        inputphone: '[data-js-input-phone]',
        discountButton: '[data-js-discount-button]',
    }

    stateClasses = {
        activeError: 'active-error',
    }

    constructor() {
        this.fieldEmailElement = document.querySelector(this.selectors.fieldEmail);
        this.fieldPhoneElement = document.querySelector(this.selectors.fieldPhone);
        this.inputNameElement = document.querySelector(this.selectors.inputName);
        this.inputEmailElement = document.querySelector(this.selectors.inputEmail);
        this.inputphoneElement = document.querySelector(this.selectors.inputphone);
        this.discountButtonElement = document.querySelector(this.selectors.discountButton);
        this.bindEvents();
    }

    bindEvents() {
        if(this.discountButtonElement) {
            this.discountButtonElement.addEventListener('click', this.checkingInputContents);
        }
    }

    checkingInputContents = (event) => {
        this.emailContent = this.inputEmailElement ? this.inputEmailElement.value : '';
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.phoneContent = this.inputphoneElement ? this.inputphoneElement.value : '';
        this.phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?:\s*([x#]\d+))?\s*$/;

        if (!this.emailRegex.test(this.emailContent)) {
            this.fieldEmailElement.classList.add(this.stateClasses.activeError);
            event.preventDefault();
        } else if (this.emailRegex.test(this.emailContent)) {
            this.fieldEmailElement.classList.remove(this.stateClasses.activeError);
        }

        if(!this.phoneRegex.test(this.phoneContent)) {
            this.fieldPhoneElement.classList.add(this.stateClasses.activeError);
            event.preventDefault();
        } else if (this.phoneRegex.test(this.phoneContent)) {
            this.fieldPhoneElement.classList.remove(this.stateClasses.activeError);
        }
    }
}

export default DiscountSubscride