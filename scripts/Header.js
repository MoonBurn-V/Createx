import LogInForm from "./LogInForm.js";

class Header {
    selectors = {
        root: '[data-js-header]',
        body: '[data-js-header-body]',
        logo: '[data-js-header-logo]',
        overlay: '[data-js-header-overlay]',
        headerLinck: '.header__menu-linck',
        burgerButton: '[data-js-burger-button]',
        signInHeader: '[data-js-sign-in-header]',
        signUpHeader: '[data-js-sign-up-header]',
        span:'[data-js-header-span]',
        exit: '[data-js-exit]',
        signInCross: '[data-js-sign-in-cross]',
        signUpCross: '[data-js-sign-up-cross]',
        signInLink: '[data-js-sign-in-link]',
        signUpLink: '[data-js-sign-up-link]',
        hero: '[data-js-hero]',
        signInForm: '[data-js-sign-in]',
        signUpForm: '[data-js-sign-up]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        activeForm: 'active-form',
        lockForm: 'lock-form',
        isDimmed: 'dimmed',
        fixed: 'fixed',
        hide: 'hide', //&&&&&
    }

    constructor() { //formInstance
        this.rootElement = document.querySelector(this.selectors.root);
        this.bodyElement = this.rootElement.querySelector(this.selectors.body);
        this.logoElement = this.rootElement.querySelector(this.selectors.logo);
        this.logoElements = this.rootElement.querySelectorAll(this.selectors.logo + ' .logo__img');
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay);
        this.headerLinckElements = document.querySelectorAll(this.selectors.headerLinck);
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
        this.signInHeaderElement = document.querySelector(this.selectors.signInHeader);
        this.signUpHeaderElement = document.querySelector(this.selectors.signUpHeader);
        this.spanElement = document.querySelector(this.selectors.span);
        this.exitElement = document.querySelector(this.selectors.exit);
        this.signInCrossElement = document.querySelector(this.selectors.signInCross);
        this.signUpCrossElement = document.querySelector(this.selectors.signUpCross);
        this.signInLinkElement = document.querySelector(this.selectors.signInLink);
        this.signUpLinkElement = document.querySelector(this.selectors.signUpLink);
        this.heroElement = document.querySelector(this.selectors.hero);
        this.bodyChildren = Array.from(document.body.children);

        this.signInFormElement = document.querySelector(this.selectors.signInForm);
        this.signUpFormElement = document.querySelector(this.selectors.signUpForm);

        this.isSmallScreen = window.innerWidth <= 830;
        this.bindEvents();

        window.addEventListener('resize', () => {
            const newIsSmallScreen = window.innerWidth <= 830;
            if (newIsSmallScreen !== this.isSmallScreen) {
                this.isSmallScreen = newIsSmallScreen;
                this.updateFixedClasses();
                this.unbindEvents();
                this.bindEvents();
            }
        });

        //this.formInstance = formInstance;

