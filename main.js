class CountdownTimer {
    constructor(selector) {
        this.selector = document.querySelector(selector);
        this.interval = null;
    }

    startCountdown(days) {
        if (this.interval) {
            clearInterval(this.interval);
        }

        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + parseInt(days));

        this.interval = setInterval(() => {
            const time = targetDate - new Date();
            if (time <= 0) {
                clearInterval(this.interval);
                this.updateDisplay(0, 0, 0, 0);
                return;
            }

            const daysLeft = Math.floor(time / (1000 * 60 * 60 * 24));
            const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((time % (1000 * 60)) / 1000);

            this.updateDisplay(daysLeft, hours, mins, secs);
        }, 1000);
    }

   updateDisplay(days, hours, mins, secs) {
    this.selector.querySelector('[data-value="days"]').textContent = days;
    this.selector.querySelector('[data-value="hours"]').textContent = hours;
    this.selector.querySelector('[data-value="mins"]').textContent = mins;
    this.selector.querySelector('[data-value="secs"]').textContent = secs;
}

}

const timer = new CountdownTimer("#timer-1");

document.getElementById("startTimer").addEventListener("click", () => {
    const daysInput = document.getElementById("inputDays").value;
    if (daysInput > 0) {
        timer.startCountdown(daysInput);
    }
});