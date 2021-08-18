// function Calendar(year, month) {
//     //? this = {}
//     //? this.__proto__ = Calendar.prototype

//     //? return this
// }

// Calendar.prototype.render = function () {
//     console.log('render', this);
// }
// const calendar = new Calendar(7, 2021);
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
// const YEAR_LIST = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
const YEAR_LIST = function() {
    let genArrYear = [];
    for(let i = 1970; i < 2050; i++) {
        genArrYear.push(i);
    }
    return genArrYear;
}();


class Calendar {
    constructor(rootEl, monthList = [...MONTH_LIST],  yearList = [...YEAR_LIST]) {
        //? this = {}
        //? this.__proto__ = Calendar.prototype
        const currentDay = new Date();

        this.yearList = yearList;
        this.monthList = monthList;
        // this.rootEl = rootEl;
        this.prevBtn = rootEl.querySelector('.btn-prev');
        this.nextBtn = rootEl.querySelector('.btn-next');
        this.selectMonth = rootEl.querySelector('.select-month');
        this.selectYear = rootEl.querySelector('.select-year');
        this.daysList = rootEl.querySelector('.cal-days');

        this.state = this.getMonthState(currentDay.getFullYear(), currentDay.getMonth());
        this.render();

        this.prevBtn.addEventListener('click', this.prevMonth.bind(this));
        this.nextBtn.addEventListener('click', this.nextMonth.bind(this));
        this.selectMonth.addEventListener('change', this.getSelectedMonth.bind(this));
        this.selectYear.addEventListener('change', this.getSelectedYear.bind(this));
        //? return this

    }

    createDay(year, month, day) {
        return new Date(year, month, day, 12, 0, 0);
    }

    getMonthState(year, month) {
        const firstDayInMonth = this.createDay(year, month, 1);
        const lastDayInMonth = this.createDay(year, month + 1, 0);
        const firstDayWeekIdx = firstDayInMonth.getDay();
        // const firstDayShift = firstDayWeekIdx === 0 ? 6 : firstDayWeekIdx - 1;
        const firstDayShift = (firstDayWeekIdx + 6) % 7;
        const nearestMonday = this.createDay(year, month, 1 - firstDayShift);
        const lastDayWeekIdx = lastDayInMonth.getDay();
        const lastDayShift = (7 - lastDayWeekIdx) % 7;
        const nearestSunday = this.createDay(year, month + 1, lastDayShift);
        const days = [];

        for (
            const currentDay = new Date(nearestMonday);
            currentDay <= nearestSunday;
            currentDay.setDate(currentDay.getDate() + 1)
        ) {
            days.push(new Date(currentDay));
        }

        return {
            days,
            month: firstDayInMonth.getMonth(),
            year: firstDayInMonth.getFullYear()
        };
    }
    setMonth(month, year) {
        this.state = this.getMonthState(year, month);
        this.render();
    }
    getSelectedMonth() {
        this.setMonth(this.state.month = this.selectMonth.options.selectedIndex, this.state.year);
    }
    getSelectedYear() {
        this.setMonth(this.state.month, this.state.year = this.selectYear.value);
    }
    nextMonth() {
        this.setMonth(this.state.month + 1, this.state.year);
    }
    prevMonth() {
        this.setMonth(this.state.month - 1, this.state.year);
    }
    createDayLink(day) {
        const rootEl = document.createElement('li');
        const l = document.createElement('a');

        rootEl.append(l);
        rootEl.className = 'cal-day';

        if (day.getMonth() !== this.state.month) {
            rootEl.classList.add('cal-day--not-in-month');
        }

        l.href = `?day=${day.toJSON().split('T')[0]}`;
        l.innerText = day.getDate();
        l.setAttribute('aria-label', day.toDateString());

        if (day.getDate() === new Date().getDate()) {
            l.className = 'now-day';
        }

        return rootEl;
    }
    createMonthSelect(month) {

        const optionEl = document.createElement('option');

        optionEl.setAttribute('value', `${this.monthList.indexOf(month)}`);
        optionEl.innerText = month;

        if (this.monthList.indexOf(month) === this.state.month) {
            optionEl.defaultSelected = true;
        }
        return optionEl;
    }
    createYearSelect(year) {

        const optionEl = document.createElement('option');

        optionEl.setAttribute('value', `${year}`);
        optionEl.innerText = year;

        if (year === this.state.year) {
            optionEl.defaultSelected = true;
        }
        return optionEl;
    }
    render() {
        const { days } = this.state;
        this.daysList.innerText = '';
        this.selectMonth.innerText = '';
        this.selectYear.innerText = '';

        this.daysList.append(...days.map(day => this.createDayLink(day)));
        this.selectMonth.append(...this.monthList.map(month => this.createMonthSelect(month)));
        this.selectYear.append(...this.yearList.map(year => this.createYearSelect(year)));
    }
}
const calendar = new Calendar(document.querySelector('.cal')); //?
// console.log(Calendar.prototype)
console.log(calendar)

