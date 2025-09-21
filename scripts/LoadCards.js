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

    constructor(dynamicCardCourses, rootElement) {
        this.dynamicCardCourses = dynamicCardCourses
        this.rootElement = rootElement
        this.loadButtonElement = this.rootElement.querySelector(this.selectors.loadButton)
        this.hideButtonElement = this.rootElement.querySelector(this.selectors.hideButton)
        this.titleElement = document.querySelector(this.selectors.title)
        this.bindEvents()
    }

    showMoreCards = () => {
        const increasingLimit = this.dynamicCardCourses.limitation += 9
        this.dynamicCardCourses.addDataToList()

        if (increasingLimit >= this.dynamicCardCourses.coursesCards.length) {
            this.loadButtonElement.classList.add(this.stateClasses.hide)
            if (this.hideButtonElement) {
                this.hideButtonElement.classList.remove(this.stateClasses.hide)
            }
        }
    }

    hideCards = () => {
        this.dynamicCardCourses.limitation = 9
        this.dynamicCardCourses.addDataToList()

        this.loadButtonElement.classList.remove(this.stateClasses.hide)
        if (this.hideButtonElement) {
            this.hideButtonElement.classList.add(this.stateClasses.hide)
        }

        if (this.titleElement) {
            this.titleElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    bindEvents() {
        if (this.loadButtonElement) {
            this.loadButtonElement.addEventListener('click', this.showMoreCards)
        }

        if (this.hideButtonElement) {
            this.hideButtonElement.addEventListener('click', this.hideCards)
        }
    }
}

export default LoadCards