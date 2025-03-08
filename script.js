const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");
const startStopButton = document.querySelector("#start-stop-btn");


const TIME = {
	minutes: 25,
	running: false,
};
const currentTime = {
	minutes: TIME.minutes,
	seconds: 0,
};

let timer = null;

// Initialize
setStartStopButtonText(startStopButton, TIME.running);
displayTime(minutesElement, secondsElement, TIME);

startStopButton.addEventListener("click", () => {
	TIME.running = !TIME.running;
	setStartStopButtonText(startStopButton, TIME.running);
	startStopTimer(TIME.running);
});


function startStopTimer(condition) {
	if (condition) {
		timer = setInterval(countdown, 1000);
	} else {
		clearInterval(timer);
	};

	function countdown() {
		if (currentTime.seconds === 0) {
			currentTime.minutes -= 1;
			currentTime.seconds = 59;
		} else {
			currentTime.seconds -= 1;
		}
		displayTime(minutesElement, secondsElement, currentTime);
	};
};


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
		button.innerText = "Stop";
		button.classList.add("stopped");
	} else {
		button.innerText = "Start";
		button.classList.remove("stopped");
	};
};



