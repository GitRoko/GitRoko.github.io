const progress = document.getElementsByTagName('PROGRESS');
const arrValue = [];

for (let j = 0; j < progress.length; j++) {
   arrValue.push( +progress[j].getAttribute("value"));
   progress[j].setAttribute("value", '0');
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
      console.log(count);
    }, 40 * count);
  }
}

