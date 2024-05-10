// clock.js

export const initializeClock = () => {
  const currentDateElement = document.getElementById("current-date");
  const currentTimeElement = document.getElementById("current-time");
  startInterval(currentDateElement, currentTimeElement);
};

const startInterval = (currentDateElement, currentTimeElement) => {
  updateTimeDisplay(currentDateElement, currentTimeElement);
  const intervalId = setInterval(
    () => updateTimeDisplay(currentDateElement, currentTimeElement),
    1000
  );

  window.onmessage = function (e) {
    if (typeof e.data == "string" && e.data == "refresh") {
      clearInterval(intervalId);
      location.reload();
    }
  };
};

const updateTimeDisplay = (currentDateElement, currentTimeElement) => {
  const now = new Date();
  currentDateElement.innerHTML = formatDate(now);
  currentTimeElement.innerHTML = formatTime(now);
};

const formatDate = (date) => {
  const twoDigitYear = date.getFullYear().toString().slice(-2);
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  month = month.length < 2 ? "0" + month : month;
  day = day.length < 2 ? "0" + day : day;

  return `${day}/${month}/${twoDigitYear}`;
};

const formatTime = (date) => {
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  hours = hours.length < 2 ? "0" + hours : hours;
  minutes = minutes.length < 2 ? "0" + minutes : minutes;

  return `${hours}:${minutes}`;
};
