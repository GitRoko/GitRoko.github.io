export default class Schedule {
    constructor(rootEl) {
        this.rootEl = rootEl;
        this.heightParentTimeLine = rootEl.querySelector('.schedule-timeBlocks').offsetHeight;
        this.timeLine = rootEl.querySelector('.timeline');
        this.timeOnElTimeLine = rootEl.querySelector('.timeline');


        this.init()
        this.state = {}

    }

    getMinutesToDay() {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let diff = now - today;
        return Math.round(diff / 1000 / 60);
    }

    getNowCoordinatesTimeLine() {
        const minutesPerDay = 1440;
        return Math.round((this.heightParentTimeLine / minutesPerDay) * this.getMinutesToDay());
    }

    getTimeNow() {
        this.state.year = new Date().getFullYear();
        this.state.month = new Date().getMonth();
        this.state.date = new Date().getDate();
        this.state.day = new Date().getDay();
        this.state.hours = new Date().getHours();
        this.state.minutes = new Date().getMinutes();
        this.state.seconds = new Date().getSeconds();
        // return this.state;
    }


    init() {
        setInterval(() => {
            this.getTimeNow.call(this);
            this.timeOnElTimeLine.setAttribute('data-before',
                `${this.state.hours.toString().padStart(2, '0')}:${this.state.minutes.toString().padStart(2, '0')}:${this.state.seconds.toString().padStart(2, '0')}`)
            this.timeLine.style.top = `${this.getNowCoordinatesTimeLine()}px`;
        }, 1000)

    }

}

