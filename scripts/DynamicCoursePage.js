const rootSelector = '[data-js-course-root]'

class DynamicCoursePage {
    selectors = {
        title: '[data-js-course-title]',
        curator: '[data-js-course-curator]',
        curatorPost: '[data-js-curator-post]',
        curatorDescription: '[data-js-curator-description]',
        curatorImage: '[data-js-curator-img]',
        curatorImageMobile: '[data-js-curator-mobile-img]',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.titleElement = document.querySelector(this.selectors.title)
        this.curatorElement = this.rootElement.querySelector(this.selectors.curator)
        this.curatorPostElement = this.rootElement.querySelector(this.selectors.curatorPost)
        this.curatorImageElement = this.rootElement.querySelector(this.selectors.curatorImage)
        this.curatorImageMobileElement = this.rootElement.querySelector(this.selectors.curatorImageMobile)
        this.pageContent = []
        this.bindEvents()
    }

    loadCourse(courseId) {
        fetch('./cards/coursesCards.json')
            .then(response => response.json())
            .then(data => {
                this.pageContent = data
                const course = this.pageContent.find(course => course.id === parseInt(courseId))

                if (course) {
                    const fullName = course.coach.slice(2, course.coach.length)

                    this.titleElement.textContent = course.courseName
                    this.curatorElement.textContent = fullName
                    this.curatorPostElement.textContent = course.post
                    this.curatorImageElement.setAttribute('src', `${course.pageImg}`)
                    this.curatorImageMobileElement.setAttribute('src', `${course.pageImg}`)
                }
            })
    }

    getParameterByName = (name, url = window.location.href) => {
        name = name.replace(/[\[\]]/g, '\\$&')
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        const courseId = decodeURIComponent(results[2].replace(/\+/g, ' '))
        this.loadCourse(courseId)
    }

    bindEvents() {
        window.addEventListener('load', () => this.getParameterByName('id'))
    }
}

class DynamicCoursePageCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new DynamicCoursePage(element)
        })
    }
}

export default DynamicCoursePageCollection