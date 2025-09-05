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
        this.determiningNumberPages()
        this.setActivePage()
    }

    determiningNumberPages = () => {
        const numberCards = this.dynamicCardEvents.events.length
        const filteredNumberCards = parseInt(this.dynamicCardEvents.spinbutton.spinbuttonElement.textContent)

        this.numberPages = Math.ceil(numberCards / filteredNumberCards)
        this.pages = Array.from({length: this.numberPages}, (_, i) => i + 1)

        console.log(numberCards)
        console.log(filteredNumberCards)
        console.log(this.numberPages)

        this.pageBodyElement.innerHTML= ''

        this.pages.forEach(page => {
            const newPage = document.createElement('div')
            newPage.classList.add('courses__pagination-page')
            newPage.innerHTML = `${page} `

            this.pageBodyElement.appendChild(newPage)
        })

        this.pageElements = this.rootElement.querySelectorAll(`.${this.selectors.page}`)

        this.setActivePage()
    }

    previousPage = () => {
        this.pageBodyElement.scrollLeft -= 30
        if(this.currentPageIndex == 0) {
            this.currentPageIndex = 0
        } else {
            this.currentPageIndex--
        }
        this.setActivePage()
    }

    nextPage = () => {
        this.pageBodyElement.scrollLeft += 30
        if(this.currentPageIndex == this.pageElements.length - 1) {
            this.currentPageIndex = this.pageElements.length - 1
        } else {
            this.currentPageIndex++
        }
        this.setActivePage()
    }

    setActivePage() {
        this.pageElements.forEach(page => page.classList.remove(this.stateClasses.active));

        if (this.pageElements[this.currentPageIndex]) {
            this.pageElements[this.currentPageIndex].classList.add(this.stateClasses.active);
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