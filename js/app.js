/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let clear; // to clear timeout..
const nav = document.querySelector("#navbar__list");
const allSections = document.getElementsByTagName("section");
const topArrow = document.querySelector(".top");

let liGlobal;
let activeSection = allSections[0];

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
let arrowClicking = () => {
  document.documentElement.scrollTop = 0;
};
/**
 * Showing and Hiding the nav while scrolling..
 *
 * Add class 'active' to section when near top of viewport
 * Set sections as active
 */

let moving = () => {
  clearTimeout(clear);
  if (window.pageYOffset > 0) {
    nav.style.display = "flex";

    clear = setTimeout(() => {
      nav.style.display = "none";
    }, 1000);
  }
  // for active section
  activating();
  // display top arrow button at certain point
  if (window.pageYOffset > 200) {
    topArrow.style.display = "block";
  } else {
    topArrow.style.display = "none";
  }
};

// topArrow
topArrow.addEventListener("click", arrowClicking);

// Showing and Hiding the nav while mouse over and out..
let mousing = (e) => {
  if (e.type === "mouseover") {
    clearTimeout(clear);
  } else {
    moving();
  }
};

// Adding more sections will automatically populate nav.

for (i = 0; i < allSections.length; i++) {
  insert(allSections[i].dataset.nav, allSections[i].id);
}

// inset to the nav
// Build menu
// build the nav
// Scroll to section on link click

function insert(name, link) {
  const li = document.createElement("li");
  const aLink = document.createElement("a");
  aLink.textContent = name;
  aLink.href = "#" + link;
  li.className = "navbar__menu menu__link";
  if (nav.firstElementChild === null) {
    li.className = "navbar__menu menu__link active";
  }
  nav.appendChild(li);
  li.appendChild(aLink);
}

/**
 * End Main Functions
 * Begin Events
 *
 */
// function to active section
let activating = () => {
  let arr = [];
  for (i = 0; i < allSections.length; i++) {
    arr.push(
      Math.abs(
        allSections[i].getBoundingClientRect().top - window.innerHeight * 0.3
      )
    );
  }

  for (i = 0; i < allSections.length; i++) {
    if (arr.indexOf(Math.min(...arr)) === i) {
      allSections[i].className = "your-active-class";
      nav.childNodes[i].className = "navbar__menu menu__link active";
    }
    if (arr.indexOf(Math.min(...arr)) != i) {
      allSections[i].className = "landing__container";
      nav.childNodes[i].className = "navbar__menu menu__link";
    }
  }
};

// Scroll to anchor ID using scrollTO event

window.addEventListener("scroll", moving);
nav.addEventListener("mouseover", mousing);
nav.addEventListener("mouseout", mousing);
