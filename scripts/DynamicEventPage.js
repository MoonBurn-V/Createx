import BaseDynamicPage from './BaseDynamicPage.js'

const rootSelector = '[data-js-event-root]'

class DynamicEventPage extends BaseDynamicPage {
    constructor(rootElement) {
        const selectors = {
            title: '[data-js-course-title]',
            curator: '[data-js-course-curator]',
            curatorPost: '[data-js-curator-post]',
            curatorImage: '[data-js-curator-img]',
            curatorImageMobile: '[data-js-curator-mobile-img]',
        }
        super(rootElement, selectors)
        this.sectionContent = []
    }

    async loadData(eventId) {
        try {
            const response = await fetch('./cards/eventsCards.json')
            const data = await response.json()
            this.pageContent = data
            const event = this.pageContent.find(event => event.id === parseInt(eventId))

            if (event) {
                this.titleElement.textContent = event.description
                const curatorId = event.curatorId

                const curatorResponse = await fetch('./cards/coursesCards.json')
                const curatorData = await curatorResponse.json()
                this.sectionContent = curatorData
                const curator = this.sectionContent.find(curator => curator.id === curatorId)

                if (curator) {
                    const fullName = curator.coach.slice(2, curator.coach.length)
                    this.setCuratorData(fullName, curator.post, curator.pageImg)
                }
            }
        } catch (error) {
            console.error("Error loading event data:", error)
        }
    }
}

class DynamicEventPageCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new DynamicEventPage(element)
        })
    }
}

export default DynamicEventPageCollection