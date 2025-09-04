class Select  {
  selectors = {
    rootSelects: '[data-js-select]',
    originalControl: '[data-js-select-original-control]',
    button: '[data-js-select-button]',
    dropdown: '[data-js-select-dropdown]',
    option: '[data-js-select-option]',
  }

  stateClasses = {
    isExpanded: 'is-expanded',
    isSelected: 'is-selected',
    isCurrent: 'is-current',
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

  constructor(dynamicCardEvents, rootElement) {
    this.dynamicCardEvents = dynamicCardEvents
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
    this.bindEvents()
  }


  getProxyState = (initialState) => {
    return new Proxy(initialState, {
      get: (target, prop) => {
        return target[prop]
      },
      set: (target, prop, newValue) => {
        const oldValue = target[prop]

        target[prop] = newValue

        if (newValue !== oldValue) {
          this.updateUI()
        }

        return true
      },
    })
  }

  updateUI () {
    const {
      isExpanded,
      currentOptionIndex,
      selectedOptionElement,
    } = this.state

    let newSelectedOptionValue = selectedOptionElement.textContent.trim()

    if (this.dynamicCardEvents.searchEventCard.isTyping) {
      newSelectedOptionValue = "all themes"
    }else {
      newSelectedOptionValue = newSelectedOptionValue
    }

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

      if(this.dynamicCardEvents.searchEventCard.isTyping) {
        this.optionElements[0].classList.add(this.stateClasses.isCurrent)
        this.optionElements[0].classList.add(this.stateClasses.isSelected)
        this.optionElements[0].classList.add(this.stateAttributes.ariaSelected)

        Array.from(this.optionElements).slice(1).forEach((optionElement, index) => {
          const isCurrent = currentOptionIndex === index
          const isSelected = selectedOptionElement === optionElement
          
          optionElement.classList.remove(this.stateClasses.isCurrent, isCurrent)
          optionElement.classList.remove(this.stateClasses.isSelected, isSelected)
        })

      } else {
        this.optionElements.forEach((optionElement, index) => {
          const isCurrent = currentOptionIndex === index
          const isSelected = selectedOptionElement === optionElement

          optionElement.classList.toggle(this.stateClasses.isCurrent, isCurrent)
          optionElement.classList.toggle(this.stateClasses.isSelected, isSelected)
          optionElement.setAttribute(this.stateAttributes.ariaSelected, isSelected)

          const isRowActive = this.dynamicCardEvents.switchingListStyle.btnRowElement.classList.contains('active')

          if (isRowActive) {
            this.dynamicCardEvents.addDataRowToHTML()
          } else {
            this.dynamicCardEvents.addDataBlockToHTML()
          }
        })
      }
    }

    updateOriginControl()
    updateButton()
    updateDropdown()
    updateOptions()
  }

  toggleExpandentState () {
    this.state.isExpanded = !this.state.isExpanded
  }

  expand () {
    this.state.isExpanded = true
  }

  collapse () {
    this.state.isExpanded = false
  }

  selectCurrentOption() {
    this.state.selectedOptionElement = this.optionElements[this.state.currentOptionIndex]
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

  get isNeedToExpand() {
    const isButtonFocused = document.activeElement === this.buttonElement

    return (!this.state.isExpanded && isButtonFocused)
  }

  onButtonClick = () => {
    this.toggleExpandentState()
  }

  onArrowUpKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    if (this.state.currentOptionIndex > 0) {
      this.state.currentOptionIndex--
    } else {
      this.state.currentOptionIndex = this.optionElements.length - 1
    }
  }

  onArrowDownKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    if (this.state.currentOptionIndex < this.optionElements.length - 1) {
      this.state.currentOptionIndex++
    } else {
      this.state.currentOptionIndex = 0
    }
  }

  onSpaceKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    this.selectCurrentOption()
    this.collapse()
  }

  onEnterKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    this.selectCurrentOption()
    this.collapse()
  }

  onKeyDown = (event) => {
    const { code } = event

    const action = {
      ArrowUp: this.onArrowUpKeyDown,
      ArrowDown: this.onArrowDownKeyDown,
      Space: this.onSpaceKeyDown,
      Enter: this.onEnterKeyDown,
    }[code]

    if (action) {
      event.preventDefault()
      action()
    }
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onButtonClick)
    document.addEventListener('click', this.onClick)
    this.rootElement.addEventListener('keydown', this.onKeyDown)
  }
}

export default Select