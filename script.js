const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const img = document.getElementById("valentineImg");

const layer = document.getElementById("celebration-layer");
const sound1 = document.getElementById("celebrationSound1");
const sound2 = document.getElementById("celebrationSound2");

let firstHoverDone = false;
let moving = false;

// image paths
const images = {
  start: "images/start.png",
  firstNo: "images/sad.gif",
  manyNo: "images/cheeky.gif",
  yes1: "images/happy1.gif",
  yes2: "images/happy2.png"
};

/* ---------------- MOBILE + DESKTOP NO BTN ---------------- */

function triggerNoEscape() {
  if (moving) return;
  moving = true;

  if (!firstHoverDone) {
    img.src = images.firstNo;
    firstHoverDone = true;
  } else {
    img.src = images.manyNo;
  }

  moveButton();

  setTimeout(() => (moving = false), 250);
}

// desktop hover
noBtn.addEventListener("mouseenter", triggerNoEscape);

// mobile touch
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  triggerNoEscape();
});

/* ---------------- YES BTN ---------------- */

yesBtn.addEventListener("click", () => {
  img.src = images.yes1;

  setTimeout(() => {
    img.src = images.yes2;
  }, 1200);

  startCelebration();
});

/* ---------------- SAFE MOVEMENT ---------------- */

function moveButton() {
  const padding = 12;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const maxX = vw - btnW - padding;
  const maxY = vh - btnH - padding;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}


/* ---------------- CELEBRATION ---------------- */

function startCelebration() {
  try {
    sound1.currentTime = 0;
    sound2.currentTime = 0;
    sound1.play();
    sound2.play();
  } catch (e) {}

  fireworkBurst();
  startFloatingEmojis();

  setTimeout(stopCelebration, 7000);
}

/* ---------------- FIREWORKS ---------------- */

function fireworkBurst() {
  const bursts = window.innerWidth < 600 ? 4 : 6;

  for (let i = 0; i < bursts; i++) {
    setTimeout(createBurst, i * 500);
  }
}

function createBurst() {
  const centerX = Math.random() * window.innerWidth;
  const centerY = Math.random() * (window.innerHeight * 0.6);

  const dots = window.innerWidth < 600 ? 18 : 30;

  for (let i = 0; i < dots; i++) {
    const dot = document.createElement("div");
    dot.className = "confetti";

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 100;

    dot.style.left = centerX + "px";
    dot.style.top = centerY + "px";

    dot.style.setProperty("--x", Math.cos(angle) * distance + "px");
    dot.style.setProperty("--y", Math.sin(angle) * distance + "px");

    dot.style.background = `hsl(${Math.random() * 360},100%,60%)`;

    layer.appendChild(dot);

    setTimeout(() => dot.remove(), 1300);
  }
}

/* ---------------- FLOATING EMOJIS ---------------- */

const emojis = ["💖", "💘", "🎉", "🎊", "🥳", "❤️"];
let floatInterval;

function startFloatingEmojis() {
  floatInterval = setInterval(() => {
    const span = document.createElement("span");
    span.className = "celebrate";
    span.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    span.style.left = Math.random() * window.innerWidth + "px";
    span.style.fontSize =
      18 + Math.random() * (window.innerWidth < 600 ? 20 : 28) + "px";

    layer.appendChild(span);

    setTimeout(() => span.remove(), 4000);
  }, 220);
}

function stopCelebration() {
  clearInterval(floatInterval);
}

/* ---------------- RESIZE SAFETY ---------------- */

window.addEventListener("resize", () => {
  moveButton();
});
