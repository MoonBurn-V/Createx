const rootSelector = '[data-js-video-player]'

class VideoPlayer {
    selectors = {
        root: rootSelector,
        video: '[data-js-video-player-video]',
        button: '[data-js-video-button]',
        iconPlay: '[data-js-video-play]',
        iconPouse: '[data-js-video-pouse]',
    }

    stateClasses = {
        hide: 'hide',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.videoElement = this.rootElement.querySelector(this.selectors.video);
        this.buttonElement = this.rootElement.querySelector(this.selectors.button);
        this.iconPlayElement = this.rootElement.querySelector(this.selectors.iconPlay);
        this.iconPouseElement = this.rootElement.querySelector(this.selectors.iconPouse);
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
        this.iconPlayElement.classList.add(this.stateClasses.hide);
        this.iconPouseElement.classList.remove(this.stateClasses.hide);
        this.isPlaying = true;
    }

    pauseVideo = () => {
        this.videoElement.pause();
        this.videoElement.controls = false;
        this.iconPlayElement.classList.remove(this.stateClasses.hide);
        this.iconPouseElement.classList.add(this.stateClasses.hide);
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
