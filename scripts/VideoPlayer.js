const rootSelector = '[data-js-video-player]'

class VideoPlayer {
    selectors = {
        root: rootSelector,
        video: '[data-js-video-player-video]',
        button: '[data-js-video-button]',
        iocnPlay: '[data-js-video-play]',
        iconPouse: '[data-js-video-pouse]',
    }

    stateClasses = {
        hide: 'hide',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.videoElement = this.rootElement.querySelector(this.selectors.video);
        this.buttonElement = this.rootElement.querySelector(this.selectors.button);
        this.iocnPlayElement = this.rootElement.querySelector(this.selectors.iocnPlay);
        this.iocnPouseElement = this.rootElement.querySelector(this.selectors.iconPouse);
        this.isPlaying = false;
        this.bindEvents();
    }

    onPlayButtonClick = () => {
        if (this.isPlaying) {
            this.pauseVideo();
        } else {
            this.playVideo();
        }
    }

    playVideo = () => {
        this.videoElement.play();
        this.videoElement.controls = true;
        this.iocnPlayElement.classList.add(this.stateClasses.hide);
        this.iocnPouseElement.classList.remove(this.stateClasses.hide);
        this.isPlaying = true;
    }

    pauseVideo = () => {
        this.videoElement.pause();
        this.videoElement.controls = false;
        this.iocnPlayElement.classList.remove(this.stateClasses.hide);
        this.iocnPouseElement.classList.add(this.stateClasses.hide);
        this.isPlaying = false;
    }

    onVideoPause = () => {
        this.pauseVideo();
    }

    bindEvents() {
        if (this.buttonElement) {
            this.buttonElement.addEventListener('click', this.onPlayButtonClick);
            this.videoElement.addEventListener('pause', this.onVideoPause);
        }
    }
}

class VideoPlayerCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new VideoPlayer(element)
        })
    }
}

export default VideoPlayerCollection
