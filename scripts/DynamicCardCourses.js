import LoadCards from "./LoadCards.js"
import SearchCard from "./SearchCard.js"
import CoursesTabs from "./CoursesTabs.js"

const rootSelector = "[data-js-courses-root]"

export class DynamicCardCourses {
    selectors = {
        cardList: '[data-js-courses-list]',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.cardListElement = this.rootElement.querySelector(this.selectors.cardList)
        this.originCoursesCards = []
        this.copyCoursesCards = []
        this.limitation = 9
        this.initApp()
    }

    addDataToList = (cards) => {
        this.cardListElement.innerHTML = ''

        cards.slice(0, this.limitation).forEach(courseCard => {

            const typeColors = {
                "Marketing": "green",
                "Management": "blue",
                "HR & Recruting": "orange",
                "Design": "pink",
                "Development": "purple"
            }

            let color = typeColors[courseCard.type]

            const newCard = document.createElement('li')
            newCard.classList.add('card__item')
            newCard.innerHTML = `
                <a class="card__body vertical" href="course.html?id=${courseCard.id}">
                    <img class="card__image vertical" src="${courseCard.img}" width="390" height="240" loading="lazy" alt="">
                    <div class="card__body-inner vertical">
                        <div class="card__subtitle ${color} vertical">${courseCard.type}</div>
                        <div class="card__title h4 vertical">${courseCard.courseName}</div>
                        <div class="card__info vertical">
                            <div class="card__price h5">${courseCard.price}</div>
                            <span class="card__separator">|</span>
                            <div class="card__speaker h5">${courseCard.coach}</div>
                        </div>
                    </div>
                </a>`

            this.cardListElement.appendChild(newCard)
        })
    }

    initApp() {
        fetch('./cards/coursesCards.json')
            .then(response => response.json())
            .then(data => {
                this.originCoursesCards = data
                this.copyCoursesCards = [...data]
                this.addDataToList(this.copyCoursesCards)
                this.searchCard = new SearchCard(this, this.rootElement)
                this.loadCards = new LoadCards(this, this.rootElement)
                this.coursesTabs = new CoursesTabs(this, this.rootElement)
            })
    }
}

class DynamicCardCoursesCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new DynamicCardCourses(element)
        })
    }
}

export default DynamicCardCoursesCollection