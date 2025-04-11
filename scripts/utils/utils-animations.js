import {createObserver} from './utils.js';
import {load, state, getNextPath, base} from './utils-routing.js';

export function addLazyTargetTo(container) {
    function lazyLoad(entry, state, destination) {
        if (!entry.isIntersecting) return;

        const next = getNextPath(state.currentPath);
        if (next) {
            load(next, destination, false);
        }
    }  

    const lazyTarget = document.createElement("div");
    lazyTarget.classList.add("lazy-target");
    container.prepend(lazyTarget);
    createObserver(lazyTarget, (entry) => lazyLoad(entry, state, container), true);
}
 
export async function loop(project, frame, slideCount) {
    let slides = [];
    for (let i = 0; i < slideCount; i++) {
        slides[i] = `../images/slideshows/${project}/${project}-${i+1}.jpg`;
    }
    let currentSlide = 0;
    while (true) {
      frame.src = slides[currentSlide];
      await delay(1000);
      currentSlide = (currentSlide + 1) % slideCount;
      }
}


export function delay(ms) {
    return new Promise(resolve =>{
        setTimeout(() => resolve(), ms);
    });
}

export function hydrateImages(container) {
    if (!(container instanceof Element)) {
      return;
    }
  
    const images = container.querySelectorAll("img[data-src]");
    if (!images) {
        return;
    }
  
    images.forEach(img => {
        console.log("Placing image");
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }