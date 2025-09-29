import BaseTabs from './BaseTabs.js'

class coursesTabs extends BaseTabs {
    constructor(dynamicCardCourses, rootElement) {
        super()
        this.dynamicCardCourses = dynamicCardCourses
        this.rootElement = rootElement
        this.tabsButtons = this.rootElement.querySelectorAll('[data-js-tabs-button]')
        this.state = {
            activeTabIndex: Array.from(this.tabsButtons)
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.active))
        }
        this.limitTabsIndex = this.tabsButtons.length - 1
        this.bindEvents(this.tabsButtons, this.rootElement)
        this.updateUI(this.tabsButtons)
        this.updateSuperscripts()
    }

    focusActiveButton() {
        this.buttonElements[this.state.activeTabIndex].focus()
    }

    onButtonClick(buttonIndex, source = null) {
        super.onButtonClick(buttonIndex)
        if (source !== 'SearchCard') {
            this.focusActiveButton()
        }

        this.dynamicCardCourses.searchCard.searchInput.value = ''
    }

    filterCards() {
        const activeButton = Array.from(this.tabsButtons).find(button => button.classList.contains(this.stateClasses.active))
        const buttonText = activeButton.querySelector('span').textContent.trim()

        let filteredCards

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

    updateUI(buttonElements) {
        super.updateUI(buttonElements)
        if (this.state.activeTabIndex !== -1) {
            this.filterCards()
        }
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
        this.updateUI(this.tabsButtons)
    }
}

export default coursesTabs