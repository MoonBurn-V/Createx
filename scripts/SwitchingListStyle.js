const rootSelector = '[data-js-courses-body-root]';

class SwitchingListStyle {
    selectors = {
        btnRow: '[data-js-btn-row]',
        btnBlock: '[data-js-btn-block]',
        cardList: '[data-js-card-list]',
        cardItems: '[data-js-card-items] > *',
    }

    stateClasses = {
        row: 'row',
        threeColumn: 'three-column',
        hide: 'hide',
        active: 'active',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.btnRowElement = rootElement.querySelector(this.selectors.btnRow)
        this.btnBlockElement = rootElement.querySelector(this.selectors.btnBlock)
        this.cardListElement = rootElement.querySelector(this.selectors.cardList)
        this.cardItemsElements = Array.from(rootElement.querySelectorAll(this.selectors.cardItems))
        this.bindEvents()
    }

    rowStyle = () => {
        this.cardListElement.classList.remove(this.stateClasses.threeColumn)
        this.cardListElement.classList.add(this.stateClasses.row)
        this.btnRowElement.classList.add(this.stateClasses.active)
        this.btnBlockElement.classList.remove(this.stateClasses.active)

        this.cardItemsElements[0].classList.add(this.stateClasses.hide)
        this.cardItemsElements[1].classList.remove(this.stateClasses.hide)
    }

    blockStyle = () => {
        this.cardListElement.classList.remove(this.stateClasses.row)
        this.cardListElement.classList.add(this.stateClasses.threeColumn)
        this.btnRowElement.classList.remove(this.stateClasses.active)
        this.btnBlockElement.classList.add(this.stateClasses.active)

        this.cardItemsElements[1].classList.add(this.stateClasses.hide)
        this.cardItemsElements[0].classList.remove(this.stateClasses.hide)      
    }

    bindEvents() {
        if (this.btnRowElement) {
            this.btnRowElement.addEventListener('click', this.rowStyle)
        }

        if (this.btnBlockElement) {
            this.btnBlockElement.addEventListener('click', this.blockStyle)
        }
    }
}

class SwitchingListStyleCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new SwitchingListStyle(element)
        })
    }
}

export default SwitchingListStyleCollection