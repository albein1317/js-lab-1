// CLOCK WIDGET
const clockElement = document.getElementById("clock");
const timezoneSelect = document.getElementById("timezone-select");

function updateClock() {
  const tz = timezoneSelect.value === "local" ? undefined : timezoneSelect.value;
  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: tz || Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  clockElement.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
}

if (timezoneSelect) {
  timezoneSelect.addEventListener("change", () => {
    localStorage.setItem("preferredTimezone", timezoneSelect.value);
    updateClock();
  });

  const savedTz = localStorage.getItem("preferredTimezone");
  if (savedTz) timezoneSelect.value = savedTz;
  updateClock();
  setInterval(updateClock, 1000);
}

// DARK/LIGHT MODE
const modeBtn = document.getElementById("toggle-mode");
function setTheme(mode) {
  document.body.className = mode;
  localStorage.setItem("theme", mode);
}

if (modeBtn) {
  modeBtn.addEventListener("click", () => {
    const current = document.body.className;
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

// COLOR THEMES
const themeSelect = document.getElementById("theme-select");

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    const selectedTheme = themeSelect.value;
    document.body.dataset.theme = selectedTheme;
    localStorage.setItem("colorTheme", selectedTheme);
  });

  const savedColorTheme = localStorage.getItem("colorTheme") || "default";
  themeSelect.value = savedColorTheme;
  document.body.dataset.theme = savedColorTheme;
}
