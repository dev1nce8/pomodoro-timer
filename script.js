const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");
const millisecondsElement = document.querySelector("#milliseconds");
const startStopButton = document.querySelector("#start-stop-btn");

const MINUTES_DEFAULT = 25;
const MILLISECONDS_DEFAULT = 0;
const SECONDS_DEFAULT = 0
const SECONDS_INITIAL = 59;
const MILLISECONDS_INITIAL = 100;

const TIME = {
	minutes: MINUTES_DEFAULT,
	seconds: SECONDS_DEFAULT,
	milliseconds: MILLISECONDS_DEFAULT,
	running: false,
};


// Initialize
setStartStopButtonText(startStopButton, TIME.running);
displayTime(minutesElement, secondsElement, TIME);

startStopButton.addEventListener("click", () => {
	TIME.running = !TIME.running;
	setStartStopButtonText(startStopButton, TIME.running);
	startStopTimer(TIME.running);
});


let timer = null;
function startStopTimer(condition) {
	if (condition) {
		timer = setInterval(countdown, 10);
	} else {
		clearInterval(timer);
	};

};

function countdown() {
	if (TIME.minutes === 0 && TIME.seconds === 0 && TIME.milliseconds === 0) {
		TIME.running = false;
		resetTimeIfZero(TIME);
		startStopTimer(TIME.running);
		setStartStopButtonText(startStopButton, TIME.running);
		return;
	}
	if (TIME.milliseconds < 0) {
		TIME.seconds -= 1;
		TIME.milliseconds = MILLISECONDS_INITIAL;
	} else {
		TIME.milliseconds -= 1;
	}
	if (TIME.seconds < 0) {
		TIME.minutes -= 1;
		TIME.seconds = SECONDS_INITIAL;
	}

	displayTime(minutesElement, secondsElement, TIME);
};

function resetTimeIfZero(time) {
	if (time.minutes === 0 && time.seconds === 0 && time.milliseconds === 0) {
		time.minutes = MINUTES_DEFAULT;
		time.seconds = SECONDS_DEFAULT;
		time.milliseconds = MILLISECONDS_DEFAULT;
		time.running = false;
	};
}

function displayTime(minutesElement, secondsElement, time) {
	let seconds = time.seconds || "00";
	if (time.seconds < 10) {
		seconds = "0" + time.seconds;
	}

	minutesElement.innerText = time.minutes;
	secondsElement.innerText = seconds;
};

function setStartStopButtonText(button, condition) {
	if (condition) {
		button.innerText = "Pause";
		button.classList.add("stopped");
	} else {
		button.innerText = "Start";
		button.classList.remove("stopped");
	};
};


