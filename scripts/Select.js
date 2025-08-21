import BaseComponent from "./BaseComponent.js";

const rootSelector = '[data-js-select]';

class Select extends BaseComponent {
    selectors = {
        root: rootSelector,
        originalControl: '[data-js-select-original-control]',
        button: '[data-js-select-button]',
        dropdown: '[data-js-select-dropdown]',
        option: '[data-js-select-option]',
    }

    stateClasses = {
        isExpanded: 'is-expanded',
        isSelected: 'is-selected',
        isCurrent: 'is-current', // может не понадобиться
        isOnTheLeftSide: 'is-on-the-left-side', // может не понадобиться
        isOnTheRightSide: 'is-on-the-right-side', // может не понадобиться
    }

    stateAttributes = {
        ariaExpanded: 'aria-expanded',
        ariaSelected: 'aria-selected',
        ariaActiveDescendant: 'aria-activedescendant',
    }

    initialState = {
        isExpanded: false,
        currentOptionIndex: null,
        selectedOptionElement: null,
    }

    constructor(rootElement) {
        super()
        this.rootElement = rootElement
        this.originalControlElement = this.rootElement.querySelector(this.selectors.originalControl)
        this.buttonElement = this.rootElement.querySelector(this.selectors.button)
        this.dropdownElement = this.rootElement.querySelector(this.selectors.dropdown)
        this.optionElements = this.dropdownElement.querySelectorAll(this.selectors.option)
        this.state = this.getProxyState({
        ...this.initialState,
        currentOptionIndex: this.originalControlElement.selectedIndex,
        selectedOptionElement: this.optionElements[this.originalControlElement.selectedIndex],
        })
        this.state.isExpanded = true
        //this.fixDropdownPosition()
        // this.updateTabIndexes()
        this.bindEvents()
    }

    updateUI () {
        const {
            isExpanded,
            currentOptionIndex,
            selectedOptionElement,
        } = this.state

        const newSelectedOptionValue = selectedOptionElement.textContent.trim()

        const updateOriginControl = () => {
            this.originalControlElement.value = newSelectedOptionValue
        }

        const updateButton = () => {
            this.buttonElement.textContent = newSelectedOptionValue
            this.buttonElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
            this.buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isExpanded)
            this.buttonElement.setAttribute(
                this.stateAttributes.ariaActiveDescendant, 
                this.optionElements[currentOptionIndex].id
            )
        }

        const updateDropdown = () => {
            this.dropdownElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
        }

        const updateOptions = () => {
            this.optionElements.forEach((optionElement, index) => {
                const isCurrent = currentOptionIndex === index
                const isSelected = selectedOptionElement === optionElement

                optionElement.classList.toggle(this.stateClasses.isCurrent, isCurrent)
                optionElement.classList.toggle(this.stateClasses.isSelected, isSelected)
                optionElement.setAttribute(this.stateAttributes.ariaSelected, isSelected)
            })
        }

        updateOriginControl()
        updateButton()
        updateDropdown()
        updateOptions()
    }

    toggleExpandentState() {
        this.state.isExpanded = !this.state.isExpanded
    }

    expand () {
        this.state.isExpanded = true
    }

    collaps () {
        this.state.isExpanded = false
    }

    onClick = (event) => {
        const { target } = event

        const isButtonClick = target === this.buttonElement
        const isOutsideDropdownClick =
        target.closest(this.selectors.dropdown) !== this.dropdownElement

        if (!isButtonClick && isOutsideDropdownClick) {
            this.collapse()
            return
        }

        const isOptionClick = target.matches(this.selectors.option)

        if (isOptionClick) {
            this.state.selectedOptionElement = target
            this.state.currentOptionIndex = [...this.optionElements]
                .findIndex((optionElement) => optionElement === target)
            this.collapse()
        }
    }

    onButtonClick = () => {
        this.toggleExpandentState()
    }

    bindEvents() {
        this.buttonElement.addEventListener('click', this.onButtonClick)
        document.addEventListener('click', this.onClick)
    }
}

class SelectCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Select(element)
    })
  }
}

export default SelectCollection