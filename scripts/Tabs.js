const rootSelector = '[data-js-tabs]'

class TabsCollection {
    constructor(loadCardsInstance) {
        this.loadCardsInstance = loadCardsInstance;
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element, this.loadCardsInstance)
        })
    }
}

class Tabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
        subtitle: '.card__subtitle',
        item: '.card__item',
        loadButton: '[data-js-load-btn]',
        superscript: '.tabs__superscript',
    }

    stateClasses = {
        active: 'active',
        hide: 'hide',
    }

    stateAttributs = {
        tabIndex: 'tabindex',
        ariaSelected: 'aria-selected',
    }

    constructor(rootElement, loadCardsInstance) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
        this.cardItems = Array.from(document.querySelectorAll(this.selectors.item));
        this.state = {
            activeTabIndex: Array.from(this.buttonElements)
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.active))
        }
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.subtitleElement = document.querySelectorAll(this.selectors.subtitle);
        this.isInsideCoursesTabs = this.rootElement.closest('.courses__tabs.tabs') !== null;
        this.loadButtonElement = document.querySelector(this.selectors.loadButton);
        this.loadCardsInstance = loadCardsInstance;
        this.bindEvents();
        this.updateUI();
        this.updateSuperscripts();
    }

    updateUI() {
        const {activeTabIndex} = this.state;

        this.buttonElements.forEach((buttonElement, index) => {
            const activeTab = index === activeTabIndex;

            buttonElement.classList.toggle(this.stateClasses.active, activeTab);
            buttonElement.setAttribute(this.stateAttributs.tabIndex, activeTab ? '0' : '-1');
            buttonElement.setAttribute(this.stateAttributs.ariaSelected, activeTab.toString());
        });

        this.contentElements.forEach((contentElement, index) => {
            const activeTab = index === activeTabIndex;

            contentElement.classList.toggle(this.stateClasses.active, activeTab);
        });

        if (!this.isInsideCoursesTabs) {
            return
        }
        else {
            this.filterCards();
        }
    }

    filterCards() {        
        const activeButton = Array.from(this.buttonElements).find(button => button.classList.contains(this.stateClasses.active));
        const buttonText = activeButton.querySelector('span').textContent.trim();

        this.cardItems.forEach(cardItem => {
            const cardSubtitle = cardItem.querySelector(this.selectors.subtitle);
            const subtitleText = cardSubtitle.textContent.trim();

            if (buttonText === 'All') {
                cardItem.classList.remove(this.stateClasses.hide);

                this.loadCardsInstance.hideInitialCards();

                this.loadButtonElement.classList.remove(this.stateClasses.hide);

            } else if (subtitleText === buttonText) {
                cardItem.classList.remove(this.stateClasses.hide);
                this.loadButtonElement.classList.add(this.stateClasses.hide);

            } else {
                cardItem.classList.add(this.stateClasses.hide);
            }
        });
    }

    updateSuperscripts() {
        this.buttonElements.forEach(buttonElement => {
            const buttonText = buttonElement.querySelector('span').textContent.trim();
            let count = 0;

            if (buttonText === 'All') {
                count = this.cardItems.length;
            } else {
                this.cardItems.forEach(cardItem => {
                    const cardSubtitle = cardItem.querySelector(this.selectors.subtitle);
                    const subtitleText = cardSubtitle.textContent.trim();

                    if (subtitleText === buttonText) {
                        count++;
                    }
                });
            }

            this.superscriptElement = buttonElement.querySelector(this.selectors.superscript);
            this.superscriptElement.textContent = count.toString();
        });
    }


    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;
        this.updateUI();
        this.focusActiveButton();
        this.updateSuperscripts();
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index));
        });

        this.rootElement.addEventListener('keydown', (event) => this.onKeyDown(event));
    }

    onKeyDown(event) {
        let newIndex = this.state.activeTabIndex;

        if (event.key === 'ArrowLeft') {
            newIndex--;
        } else if (event.key === 'ArrowRight') {
            newIndex++;
        } else {
            return;
        }

        if (newIndex < 0) {
            newIndex = this.limitTabsIndex;
        } else if (newIndex > this.limitTabsIndex) {
            newIndex = 0;
        }

        this.onButtonClick(newIndex);
    }

    focusActiveButton() {
        this.buttonElements[this.state.activeTabIndex].focus();
    }
}

export default TabsCollection