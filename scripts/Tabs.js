import BaseTabs from './BaseTabs.js'

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

class Tabs extends BaseTabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
    }

    constructor(rootElement) {
        super()
        this.rootElement = rootElement
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
        this.state = {
            activeTabIndex: Array.from(this.buttonElements)
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.active))
        }
        this.limitTabsIndex = this.buttonElements.length - 1
        this.bindEvents(this.buttonElements, this.rootElement)
        this.updateUI(this.buttonElements)
    }

    updateUI(buttonElements) {
        super.updateUI(buttonElements)

        const {activeTabIndex} = this.state

        this.contentElements.forEach((contentElement, index) => {
            const activeTab = index === activeTabIndex

            contentElement.classList.toggle(this.stateClasses.active, activeTab)
        })

        if (!this.isInsideCoursesTabs) {
            return
        }
    }

}

export default TabsCollection