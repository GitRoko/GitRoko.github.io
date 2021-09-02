export default class Schedule {
    //TODO: завести поля  selectedDay, events, onEventAdded, onEventChanged, onEventDeleted, onValidateEvent
    // в этом классе. Соответсвующие функции определить в app.js
    constructor(rootEl, selectedDay, events, onEventAdded, onEventChanged, onEventDeleted, onValidateEvent) {
        this.rootEl = rootEl;

        this.init();

    }

    init() {

    }

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
    }
}

