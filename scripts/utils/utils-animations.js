import { createObserver } from "./utils.js";
import { load, state,  getPath,  getNextPath,  getBasePath,  loadPage,  base,  routes} from "./utils-routing.js";
import { icons } from "./icons.js";

export const animations = {
  "img[data-src]": hydrate,
  ".loop": loop,
  ".hero": lazyLoadiFrame,
  "#brand-grid": lazyLoadiFrame,
  "#spam": popUp,
  "#exploration": exploration,
  ".rotated": rotateFloat,
  "#project-display": hydrate,
  "#piggy-solutions": lazyLoadiFrame,
};

const roles = {
  main: `<span class="very small" style = "opacity: .5; margin: 0;">This single-page application was custom designed and built with love by Taylor Tran, 2025. 
     <a href = "https://github.com/t34b1"><u>View on Github →</u></a><br></span><br>`,
  wnrs: `<span class = "very small">Senior Digital Designer</span><br>
    <span class = "very small">2022 - 2025</span>`,
  m6: `<span class = "very small">Senior Digital Design Manager</span><br>
  <span class = "very small">2020 - 2022</span>`,
  misc: `<span class = "very small">Designer</span><br>
  <span class = "very small">2018 - NOW</span>`, 
  piggy: `<span class = "very small">UX Designer</span><br>
  <span class = "very small">2024</span>`
};

export async function toggleMenu(event) {
  const menuIcon = event ? event.target : document.querySelector(".menu-button");
  const menuIconImg = menuIcon.querySelector("svg");
  const menu = document.querySelector(".menu");
  const icons = menu.querySelectorAll(".icon");
  const heading = document.querySelector(".heading");
  let isOpen = menu.matches(".open");

  function openMenu() {
    menuIconImg.style.transition = "transform .5s ease";
    menuIconImg.style.transform = "rotate(-135deg)";
    heading.classList.add("fade-out");
    icons.forEach(icon => {
      icon.classList.remove("fade-out");
      icon.classList.add("fade-in");
    });

    menuIcon.style.borderRadius = "0 50px 50px 0px";
    menu.classList.remove("move-out-right");
    menu.classList.add("move-in-right");
    menu.classList.add("open");
  }
  async function closeMenu() {
    menuIconImg.style.transform = "rotate(0deg)";
    icons.forEach(icon => {
      icon.classList.remove("fade-in");
      icon.classList.add("fade-out");

    });
    heading.classList.remove("fade-out");
    heading.classList.add("fade-in");

    menu.classList.remove("open", "move-in-right");
    menu.classList.add("move-out-right");
    await delay(100);
    menuIcon.style.borderRadius = "50px";
  
  }

  if (!event) {
    if (isOpen) closeMenu();
    return;
  }

  if (!isOpen) {
   openMenu();
  }

  else {
   closeMenu();
  }
 
}

export function toggleMode(event) {
  const highlight = document.querySelector(".highlight");
  const sun = event.target.querySelector(".sun");
  const moon = event.target.querySelector(".moon");
  highlight.style.transition = "transform .3s ease";
 
  if ( document.body.dataset.mode == "dark") {
    highlight.style.transform = "translateX(0)";
    document.body.dataset.mode = "light";
    moon.innerHTML = icons["moon-stroke"];
    sun.innerHTML = icons["sun-fill"];
  }

  else if (document.body.dataset.mode == "light") {
    highlight.style.transform = "translateX(100%)";
    document.body.dataset.mode = "dark";
    moon.innerHTML = icons["moon-fill"];
    sun.innerHTML = icons["sun-stroke"];
  }
}

export function fillIcons() {
  const docIcons = document.querySelectorAll('[data-icon]');
  docIcons.forEach((icon) => {
    const key = icon.dataset.icon;
    if (icons[key]) {
      icon.innerHTML = icons[key];
    }
  });
}

export function exploration() {
  let title = document.querySelector("#title");
  let next = document.querySelector("#next");
  let previous = document.querySelector("#previous");
  let container = document.querySelector("#card-container");

  const total = 3;
  let current = 1;
  let newCard;

function clickSlider() {
  title.classList.remove("move-in");
    const cards = [];
    for (let i = 0; i < total; i++) {
      cards[i] = `/images/x-edition/card-${+i + 1}.png`;
    }
  
    if (current <= total) {
      if (container.contains(title)) {
        title.remove();
      }
      container.innerHTML = "";
      newCard = document.createElement("img");
      newCard.src = base + cards[current - 1];
      newCard.classList.add("card", "move-in");
      container.append(newCard);
      current++;
    } 
    
    else {
      newCard.remove();
      container.append(title);
      title.classList.add("move-in");
      current = 1;
    }
  }
  next.addEventListener("click", (event) => {clickSlider(event, container, next, previous)});
}

export function popUp(div) {
  async function spamDuplicate(entry) {
  let target = entry.target;
  let left = +target.dataset.left;
  let top = +target.dataset.top;
  for (let i = 0; i < 10; i++) {
    await delay(150);
    let dup = new Image();
    dup.src = target.src;
    dup.className = target.className;
    dup.style.position = "absolute";
    left += 2;
    top -= 2;
    dup.style.left = left + "%";
    dup.style.top = top + "%";
    entry.target.parentElement.append(dup);
    }
  }

  let pop = document.querySelector(".pop-up");

  if (pop) {
    createObserver(pop, spamDuplicate, true, {
      threshold: .5
    });
  }
}

