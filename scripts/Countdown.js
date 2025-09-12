const rootSelector = '[data-js-countdown]'

class CountdownCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Countdown(element)
        })
    }
}


//Демонстрационный вариант
// class Countdown {

//     selectors = {
//         days: '[data-js-days]',
//         hours: '[data-js-hours]',
//         mins: '[data-js-mins]',
//         sec: '[data-js-sec]',
//         message: '[data-js-discount-message]',
//     }

//     initialValues = {
//         days: 6,
//         hours: 18,
//         mins: 24,
//         sec: 12
//     }

//     stateClasses = {
//         active: 'active',
//     }

//     constructor(rootElement) {
//         this.rootElement = rootElement
//         this.daysElement = this.rootElement.querySelector(this.selectors.days);
//         this.hoursElement = this.rootElement.querySelector(this.selectors.hours);
//         this.minsElement = this.rootElement.querySelector(this.selectors.mins);
//         this.secElement = this.rootElement.querySelector(this.selectors.sec);
//         this.messageElement = document.querySelector(this.selectors.message);
//         this.timeLeft = { ...this.initialValues };
//         this.startCountdown();
        
//     }

//     updateDisplay() {
//         this.daysElement.textContent = String(this.timeLeft.days).padStart(2, '0');
//         this.hoursElement.textContent = String(this.timeLeft.hours).padStart(2, '0');
//         this.minsElement.textContent = String(this.timeLeft.mins).padStart(2, '0');
//         this.secElement.textContent = String(this.timeLeft.sec).padStart(2, '0');
//     }

//     tick() {
//         this.timeLeft.sec--;

//         if (this.timeLeft.sec < 0) {
//             this.timeLeft.sec = 59;
//             this.timeLeft.mins--;

//             if (this.timeLeft.mins < 0) {
//                 this.timeLeft.mins = 59;
//                 this.timeLeft.hours--;

//                 if (this.timeLeft.hours < 0) {
//                     this.timeLeft.hours = 23;
//                     this.timeLeft.days--;

//                     if (this.timeLeft.days < 0) {
//                         clearInterval(this.intervalId);
//                         this.rootElement.classList.remove(this.stateClasses.active);
//                         this.messageElement.classList.add(this.stateClasses.active);
//                         return;
//                     }
//                 }
//             }
//         }

//         this.updateDisplay();
//     }


//     startCountdown() {
//         this.updateDisplay();
//         this.intervalId = setInterval(() => {
//             this.tick();
//         }, 1000);
//     }
// }

// export default Countdown;



//Вариант более приблтженный к реальности
class Countdown {

    selectors = {
        root: '[data-js-countdown]',
        days: '[data-js-days]',
        hours: '[data-js-hours]',
        mins: '[data-js-mins]',
        sec: '[data-js-sec]',
        message: '[data-js-discount-message]',
    }

    stateClasses = {
        active: 'active',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.daysElement = this.rootElement.querySelector(this.selectors.days);
        this.hoursElement = this.rootElement.querySelector(this.selectors.hours);
        this.minsElement = this.rootElement.querySelector(this.selectors.mins);
        this.secElement = this.rootElement.querySelector(this.selectors.sec);
        this.messageElement = document.querySelector(this.selectors.message);
        this.targetDate = new Date(new Date().getFullYear(), 0, 1);
        if (new Date() > this.targetDate) {
            this.targetDate = new Date(new Date().getFullYear() + 1, 0, 1);
        }
        this.timeLeft = this.getTimeLeft();
        this.startCountdown();
        
    }

    getTimeLeft() {
        const now = new Date();
        const difference = this.targetDate.getTime() - now.getTime();

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                mins: 0,
                sec: 0
            };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const sec = Math.floor((difference % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            mins,
            sec
        };
    }


    updateDisplay() {
        this.daysElement.textContent = String(this.timeLeft.days).padStart(2, '0');
        this.hoursElement.textContent = String(this.timeLeft.hours).padStart(2, '0');
        this.minsElement.textContent = String(this.timeLeft.mins).padStart(2, '0');
        this.secElement.textContent = String(this.timeLeft.sec).padStart(2, '0');
    }

    tick() {
        this.timeLeft.sec--;

        if (this.timeLeft.sec < 0) {
            this.timeLeft.sec = 59;
            this.timeLeft.mins--;

            if (this.timeLeft.mins < 0) {
                this.timeLeft.mins = 59;
                this.timeLeft.hours--;

                if (this.timeLeft.hours < 0) {
                    this.timeLeft.hours = 23;
                    this.timeLeft.days--;

                    if (this.timeLeft.days < 0) {
                        clearInterval(this.intervalId);
                        this.rootElement.classList.remove(this.stateClasses.active);
                        this.messageElement.classList.add(this.stateClasses.active);
                        return;
                    }
                }
            }
        }
        alert("проблема не в тиках")
    }


    startCountdown() {
        this.updateDisplay();
        this.intervalId = setInterval(() => {
            this.timeLeft = this.getTimeLeft();
            this.updateDisplay();

            if (this.timeLeft.days === 0 && this.timeLeft.hours === 0 && this.timeLeft.mins === 0 && this.timeLeft.sec === 0) {
                clearInterval(this.intervalId);
                this.rootElement.classList.remove(this.stateClasses.active);
                this.messageElement.classList.add(this.stateClasses.active);
            }
        }, 1000);
    }
}


export default CountdownCollection