class SearchCard {
    selectors = {
        searchInput: '[data-js-search]',
        saerchBtn: '[data-js-btn-search]',
        title: '.card__title',
        subtitle: '.card__subtitle',
        price: '.card__price',
        speaker: '.card__speaker',
        item: '.card__item',
        loadButton: '[data-js-load-btn]',
    }

    stateClasses = {
        hide: 'hide',
    }

    constructor(loadCardsInstance) {
        this.loadCardsInstance = loadCardsInstance;
        this.searchInputElement = document.querySelector(this.selectors.searchInput);
        this.saerchBtnElement = document.querySelector(this.selectors.saerchBtn);
        this.titleElements = document.querySelectorAll(this.selectors.title);
        this.priceElements = document.querySelectorAll(this.selectors.price);
        this.speakerElements = document.querySelectorAll(this.selectors.speaker);
        this.subtitleElements = document.querySelectorAll(this.selectors.subtitle);
        this.loadButtonElement = document.querySelector(this.selectors.loadButton);
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
        const cardItems = document.querySelectorAll(this.selectors.item);

        cardItems.forEach(cardItem => {
            cardItem.classList.remove(this.stateClasses.hide);
        });

        if (searchTerm === "") {
            this.loadButtonElement.classList.remove(this.stateClasses.hide);
            this.loadCardsInstance.hideInitialCards();
            return;
        }

        cardItems.forEach(cardItem => {
            let found = false;

            const titleElement = cardItem.querySelector(this.selectors.title);
            const subtitleElement = cardItem.querySelector(this.selectors.subtitle);
            const priceElement = cardItem.querySelector(this.selectors.price);
            const speakerElement = cardItem.querySelector(this.selectors.speaker);

            if (titleElement && titleElement.textContent.toLowerCase().includes(searchTerm)) {
                found = true;
            }
            if (subtitleElement && subtitleElement.textContent.toLowerCase().includes(searchTerm)) {
                found = true;
            }
            if (priceElement) {
                const priceText = priceElement.textContent.replace('$', '').trim().toLowerCase();
                if (priceText.includes(searchTerm)) {
                    found = true;
                }
            }
            if (speakerElement && speakerElement.textContent.toLowerCase().includes(searchTerm)) {
                found = true;
            }

            if (!found) {
                cardItem.classList.add(this.stateClasses.hide);
            }
        });

        this.loadButtonElement.classList.add(this.stateClasses.hide);
    }
}

export default SearchCard