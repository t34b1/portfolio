import {createObserver} from './utils.js';
import {load, state, getPath, getNextPath, getBasePath, getPage, base, routes} from './utils-routing.js';


export const animations = {
    "img[data-src]": hydrate,
    ".loop": loop,
    ".hero": lazyLoadiFrame,
    "#brand-grid": lazyLoadiFrame,

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
        slides[i] = `${base}/images/slideshows/${project}/${project}-${i+1}.jpg`;
    }
    let currentSlide = 0;
    while (true) {
      container.src = slides[currentSlide];
      await delay(1000);
      currentSlide = (currentSlide + 1) % slideCount;
      }
}


export function delay(ms) {
    return new Promise(resolve =>{
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
        page.innerHTML = await getPage(element.dataset.href);
        page.classList.add("hydrated-page");
        element.innerHTML = "";
        element.append(page);
        //console.log("Container: " + element.id);
      }

      
      
  }
  

export async function hydrateHTML(container) {
    if (!(container instanceof Element)) {
        return;
    }
    console.log("path: " + container.dataset.href);
    const page = document.createElement("div");
    page.innerHTML = await getPage(container.dataset.href);
    page.classList.add("appended-page");
    container.innerHTML = "";
    container.append(page);
    console.log("Container: " + container.id);
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
