import {createObserver} from './utils.js';
import {load, state, getNextPath, base} from './utils-routing.js';

export const animations = {
    "img[data-src]": hydrateImage,
    ".loop": loop,

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


export function hydrateImage(image) {
      if (!(image instanceof Element)) {
          return;
      }
      image.src = base + image.dataset.src;
      image.removeAttribute("data-src");
  }
  
