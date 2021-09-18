import Calendar from "./calendar.js";

export default class Schedule {
    //TODO: завести поля
    // selectedDay, events, onEventAdded,
    // onEventChanged, onEventDeleted, onValidateEvent
    // в этом классе. Соответсвующие функции определить в app.js
    constructor(rootEl, selectedDay, events, eventAdded, eventChanged, eventDeleted, validateEvent) {
        this.rootEl = rootEl;
        this.selectedDay = selectedDay;
        this.events = events;
        this.eventAdded = eventAdded;
        this.eventChanged = eventChanged;
        this.eventDeleted = eventDeleted;
        this.validateEvent = validateEvent;

        this.modal = document.getElementById('addEvent');
        this.btnAddEvent = document.querySelector('.btn-addEvent')
        this.btnClose = document.querySelector('.modal__close');
        this.btnCansel = document.querySelector('.eventForm__cancel');

        this.formEvent = document.querySelector('.eventForm');
        this.titleEvent = document.querySelector('#titleEvent');
        this.startEvent = document.querySelector('#dateStartEvent');
        this.endEvent = document.querySelector('#dateEndEvent');
        this.submitEvent = document.querySelector('.eventForm__submit');

        this.btnClose.addEventListener('click', this.closeAddEventDialog.bind(this));
        this.btnAddEvent.addEventListener('click', this.showAddEventDialog.bind(this));
        this.btnCansel.addEventListener('click', this.cancelAddEventDialog.bind(this));
        this.submitEvent.addEventListener('submit', this.addEvent.bind(this));

        this.init();
    }

    init() {

    }

    selectedDayChanged(selectedDay, events) {
        //TODO: написать логику отрисовки контрола для выбранного дня и списка событий этого дня
        this.selectedDay = selectedDay;
    }

    addEvent() {
        //TODO: реализовать логику добавления события
        const event = {
            id: this.dateToLocal('id'),
            title: this.titleEvent.value,
            startEvent: this.startEvent.value,
            endEvent: this.endEvent.value,
        };

        if (this.validateEvent && !this.validateEvent(event)) {
            return;
        }


        if (this.eventAdded)
            this.eventAdded(event);
    }


    dateToLocal() {
        const date = this.selectedDay ?? new Date();
        const dateLocalTimeToString = {
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            makeDate: function() {
                return `${this.year.toString()}-${this.month.toString().padStart(2, "0")}-${this.date.toString().padStart(2, "0")}`
            },
            makeId: function() {
                return date.getTime();
            },
            defaultStartTime: function () {
                return `${this.makeDate()}T${this.hours.toString().padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")}`
            },
            defaultEndTime: function () {
                return `${this.makeDate()}T${(this.hours + 1).toString().padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")}`
            },
        }

        if (arguments[0] === 'start') {
            return dateLocalTimeToString.defaultStartTime();
        } else if (arguments[0] === 'end') {
            return dateLocalTimeToString.defaultEndTime();
        } else if (arguments[0] === 'id') {
            return dateLocalTimeToString.makeId();
        } return null;
    }


    showAddEventDialog() {
        //TODO: реализовать логику диалогового окна для заполнения деталей события.
        // В окне должно быть 2 кнопки Add и Cancel. По нажатию на кнопку Add прежде, чем создавать
        // событие и закрывать окно, необходимо:
        // 1. Проверять, корректные ли значения введены в поля (допустимые символы, допустимые длины строк,
        // правильное время и т.д.)
        // 2. Проверять, валидность события с точки зрения логики приложения. То есть, вызывать метод onValidateEvent,
        // который передается извне.
        // Если все ок - возвращаем созданный объект события

        this.modal.classList.add('modal-visible');
        this.startEvent.value = `${this.dateToLocal('start')}`;
        this.endEvent.value = `${this.dateToLocal('end')}`;



        // if (this.validateEvent(event)) {
        //     return event;
        // }
    }
    // validateEvent() {
    //
    // }
    closeAddEventDialog(e) {
        e.preventDefault();
        this.modal.classList.remove('modal-visible');
    }
    cancelAddEventDialog() {
        this.modal.classList.remove('modal-visible');
    }
}

