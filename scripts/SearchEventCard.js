import DynamicCardEventsCollection, {DynamicCardEvents} from './DynamicCardEvents.js'
import DynamicCardCoursesCollection, {DynamicCardCourses} from './DynamicCardCourses.js'

class SearchEventCard {
    selectors = {
        searchInput: '[data-js-search]',
        pagination: '[data-js-pagination]',
        loadButton: '[data-js-load-btn]',
        hideButton: '[data-js-hide-btn]',
    }

    steteClasses = {
        hide: 'hide',
    }

    constructor(initializerClass, rootElement) {
        this.initializerClass = initializerClass
        this.rootElement = rootElement
        this.searchInputElement = this.rootElement.querySelector(this.selectors.searchInput)
        this.isTyping = false
        if(this.initializerClass instanceof DynamicCardEvents) {
            this.paginationElement = this.rootElement.querySelector(this.selectors.pagination)
            this.cards = this.initializerClass.events
        }
        if(this.initializerClass instanceof DynamicCardCourses) {
            this.loadButtonElement = this.rootElement.querySelector(this.selectors.loadButton)
            this.hideButtonElement = this.rootElement.querySelector(this.selectors.hideButton)
            this.cards = this.initializerClass.coursesCards
        }
        this.bindeEvents()
    }

    search = () => {
        const searchTerm = this.searchInputElement.value.toLowerCase()

        this.isTyping = searchTerm !== ""

        if (searchTerm === "") {
            if (this.paginationElement) {
                this.paginationElement.classList.remove(this.steteClasses.hide)
            }

            if (this.initializerClass instanceof DynamicCardCourses) {
                this.loadButtonElement.classList.remove(this.steteClasses.hide)
                //this.hideButtonElement.classList.remove(this.steteClasses.hide)

                //this.initializerClass.limitation = 9
            }

        } else {

            if(this.initializerClass instanceof DynamicCardEvents) {
                this.paginationElement.classList.add(this.steteClasses.hide)

                this.cards = this.initializerClass.events.filter(card => {
                    const description = card.description.toLowerCase()
                    const data = card.data.toLowerCase()
                    const time = card.time.toLowerCase()
                    const type = card.type.toLowerCase()

                    return (
                        description.includes(searchTerm) || data.includes(searchTerm) || time.includes(searchTerm) || type.includes(searchTerm)
                    )
                })
            }

            if(this.initializerClass instanceof DynamicCardCourses) {
                this.loadButtonElement.classList.add(this.steteClasses.hide)
                //this.hideButtonElement.classList.add(this.steteClasses.hide)

                this.cards = this.initializerClass.coursesCards.filter(card => {
                    // const description = card.description.toLowerCase()
                    // const data = card.data.toLowerCase()
                    // const time = card.time.toLowerCase()
                    const type = card.type.toLowerCase()

                    return (
                        type.includes(searchTerm)
                    )
                })
            }
        }

        if(this.initializerClass instanceof DynamicCardEvents) {
            const isRowActive = this.initializerClass.switchingListStyle.btnRowElement.classList.contains('active')

            if (isRowActive) {
                this.initializerClass.addDataRowToHTML()
            } else {
                this.initializerClass.addDataBlockToHTML()
            }

            this.initializerClass.selects[0].updateUI()
        }

        if (this.initializerClass instanceof DynamicCardCourses) {
            //this.initializerClass.limitation = this.initializerClass.coursesCards.length
            this.initializerClass.addDataToList()
        }
    }

    bindeEvents() {
        if(this.searchInputElement) {
            this.searchInputElement.addEventListener('input', this.search)
        }
    }
}

export default SearchEventCard