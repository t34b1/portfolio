export function createObserver(elements, callback, once = false, options = {}) {
    let observer = new IntersectionObserver((entries, observer) => {
        
        entries.forEach(entry =>{
            callback(entry);
            if (once === true && entry.isIntersecting) {
                observer.unobserve(entry.target);
            }
        });
    }, options);
    if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
        elements.forEach(el => observer.observe(el));
    }
    else {
        observer.observe(elements);
    }
}

