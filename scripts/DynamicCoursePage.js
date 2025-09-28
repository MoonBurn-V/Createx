import BaseDynamicPage from './BaseDynamicPage.js'

const rootSelector = '[data-js-course-root]'

class DynamicCoursePage extends BaseDynamicPage {
    constructor(rootElement) {
        const selectors = {
            title: '[data-js-course-title]',
            curator: '[data-js-course-curator]',
            curatorPost: '[data-js-curator-post]',
            curatorImage: '[data-js-curator-img]',
            curatorImageMobile: '[data-js-curator-mobile-img]',
        }
        super(rootElement, selectors)
    }    
    
    async loadData(courseId) {
        try {
            const response = await fetch('./cards/coursesCards.json')
            const data = await response.json()
            this.pageContent = data
            const course = this.pageContent.find(course => course.id === parseInt(courseId))

            if (course) {
                this.titleElement.textContent = course.courseName
                const fullName = course.coach.slice(2, course.coach.length)
                this.setCuratorData(fullName, course.post, course.pageImg)
            }
        } catch (error) {
            console.error("Error loading course data:", error)
        }
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