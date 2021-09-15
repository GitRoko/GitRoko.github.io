
export default class Calendar {
    constructor(rootEl, monthList, yearList, onSelectedDayChanged, activeDay, selectedDate) {

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
        let newDate1 = new Date(date1);
        let newDate2 = new Date(date2);
        return newDate1.getDate() === newDate2.getDate() &&
            newDate1.getMonth() === newDate2.getMonth() &&
            newDate1.getFullYear() === newDate2.getFullYear();
    }

    createDay(year, month, day) {
        return new Date(year, month, day, 0, 0, 0);
    }

    getMonthInfo(year, month) {
        const firstDayInMonth = this.createDay(year, month, 1);
        const lastDayInMonth = this.createDay(year, month + 1, 0);
        const firstDayWeekIdx = firstDayInMonth.getDay();
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
            month: month,
            year: year,
        };
    }

    setMonth(year, month) {
        if (month < 0 || month > 11) {
            month = new Date().getMonth();
        }
        if (year < 1970 || year > 2050) {
            year = new Date().getFullYear();
        }
        this.updateState(null, this.getMonthInfo(year, month));

        this.render();
    }

    setSelectedMonth() {
        this.state.monthInfo.month = parseInt(this.selectMonth.value, 10);
        this.setMonth(this.state.monthInfo.year, this.state.monthInfo.month);
    }

    setSelectedYear() {
        this.state.monthInfo.year = parseInt(this.selectYear.value, 10);
        this.setMonth(this.state.monthInfo.year, this.state.monthInfo.month);
    }

    nextMonth() {
        this.setMonth(this.state.monthInfo.year, this.state.monthInfo.month + 1);
    }

    prevMonth() {
        this.setMonth(this.state.monthInfo.year, this.state.monthInfo.month - 1);
    }

    setActiveDay(e) {
        e.preventDefault();

        const selectedDayEl = e.target;
        const selectedDate = new Date(selectedDayEl.getAttribute('aria-label'));

        if (this.state.month !== selectedDate.getMonth()) {
            this.setMonth(selectedDate.getFullYear(), selectedDate.getMonth());
        }

        if (!selectedDayEl) {
            return;
        }

        this.updateState(selectedDate);
        if (this.onSelectedDayChanged) {
            this.onSelectedDayChanged(selectedDate);
        }

       this.toggleClassActiveDay();
    }

    toggleClassActiveDay() {
        const dayLink = this.rootEl.querySelector('.active-day');
        if (dayLink) {
            dayLink.classList.remove('active-day');
        }

        const dayLinks = this.rootEl.querySelectorAll('.cal-dayLink');

        dayLinks.forEach((el) => {
            let dateEl = el.getAttribute('aria-label');

            if (this.compareDatesWithoutTime(dateEl, this.state.selectedDate)) {
                el.classList.add('active-day');
            }
        });
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
        const dayText = day.toLocaleDateString().split('.').reverse().join('-');
        rootEl.append(l);
        rootEl.className = 'cal-day';

        if (day.getMonth() !== this.state.monthInfo.month) {
            rootEl.classList.add('cal-day--not-in-month');
        }

        l.href = `?day=${dayText}`;
        l.innerText = day.getDate();
        l.setAttribute('aria-label', day);
        l.classList.add('cal-dayLink');

        const today = new Date();
        if (this.compareDatesWithoutTime(day, today)) {
            l.className = 'cal-dayLink';
            l.classList.add('now-day');
        }
        return rootEl;
    }

    createOption(optionValue, optionInnerText, selectedValue) {
        const optionEl = document.createElement('option');

        optionEl.setAttribute('value', `${optionValue}`);
        optionEl.innerText = optionInnerText;

        if (optionValue === selectedValue) {
                optionEl.defaultSelected = true;
        }

        return optionEl;
    }

    createListOptions() {
        if (this.selectMonth.options.length === 0) {
            this.selectMonth.append(...this.monthList.map(el => this.createOption(this.monthList.indexOf(el), el, this.state.monthInfo.month)));
        } else {this.selectMonth.selectedIndex = this.state.monthInfo.month;}
        if (this.selectYear.options.length === 0) {
            this.selectYear.append(...this.yearList.map(el => this.createOption(el, el, this.state.monthInfo.year)));
        } else {this.selectYear.selectedIndex = this.yearList.indexOf(this.state.monthInfo.year);}
    }

    render() {
        const {days} = this.state.monthInfo;
        this.daysList.innerText = '';
        this.daysList.append(...days.map(day => this.createDayLink(day)));
        this.createListOptions();
        this.toggleClassActiveDay();
    }
}