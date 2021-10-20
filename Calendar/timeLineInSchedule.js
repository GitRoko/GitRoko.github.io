export default class TimeLineInSchedule {
  constructor(rootEl) {
    this.heightParentTimeLine = rootEl.querySelector('.schedule-timeBlocks').offsetHeight;
    this.timeOnElTimeLine = rootEl.querySelector('.timeline');
  }

  getMinutesToDay() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let diff = now - today;
    const msInSec = 1000;
    const secInMin = 60;

    return Math.round(diff / msInSec / secInMin);
  }

  getNowCoordinatesTimeLine() {
    const minutesPerDay = 1440;
    return Math.round((this.heightParentTimeLine / minutesPerDay) * this.getMinutesToDay());
  }

  render() {
    let hours = new Date().getHours().toString().padStart(2, '0');
    let minutes = new Date().getMinutes().toString().padStart(2, '0');
    // let seconds = new Date().getSeconds().toString().padStart(2, '0');
    this.timeOnElTimeLine.setAttribute('data-before', `${hours}:${minutes}`);
    this.timeOnElTimeLine.style.top = `${this.getNowCoordinatesTimeLine()}px`;
  }

  init() {
    this.render();
    setInterval(() => {
      this.render();
    }, 60000)
  }
}