export function animate(target, callback) {
  const elements = document.querySelectorAll(target);
  //console.log(`Found ${elements.length} for "${target}"`);
  elements.forEach(callback);
}

export function addLazyTargetTo(container) {
  const lazyTarget = document.createElement("div");
  lazyTarget.classList.add("lazy-target");
  container.prepend(lazyTarget);

  const onIntersect = (entry) => {
    if (!entry.isIntersecting) return;

    //state.nextPath = getNextPath(state.currentPath);
    if (state.nextPath) {
      load(state.nextPath, container, true);
    }
  };

  createObserver(lazyTarget, onIntersect, true);
}

export async function loop(container) {
  let project = container.dataset.project;
  let slideCount = container.dataset.slideCount;

  let slides = [];
  for (let i = 0; i < slideCount; i++) {
    slides[i] = `${base}/images/slideshows/${project}/${project}-${i + 1}.jpg`;
  }
  let currentSlide = 0;
  while (true) {
    container.src = slides[currentSlide];
    await delay(1000);
    currentSlide = (currentSlide + 1) % slideCount;
  }
}

export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

export async function hydrate(element) {
  if (!(element instanceof Element)) {
    return;
  }

  if (element.matches("IMG")) {
    element.src = base + element.dataset.src;
    //console.log("Element hydrated: " + element.src);
    element.removeAttribute("data-src");
  }

  if (element.matches("DIV")) {
    //console.log("path: " + element.dataset.href);
    const path = element.dataset.href;
    const page = document.createElement("div");
    page.innerHTML = await loadPage(path);
    page.querySelectorAll("img[data-src]").forEach(img => hydrate(img));
    element.innerHTML = "";
    element.append(page);
    //console.log("Container: " + element.id);
  }
}

export function lazyLoadiFrame(container) {
  if (container.querySelector("IFRAME")) {
    return;
  }

  let iframe = null;
  let isVisible = false;
  let path = getPath(container.dataset.src);

  async function createIframe()  {
    container.innerHTML = "";

    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.src = base + path;
      iframe.setAttribute("loading", "lazy");
      iframe.classList.add("appended-page");
      container.append(iframe);
      await delay(1000);
    }
  };

  const destroyIframe = () => {
    if (iframe) {
      container.removeChild(iframe);
      iframe = null;
      //console.log("iframe removed");
    }
  };

  async function handleiFrame(entry) {
    isVisible = entry.isIntersecting;
    if (isVisible && !iframe && !document.hidden) {
      //console.log(iframe);
      createIframe();
      //await delay(500);
      //console.log(iframe);

    }
    if (!isVisible && iframe) {
      destroyIframe();
    }
    return;
  }

  createObserver(container, handleiFrame, true, { threshold: 0 });

  // 👁️ Tab visibility handler
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      destroyIframe();
    } else if (isVisible && !container.querySelector("IFRAME")) {
      createIframe();
    }
  });
}

export async function rotateFloat(element) {
  let reverse = element.matches(".reverse");

  element.addEventListener("mouseenter", async () => {
    element.style.animation = "rotateBackFocus 300ms ease-in-out forwards";
    await delay(300);

  });

  element.addEventListener("mouseleave", async () => {
    element.style.animation = "none";
    element.style.animation = "rotateBackBlur 300ms ease-in-out forwards";
    await delay(300);
    if (reverse) {
      element.style.animation = "reverseFloatRotate 2s ease-in-out infinite";
    } else {
      element.style.animation = "floatRotate 2s ease-in-out infinite";
    }
  });
}


export async function updateSideInfo(path) {
  const info = document.querySelector(".info");  
  let sidebarPath = getBasePath(path) + "-info";
  //console.log("Updating sidebar with path: " + sidebarPath);

  if (!info) {
    //console.log("infobar or info not found");
    return;
  }

  console.log("updating side info with path: " + sidebarPath);

  if (!routes[sidebarPath]) {
    sidebarPath = "/main-info";
  }

  info.innerHTML = "";
  let newInfo = await loadPage(sidebarPath);
  info.innerHTML = newInfo;
  info.querySelectorAll("img[data-src]").forEach(img => hydrate(img));
  return newInfo;
}


export async function updateRole(path) {
  if (path.includes("x") || path.includes("sl")) path = "wnrs";

  for (let role in roles) {
    if (path.includes(role)) {
      let overlay = document.querySelector(".overlay");

      overlay.classList.remove("slide-down");
      void overlay.offsetWidth; 
      
      overlay.innerHTML = roles[role];
      overlay.classList.add("slide-down");
    }
  }
}

export function adjustLayout(path) {
  const navOne = document.querySelector(".nav-1");
  const navTwo = document.querySelector(".nav-2");
  const secA = document.querySelector(".section-a");
  const secB = document.querySelector(".section-b");
  const projects = document.querySelector("#display");
  
  if (!path.includes("/main-0")) {
    secA.style.flexGrow = "1";
    navOne.style.flexGrow = "1";
    secB.style.flexGrow = "4";
    navTwo.style.flexGrow = "4";
    projects.classList.remove("two-columns");
    projects.classList.add("one-column");
  }

  if (path.includes("/main-0")) {
    secA.style.flexGrow = "2";
    navOne.style.flexGrow = "2";
    secB.style.flexGrow = "1";
    navTwo.style.flexGrow = "1";
    projects.classList.remove("one-column");
    projects.classList.add("two-columns");
  }
}