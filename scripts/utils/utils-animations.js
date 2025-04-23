import { createObserver } from "./utils.js";
import { load, state,  getPath,  getNextPath,  getBasePath,  loadPage,  base,  routes, } from "./utils-routing.js";

export const animations = {
  "img[data-src]": hydrate,
  ".loop": loop,
  ".hero": lazyLoadiFrame,
  "#brand-grid": lazyLoadiFrame,
  "#spam": popUp,
  "#exploration": exploration,
  ".rotate": rotateFloat,

};

function clickSlider(container, next, previous) {
  const totalCards = 3;
  let cardNumber = 1;
  let newCard;

  async function showNext(event) {
    const cards = [];
    for (let i = 1; i <= totalCards; i++) {
      cards[i] = `../../images/wnrs/card-${i}.png`;
    }
  
    if (window.getComputedStyle(title).display !== "none") {
      title.classList.add("hidden");
    }
  
    if (cardNumber <= totalCards) {
      if (cardContainer.contains(newCard)) {
        newCard.classList.remove("move-in");
        newCard.classList.add("move-out");
        await delay(200);
        newCard.remove();
      }
  
      newCard = document.createElement("img");
      newCard.src = cards[cardNumber];
      newCard.classList.add("card", "move-in");
      cardContainer.append(newCard);
      cardNumber++;
    } else {
      newCard.remove();
      title.classList.remove("hidden");
      cardNumber = 1;
    }
  }
}


export function exploration() {
  let title = document.querySelector("#title");
  let next = document.querySelector("#next");
  let previous = document.querySelector("#previous");
  let cardContainer = document.querySelector("#card-container");

  next.addEventListener("click", showNext);
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
    // console.log("path: " + element.dataset.href);
    const page = document.createElement("div");
    page.innerHTML = await loadPage(element.dataset.href);
    page.classList.add("hydrated-page");
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
      console.log("iframe created");
    }
  };

  const destroyIframe = () => {
    if (iframe) {
      container.removeChild(iframe);
      iframe = null;
      console.log("iframe removed");
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
  let reverse = false;
  element.addEventListener('mouseenter', async() => {
    element.style.animation = 'none';
    element.style.animation= 'rotateBack 300ms ease-in-out forwards';  
    if (element.matches("reversefloat-rotate")) {
      reverse = true;
    }
    //await delay(300);  
    //el.style.animation= 'float 2s ease-in-out infinite';    
    });

    element.addEventListener('mouseleave', async () => {
      element.style.animation= 'rotate  300ms ease-in-out infinite'; 
      await delay(300);  
      if(reverse) {
        element.style.animation = 'reverseFloatRotate 2s ease-in-out infinite';
      }
      element.style.animation = 'floatRotate 2s ease-in-out infinite';
    
    });
}
