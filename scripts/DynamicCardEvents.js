import SwitchingListStyle from "./SwitchingListStyle.js";
import Spinbutton from "./Spinbutton.js";
import Select from "./Select.js";
import SearchEventCard from "./SearchEventCard.js";
import Pagination from "./Pagination.js";

const rootSelector = '[data-js-courses-body-root]'

class DynamicCardEvents {
    selectors = {
        cardList: '[data-js-card-list]',
        rootSelects: '[data-js-select]',
    }

    stateClasses = {
        hide: 'hide',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.cardListElement = rootElement.querySelector(this.selectors.cardList)
        this.events = []
        this.switchingListStyle = new SwitchingListStyle(this, rootElement)
        this.spinbutton = new Spinbutton(this, rootElement)
        this.pagination = new Pagination(this, rootElement)
        this.searchEventCard = new SearchEventCard(this, rootElement)
        this.selects = this.initializeSelects()
        this.selectElements = []
        this.initApp()
    }

    initializeSelects = () => {
        this.selectElements = this.rootElement.querySelectorAll(this.selectors.rootSelects)
        return Array.from(this.selectElements).map(selectElement => new Select(this, selectElement))
    }

    parseDate (dataString)  {
        const months = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11,
        }

        const parts = dataString.split(' ')
        const day = parseInt(parts[0], 10)
        const month = parts[1]
        const monthIndex = months[month]
        const year = new Date().getFullYear()

        return new Date(year, monthIndex, parseInt(day))
    }

    sortCardsByDate = (cardsArray) => {
        const eventsfiltered = cardsArray.sort((a, b) => {
            const dateA = this.parseDate(a.data)
            const dateB = this.parseDate(b.data)

            return dateB - dateA
        })
        return eventsfiltered
    }

    addDataBlockToHTML = () => {
        this.cardListElement.innerHTML = ''
        let limitation = parseInt(this.spinbutton.spinbuttonElement.textContent)

        const selected1 = this.selects[0]?.state.selectedOptionElement.textContent
        const selected2 = this.selects[1]?.state.selectedOptionElement.textContent


        let filteredEvents = this.events;

        if (this.searchEventCard.isTyping) {
            filteredEvents = this.searchEventCard.cards
            limitation = filteredEvents.length
        } else {
            if (selected1 !== "all themes") {
                filteredEvents = filteredEvents.filter(eventData => selected1 === eventData.theme)
            }

            if (selected2 == "newest") {
                filteredEvents = this.sortCardsByDate(filteredEvents)
            } else {
                filteredEvents.sort((a, b) => b.popularity - a.popularity)
            }
        }

        filteredEvents.slice(0, limitation).forEach(eventData => {
            const newEvent = document.createElement('li')
            newEvent.classList.add('team__card', 'event')
            newEvent.innerHTML = `
                <div class="team__head">
                    <div class="team__data">
                        <div class="team__data-day h3">${eventData.data}</div>
                        <div class="team__data-time">${eventData.time}</div>
                    </div>                    
                    <div class="team__info">
                        <div class="team__info-desciption">${eventData.description}</div>
                        <div class="team__info-type">${eventData.type}</div>
                    </div>
                </div>
                <a href="./event.html" class="button">View more</a>`


            this.cardListElement.appendChild(newEvent)
        })
    }

    addDataRowToHTML = () => {
        this.cardListElement.innerHTML = ''
        let limitation = parseInt(this.spinbutton.spinbuttonElement.textContent)

        const selected1 = this.selects[0]?.state.selectedOptionElement.textContent
        const selected2 = this.selects[1]?.state.selectedOptionElement.textContent

        let filteredEvents = this.events

        if (this.searchEventCard.isTyping) {
            filteredEvents = this.searchEventCard.cards
            limitation = filteredEvents.length
        } else {
            if (selected1 !== "all themes") {
                filteredEvents = filteredEvents.filter(eventData => selected1 === eventData.theme)
            }

            if (selected2 == "newest") {
                filteredEvents = this.sortCardsByDate(filteredEvents)
            } else {
                filteredEvents.sort((a, b) => b.popularity - a.popularity)
            }
        }

        filteredEvents.slice(0, limitation).forEach(eventData => {
            const parts = eventData.data.split(' ')
            const day = parts[0]
            const month = parts[1]

            const newEvent = document.createElement('li')
            newEvent.classList.add('events__item', 'events')
            newEvent.innerHTML = `
                <div class="events__date column--1">
                    <div class="events__date-day">${day}</div>
                    <div class="events__date-details">
                        <div class="events__date-month">${month}</div>
                        <div class="events__date-time">${eventData.time}</div>
                    </div>
                </div>
                <div class="events__info column--2">
                    <div class="events__info-description h4">${eventData.description}</div>
                    <div class="events__info-type">${eventData.type}</div>
                </div>
                <a href="./event.html" class="events__button button column--3" tabindex="0">View more</a>`

            this.cardListElement.appendChild(newEvent)
        });
    }

    initApp() {
        fetch('./cards/eventsCards.json')
            .then(response => response.json())
            .then(data => {
                this.events = data
                this.addDataRowToHTML()
                if (this.selects && this.selects.length > 0) {
                    this.pagination.determiningNumberPages()
                }
                this.pagination.determiningNumberPages()
            })
    }
}

class DynamicCardEventsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new DynamicCardEvents(element)
        })
    }
}

export default DynamicCardEventsCollection