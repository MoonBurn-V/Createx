const rootSelector = '[data-js-root-video]'

class HeroVideo {
    selectors= {
        btnPlay: '[data-js-video-play]',
        btnClose: '[data-js-video-close]',
        video: '[data-js-video]',
        panel: '[data-js-video-panel]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        activeForm: 'active-form',
        lockForm: 'lock-form',
        isDimmed: 'dimmed',
        fixed: 'fixed',
        hide: 'hide',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.btnPlayElement = document.querySelector(this.selectors.btnPlay)
        this.btnCloseElement = rootElement.querySelector(this.selectors.btnClose)
        this.videoElement = rootElement.querySelector(this.selectors.video)
        this.panelElement = document.querySelector(this.selectors.panel)
        this.bindEvent()
    }

    videoPlay = () => {
        this.rootElement.classList.remove(this.stateClasses.hide)
        this.panelElement.classList.remove(this.stateClasses.hide)
        this.videoElement.play()
        document.documentElement.classList.add(this.stateClasses.isLock)
    }

    videoClose = () => {
        this.rootElement.classList.add(this.stateClasses.hide)
        this.panelElement.classList.add(this.stateClasses.hide)
        this.videoElement.pause()
        document.documentElement.classList.remove(this.stateClasses.isLock)
    }

    bindEvent() {
        this.btnPlayElement.addEventListener('click', this.videoPlay)

        if (this.btnCloseElement) {
            this.btnCloseElement.addEventListener('click', this.videoClose)
        }
    }
}

class HeroVideoCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new HeroVideo(element)
        })
    }
}

export default HeroVideoCollection