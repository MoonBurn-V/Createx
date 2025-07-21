class SearchCard {
    selectors = {
        searchInput: '[data-js-search]',
        saerchBtn: '[data-js-btn-search]',
        title: '.card__title',
        item: '.card__item',
    }

    stateClasses = {
        hide: 'hide',
    }

    constructor() {
        this.searchInputElement = document.querySelector(this.selectors.searchInput);
        this.saerchBtnElement = document.querySelector(this.selectors.saerchBtn);
        this.titleElements = document.querySelectorAll(this.selectors.title);
        this.bindEvents();
    }

    bindEvents() {
        if (this.searchInputElement) {
            this.searchInputElement.addEventListener('input', this.search);
            this.searchInputElement.addEventListener('keydown', this.handleEnter);
        }
    }

    handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.search();
        }
    }

    search = () => {
        const searchTerm = this.searchInputElement.value.toLowerCase();

        this.titleElements.forEach(titleElement => {
            const cardItem = titleElement.closest(this.selectors.item);
            const titleText = titleElement.textContent.toLowerCase();

            if (titleText.includes(searchTerm)) {
                cardItem.classList.remove(this.stateClasses.hide);
            } else {
                cardItem.classList.add(this.stateClasses.hide);
            }
        });
    }
}

export default SearchCard
