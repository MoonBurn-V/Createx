class Pagination {
    selectors = {
        pagination: '[data-js-pagination]',
        btnPrev: '[data-js-pagination-btn-prev]',
        btnNext: '[data-js-pagination-btn-next]',
        pageBody: '[data-js-pag-body]',
        page: 'courses__pagination-page',
    }

    stateClasses = {
        active: 'active',
        hide: 'hide',
    }

    constructor (dynamicCardEvents, rootElement) {
        this.dynamicCardEvents = dynamicCardEvents
        this.rootElement = rootElement
        this.paginationElement = this.rootElement.querySelector(this.selectors.pagination)
        this.btnPrevElement = this.rootElement.querySelector(this.selectors.btnPrev)
        this.btnNextElement = this.rootElement.querySelector(this.selectors.btnNext)
        this.pageBodyElement = this.rootElement.querySelector(this.selectors.pageBody)
        this.pageElements = this.rootElement.querySelectorAll(`.${this.selectors.page}`)
        this.currentPageIndex = 0
        this.numberPages = 0
        this.pages = []
        this.bindEvents()
        this.setActivePage()
    }

    determiningNumberPages = () => {
        const cardsPerPage = parseInt(this.dynamicCardEvents.spinbutton.spinbuttonElement.textContent)

        const filteredEvents = this.getFilteredEvents()
        
        this.numberPages = Math.ceil(filteredEvents.length / cardsPerPage)
        this.pages = Array.from({ length: this.numberPages }, (_, i) => i + 1)

        this.pageBodyElement.innerHTML = ''

        this.pages.forEach(page => {
            const newPage = document.createElement('div')
            newPage.classList.add('courses__pagination-page')
            newPage.innerHTML = `${page} `

            this.pageBodyElement.appendChild(newPage)
        });

        if (this.numberPages <= 3) {
            this.pageBodyElement.style.width = 'auto'
        } else {
            this.pageBodyElement.style.width = '96px'
        }

        this.pageElements = this.rootElement.querySelectorAll(`.${this.selectors.page}`)

        this.setActivePage()

        if (this.currentPageIndex > this.numberPages) {
            this.currentPageIndex = this.numberPages - 1
            this.pageElements[this.currentPageIndex].classList.add(this.stateClasses.active)
        }

        if (this.numberPages === 1) {
            this.paginationElement.classList.add(this.stateClasses.hide)
        } else {
            this.paginationElement.classList.remove(this.stateClasses.hide)
        }
    }

    getFilteredEvents = () => { //позже вынести в BaseComponent
        let filteredEvents = this.dynamicCardEvents.events
        const selected1 = this.dynamicCardEvents.selects[0]?.state.selectedOptionElement.textContent
        const selected2 = this.dynamicCardEvents.selects[1]?.state.selectedOptionElement.textContent

        if (selected1 !== "all themes") {
            filteredEvents = filteredEvents.filter(eventData => selected1 === eventData.theme)
        }

        if (selected2 == "newest") {
            filteredEvents = this.dynamicCardEvents.sortCardsByDate(filteredEvents)
        } else {
            filteredEvents.sort((a, b) => b.popularity - a.popularity)
        }

        return filteredEvents
    }

    previousPage = () => {
        this.pageBodyElement.scrollLeft -= 25
        if(this.currentPageIndex == 0) {
            this.currentPageIndex = 0
            this.dynamicCardEvents.curentPage = 0
        } else {
            this.currentPageIndex--
            this.dynamicCardEvents.curentPage--

            const isRowActive = this.dynamicCardEvents.switchingListStyle.btnRowElement.classList.contains('active');
            if (isRowActive) {
                this.dynamicCardEvents.addDataRowToHTML()
            } else {
                this.dynamicCardEvents.addDataBlockToHTML()
            }
        }

        this.setActivePage()
    }

    nextPage = () => {
        this.pageBodyElement.scrollLeft += 25
        if(this.currentPageIndex == this.pageElements.length - 1) {
            this.currentPageIndex = this.pageElements.length - 1
            this.dynamicCardEvents.curentPage = this.pageElements.length - 1
        } else {
            this.currentPageIndex++
            this.dynamicCardEvents.curentPage++
            const isRowActive = this.dynamicCardEvents.switchingListStyle.btnRowElement.classList.contains('active');
            if (isRowActive) {
                this.dynamicCardEvents.addDataRowToHTML()
            } else {
                this.dynamicCardEvents.addDataBlockToHTML()
            }
        }

        this.setActivePage()
    }

    setActivePage() {
        this.pageElements.forEach(page => page.classList.remove(this.stateClasses.active))

        if (this.pageElements[this.currentPageIndex]) {
            this.pageElements[this.currentPageIndex].classList.add(this.stateClasses.active)
        }
    }

    bindEvents () {
        if (this.btnPrevElement) {
            this.btnPrevElement.addEventListener('click', this.previousPage)
        }
        if (this.btnNextElement) {
            this.btnNextElement.addEventListener('click', this.nextPage)
        }
    }
}

export default Pagination