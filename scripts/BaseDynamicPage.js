class BaseDynamicPage {
    constructor(rootElement, selectors) {
        this.rootElement = rootElement
        this.selectors = selectors
        this.titleElement = document.querySelector(this.selectors.title)
        this.curatorElement = this.rootElement.querySelector(this.selectors.curator)
        this.curatorPostElement = this.rootElement.querySelector(this.selectors.curatorPost)
        this.curatorImageElement = this.rootElement.querySelector(this.selectors.curatorImage)
        this.curatorImageMobileElement = this.rootElement.querySelector(this.selectors.curatorImageMobile)
        this.pageContent = []
        this.bindEvents()
    }

    getParameterByName = (name, url = window.location.href) => {
        name = name.replace(/[\[\]]/g, '\\$&')
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
        const results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        const courseId = decodeURIComponent(results[2].replace(/\+/g, ' '))
        return courseId
    }


    bindEvents() {
        window.addEventListener('load', () => {
            const courseId = this.getParameterByName('id')
            if (courseId) {
                this.loadData(courseId)
            }
        })
    }


    loadData(courseId) {
        throw new Error("Method 'loadData()' must be implemented.")
    }

    setCuratorData(fullName, post, pageImg) {
        this.curatorElement.textContent = fullName
        this.curatorPostElement.textContent = post
        this.curatorImageElement.setAttribute('src', `${pageImg}`)
        this.curatorImageMobileElement.setAttribute('src', `${pageImg}`)
    }
}


export default BaseDynamicPage