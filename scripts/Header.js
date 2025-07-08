
class Header {
    selectors = {
        root: '[data-js-header]',
        logo: '[data-js-header-logo]',
        overlay: '[data-js-header-overlay]',
        burgerButton: '[data-js-burger-button]',
        signInForm: '[data-js-sign-in]',
        signUpForm: '[data-js-sign-up]',
        signInHeader: '[data-js-sign-in-header]',
        signUpHeader: '[data-js-sign-up-header]',
        signInCross: '[data-js-sign-in-cross]',
        signUpCross: '[data-js-sign-up-cross]',
        signInLink: '[data-js-sign-in-link]',
        signUpLink: '[data-js-sign-up-link]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        activeForm: 'active-form',
        lockForm: 'lock-form',
        isDimmed: 'dimmed',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.logoElement = this.rootElement.querySelector(this.selectors.logo);
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay);
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
        this.signInFormElement = document.querySelector(this.selectors.signInForm);
        this.signUpFormElement = document.querySelector(this.selectors.signUpForm);
        this.signInHeaderElement = document.querySelector(this.selectors.signInHeader);
        this.signUpHeaderElement = document.querySelector(this.selectors.signUpHeader);
        this.signInCrossElement = document.querySelector(this.selectors.signInCross);
        this.signUpCrossElement = document.querySelector(this.selectors.signUpCross);
        this.signInLinkElement = document.querySelector(this.selectors.signInLink);
        this.signUpLinkElement = document.querySelector(this.selectors.signUpLink);

        // Определяем, нужно ли добавлять toggleMenuState на основе ширины экрана.
        this.isSmallScreen = window.innerWidth <= 830;
        this.bindEvents();

        // Слушаем изменение размера окна.  Если ширина изменится, перепривязываем события.
        window.addEventListener('resize', () => {
            const newIsSmallScreen = window.innerWidth <= 830;
            if (newIsSmallScreen !== this.isSmallScreen) {
                this.isSmallScreen = newIsSmallScreen;
                this.unbindEvents(); // Сначала отвязываем старые события.
                this.bindEvents();   // Затем привязываем новые.
            }
        });
    }

    onBurgerButtonClick = () => {
        this.toggleMenuState();
    }

    onBodyClick = (event) => {
        if (this.overlayElement.classList.contains(this.stateClasses.isActive) &&
            !this.rootElement.contains(event.target)) {
            this.toggleMenuState();
        }
        //Закрытие формы при клике снаружи
        // if (this.signInFormElement && !this.signInFormElement.contains(event.target) && this.SignInHeaderElement && !this.SignInHeaderElement.contains(event.target) && this.signInFormElement.classList.contains(this.stateClasses.activeForm)) {
        //     this.togglesignInFormElement();
        // }   
        // if (this.signUpForm && !this.signUpForm.contains(event.target) && this.SignUpHeaderElement && !this.SignUpHeaderElement.contains(event.target) && this.signUpForm.classList.contains(this.stateClasses.activeForm)) {
        //     this.toggleSignUpForm();
        // }
    }

    toggleMenuState = () => {
        this.logoElement.classList.toggle(this.stateClasses.isDimmed);
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);

        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(el => {
            if (el !== this.rootElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
            }
        });
    }

    toggleSignInFormElement = () => {
        document.documentElement.classList.toggle(this.stateClasses.lockForm);
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(el => {
            if (el !== this.signInFormElement && el !== this.signUpFormElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
            }
        });
        this.signInFormElement.classList.toggle(this.stateClasses.activeForm);
    }

    toggleSignUpFormElement = () => {
        document.documentElement.classList.toggle(this.stateClasses.lockForm);
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(el => {
            if (el !== this.signInFormElement && el !== this.signUpFormElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
            }
        });
        this.signUpFormElement.classList.toggle(this.stateClasses.activeForm);
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);
        document.body.addEventListener('click', this.onBodyClick);

        if (this.signInHeaderElement) {
            this.signInHeaderElement.addEventListener('click', this.toggleSignInFormElement);
            if (this.isSmallScreen) {
                this.signInHeaderElement.addEventListener('click', this.toggleMenuState);
            }
        }
        if (this.signUpHeaderElement) {
            this.signUpHeaderElement.addEventListener('click', this.toggleSignUpFormElement);
            if (this.isSmallScreen) {
                this.signUpHeaderElement.addEventListener('click', this.toggleMenuState);
            }
        }
        if (this.signInCrossElement) {
            this.signInCrossElement.addEventListener('click', this.toggleSignInFormElement);
        }
        if (this.signUpCrossElement) {
            this.signUpCrossElement.addEventListener('click', this.toggleSignUpFormElement);
        }

        if (this.signUpLinkElement) {
            this.signUpLinkElement.addEventListener('click', this.toggleSignInFormElement);
            this.signUpLinkElement.addEventListener('click', this.toggleSignUpFormElement);
        }

        if (this.signInLinkElement) {
            this.signInLinkElement.addEventListener('click', this.toggleSignUpFormElement);
            this.signInLinkElement.addEventListener('click', this.toggleSignInFormElement);
        }
    }

    // Функция для отвязки событий, чтобы избежать дублирования при изменении размера окна.
    unbindEvents() {
        if (this.signInHeaderElement) {
            this.signInHeaderElement.removeEventListener('click', this.toggleSignInFormElement);
            //this.signInHeaderElement.removeEventListener('click', this.toggleMenuState); // Всегда удаляем, даже если не добавляли.
        }
        if (this.signUpHeaderElement) {
            this.signUpHeaderElement.removeEventListener('click', this.toggleSignUpFormElement);
           // this.signUpHeaderElement.removeEventListener('click', this.toggleMenuState); // Всегда удаляем, даже если не добавляли.
        }

        // Здесь можно добавить отвязку других событий, если это необходимо.
        // this.burgerButtonElement.removeEventListener('click', this.onBurgerButtonClick);
        // document.body.removeEventListener('click', this.onBodyClick);

        // if (this.signInCrossElement) {
        //     this.signInCrossElement.removeEventListener('click', this.toggleSignInFormElement);
        // }
        // if (this.signUpCrossElement) {
        //     this.signUpCrossElement.removeEventListener('click', this.toggleSignUpFormElement);
        // }

        // if (this.signUpLinkElement) {
        //     this.signUpLinkElement.removeEventListener('click', this.toggleSignInFormElement);
        //     this.signUpLinkElement.removeEventListener('click', this.toggleSignUpFormElement);
        // }

        // if (this.signInLinkElement) {
        //     this.signInLinkElement.removeEventListener('click', this.toggleSignUpFormElement);
        //     this.signInLinkElement.removeEventListener('click', this.toggleSignInFormElement);
        // }
    }
}

export default Header