//elements
const currentPage = document.getElementById("current-page");
const paginationCaption = document.getElementById("page-caption");
const pages = document.getElementsByClassName("page");
const sections = document.getElementsByTagName("section");

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

//loader
const loader = document.getElementById("loader");
const loaderContainer = document.getElementById("loader-container");
const slogan = document.getElementById("slogan");
const progress = document.getElementById("progress");

//variables
let currentIdx = 0;

//event listeners
for (let index = 0; index < pages.length; index++) {
  const page = pages[index];
  page?.addEventListener("click", () => onPageClick(index));
}
leftArrow?.addEventListener("click", () => onPageClick(currentIdx - 1));
rightArrow?.addEventListener("click", () => onPageClick(currentIdx + 1));

// functions
async function onPageClick(idx: number) {
  if (sections.length > idx) {
    removeAllAnimation();
    await sleep(400);

    sections[idx].scrollIntoView({
      behavior: "smooth",
    });
    sections[idx].classList.add("in-view");
    pages[idx].classList.add("current");
    currentIdx = idx;
  }

  if (idx > 0 && idx < sections.length - 1) {
    currentPage!.innerText = idx.toString();
    paginationCaption?.classList.remove("hide");
  }

  if (idx === 0) {
    leftArrow!.classList.add("hide");
  }

  if (idx === sections.length - 1) {
    rightArrow!.classList.add("hide");
  }
}

const removeAllAnimation = () => {
  // undo animations
  paginationCaption?.classList.add("hide");
  leftArrow!.classList.remove("hide");
  rightArrow!.classList.remove("hide");
  for (const section of sections) {
    section.classList.remove("in-view");
  }
  for (const page of pages) {
    page.classList.remove("current");
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

onPageClick(currentIdx);

// add animation for loader
setTimeout(() => {
  loaderContainer!.classList.add("in-view");

  setTimeout(() => {
    slogan!.innerText = ", Young padawan...";
    loaderContainer!.classList.add("text-reveal");
  }, 1000);
}, 400);

// remove loader after images loaded
let imgs = document.images;
let len = imgs.length;
let counter = 0;

for (const img of imgs) {
  if (img.complete) incrementCounter();
  else img.addEventListener("load", incrementCounter, false);
}

function incrementCounter() {
  counter++;
  if (counter === len) {
    setTimeout(() => {
      loader!.classList.add("hide-loader");
    }, 4000);
  }
}
