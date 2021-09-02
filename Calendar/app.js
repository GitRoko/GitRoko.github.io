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
    //TODO: сделать вычитку событий из localStorage для выбранного дня
    return [];
}

const calendar = new Calendar(
    document.querySelector('.cal'),
    [...MONTH_LIST],
    [...YEAR_LIST],
    onSelectedDayChanged);

const schedule = new Schedule(document.querySelector('.schedule'));
const timeLine = new TimeLineInSchedule(document.querySelector('.schedule'));

calendar.render();
timeLine.init();


console.log(calendar);
console.log(schedule);
