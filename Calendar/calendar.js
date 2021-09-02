export default class Calendar {
    constructor(rootEl, monthList, yearList, onSelectedDayChanged, activeDay) {

        this.yearList = yearList;
        this.monthList = monthList;
        this.rootEl = rootEl;
        this.prevBtn = rootEl.querySelector('.btn-prev');
        this.nextBtn = rootEl.querySelector('.btn-next');
        this.selectMonth = rootEl.querySelector('.select-month');
        this.selectYear = rootEl.querySelector('.select-year');
        this.daysList = rootEl.querySelector('.cal-days');

        const currentDay = new Date();
        this.state = {
            monthInfo: this.getMonthInfo(currentDay.getFullYear(), currentDay.getMonth()),
            selectedDate: activeDay ? activeDay : currentDay
        };
        this.prevBtn.addEventListener('click', this.prevMonth.bind(this));
        this.nextBtn.addEventListener('click', this.nextMonth.bind(this));
        this.selectMonth.addEventListener('change', this.setSelectedMonth.bind(this));
        this.selectYear.addEventListener('change', this.setSelectedYear.bind(this));
        this.daysList.addEventListener('click', this.setActiveDay.bind(this));

        this.onSelectedDayChanged = onSelectedDayChanged;
    }


    compareDatesWithoutTime(date1, date2) {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }

    createDay(year, month, day) {
        return new Date(year, month, day, 0, 0, 0);
    }

    getMonthInfo(year, month) {
        // firstDayInMonth -- первый день месяца
        const firstDayInMonth = this.createDay(year, month, 1);
        // lastDayInMonth -- посдедний день месяца
        const lastDayInMonth = this.createDay(year, month + 1, 0);
        // firstDayWeekIdx -- индекс дня недели(начинается с 0 - ВС, 1 - ПН...)
        const firstDayWeekIdx = firstDayInMonth.getDay();
        // firstDayShift - находим сдвиг первого дня месяца относительно дней недели
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

        // return days;
        // const today = new Date();
        // const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return {
            days,
            month: firstDayInMonth.getMonth(),
            year: firstDayInMonth.getFullYear(),
            // today: todayDate,
            // selectedDate: todayDate,
        };
    }

    setMonth(month, year) {
        this.updateState(null, this.getMonthInfo(year, month));
        this.render();
    }

    setSelectedMonth() {
        this.setMonth(this.selectMonth.options.selectedIndex, this.state.monthInfo.year);
    }

    setSelectedYear() {
        this.setMonth(this.state.monthInfo.month, this.selectYear.value);
    }

    nextMonth() {
        this.setMonth(this.state.monthInfo.month + 1, this.state.monthInfo.year);
    }

    prevMonth() {
        this.setMonth(this.state.monthInfo.month - 1, this.state.monthInfo.year);
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
        if (this.onSelectedDayChanged) {
            this.onSelectedDayChanged(this.state);
        }
    }


    updateState(selectedDate, monthInfo) {
        if (selectedDate) {
            this.state.selectedDate = selectedDate;
        }
        if (monthInfo) {
            this.state.monthInfo = monthInfo;
        }
    }


    createDayLink(day) {
        const rootEl = document.createElement('li');
        const l = document.createElement('a');

        rootEl.append(l);
        rootEl.className = 'cal-day';

        if (day.getMonth() !== this.state.monthInfo.month) {
            rootEl.classList.add('cal-day--not-in-month');
        }
        l.href = `?day=${day.toJSON().split('T')[0]}`;
        // l.href = `?day=${day.toLocaleDateString().split('/').reverse().join('-')}`;
        l.innerText = day.getDate();
        l.setAttribute('aria-label', day.toDateString());
        l.classList.add('cal-dayLink');

        // находим сегодняшний день при рендере календаря
        const today = new Date();
        if (this.compareDatesWithoutTime(day, today)) {
            l.className = 'cal-dayLink';
            l.classList.add('now-day');
        }

        return rootEl;
    }

    // Вместо 2-х следующих методов сделать один общий
    // createSelectOption (optionValue, optionInnerText, selectedValue)
    // Для списка месяцев вызов будет выглядеть
    // createSelectOption(this.monthList.indexOf(month), month,  this.state.monthInfo.month)
    // Для списка годов  - createSelectOption(year, year, this.state.monthInfo.year)
    createMonthSelect(month) {

        const optionEl = document.createElement('option');

        optionEl.setAttribute('value', `${this.monthList.indexOf(month)}`);
        optionEl.innerText = month;

        if (this.monthList.indexOf(month) === this.state.monthInfo.month) {
            optionEl.defaultSelected = true;
        }
        return optionEl;
    }

    createYearSelect(year) {

        const optionEl = document.createElement('option');

        optionEl.setAttribute('value', `${year}`);
        optionEl.innerText = year;

        if (year === this.state.monthInfo.year) {
            optionEl.defaultSelected = true;
        }
        return optionEl;
    }

    render() {
        const {days} = this.state.monthInfo;
        this.daysList.innerText = '';
        this.selectMonth.innerText = '';
        this.selectYear.innerText = '';
        // нужно создавать списки опций для месяцев и годов только при первой отрисовке календаря.
        // При последующих - достаточно сбросить текущее выделение и проставить новое
        this.daysList.append(...days.map(day => this.createDayLink(day)));
        this.selectMonth.append(...this.monthList.map(month => this.createMonthSelect(month)));
        this.selectYear.append(...this.yearList.map(year => this.createYearSelect(year)));
    }
}

