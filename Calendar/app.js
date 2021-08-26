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

class Calendar {
    constructor(rootEl, monthList = [...MONTH_LIST], yearList = [...YEAR_LIST]) {


        this.yearList = yearList;
        this.monthList = monthList;
        this.rootEl = rootEl;
        this.prevBtn = rootEl.querySelector('.btn-prev');
        this.nextBtn = rootEl.querySelector('.btn-next');
        this.selectMonth = rootEl.querySelector('.select-month');
        this.selectYear = rootEl.querySelector('.select-year');
        this.daysList = rootEl.querySelector('.cal-days');

        const currentDay = new Date();
        this.state = this.getMonthState(currentDay.getFullYear(), currentDay.getMonth());
        this.render();

        // this.dayLinks = rootEl.querySelectorAll('.cal-day a');

        this.prevBtn.addEventListener('click', this.prevMonth.bind(this));
        this.nextBtn.addEventListener('click', this.nextMonth.bind(this));
        this.selectMonth.addEventListener('change', this.getSelectedMonth.bind(this));
        this.selectYear.addEventListener('change', this.getSelectedYear.bind(this));
        this.daysList.addEventListener('click', this.setActiveDay.bind(this));
        // this.dayLinks.forEach(a =>
        //     a.addEventListener("click", this.setActiveDay.bind(this)));
        // this.dayLinks.onClick = function(e) {
        //         console.log(e.target);
        // }
    }


    compareDatesWithoutTime(date1, date2) {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() == date2.getFullYear();
    }

    createDay(year, month, day) {
        return new Date(year, month, day, 12, 0, 0);
    }

    getMonthState(year, month) {
        // firstDayInMonth -- первый день месяца
        const firstDayInMonth = this.createDay(year, month, 1);
        console.log(firstDayInMonth);

        // lastDayInMonth -- посдедний день месяца
        const lastDayInMonth = this.createDay(year, month + 1, 0);
        console.log(lastDayInMonth);

        // firstDayWeekIdx -- индекс дня недели(начинается с 0 - ВС, 1 - ПН...)
        const firstDayWeekIdx = firstDayInMonth.getDay();
        console.log(firstDayWeekIdx);

        // firstDayShift - находим сдвиг первого дня месяца относительно дней недели
        // const firstDayShift = firstDayWeekIdx === 0 ? 6 : firstDayWeekIdx - 1;
        const firstDayShift = (firstDayWeekIdx + 6) % 7;
        console.log(firstDayShift);

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
        const today = new Date();
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return {
            days,
            month: firstDayInMonth.getMonth(),
            year: firstDayInMonth.getFullYear(),
            today: todayDate,
            selectedDate: todayDate,
        };
    }

    setMonth(month, year) {
        this.state = this.getMonthState(year, month);
        console.log(this.state);
        this.render();
    }

    getSelectedMonth() {
        this.setMonth(this.selectMonth.options.selectedIndex, this.state.year);
    }

    getSelectedYear() {
        console.log(this.selectYear.value);
        this.setMonth(this.state.month, this.selectYear.value);
    }

    nextMonth() {
        this.setMonth(this.state.month + 1, this.state.year);
    }

    prevMonth() {
        this.setMonth(this.state.month - 1, this.state.year);
    }

    setActiveDay(e) {
        e.preventDefault();

        const selectedDayEl = e.target;
        if (!selectedDayEl) {
            return;
        }

        const dayLink = this.rootEl.querySelector('.active-day');
        if (dayLink) {
            dayLink.classList.remove('active-day');
        }

        selectedDayEl.classList.add('active-day');

        const selectedDate = new Date(selectedDayEl.getAttribute('aria-label'));

        this.updateState(selectedDate);
        console.log(this.state);
    }

    updateState(selectedDate) {
        this.state.selectedDate = selectedDate;
        this.state.year = selectedDate.getFullYear();
        this.state.month = selectedDate.getMonth();
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
        l.classList.add('cal-dayLink');

        // находим сегодняшний день при рендере календаря
        const today = new Date();
        if (this.compareDatesWithoutTime(day, today)) {
            // console.log(day);
            // console.log(today);
            l.className = 'cal-dayLink';
            l.classList.add('now-day');
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
        const {days} = this.state;
        // console.log('this.state',this.state);
        this.daysList.innerText = '';
        this.selectMonth.innerText = '';
        this.selectYear.innerText = '';

        this.daysList.append(...days.map(day => this.createDayLink(day)));
        this.selectMonth.append(...this.monthList.map(month => this.createMonthSelect(month)));
        this.selectYear.append(...this.yearList.map(year => this.createYearSelect(year)));
        // console.log('dayLinks',this.dayLinks);
    }
}

const calendar = new Calendar(document.querySelector('.cal'));


console.log(calendar)

