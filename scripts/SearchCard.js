class SearchCard {
    constructor(dynamicCardCourses, rootElement) {
        this.dynamicCardCourses = dynamicCardCourses
        this.rootElement = rootElement
        this.searchInput = this.rootElement.querySelector('[data-js-search]')
        this.loadButtonElement = this.rootElement.querySelector('[data-js-load-btn]')
        this.hideButtonElement = this.rootElement.querySelector('[data-js-hide-btn]')
        this.bindeEvents()
    }

    bindeEvents() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.handleSearch.bind(this))
        }
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase()
        const filteredCards = this.filterCards(searchTerm)
        this.dynamicCardCourses.copyCoursesCards = filteredCards
        this.dynamicCardCourses.limitation = 9
        this.dynamicCardCourses.addDataToList(this.dynamicCardCourses.copyCoursesCards)

        if(searchTerm === '') {
            this.loadButtonElement.classList.remove('hide')
            this.dynamicCardCourses.coursesTabs.onButtonClick(0)
        } else {
            this.loadButtonElement.classList.add('hide')
            this.hideButtonElement.classList.add('hide')
            this.dynamicCardCourses.coursesTabs.resetActiveTab()
        }
    }

    filterCards(searchTerm) {
        if (!searchTerm) {
            return [...this.dynamicCardCourses.originCoursesCards]
        }

        return this.dynamicCardCourses.originCoursesCards.filter(courseCard => {
            const description = courseCard.description.toLowerCase()
            const type = courseCard.type.toLowerCase()
            const coach = courseCard.coach.toLowerCase()
            const price = courseCard.price.toLowerCase()

            return (
                description.includes(searchTerm) ||
                type.includes(searchTerm) ||
                coach.includes(searchTerm) ||
                price.includes(searchTerm)
            )
        })
    }
}

export default SearchCard