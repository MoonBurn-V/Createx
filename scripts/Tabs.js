const rootSelector = '[data-js-tabs]'

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
        tabIndex: 'tabindex',
        ariaSelected: 'aria-selected',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
        this.state = {
            activeTabIndex: Array.from(this.buttonElements)
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.active))
        }
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
        this.updateUI();
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
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;
        this.updateUI();
        this.focusActiveButton();
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