class SearchCard {
    selectors = {
        searchInput: '[data-js-search]',
        saerchBtn: '[data-js-btn-search]',
        title: '.card__title',
        subtitle: '.card__subtitle',
        price: '.card__price',
        speaker: '.card__speaker',
        item: '.card__item',
        eventItem: '.events__item',
        teamItem: '.team__card',
        eventDay: '.events__date-day',
        eventMonth: '.events__date-month',
        eventTime: '.events__date-time',
        eventDescription: '.events__info-description',
        eventType: '.events__info-type',
        teamDay: '.team__data-day',
        teamTime: '.team__data-time',
        teameDescriprion: '.team__info-desciption',
        teamType: '.team__info-type',
        loadButton: '[data-js-load-btn]',
    }

    stateClasses = {
        hide: 'hide',
    }

    constructor(loadCardsInstance) {
        this.loadCardsInstance = loadCardsInstance;
        this.itemElement = document.querySelectorAll(this.selectors.item);
        this.eventItemElement = document.querySelectorAll(this.selectors.eventItem);
        this.teamItemElement = document.querySelectorAll(this.selectors.teamItem);
        this.searchInputElement = document.querySelector(this.selectors.searchInput);
        this.saerchBtnElement = document.querySelector(this.selectors.saerchBtn);


        this.loadButtonElement = document.querySelector(this.selectors.loadButton);

        this.bindEvents();
    }

    bindEvents() {
        if (this.searchInputElement) {
            this.searchInputElement.addEventListener('input', this.search);
        }
    }

    search = () => {
        const searchTerm = this.searchInputElement.value.toLowerCase();

        let cardItems;

        if(this.itemElement.length > 0) {
            cardItems = this.itemElement;
            console.log("Мы нашли itemElement");
        } else if (this.eventItemElement.length > 0) {
            cardItems = this.eventItemElement;
            console.log("Мы нашли eventItemElement");
        } else if (this.teamItemElement.length > 0) {
            cardItems = this.teamItemElement;
            console.log("Мы нашли teamItemElement");
        } else {
            console.log("Ни один из элементов (itemElement, eventItemElement, teamItemElement) не найден на странице.");
            return;
        }

        cardItems.forEach(cardItem => {
            cardItem.classList.remove(this.stateClasses.hide);        
        });

        if (searchTerm === "") {
            if(this.loadButtonElement) {
                this.loadButtonElement.classList.remove(this.stateClasses.hide);
            }
            this.loadCardsInstance.resetCardsShown();
            this.loadCardsInstance.hideInitialCards();
            return;
        } else {
            console.log("работает")
        }

        cardItems.forEach(cardItem => {
            let found = false;

            let selectors;
            if (cardItem.classList.contains('card__item')) {
                selectors = {
                    title: this.selectors.title,
                    subtitle: this.selectors.subtitle,
                    price: this.selectors.price,
                    speaker: this.selectors.speaker
                };
            } else if (cardItem.classList.contains('events__item')) {
                selectors = {
                    eventDay: this.selectors.eventDay,
                    eventMonth: this.selectors.eventMonth,
                    eventTime: this.selectors.eventTime,
                    eventDescription: this.selectors.eventDescription,
                    eventType: this.selectors.eventType
                };
            } else if (cardItem.classList.contains('team__card')) {
                selectors = {
                    teamDay: this.selectors.teamDay,
                    teamTime: this.selectors.teamTime,
                    teameDescriprion: this.selectors.teameDescriprion,
                    teamType: this.selectors.teamType
                };
            } else {
                console.warn("Неизвестный тип карточки:", cardItem);
                return;
            }

            for (const key in selectors) {
                const selector = selectors[key];
                const element = cardItem.querySelector(selector);

                if (element) {
                    let textContent = element.textContent.toLowerCase();
                    if (key === 'price') {
                        textContent = textContent.replace('$', '').trim();
                    }

                    if (textContent.includes(searchTerm)) {
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                cardItem.classList.add(this.stateClasses.hide);
            }
        });

        if (this.loadButtonElement) {
            this.loadButtonElement.classList.add(this.stateClasses.hide);
        }
    }
}

export default SearchCard