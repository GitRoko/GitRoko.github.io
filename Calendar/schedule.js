import Calendar from "./calendar.js";

export default class Schedule {
    //TODO: завести поля  selectedDay, events, onEventAdded, onEventChanged, onEventDeleted, onValidateEvent
    // в этом классе. Соответсвующие функции определить в app.js
    constructor(rootEl, selectedDay, events, onEventAdded, onEventChanged, onEventDeleted, onValidateEvent) {
        this.rootEl = rootEl;
        this.modal = document.getElementById('addEvent');
        this.btnAddEvent = document.querySelector('.btn-addEvent')
        this.btnClose = document.querySelector('.modal__close');
        this.btnCansel = document.querySelector('.eventForm__cancel');

        this.btnClose.addEventListener('click', this.closeAddEventDialog.bind(this));
        this.btnAddEvent.addEventListener('click', this.showAddEventDialog.bind(this));
        this.btnCansel.addEventListener('click', this.cancelAddEventDialog.bind(this));
        this.init();

    }

    init() {

    }
    // renderTitle() {
    //     const title = this.rootEl.querySelector('.schedule-header');
    //
    // }
    selectedDayChanged(selectedDay, events) {
        //TODO: написать логику отрисовки контрола для выбранного дня и списка событий этого дня

    }

    addEvent() {
        //TODO: реализовать логику добавления события
        const newEvent = this.showAddEventDialog();

        if (newEvent && this.onEventAdded)
            this.onEventAdded(newEvent);

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



    }
    closeAddEventDialog(e) {
        e.preventDefault();
        this.modal.classList.remove('modal-visible');
    }
    cancelAddEventDialog() {
        this.modal.classList.remove('modal-visible');
    }
}

