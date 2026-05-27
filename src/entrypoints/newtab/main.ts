const timeElement = document.getElementById("time");

if (!(timeElement instanceof HTMLElement)) {
  throw new Error("Missing time element");
}

const clock = timeElement;

function updateTime() {
  clock.textContent = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

updateTime();
setInterval(updateTime, 1000);
