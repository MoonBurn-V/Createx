const rootSelector = '[data-js-tabs]'

class Tabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
    }

    stateClasses = {
        active: 'active',
    }

    stateAttributs = {
        ariaSelector: 'aria-selector',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button); // Изменено
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content); // Изменено
        this.state = {
            activeTabIndex: Array.from(this.buttonElements) // Преобразуем NodeList в Array для findIndex
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.active)) // Используем contains для проверки класса
        }
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
        this.updateUI();
    }

    updateUI() {
        const {activeTabIndex} = this.state

        this.buttonElements.forEach((buttonElement, index) => {
            const active = index === activeTabIndex

            buttonElement.classList.toggle(this.stateClasses.active, active)
        })

        this.contentElements.forEach((contentElement, index) => {
            const active = index === activeTabIndex

            contentElement.classList.toggle(this.stateClasses.active, active)
        })
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;
        this.updateUI();
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index))
        })
    }
}

class TabsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element)
        })
    }

}

export default TabsCollection