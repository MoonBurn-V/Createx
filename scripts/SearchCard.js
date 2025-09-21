export default class SearchCard {
    constructor(dynamicCardCourses, rootElement) {
        this.dynamicCardCourses = dynamicCardCourses
        this.rootElement = rootElement
        this.searchInput = this.rootElement.querySelector('[data-js-search]')
        this.loadButtonElement = this.rootElement.querySelector('[data-js-load-btn]')
        this.hideButtonElement = this.rootElement.querySelector('[data-js-hide-btn]')
        this.originalCoursesCards = [...this.dynamicCardCourses.coursesCards]
        this.bindeEvents()
    }

    bindeEvents() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.handleSearch.bind(this))
        }
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase()
        this.dynamicCardCourses.coursesCards = this.filterCards(searchTerm)
        this.dynamicCardCourses.limitation = 9
        this.dynamicCardCourses.addDataToList()

        if(searchTerm === '') {
            this.loadButtonElement.classList.remove('hide')
        } else {
            this.loadButtonElement.classList.add('hide')
            this.hideButtonElement.classList.add('hide')
        }
    }

    filterCards(searchTerm) {
        if (!searchTerm) {
            return [...this.originalCoursesCards]
        }

        return this.originalCoursesCards.filter(courseCard => {
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