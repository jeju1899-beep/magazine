const TOTAL_PAGES = 18;
const IMAGE_BASE = "images";

const frame = document.getElementById("spreadFrame");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const spreads = buildSpreads(TOTAL_PAGES);
let currentSpread = 0;
let isAnimating = false;

preloadImages();
renderSpread(currentSpread, "none");

prevBtn.addEventListener("click", () => navigate(-1));
nextBtn.addEventListener("click", () => navigate(1));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") navigate(-1);
  if (event.key === "ArrowRight") navigate(1);
});

let touchStartX = null;
frame.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});

frame.addEventListener("touchend", (event) => {
  if (touchStartX == null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 45) navigate(delta < 0 ? 1 : -1);
  touchStartX = null;
});

frame.addEventListener("click", (event) => {
  const rect = frame.getBoundingClientRect();
  const x = event.clientX - rect.left;
  if (x < rect.width * 0.35) navigate(-1);
  if (x > rect.width * 0.65) navigate(1);
});

function buildSpreads(totalPages) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const result = [{ cover: pages[0] }];

  for (let i = 1; i < pages.length; i += 2) {
    result.push({ left: pages[i], right: pages[i + 1] ?? null });
  }

  return result;
}

function imagePath(pageNum) {
  const padded = String(pageNum).padStart(3, "0");
  return `${IMAGE_BASE}/${padded}.jpg`;
}

function preloadImages() {
  for (let i = 1; i <= TOTAL_PAGES; i += 1) {
    const img = new Image();
    img.src = imagePath(i);
    img.decoding = "async";
  }
}

function navigate(direction) {
  if (isAnimating) return;
  const target = currentSpread + direction;
  if (target < 0 || target >= spreads.length) return;

  currentSpread = target;
  renderSpread(currentSpread, direction > 0 ? "left" : "right");
}

function renderSpread(index, direction) {
  isAnimating = true;

  const sheet = document.createElement("div");
  sheet.className = "sheet";

  const spread = spreads[index];

  if (spread.cover) {
    const coverWrap = document.createElement("div");
    coverWrap.className = "cover-wrap";

    const img = document.createElement("img");
    img.className = "page";
    img.src = imagePath(spread.cover);
    img.alt = `Magazine cover page ${String(spread.cover).padStart(3, "0")}`;

    coverWrap.appendChild(img);
    sheet.appendChild(coverWrap);
  } else {
    const spreadWrap = document.createElement("div");
    spreadWrap.className = "spread-wrap";

    const left = document.createElement("img");
    left.className = "page";
    left.src = imagePath(spread.left);
    left.alt = `Magazine page ${String(spread.left).padStart(3, "0")}`;

    spreadWrap.appendChild(left);

    if (spread.right) {
      const right = document.createElement("img");
      right.className = "page";
      right.src = imagePath(spread.right);
      right.alt = `Magazine page ${String(spread.right).padStart(3, "0")}`;
      spreadWrap.appendChild(right);

      const gutter = document.createElement("div");
      gutter.className = "gutter-shadow";
      spreadWrap.appendChild(gutter);
    }

    sheet.appendChild(spreadWrap);
  }

  frame.replaceChildren(sheet);
  updateNavButtons();

  requestAnimationFrame(() => {
    if (direction === "left") sheet.classList.add("flipping-left");
    if (direction === "right") sheet.classList.add("flipping-right");

    requestAnimationFrame(() => {
      sheet.classList.remove("flipping-left", "flipping-right");
      setTimeout(() => {
        isAnimating = false;
      }, 460);
    });
  });
}

function updateNavButtons() {
  prevBtn.disabled = currentSpread === 0;
  nextBtn.disabled = currentSpread === spreads.length - 1;
}
