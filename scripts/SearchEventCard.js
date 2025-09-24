class SearchEventCard {
    selectors = {
        searchInput: '[data-js-search]',
        pagination: '[data-js-pagination]',
    }

    steteClasses = {
        hide: 'hide',
    }

    constructor(dynamicCardEvents, rootElement) {
        this.dynamicCardEvents = dynamicCardEvents
        this.rootElement = rootElement
        this.searchInputElement = this.rootElement.querySelector(this.selectors.searchInput)
        this.paginationElement = this.rootElement.querySelector(this.selectors.pagination)
        this.isTyping = false
        this.cards = this.dynamicCardEvents.events
        this.bindeEvents()
    }

    search = () => {
        const searchTerm = this.searchInputElement.value.toLowerCase()

        this.isTyping = searchTerm !== ""

        if (searchTerm === "") {
            if (this.paginationElement) {
                this.paginationElement.classList.remove(this.steteClasses.hide)
            }

        } else {
            this.paginationElement.classList.add(this.steteClasses.hide)

            this.cards = this.dynamicCardEvents.events.filter(card => {
                const description = card.description.toLowerCase()
                const data = card.data.toLowerCase()
                const time = card.time.toLowerCase()
                const type = card.type.toLowerCase()

                return (
                    description.includes(searchTerm) || data.includes(searchTerm) || time.includes(searchTerm) || type.includes(searchTerm)
                )
            })
        }

        const isRowActive = this.dynamicCardEvents.switchingListStyle.btnRowElement.classList.contains('active')

        if (isRowActive) {
            this.dynamicCardEvents.addDataRowToHTML()
        } else {
            this.dynamicCardEvents.addDataBlockToHTML()
        }

        this.dynamicCardEvents.selects[0].updateUI()
    }

    bindeEvents() {
        if(this.searchInputElement) {
            this.searchInputElement.addEventListener('input', this.search)
        }
    }
}

export default SearchEventCard