        this.scrollHandler = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.scrollHandler);

        if (this.logoElements.length > 0) {
            this.logoElements[0].classList.add(this.stateClasses.fixed);
        }

        this.updateFixedClasses();
    }

    handleScroll() {
        const scrollPosition = window.scrollY || window.pageYOffset;
        const fixedThreshold = 300;

        const toggleFixedClass = (element, shouldAdd) => {
            if (shouldAdd) {
                element.classList.add(this.stateClasses.fixed);
            } else {
                element.classList.remove(this.stateClasses.fixed);
            }
        };

        let shouldBeFixed = scrollPosition >= fixedThreshold;

        if (this.heroElement) {
            const heroHeight = this.heroElement.offsetHeight;
            shouldBeFixed = scrollPosition >= heroHeight;
        }


        if (shouldBeFixed) {
            this.rootElement.classList.add(this.stateClasses.fixed);
            this.bodyElement.classList.add(this.stateClasses.fixed);
            if (!this.isSmallScreen) {
                this.headerLinckElements.forEach(link => toggleFixedClass(link, true));
                this.signInHeaderElement.classList.add(this.stateClasses.fixed);
                this.signUpHeaderElement.classList.add(this.stateClasses.fixed);
                this.spanElement.classList.add(this.stateClasses.fixed);
            }

            if (this.logoElements.length > 1) {
                this.logoElements[1].classList.add(this.stateClasses.fixed);
                this.logoElements[0].classList.remove(this.stateClasses.fixed);
            }
        } else {
            this.rootElement.classList.remove(this.stateClasses.fixed);
            this.bodyElement.classList.remove(this.stateClasses.fixed);

            if (!this.isSmallScreen) {
                this.headerLinckElements.forEach(link => toggleFixedClass(link, false));
                this.signInHeaderElement.classList.remove(this.stateClasses.fixed);
                this.signUpHeaderElement.classList.remove(this.stateClasses.fixed);
                this.spanElement.classList.remove(this.stateClasses.fixed);
            }

            if (this.logoElements.length > 1) {
                this.logoElements[1].classList.remove(this.stateClasses.fixed);
                this.logoElements[0].classList.add(this.stateClasses.fixed);
            }
        }
    }

    updateFixedClasses() {
        const toggleFixedClass = (element, shouldAdd) => {
            if (shouldAdd) {
                element.classList.add(this.stateClasses.fixed);
            } else {
                element.classList.remove(this.stateClasses.fixed);
            }
        };

        if (this.isSmallScreen) {
            this.headerLinckElements.forEach(link => toggleFixedClass(link, false));
            this.signInHeaderElement.classList.remove(this.stateClasses.fixed);
            this.signUpHeaderElement.classList.remove(this.stateClasses.fixed);
            this.spanElement.classList.remove(this.stateClasses.fixed);
        }
        else {
            this.handleScroll();
        }
    }

    onBurgerButtonClick = () => {
        this.toggleMenuState();
    }

    onBodyClick = (event) => {
        if (this.overlayElement.classList.contains(this.stateClasses.isActive) &&
            !this.rootElement.contains(event.target)) {
            this.toggleMenuState();
        }
    }

    toggleMenuState = () => {
        this.logoElement.classList.toggle(this.stateClasses.isDimmed);
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);

        this.bodyChildren.forEach(el => {
            if (el !== this.rootElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
            }
        });
    }

    toggleSignInFormElement = () => {
        document.body.classList.toggle(this.stateClasses.lockForm);
        this.bodyChildren.forEach(el => {
            if (el !== this.signInFormElement && el !== this.signUpFormElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
                el.inert = true;
            }
        });
        this.signInFormElement.classList.toggle(this.stateClasses.activeForm);
        //this.formInstance.setActiveForm(this.signInFormElement);

        this.formInstance = new LogInForm(this, this.signInFormElement);
    }

    inertFolseSignIn = () => {
        this.bodyChildren.forEach(el => {
            if (el !== this.signInFormElement && el !== this.signUpFormElement) {
                el.inert = false;
            }
        });
    }

    toggleSignUpFormElement = () => {
        document.body.classList.toggle(this.stateClasses.lockForm);
        this.bodyChildren.forEach(el => {
            if (el !== this.signInFormElement && el !== this.signUpFormElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
                el.inert = true;
            }
        });
        this.signUpFormElement.classList.toggle(this.stateClasses.activeForm);
        //this.formInstance.setActiveForm(this.signUpFormElement);

        this.formInstance = new LogInForm(this, this.signUpFormElement);
    }

    inertFolseSignUp = () => {
        this.bodyChildren.forEach(el => {
            if (el !== this.signInFormElement && el !== this.signUpFormElement) {
                el.inert = false;
            }
        });
    }

    exitingAccount = () => {
        this.signInHeaderElement.classList.remove(this.stateClasses.hide)
        this.signUpHeaderElement.classList.remove(this.stateClasses.hide)
        this.spanElement.classList.remove(this.stateClasses.hide)
        this.exitElement.classList.add(this.stateClasses.hide)
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
            this.signInCrossElement.addEventListener('click', this.inertFolseSignIn);
        }
        if (this.signUpCrossElement) {
            this.signUpCrossElement.addEventListener('click', this.toggleSignUpFormElement);
            this.signUpCrossElement.addEventListener('click', this.inertFolseSignUp);
        }

        if (this.signUpLinkElement) {
            this.signUpLinkElement.addEventListener('click', this.toggleSignInFormElement);
            this.signUpLinkElement.addEventListener('click', this.toggleSignUpFormElement);
        }

        if (this.signInLinkElement) {
            this.signInLinkElement.addEventListener('click', this.toggleSignUpFormElement);
            this.signInLinkElement.addEventListener('click', this.toggleSignInFormElement);
        }

        if(this.exitElement) {
            this.exitElement.addEventListener('click', this.exitingAccount);
        }
    }

    unbindEvents() {
        if (this.signInHeaderElement) {
            this.signInHeaderElement.removeEventListener('click', this.toggleSignInFormElement);
        }
        if (this.signUpHeaderElement) {
            this.signUpHeaderElement.removeEventListener('click', this.toggleSignUpFormElement);
        }

        window.removeEventListener('scroll', this.scrollHandler);
    }
}


export default Header;