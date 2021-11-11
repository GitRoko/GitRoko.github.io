const progress = document.getElementsByTagName('PROGRESS');
const arrValue = [];

for (let i = 0; i < progress.length; i++) {
   arrValue.push( +progress[i].getAttribute("value"));
   progress[i].setAttribute("value", '0');
}

for (let i = 0; i < progress.length; i++) {
    let count = 0;
    function changeProgress() {
        if (count >= arrValue[i]) {
            return;
        }
        count++;
        progress[i].setAttribute("value", count.toString());
        setTimeout(changeProgress, 40);
    }
    changeProgress();
}

