class Spinbutton {
    selectors = {
        spinbutton: '[data-js-spinbutton]',
        btnIncreasing: '[data-js-btn-increasing]',
        btnReducing: '[data-js-btn-reducing]',
    }

    stateAttributes = {
        ariaValuenow: 'aria-valuenow',
        ariaValuemin: 'aria-valuemin',
        ariaValuemax: 'aria-valuemax',
    }

    constructor(dynamicCardEvents, rootElement) {
        this.dynamicCardEvents = dynamicCardEvents
        this.rootElement = rootElement
        this.spinbuttonElement = this.rootElement.querySelector(this.selectors.spinbutton)
        this.btnIncreasingElement = this.rootElement.querySelector(this.selectors.btnIncreasing)
        this.btnReducingElement = this.rootElement.querySelector(this.selectors.btnReducing)
        this.minValue = parseInt(this.spinbuttonElement.getAttribute(this.stateAttributes.ariaValuemin))
        this.maxValue = parseInt(this.spinbuttonElement.getAttribute(this.stateAttributes.ariaValuemax))
        this.beinEvents();
    }

    increasingNumber = () => {
        let currentNumber = parseInt(this.spinbuttonElement.textContent)

        let newNumber = currentNumber + 3

        if (newNumber > this.maxValue) {
            newNumber = this.maxValue
        }

        this.spinbuttonElement.textContent = newNumber
        this.spinbuttonElement.setAttribute(this.stateAttributes.ariaValuenow, newNumber)

        const isRowActive = this.dynamicCardEvents.switchingListStyle.btnRowElement.classList.contains('active');

        if (isRowActive) {
            this.dynamicCardEvents.addDataRowToHTML()
        } else {
            this.dynamicCardEvents.addDataBlockToHTML()
        }
    }

    reducingNumber = () => {
        let currentNumber = parseInt(this.spinbuttonElement.textContent)

        let newNumber = currentNumber - 3

        if (newNumber < this.minValue) {
            newNumber = this.minValue
        }

        this.spinbuttonElement.textContent = newNumber;
        this.spinbuttonElement.setAttribute(this.stateAttributes.ariaValuenow, newNumber)

        const isRowActive = this.dynamicCardEvents.switchingListStyle.btnRowElement.classList.contains('active');

        if (isRowActive) {
            this.dynamicCardEvents.addDataRowToHTML()
        } else {
            this.dynamicCardEvents.addDataBlockToHTML()
        }
    }

    get isNeedToChange() {
        const isFocused = document.activeElement === this.spinbuttonElement

        return (isFocused)
    }

    chekFocused = () => {
        const isFocused = document.activeElement === this.spinbuttonElement

        if (isFocused) {
            document.addEventListener('wheel', this.onWheel, {passive: false})
        }
    }

    onWheel = (event) => {
        if(this.isNeedToChange) {
            event.preventDefault()
            if (event.deltaY < 0) {
                this.increasingNumber();
            } else {
                this.reducingNumber();
            }
        }else{return}
    }

    onKeyDown = (event) => {
        const { code } = event

        const action = {
            ArrowUp: this.increasingNumber,
            ArrowDown: this.reducingNumber,
        }[code]

        if (action) {
            event.preventDefault()
            action()
        }
    }

    beinEvents() {
        if (this.btnIncreasingElement) {
            this.btnIncreasingElement.addEventListener('click', this.increasingNumber)
        }

        if (this.btnReducingElement) {
            this.btnReducingElement.addEventListener('click', this.reducingNumber)
        }
        this.rootElement.addEventListener('keydown', this.onKeyDown)

        if (this.spinbuttonElement) {
            this.spinbuttonElement.addEventListener('click', this.chekFocused)
        }
    }
}

export default Spinbutton