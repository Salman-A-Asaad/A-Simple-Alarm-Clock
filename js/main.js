let selector = document.querySelectorAll("select");
let h1 = document.querySelector("h1");
let button = document.querySelector("button");
let divSelect = document.querySelector(".selec");
let audioRinging = new Audio("/audio/ringtone.mp3");
let alaemIsSet = false;
let alarmTime;
for (let i = 1; i <= 12; i++) {
  let houres = i < 10 ? "0" + i : "" + i;
  let htmlHours = `<option value="${houres}">${houres}</option>`;
  selector[0].firstElementChild.insertAdjacentHTML("afterend", htmlHours);
}
for (let i = 0; i <= 59; i++) {
  let mints = i < 10 ? "0" + i : "" + i;
  let htmlMints = `<option value="${mints}">${mints}</option>`;
  selector[1].firstElementChild.insertAdjacentHTML("afterend", htmlMints);
}
for (let i = 1; i <= 2; i++) {
  let ampm = i == 1 ? "AM" : "PM";
  let htmlAmpm = `<option value="${ampm}">${ampm}</option>`;
  selector[2].firstElementChild.insertAdjacentHTML("afterend", htmlAmpm);
}
setInterval(setTimeH1, 1000);

function setTimeH1() {
  let timeNow = new Date();
  let sec = timeNow.getSeconds();
  let min = timeNow.getMinutes();
  let hours = timeNow.getHours();
  let afBe = "PM";
  sec = sec < 10 ? "0" + sec : sec;
  min = min < 10 ? "0" + min : min;
  if (hours > 12) {
    hours -= 12;
    afBe = "PM";
  } else {
    afBe = "AM";
  }
  hours = hours < 10 ? "0" + hours : hours;
  let time = `${hours}:${min}:${sec} ${afBe}`;
  h1.innerHTML = time;
  if (alarmTime === `${hours}:${min} ${afBe}`) {
    audioRinging.play();
    audioRinging.loop = true;
  }
}
button.addEventListener("click", setClearAlarm);

function setClearAlarm() {
  if (alaemIsSet) {
    alarmTime = "";
    audioRinging.pause();
    divSelect.classList.remove("disable");
    button.innerHTML = "Set Alarm";
    alaemIsSet = false;
    return;
  }
  let timeAlarm = `${selector[0].value}:${selector[1].value} ${selector[2].value}`;
  if (
    timeAlarm.includes("Hour") ||
    timeAlarm.includes("Min") ||
    timeAlarm.includes("AM/PM")
  ) {
    return alert("Please Inter A Value In All Selector");
  }
  alarmTime = timeAlarm;
  alaemIsSet = true;
  divSelect.classList.add("disable");
  button.innerHTML = "Clear Alarm";
}
