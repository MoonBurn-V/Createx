class LoadCards {
    selectors = {
        loadButton: '[data-js-load-btn]',
        hideButton: '[data-js-hide-btn]',
        item: '.card__item',
        title: '[data-js-title]',
    }

    stateClasses = {
        hide: 'hide',
    }

    constructor() {
        this.loadButtonElement = document.querySelector(this.selectors.loadButton);
        this.hideButtonElement = document.querySelector(this.selectors.hideButton);
        this.itemElements = Array.from(document.querySelectorAll(this.selectors.item));
        this.titleElement = document.querySelector(this.selectors.title);
        this.totalCards = this.itemElements.length;
        this.cardsToShow = 9;
        this.cardsShown = 9;
        this.hideInitialCards();
        this.bindEvents();
    }

    resetCardsShown() {
        this.cardsShown = 9;
    }

    bindEvents() {
        if (this.loadButtonElement) {
            this.loadButtonElement.addEventListener('click', this.showMoreCards);
        }

        if (this.hideButtonElement) {
            this.hideButtonElement.addEventListener('click', this.hideCards);
        }
    }

    showMoreCards = () => {
        for (let i = this.cardsShown; i < Math.min(this.cardsShown + this.cardsToShow, this.totalCards); i++) {
            this.itemElements[i].classList.remove(this.stateClasses.hide);
        }

        this.cardsShown += this.cardsToShow;

        if (this.cardsShown >= this.totalCards) {
            this.loadButtonElement.classList.add(this.stateClasses.hide);
            if (this.hideButtonElement) {
                this.hideButtonElement.classList.remove(this.stateClasses.hide);
            }
        }
    }

    hideCards = () => {
        this.resetCardsShown();
        this.hideInitialCards();
        
        this.loadButtonElement.classList.remove(this.stateClasses.hide);
        if (this.hideButtonElement) {
            this.hideButtonElement.classList.add(this.stateClasses.hide);
        }

        if (this.titleElement) {
            this.titleElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    hideInitialCards = () => {
        for (let i = this.cardsToShow; i < this.totalCards; i++) {
            this.itemElements[i].classList.add(this.stateClasses.hide);
        }
    }
}

export default LoadCards