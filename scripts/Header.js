import LogInForm from "./LogInForm.js";
import ActiveSignForm from "./ActiveSignForm.js";

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
        signRoot: '[data-js-sign-root]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        activeForm: 'active-form',
        lockForm: 'lock-form',
        isDimmed: 'dimmed',
        fixed: 'fixed',
        hide: 'hide',
    }

    constructor() {
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

        this.signRootElement = document.querySelector(this.selectors.signRoot)
        this.activeSignForm = new ActiveSignForm(this, this.signRootElement)

        this.isSmallScreen = window.innerWidth <= 830;
        this.checkLoginStatus();
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

        this.scrollHandler = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.scrollHandler);

        if (this.logoElements.length > 0) {
            this.logoElements[0].classList.add(this.stateClasses.fixed);
        }

        this.updateFixedClasses();
    }

    checkLoginStatus() {
        if(localStorage.getItem('isLoggedIn') === 'true') {
            this.updateHeaderButtons()
        } else {
            this.resetHeaderButtons()
        }
    }

    updateHeaderButtons = () => {
        this.signInHeaderElement.classList.add(this.stateClasses.hide)
        this.signUpHeaderElement.classList.add(this.stateClasses.hide)
        this.spanElement.classList.add(this.stateClasses.hide)
        if(this.exitElement) {
            this.exitElement.classList.remove(this.stateClasses.hide)
        }
    }

    resetHeaderButtons = () => {
        this.signInHeaderElement.classList.remove(this.stateClasses.hide)
        this.signUpHeaderElement.classList.remove(this.stateClasses.hide)
        this.spanElement.classList.remove(this.stateClasses.hide)
        if(this.exitElement) {
            this.exitElement.classList.add(this.stateClasses.hide)
        }    
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
                if(this.exitElement) {
                    this.exitElement.classList.add(this.stateClasses.fixed);
                }
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
                if(this.exitElement) {
                    this.exitElement.classList.remove(this.stateClasses.fixed);
                }
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

    addSignInFormElement = () => {
        this.activeSignForm.activeSignIn()

        document.body.classList.add(this.stateClasses.lockForm)

        this.bodyChildren.forEach(el => {
            if (el !== this.signRootElement) {
                el.classList.add(this.stateClasses.isDimmed)
                el.inert = true
            }
        })
        this.formInstance = new LogInForm(this, this.signRootElement)
    }

    addSignUpFormElement = () => {
        this.activeSignForm.activeSignUp()

        document.body.classList.add(this.stateClasses.lockForm)
        this.bodyChildren.forEach(el => {
            if (el !== this.signRootElement) {
                el.classList.add(this.stateClasses.isDimmed)
                el.inert = true
            }
        })

        this.formInstance = new LogInForm(this, this.signRootElement)
    }

    exitingAccount = () => {
        localStorage.removeItem('isLoggedIn');
        this.resetHeaderButtons();
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);
        document.body.addEventListener('click', this.onBodyClick);

        if (this.signInHeaderElement) {
            if (this.isSmallScreen) {
                this.signInHeaderElement.addEventListener('click', this.toggleMenuState);
                this.signInHeaderElement.addEventListener('click', this.addSignInFormElement);
            } else {
                this.signInHeaderElement.addEventListener('click', this.addSignInFormElement);
            }
        }
        
        if (this.signUpHeaderElement) {
            if (this.isSmallScreen) {
                this.signUpHeaderElement.addEventListener('click', this.toggleMenuState);
                this.signUpHeaderElement.addEventListener('click', this.addSignUpFormElement);
            } else {
                this.signUpHeaderElement.addEventListener('click', this.addSignUpFormElement);
            }
        }

        if(this.exitElement) {
            this.exitElement.addEventListener('click', this.exitingAccount);
        }
    }

    unbindEvents() {
        if (this.signInHeaderElement) {
            this.signInHeaderElement.removeEventListener('click', this.addSignInFormElement);
        }
        if (this.signUpHeaderElement) {
            this.signUpHeaderElement.removeEventListener('click', this.addSignUpFormElement);
        }

        window.removeEventListener('scroll', this.scrollHandler);
    }
}


export default Header;