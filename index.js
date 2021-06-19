function countdownTimerCounter(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerId = null;
    this.targetDate = targetDate;
    this.refs = {
      daysRef: document.querySelector(`${selector} [data-value="days"]`),
      hoursRef: document.querySelector(`${selector} [data-value="hours"]`),
      minutesRef: document.querySelector(`${selector} [data-value="mins"]`),
      secondsRef: document.querySelector(`${selector} [data-value="secs"]`),
    };
  }

  startTimer() {
    this.timerId = setInterval(() => {
      const timeDifference = this.targetDate - Date.now();
      const editedTime = countdownTimerCounter(timeDifference);
      this.updateInterface(editedTime);
    }, 1000);
  }

  updateInterface({ days, hours, mins, secs }) {
    const { daysRef, hoursRef, minutesRef, secondsRef } = this.refs;
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = mins;
    secondsRef.textContent = secs;
  }
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Dec 31, 2021"),
}).startTimer();
