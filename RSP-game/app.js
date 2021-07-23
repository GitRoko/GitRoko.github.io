const game = {
  button: {
    rock: document.querySelector('.rock'),
    scissors: document.querySelector('.scissors'),
    paper: document.querySelector('.paper'),
    start: document.querySelector('.start')
  },
  result: document.querySelector('.vs'),
  btnStart() { game.result.textContent = 'PUSH!' },
  btnWin() { game.result.textContent = 'You WIN!' },
  btnLose() { game.result.textContent = 'You LOSE!' },
  btnDraw() { game.result.textContent = 'DRAW!' },
  player: {
    gesture: document.querySelector('.player-img'),
    score: document.querySelector('.player-score'),
    choice: 1,
    count: 0,
    imgDefault() { game.player.gesture.src = '/RSP-game/img/rock-left@0.25x.png' },
    imgRock() { game.player.gesture.src = '/RSP-game/img/rock-left@0.33x.png' },
    imgScissors() { game.player.gesture.src = '/RSP-game/img/scissors-left@0.33x.png' },
    imgPaper() { game.player.gesture.src = '/RSP-game/img/paper-left@0.33x.png' }
  },
  comp: {
    gesture: document.querySelector('.comp-img'),
    score: document.querySelector('.comp-score'),
    choice: 1,
    count: 0,
    imgDefault() { game.comp.gesture.src = '/RSP-game/img/rock-right@0.25x.png' },
    imgRock() { game.comp.gesture.src = '/RSP-game/img/rock-right@0.33x.png' },
    imgScissors() { game.comp.gesture.src = '/RSP-game/img/scissors-right@0.33x.png' },
    imgPaper() { game.comp.gesture.src = '/RSP-game/img/paper-right@0.33x.png' }
  },

}

game.button.rock.addEventListener('click', addChoice);
game.button.scissors.addEventListener('click', addChoice);
game.button.paper.addEventListener('click', addChoice);

game.button.start.addEventListener('click', beginGame);

function addChoice() {

  this.classList.toggle('active');

  for (let btn in game.button) {
    if (game.button[btn].classList.contains('active') && game.button[btn] !== this) {
      game.button[btn].classList.remove('active');
    }
  }

  (this.classList.contains('rock')) ? game.player.choice = 1 :
    (this.classList.contains('scissors')) ? game.player.choice = 2 :
      game.player.choice = 3;
}

function beginGame() {
  game.comp.choice = Math.floor(Math.random() * 3) + 1;
  // 1 = rock
  // 2 = scissors
  // 3 = paper

  if (game.player.choice === 1 && game.comp.choice === 1) {

    game.player.imgRock();
    game.comp.imgRock();
    game.btnDraw();
    console.log('Rock vs Rock ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);

  } else if (game.player.choice === 2 && game.comp.choice === 2) {

    game.player.imgScissors();
    game.comp.imgScissors();
    game.btnDraw();
    console.log('Scissors vs Scissors, ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);

  } else if (game.player.choice === 3 && game.comp.choice === 3) {

    game.player.imgPaper();
    game.comp.imgPaper();
    game.btnDraw();
    console.log('Paper vs Paper ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);

  } else if (game.player.choice === 1 && game.comp.choice === 2) {

    game.player.count += 1;
    game.player.score.textContent = game.player.count;
    game.player.imgRock();
    game.comp.imgScissors();
    game.btnWin();
    console.log('Rock vs Rock ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);


  } else if (game.player.choice === 1 && game.comp.choice === 3) {

    game.comp.count += 1;
    game.comp.score.textContent = game.comp.count;
    game.player.imgRock();
    game.comp.imgPaper();
    game.btnLose();
    console.log('Rock vs Paper ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);

  } else if (game.player.choice === 2 && game.comp.choice === 1) {

    game.comp.count += 1;
    game.comp.score.textContent = game.comp.count;
    game.player.imgScissors();
    game.comp.imgRock();
    game.btnLose();
    console.log('Scissors vs Rock ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);

  } else if (game.player.choice === 2 && game.comp.choice === 3) {

    game.player.count += 1;
    game.player.score.textContent = game.player.count;
    game.player.imgScissors();
    game.comp.imgPaper();
    game.btnWin();
    console.log('Scissors vs Paper ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);

  } else if (game.player.choice === 3 && game.comp.choice === 1) {

    game.player.count += 1;
    game.player.score.textContent = game.player.count;
    game.player.imgPaper();
    game.comp.imgRock();
    game.btnWin();
    console.log('Paper vs Rock ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);

  } else if (game.player.choice === 3 && game.comp.choice === 2) {

    game.comp.count += 1;
    game.comp.score.textContent = game.comp.count;
    game.player.imgPaper();
    game.comp.imgScissors();
    game.btnLose();
    console.log('Paper vs Scissors ', game.comp.choice);

    setTimeout(() => {
      game.player.imgDefault();
      game.comp.imgDefault();
      game.btnStart();
    }, 2000);
  }
}

