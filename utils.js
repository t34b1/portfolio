export function delay(ms) {
    return new Promise(resolve =>{
        setTimeout(() => resolve(), ms);
    });
}

export function createObserver(selector, callback, once = false, options = {}) {
    const elements = document.querySelectorAll(selector);
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

    elements.forEach(el => observer.observe(el));
}

export async function loop(project, frame, slideCount) {
    console.log(project);
    let slides = [];
    for (let i = 0; i < slideCount; i++) {
        slides[i] = `./images/slideshows/${project}/${project}-${i+1}.jpg`;
    }
    let currentSlide = 0;
    while (true) {
      frame.src = slides[currentSlide];
      await delay(1000);
      currentSlide = (currentSlide + 1) % slideCount;
      }
}


