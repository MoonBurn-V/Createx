const rootSelector = '[data-js-courses-body-root]';

class DynamicCardEvents {
    selectors = {
        cardList: '[data-js-card-list]',
    }

    stateClasses = {
        hide: 'hide',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.cardListElement = rootElement.querySelector(this.selectors.cardList)
        this.events = []
        this.initApp()
    }

    // addDataBlockToHTML = () => {
    //     this.cardListElement.innerHTML = ''

    //     this.events.slice(0, 9).forEach(eventData => {
    //         const newEvent = document.createElement('li')
    //         newEvent.classList.add('team__card', 'event')
    //         newEvent.innerHTML = `
    //             <div class="team__head">
    //                 <div class="team__data">
    //                     <div class="team__data-day h3">${eventData.data}</div>
    //                     <div class="team__data-time">${eventData.time}</div>
    //                 </div>
    //                 <div class="team__info">
    //                     <div class="team__info-desciption">${eventData.description}</div>
    //                     <div class="team__info-type">${eventData.type}</div>
    //                 </div>
    //             </div>
    //             <a href="./event.html" class="button">View more</a>
    //         `

    //         this.cardListElement.appendChild(newEvent)
    //     });
    // }

    addDataRowToHTML = () => {
        this.cardListElement.innerHTML = ''

        this.events.slice(0, 9).forEach(eventData => {

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
                <a href="./event.html" class="events__button button column--3" tabindex="0">View more</a>
            `
            this.cardListElement.appendChild(newEvent)
        })
    }

    initApp ()  {
        fetch('./cards/eventsCards.json')
        .then(response => response.json())
        .then(data => {
            this.events = data
            //this.addDataBlockToHTML();
            this.addDataRowToHTML();
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