class coursesTabs {

    stateClasses = {
        active: 'active',
        hide: 'hide',
    }

    stateAttributs = {
        tabIndex: 'tabindex',
        ariaSelected: 'aria-selected',
    }

    constructor(dynamicCardCourses, rootElement) {
        this.dynamicCardCourses = dynamicCardCourses
        this.rootElement = rootElement
        this.tabsButtons = this.rootElement.querySelectorAll('[data-js-tabs-button]')
        this.state = {
            activeTabIndex: Array.from(this.tabsButtons)
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.active))
        }
        this.limitTabsIndex = this.tabsButtons.length - 1
        this.bindEvents()
        this.updateUI()
        this.updateSuperscripts()
    }

    bindEvents() {
        this.tabsButtons.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index))
        })

        this.rootElement.addEventListener('keydown', (event) => this.onKeyDown(event))
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
        this.updateUI()
        this.focusActiveButton()
    }

    updateUI() {
        const { activeTabIndex } = this.state

        this.tabsButtons.forEach((buttonElement, index) => {
            const activeTab = index === activeTabIndex

            buttonElement.classList.toggle(this.stateClasses.active, activeTab)
            buttonElement.setAttribute(this.stateAttributs.tabIndex, activeTab ? '0' : '-1')
            buttonElement.setAttribute(this.stateAttributs.ariaSelected, activeTab.toString())
        });

        if (activeTabIndex !== -1) {
            this.filterCards()
        }
    }

    filterCards() {
        const activeButton = Array.from(this.tabsButtons).find(button => button.classList.contains(this.stateClasses.active))
        const buttonText = activeButton.querySelector('span').textContent.trim()

        let filteredCards;

        if(buttonText !== 'All') {
            filteredCards = this.dynamicCardCourses.originCoursesCards.filter(card => buttonText === card.type)

            this.dynamicCardCourses.loadCards.loadButtonElement.classList.add(this.stateClasses.hide)
            if(this.dynamicCardCourses.loadCards.loadButtonElement.hideButtonElement){
                this.dynamicCardCourses.loadCards.loadButtonElement.hideButtonElement.add(this.stateClasses.hide)
            }

            this.dynamicCardCourses.limitation = this.dynamicCardCourses.originCoursesCards.length

        } else {
            this.dynamicCardCourses.loadCards.loadButtonElement.classList.remove(this.stateClasses.hide)
            filteredCards = [...this.dynamicCardCourses.originCoursesCards]
            this.dynamicCardCourses.limitation = 9
        }

        this.dynamicCardCourses.copyCoursesCards = filteredCards
        this.dynamicCardCourses.addDataToList(filteredCards)
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

    focusActiveButton() {
        this.tabsButtons[this.state.activeTabIndex].focus()
    }

    updateSuperscripts() {

        this.tabsButtons.forEach(buttonElement => {
            const buttonText = buttonElement.querySelector('span').textContent.trim()
            let count = 0

            if (buttonText === 'All') {
                count = this.dynamicCardCourses.originCoursesCards.length
            } else {
                this.dynamicCardCourses.originCoursesCards.forEach(cardItem => {
                    const cardType = cardItem.type

                    if (cardType === buttonText) {
                        count++
                    }
                })
            }

            this.superscriptElement = buttonElement.querySelector('.tabs__superscript')
            this.superscriptElement.textContent = count.toString()
        })

    }

    resetActiveTab() {
        this.state.activeTabIndex = -1
        this.updateUI()
    }
}

export default coursesTabs