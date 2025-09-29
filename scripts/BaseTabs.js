class BaseTabs {
    constructor(options = {}) {
        this.stateClasses = {
            active: 'active',
            ...(options.stateClasses || {}),
        }

        this.stateAttributs = {
            tabIndex: 'tabindex',
            ariaSelected: 'aria-selected',
            ...(options.stateAttributs || {}),
        }

        this.limitTabsIndex = 0
        this.state = { activeTabIndex: 0 }
    }

    bindEvents(buttonElements, rootElement, onButtonClick) {
        this.buttonElements = buttonElements
        this.rootElement = rootElement
        this.onButtonClickCallback = onButtonClick

        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index))
        })

        this.rootElement.addEventListener('keydown', (event) => this.onKeyDown(event))
    }

    onKeyDown(event) {
        let newIndex = this.state.activeTabIndex

        if (event.key === 'ArrowLeft') {
            newIndex--
        } else if (event.key === 'ArrowRight') {
            newIndex++
        } else {
            return
        }

        if (newIndex < 0) {
            newIndex = this.limitTabsIndex
        } else if (newIndex > this.limitTabsIndex) {
            newIndex = 0
        }

        this.onButtonClick(newIndex)
    }

    updateUI(buttonElements) {
        const { activeTabIndex } = this.state

        buttonElements.forEach((buttonElement, index) => {
            const activeTab = index === activeTabIndex

            buttonElement.classList.toggle(this.stateClasses.active, activeTab)
            buttonElement.setAttribute(this.stateAttributs.tabIndex, activeTab ? '0' : '-1')
            buttonElement.setAttribute(this.stateAttributs.ariaSelected, activeTab.toString())
        })
    }
    
    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
        this.updateUI(this.buttonElements)
    }

}

export default BaseTabs