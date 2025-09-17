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
    fieldName: '[data-js-field-discount-name]',
    fieldFirstName: '[data-js-field-discount-first-name]',
    fieldLastName: '[data-js-field-discount-last-name]',
    fieldMessage: '[data-js-field-message]',
    inputFirstName: '[data-js-input-first-name]',
    inputLastName: '[data-js-input-last-name]',
    inputMessage: '[data-js-input-message]',
    fieldEmail: '[data-js-field-discount-email]',
    fieldPhone: '[data-js-field-phone]',
    inputName: '[data-js-input-discount-name]',
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
    this.fieldNameElement = this.rootElement.querySelector(this.selectors.fieldName);
    this.fieldFirstNameElement = this.rootElement.querySelector(this.selectors.fieldFirstName);
    this.fieldLastNameElement = this.rootElement.querySelector(this.selectors.fieldLastName);
    this.fieldMessageElement = this.rootElement.querySelector(this.selectors.fieldMessage);
    this.inputFirstNameElement = this.rootElement.querySelector(this.selectors.inputFirstName);
    this.inputLastNameElement = this.rootElement.querySelector(this.selectors.inputLastName);
    this.inputMessageElement = this.rootElement.querySelector(this.selectors.inputMessage);
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

    if (this.inputNameElement) {
      this.nameContent = this.inputNameElement.value;

      if (this.nameContent === '') {
        this.fieldNameElement.classList.add(this.stateClasses.activeError);
      } else {
        this.fieldNameElement.classList.remove(this.stateClasses.activeError);
      }
    } else if(this.inputFirstNameElement && this.inputLastNameElement) {
      this.firstNameContent = this.inputFirstNameElement.value;
      this.lastNameContent = this.inputLastNameElement.value;

      if (this.firstNameContent === '') {
        this.fieldFirstNameElement.classList.add(this.stateClasses.activeError);
      } else {
        this.fieldFirstNameElement.classList.remove(this.stateClasses.activeError);
      }

      if (this.lastNameContent === '') {
        this.fieldLastNameElement.classList.add(this.stateClasses.activeError);
      } else {
        this.fieldLastNameElement.classList.remove(this.stateClasses.activeError);
      }
    }

    if(this.fieldMessageElement) {
      this.messageContent = this.inputMessageElement.value;

      if (this.messageContent === '') {
        this.fieldMessageElement.classList.add(this.stateClasses.activeError);
      }else{
        this.fieldMessageElement.classList.remove(this.stateClasses.activeError);
      }
    }

    if (!isEmailValid) {
      this.fieldEmailElement.classList.add(this.stateClasses.activeError);
    } else {
      this.fieldEmailElement.classList.remove(this.stateClasses.activeError);
    }

    if (this.phonContent == '') {
      this.fieldPhoneElement.classList.remove(this.stateClasses.activeError);
    } else {
      if (!isPhoneValid) {
        this.fieldPhoneElement.classList.add(this.stateClasses.activeError);
      } else {
        this.fieldPhoneElement.classList.remove(this.stateClasses.activeError);
      }
    }

    // if (!isPhoneValid) {
    //   this.fieldPhoneElement.classList.add(this.stateClasses.activeError);
    // } else {
    //   this.fieldPhoneElement.classList.remove(this.stateClasses.activeError);
    // }

    if(this.successElement) {
      if (isEmailValid && this.nameContent !== '') {
        this.rootElement.classList.remove(this.stateClasses.active);
        this.successElement.classList.add(this.stateClasses.active);
      }
    }
  }
}

export default JoinFormCollection