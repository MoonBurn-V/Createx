const rootSelector = '[data-js-tabs]'

class Tabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
        subtitle: '.card__subtitle',
        item: '.card__item',
    }

    stateClasses = {
        active: 'active',
        hide: 'hide',
    }

    stateAttributs = {
        ariaSelector: 'aria-selector',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
        this.cardItems = document.querySelectorAll(this.selectors.item);
        this.state = {
            activeTabIndex: Array.from(this.buttonElements)
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.active))
        }
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.subtitleElement = document.querySelectorAll(this.selectors.subtitle);
        this.bindEvents();
        this.updateUI();
    }

    updateUI() {
        const {activeTabIndex} = this.state;

        this.buttonElements.forEach((buttonElement, index) => {
            const active = index === activeTabIndex;

            buttonElement.classList.toggle(this.stateClasses.active, active);
        });

        this.contentElements.forEach((contentElement, index) => {
            const active = index === activeTabIndex;

            contentElement.classList.toggle(this.stateClasses.active, active);
        });

        this.filterCards();
    }

    filterCards() {
        const activeButton = Array.from(this.buttonElements).find(button => button.classList.contains(this.stateClasses.active));

        const buttonText = activeButton.querySelector('span').textContent.trim();

        this.cardItems.forEach(cardItem => {
            const cardSubtitle = cardItem.querySelector(this.selectors.subtitle);

            const subtitleText = cardSubtitle.textContent.trim();

            if (buttonText === 'All') {
                cardItem.classList.remove(this.stateClasses.hide);
            } else if (subtitleText === buttonText) {
                cardItem.classList.remove(this.stateClasses.hide);
            } else {
                cardItem.classList.add(this.stateClasses.hide);
            }
        });
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