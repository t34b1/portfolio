import { createObserver } from "./utils.js";
import { load, state,  getPath,  getNextPath,  getBasePath,  loadPage,  base,  routes} from "./utils-routing.js";

export const animations = {
  "img[data-src]": hydrate,
  ".loop": loop,
  ".hero": lazyLoadiFrame,
  "#brand-grid": lazyLoadiFrame,
  "#spam": popUp,
  "#exploration": exploration,
  ".rotated": rotateFloat,
  "#project-display": hydrate,
};

const roles = {
  main: "",
  wnrs: `<span class = "small label">SENIOR DIGITAL DESIGNER</span><br>
    <span class = "small label">2022 - 2025</span><br></br>`,
  m6: `<span class = "small label">SENIOR DIGITAL DESIGN MANAGER</span><br>
  <span class = "small label">2020 - 2022</span><br></br>`,
  misc: `<span class = "small label">DESIGNER</span><br>
  <span class = "small label">2016 - NOW</span><br></br>`, 
};



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
      cards[i] = `../../images/x-edition/card-${+i + 1}.png`;
    }
  
    if (current <= total) {
      if (container.contains(title)) {
        title.remove();
      }
      container.innerHTML = "";
      newCard = document.createElement("img");
      newCard.src = cards[current - 1];
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
    const page = document.createElement("div");
    page.innerHTML = await loadPage(element.dataset.href);
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

  const createIframe = () => {
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.src = base + path;
      iframe.setAttribute("loading", "lazy");
      iframe.classList.add("appended-page");
      container.append(iframe);
      //console.log("iframe created");
    }
  };

  const destroyIframe = () => {
    if (iframe) {
      container.removeChild(iframe);
      iframe = null;
      //console.log("iframe removed");
    }
  };

  function handleiFrame(entry) {
    isVisible = entry.isIntersecting;
    if (isVisible && !iframe && !document.hidden) {
      createIframe();
    }
    if (!isVisible && iframe) {
      destroyIframe();
    }
  }

  createObserver(container, handleiFrame, false, { threshold: 0 });

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