
const progress = document.getElementsByTagName('PROGRESS');
const arrValue = [];

for (let i = 0; i < progress.length; i++) {
   arrValue.push( +progress[i].getAttribute("value"));
   progress[i].setAttribute("value", '0');
}

for (let i = 0; i < progress.length; i++) {
    let count = 0;
    while (count <= arrValue[i]) {
        task(count, i);
        count++;
    }

    function task(count, i) {
        setTimeout(function() {
            progress[i].setAttribute("value", count.toString());
        }, 40 * count);
    }
}