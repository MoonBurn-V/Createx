class SearchEventCard {
    selectors = {
        searchInput: '[data-js-search]',
        eventItem: '.events__item',
        teamItem: '.team__card',
        eventDay: '.events__date-day',
        eventMonth: '.events__date-month',
        eventTime: '.events__date-time',
        eventDescription: '.events__info-description',
        eventType: '.events__info-type',
        teamDay: '.team__data-day',
        teamTime: '.team__data-time',
        teameDescriprion: '.team__info-desciption',
        teamType: '.team__info-type',
        pagination: '[data-js-pagination]',
    }

    steteClasses = {
        hide: 'hide',
    }

    constructor(dynamicCardEvents, rootElement) {
        this.dynamicCardEvents = dynamicCardEvents
        this.rootElement = rootElement
        this.searchInputElement = rootElement.querySelector(this.selectors.searchInput)
        this.paginationElement = rootElement.querySelector(this.selectors.pagination)
        this.isTyping = false
        this.bindeEvents()
    }

    search = () => {
        const searchTerm = this.searchInputElement.value.toLowerCase()

        if(searchTerm === "") {
            if (this.paginationElement) {
                this.paginationElement.classList.remove(this.steteClasses.hide)
            }

            // const isRowActive = this.dynamicCardEvents.switchingListStyle.btnRowElement.classList.contains('active')

            // if (isRowActive) {
            //     this.dynamicCardEvents.addDataRowToHTML()
            // } else {
            //     this.dynamicCardEvents.addDataBlockToHTML()
            // }
        } else {
            this.isTyping = true

            const isRowActive = this.dynamicCardEvents.switchingListStyle.btnRowElement.classList.contains('active')

            if (isRowActive) {
                this.dynamicCardEvents.addDataRowToHTML()
            } else {
                this.dynamicCardEvents.addDataBlockToHTML()
            }

            this.dynamicCardEvents.selects[0].updateUI()

            this.paginationElement.classList.add(this.steteClasses.hide)
        }
    }

    bindeEvents() {
        if(this.searchInputElement) {
            this.searchInputElement.addEventListener('input', this.search)
        }
    }
}

export default SearchEventCard