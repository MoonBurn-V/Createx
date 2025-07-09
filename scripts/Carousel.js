class Carousel {
    selectors = {
        cardContainer: '[data-js-card-container]',
        card: '[data-js-card]',
        btnPrev: '[data-js-btn-prev]',
        btnNxt: '[data-js-btn-nxt]',
        lines: '[data-js-lines]',
    }

    constructor() {
        this.carousels = [];

        const cardContainerElements = document.querySelectorAll(this.selectors.cardContainer);
        cardContainerElements.forEach((container, index) => {
            this.carousels.push(new CarouselInstance(container, index, this));
        });
    }
}

class CarouselInstance {
    constructor(container, index, carousel) {
        this.container = container;
        this.index = index;
        this.carousel = carousel;
        this.cardElement = this.container.querySelector('[data-js-card]');
        this.btnPrevElement = document.querySelector(`[data-js-btn-prev][index="${index}"]`);
        this.btnNxtElement = document.querySelector(`[data-js-btn-nxt][index="${index}"]`);
        this.padding = (index === 1) ? 105 : 0;
        this.cardWidth = this.cardElement ? this.cardElement.getBoundingClientRect().width : 0;

        this.bindEvents();

        if (this.index === 1) {
            this.chengeLine = new ChengeLine(this.index, this.btnPrevElement, this.btnNxtElement);
        } else {
            this.chengeLine = null;
        }
    }

    bindEvents() {
        if (this.btnPrevElement) {
            this.btnPrevElement.addEventListener('click', this.scrollPrev);
        }

        if (this.btnNxtElement) {
            this.btnNxtElement.addEventListener('click', this.scrollNxt);
        }
    }

    scrollPrev = () => {
        if (this.cardElement) {
            this.container.scrollLeft -= this.cardWidth + this.padding + 5;
        }
    }

    scrollNxt = () => {
        if (this.cardElement) {
            this.container.scrollLeft += this.cardWidth + this.padding;
        }
    }
}

class ChengeLine {
    selectors = {
        lines: '[data-js-lines] > *',
        btnPrev: '[data-js-btn-prev]',
        btnNxt: '[data-js-btn-nxt]',
    }

    stateClasses = {
        active: 'active',
    }

    constructor(carouselIndex, btnPrevElement, btnNxtElement) {
        this.carouselIndex = carouselIndex;    
        this.linesContainer = document.querySelector(this.selectors.lines.split('>')[0]);
        this.linesElement = document.querySelectorAll(this.selectors.lines);
        this.btnPrevElement = btnPrevElement;        
        this.btnNxtElement = btnNxtElement;

        this.activeIndex = -1;
        for (let i = 0; i < this.linesElement.length; i++) {
            if (this.linesElement[i].classList.contains(this.stateClasses.active)) {
                this.activeIndex = i;
                break;
            }
        }

        this.bindEvents();
    }

    bindEvents() {
        if (this.btnPrevElement) {
            this.btnPrevElement.addEventListener('click', this.prevLine);
        }

        if (this.btnNxtElement) {
            this.btnNxtElement.addEventListener('click', this.nxtLine);
        }
    }

    nxtLine = (event) => {
        if (this.carouselIndex !== 1) {
            return;
        }
        if (this.activeIndex == this.linesElement.length - 1) {
            return
        }

        this.changeLine(1);
    }

    prevLine = (event) => {
        if (this.carouselIndex !== 1) {
            return;
        }
        if (this.activeIndex == 0) {
            return
        }

        this.changeLine(-1);
    }


    changeLine = (direction) => {
        if (!this.linesElement) {
            return;
        }

        if (this.activeIndex !== -1) {
            this.linesElement[this.activeIndex].classList.remove(this.stateClasses.active);
        }

        let nextIndex = this.activeIndex + direction;

        if (nextIndex < 0) {
            nextIndex = this.linesElement.length - 1;
        } else if (nextIndex >= this.linesElement.length) {
            nextIndex = 0;
        }

        this.linesElement[nextIndex].classList.add(this.stateClasses.active);

        this.activeIndex = nextIndex;
    }
}

export default Carousel