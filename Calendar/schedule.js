// import Calendar from "./calendar.js";

export default class Schedule {
  //TODO: завести поля
  // selectedDay, events, onEventAdded,
  // onEventChanged, onEventDeleted, onValidateEvent
  // в этом классе. Соответсвующие функции определить в app.js
  constructor(
    rootEl,
    events,
    eventAdded,
    eventChanged,
    eventDeleted,
    validateEvent,
    selectedDay = new Date()) {
    this.rootEl = rootEl;
    this.selectedDay = selectedDay;
    this.events = events;
    this.eventAdded = eventAdded;
    // this.eventChanged = eventChanged;
    // this.eventDeleted = eventDeleted;
    this.validateEvent = validateEvent;

    this.scheduleTitle = document.querySelector('.schedule-title');

    this.modal = document.getElementById('addEvent');
    this.btnAddEvent = document.querySelector('.btn-addEvent')
    this.btnClose = document.querySelector('.modal__close');
    this.btnCansel = document.querySelector('.eventForm__cancel');

    this.formEvent = document.querySelector('.eventForm');
    this.titleEvent = document.querySelector('#titleEvent');
    this.startEvent = document.querySelector('#dateStartEvent');
    this.endEvent = document.querySelector('#dateEndEvent');
    // this.submitEvent = document.querySelector('.eventForm__submit');

    this.btnClose.addEventListener('click', this.closeAddEventDialog.bind(this));
    this.btnAddEvent.addEventListener('click', this.showAddEventDialog.bind(this));
    this.btnCansel.addEventListener('click', this.cancelAddEventDialog.bind(this));
    this.formEvent.addEventListener('submit', this.addEvent.bind(this));
    this.renderScheduleTitle(selectedDay);
    this.selectedDayChanged(selectedDay, events);
    this.init();

  }

  init() {

  }
  renderScheduleTitle(selectedDay) {
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    let locales = 'ru-RU';
    this.scheduleTitle.innerHTML = new Date(selectedDay).toLocaleDateString(locales, options);
  }

  selectedDayChanged(selectedDay, events) {
    this.selectedDay = selectedDay;
    //TODO: написать логику отрисовки контрола для выбранного дня и списка событий этого дня
    this.renderScheduleTitle(selectedDay);
    console.dir(events);
    //TODO: in - Args (selectedDay, events)
    // out: html with "Events"

    const heightParent = this.rootEl.querySelector('.schedule-timeBlocks').offsetHeight;
    const minutesPerDay = 1440;
    document.querySelectorAll('.event').forEach(el =>el.remove());
    events.forEach(function(event) {
      const eventParse = JSON.parse(event);
      const startDay = new Date(eventParse.startEvent).setHours(0, 0, 0, 0)
      const startEvent = Date.parse(eventParse.startEvent);
      const endEvent = Date.parse(eventParse.endEvent);
      const diff1 = startEvent - startDay;
      const diff2 = endEvent - startEvent;
      const msInSec = 1000;
      const secInMin = 60;
      const coordinatesStartEventEl = Math.round((heightParent / minutesPerDay) * Math.round(diff1 / msInSec / secInMin));
      const heightEventEl = Math.round((heightParent / minutesPerDay) * Math.round(diff2 / msInSec / secInMin));
      document.querySelector('.schedule-timeBlocks').insertAdjacentHTML("beforeend", `
        <li class="event" style="top:${coordinatesStartEventEl}px; height:${heightEventEl}px">
          <h3 class="event__title">${eventParse.title}</h3>
          <button class="event__btn event__btn-edit">Edit</button>
          <button class="event__btn event__btn-delete">Delete</button>
        </li>
      `);
    });
  }

  addEvent(e) {
    //TODO: реализовать логику добавления события
    e.preventDefault();
    const event = {
      id: new Date(this.startEvent.value).getTime(),
      title: (this.titleEvent.value.length > 0) ? this.titleEvent.value : 'Event',
      // title: this.titleEvent.value,
      startEvent: this.startEvent.value,
      endEvent: this.endEvent.value,
    };

    if (this.validateEvent && !this.validateEvent(event)) {
      return;
    }

    if (this.eventAdded)
      this.eventAdded(event);
    this.closeAddEventDialog();
  }

  dateToLocal(str) {
    const date = this.selectedDay;
    const dateLocalTimeToString = {
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      makeDate: function () {
        return `${this.year.toString()}-${this.month.toString().padStart(2, "0")}-${this.date.toString().padStart(2, "0")}`
      },
      makeId: function () {
        return date.getTime();
      },
      defaultStartTime: function () {
        return `${this.makeDate()}T${this.hours.toString().padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")}`
      },
      defaultEndTime: function () {
        return `${this.makeDate()}T${(this.hours + 1).toString().padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")}`
      },
    }

    if (str === 'start') {
      return dateLocalTimeToString.defaultStartTime();
    } else if (str === 'end') {
      return dateLocalTimeToString.defaultEndTime();
    } else if (str === 'id') {
      return dateLocalTimeToString.makeId();
    }
    return null;
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
    this.titleEvent.value = '';
    this.startEvent.value = `${this.dateToLocal('start')}`;
    this.endEvent.value = `${this.dateToLocal('end')}`;
  }

  closeAddEventDialog() {
    this.modal.classList.remove('modal-visible');
  }

  cancelAddEventDialog() {
    this.modal.classList.remove('modal-visible');
  }
}

