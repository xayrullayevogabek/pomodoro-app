const startBtn = document.querySelector(".play"),
  pauseBtn = document.querySelector(".pause"),
  settingsBtn = document.querySelector(".settings"),
  monitor = document.querySelector(".pomodoro h1"),
  optionsBtn = document.querySelectorAll(
    ".pomodoro-category-btn-wrapper button"
  );

const settings = {
  pomodoro: {
    minute: 10,
    sekund: 0,
  },
  shortBreak: {
    minute: 5,
    sekund: 0,
  },
  longBreak: {
    minute: 20,
    sekund: 0,
  },
};

let currentOption = "pomodoro";
let minute;
let sekund;
let interval;

// Add Zero to number
const addZero = (num) => {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

// Start Timer function
function startTimer() {
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  interval = setInterval(() => {
    if (sekund == 0) {
      sekund = 60;
      minute--;
    }
    sekund--;
    renderMonitor();
  }, 1000);
}

// Pause Timer function
function pauseTimer() {
  clearInterval(interval);
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

// Change the time
const setTime = () => {
  const option = currentOption;
  minute = settings[option].minute;
  sekund = settings[option].sekund;
};

// Render to the screen
function renderMonitor() {
  monitor.textContent = `${addZero(minute)}:${addZero(sekund)}`;
}

// Show Tab function
const hideTabs = () => {
  optionsBtn.forEach((item) => (item.className = ""));
};

// Hide Tab function
const showTabs = (i = 0) => {
  optionsBtn[i].className = "active";
};

// Tabs select
optionsBtn.forEach((item, index) => {
  optionsBtn[index].addEventListener("click", () => {
    const attr = item.getAttribute("data-type");
    currentOption = attr;
    hideTabs();
    showTabs(index);
    setTime();
    renderMonitor();
    pauseTimer();
  });
});

// Start Timer
startBtn.addEventListener("click", () => {
  setTime();
  startTimer();
});

// Pause Timer
pauseBtn.addEventListener("click", pauseTimer);
