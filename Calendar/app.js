import TimeLineInSchedule from './timeLineInSchedule.js';
import Calendar from './calendar.js';
import Schedule from './schedule.js';

const MONTH_LIST = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

const YEAR_LIST = function (fromYear, toYear) {
    let genArrYear = [];
    for (let i = fromYear; i < toYear; i++) {
        genArrYear.push(i);
    }
    return genArrYear;
}(1970, 2050);


function onSelectedDayChanged(selectedDay) {
    if (!selectedDay)
        return;

    const events = getEvents(selectedDay);
    schedule.selectedDayChanged(selectedDay, events);
}

function getEvents(selectedDay) {
    console.log(selectedDay);
    //TODO: сделать вычитку событий из localStorage для выбранного дня

    // const getEventsFromLocalStorage =
    return [];
}

function onEventAdded(event) {
    //todo >> event

    localStorage.setItem(event.id.toString(), JSON.stringify(event));

    schedule.selectedDayChanged(schedule.selectedDate, getEvents(schedule.selectedDate));
}

// function onValidateEvent(event) {
//     if (typeof event.id === "number"
//         && typeof event.title === "string"
//         && typeof event.startEvent === "string"
//         && typeof event.endEvent === "string") {
//         return event;
//     } else return false;
// }
const selectedDate = new Date();

const calendar = new Calendar(
    document.querySelector('.cal'),
    [...MONTH_LIST],
    [...YEAR_LIST],
    onSelectedDayChanged,
    selectedDate);

const schedule = new Schedule(
    document.querySelector('.schedule'),
    getEvents(selectedDate),
    onEventAdded,
    undefined,
    undefined,
    undefined,
    selectedDate);

const timeLine = new TimeLineInSchedule(document.querySelector('.schedule'));

calendar.init();
timeLine.init();


console.log(calendar);
console.log(schedule);
