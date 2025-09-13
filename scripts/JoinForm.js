const rootSelector = '[data-js-join]'

class JoinFormCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new JoinForm(element)
    })
  }
}

class JoinForm {
  selectors = {
    fieldEmail: '[data-js-field-discount-email]',
    fieldPhone: '[data-js-field-phone]',
    inputName: '[data-js-input-name]',
    inputEmail: '[data-js-input-discount-email]',
    inputphone: '[data-js-input-mask]',
    discountButton: '[data-js-discount-button]',
    success: '[data-js-success]',
  }

  stateClasses = {
    active: 'active',
    activeError: 'active-error',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.fieldEmailElement = this.rootElement.querySelector(this.selectors.fieldEmail);
    this.fieldPhoneElement = this.rootElement.querySelector(this.selectors.fieldPhone);
    this.inputNameElement = this.rootElement.querySelector(this.selectors.inputName);
    this.inputEmailElement = this.rootElement.querySelector(this.selectors.inputEmail);
    this.inputphoneElement = this.rootElement.querySelector(this.selectors.inputphone);
    this.discountButtonElement = this.rootElement.querySelector(this.selectors.discountButton);
    this.successElement = document.querySelector(this.selectors.success);
    this.bindEvents();
    
  }

  bindEvents() {
    if(this.discountButtonElement) {
      this.discountButtonElement.addEventListener('click', this.checkingInputContents);
    }
  }

  checkingInputContents = (event) => {
    event.preventDefault();

    this.emailContent = this.inputEmailElement ? this.inputEmailElement.value : '';
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.phonContent = this.inputphoneElement.value;


    let isEmailValid = this.emailRegex.test(this.emailContent);
    const cleanedPhone = this.phonContent.replace(/\D/g, '');
    let isPhoneValid = cleanedPhone.length === 10;


    if (!isEmailValid) {
      this.fieldEmailElement.classList.add(this.stateClasses.activeError);
    } else {
      this.fieldEmailElement.classList.remove(this.stateClasses.activeError);
    }


    if (!isPhoneValid) {
       this.fieldPhoneElement.classList.add(this.stateClasses.activeError);
    } else {
       this.fieldPhoneElement.classList.remove(this.stateClasses.activeError);
    }


    if (isEmailValid && isPhoneValid) {
        this.rootElement.classList.remove(this.stateClasses.active);
        this.successElement.classList.add(this.stateClasses.active);
    }

  }
}

export default JoinFormCollection