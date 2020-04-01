'use strict';

const INTERVAL = 1000;
let loop;
let timer1;
let timer2;

const loopDisplay = document.getElementById('loopDisp');
const timer1Display = document.getElementById('timer1Disp');
const timer2Display = document.getElementById('timer2Disp');

const audio = document.getElementById('audio');
audio.volume = 0.3;

const startBtn = document.getElementById('start');
startBtn.addEventListener('click', startTimer, false);
const stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', stopTimer, false);

let timerId; // 各メソッドでのsetInterval()を格納する変数

function startTimer() {
  startBtn.disabled = "disabled"; // startBtnを無効にする
  loop = document.getElementById('loop').value; // loop=3
  timer1 = document.getElementById('timer1').value * 60; // timer1=25*60= 1500=25分の秒数
  timer2 = document.getElementById('timer2').value * 60; // timer2=5*60= 300=5分の秒数
  loopDisplay.innerText = loop; // ループ回数をテキストで表示
  timer1Display.innerText = formatTime(timer1); // timer1を表示
  timer2Display.innerText = formatTime(timer2); // timer2を表示
  timerId = setInterval(countDownTimer1, INTERVAL);
}

function countDownTimer1() {
  timer1--;
  timer1Display.innerText = formatTime(timer1);
  if (timer1 <= 0) {
    clearInterval(timerId);
    audio.play();
    timerId = setInterval(countDownTimer2, INTERVAL);
  }
}

function countDownTimer2() {
  timer2--;
  timer2Display.innerText = formatTime(timer2);
  if (timer2 <= 0) {
    clearInterval(timerId);
    audio.play();
    countDownLoop();
  }
}

function countDownLoop() {
  loop--;
  loopDisplay.innerText = loop;
  if (loop <= 0) {
    loopDisplay.innerHTML = "<H1>FINISH!</H1>";
    stopTimer();
  } else {
    timer1 = document.getElementById('timer1').value * 60;
    timer2 = document.getElementById('timer2').value * 60;
    timerId = setInterval(countDownTimer1, INTERVAL);
  }
}

function formatTime(time) { 
  //[分:秒]表示のケタを揃える関数
  const min = Math.floor(time / 60).toString().padStart(2, '0');
  const sec = (time % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function stopTimer() {
  clearInterval(timerId);
  startBtn.disabled = "";
  loop = document.getElementById('loop').value;
}