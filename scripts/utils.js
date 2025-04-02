export function delay(ms) {
    return new Promise(resolve =>{
        setTimeout(() => resolve(), ms);
    });
}

export function createObserver(elements, callback, once = false, options = {}) {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry =>{
            if (entry.isIntersecting) {
                callback(entry);
                if (once == true) {
                    observer.unobserve(entry.target);
                } 
            }
        });
    }, options);
    if (elements.length) {
        elements.forEach(el => observer.observe(el));
    }
    else {
        observer.observe(elements);
    }
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


