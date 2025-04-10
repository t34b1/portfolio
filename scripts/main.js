const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const base = isLocal ? "" : "/portfolio";

const routes = {
    "/nav": "/nav.html",
    "/main-0": "/projects/main.html",
    "/footer": "/footer.html",
    "/projects/m6-0": "/projects/m6/mutesix.html",
    "/projects/m6-1": "/projects/m6/mutesix-1.html",
    "/projects/m6-2": "/projects/m6/mutesix-2.html",
};

const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const footer = document.querySelector("#footer");
let page;
let currentPath;

async function getContent(path) {
    if (!routes[path]) {
        console.error(`No route found for path: ${path}`);
        return;
    }
    const response = await fetch(base + routes[path]);
    if (!response.ok) {
        console.error(`Failed to load ${base}${routes[path]} — ${response.status}`);
        return;
        }
    const html = await response.text();
    return html;
}

function getNextPath(basePath) {
    //console.log("From getNextPath: basePath: " + basePath);

    if (basePath.includes("/nav")) {
        //console.log("Nav passed into getNext - returning null");
        return null;
    }

    let current = parseInt(basePath.split("-")[1] || "0");
    basePath = basePath.includes("-") ? basePath.split("-")[0] : basePath;
    //console.log("Current number: " + current);
    
    let nextPath = `${basePath}-${current + 1}`;
    let previousPath = `${basePath}-${current}`;
    //console.log("From getNextPath: nextPath: " + nextPath);

    if (!routes[nextPath]) {
        return null;
    }

    return nextPath;
}

async function load(path, destination = app, loadNext = true) {
    //console.log("Path passed into load: " + path);
    if (path == null) {
        return;
    }
    if (path.includes("-0") || path.includes("/nav")) {
        //console.log("Filling main HTML");
        const html = await getContent(path);
        destination.innerHTML = html;
        //console.log("Addded to  " + (destination.id || destination.classList) + ": " + path);

        if(!path.includes("/nav")) {
            currentPath = path;
        }
    }
    
    if (loadNext == true) {
        let nextPath = getNextPath(path);
        //console.log("Path passed into load: " + path);
        //console.log("From Load: Next path: " + nextPath);
    
        if (!routes[nextPath]) {
            //console.log("From load: Checking route. Path ignored");
            return;
        }
    
        if (nextPath) {
            //console.log("Appending nextPath: " + nextPath);
            addLazyTargetTo(await append(nextPath, destination));
            //console.log("Appended " + nextPath + " to " + page + " to " + (destination.id || destination.classList));
            currentPath = nextPath;
            //console.log("New current path: " + currentPath);
        }
        else {
            return;   
        }
    }

    else {
        //console.log("appending path");
        addLazyTargetTo(await append(path, destination));
        //console.log("Appended " + path + " to " + page + " to " + (destination.id || destination.classList));
        currentPath = path;
        //console.log("New current path: " + path);  
    }
   
    return;
}


async function append(path, destination) {
    const content = await getContent(path);
    const page = document.createElement("div");
    page.classList.add("page");
    page.innerHTML = content;
    destination.append(page); 
    return page;
}

async function navigate(event) {
    event.preventDefault();
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.getAttribute('href');
    location.hash = href;
    //console.log("Current href: " + href);
    return;
}

function handleHashChange() {
    const path = location.hash.replace("#", "") || "/main-0";
    currentPath = path;
    load(path, app, true);
}

function addLazyTargetTo(container) {
    //console.log("Adding lazy target to", container);
    const lazyTarget = document.createElement("div");
    lazyTarget.classList.add("lazy-target");
    container.prepend(lazyTarget);
    createObserver(lazyTarget);
  }
  
  function createObserver(target) {
    if (!target) return;
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observeHandler(entry, observer); 
        }
      });
    });
  
    observer.observe(target);
  }
  
  function observeHandler(entry, observer) {
    
    function lazyLoad() {
        if (!entry.isIntersecting) return;
  
        //console.log("Running observer. Loading:", getNextPath(currentPath));
        //console.log("From observer: Current path:", currentPath);
      
        if (currentPath) {
          load(getNextPath(currentPath), page, false);
        }
      
        observer.unobserve(entry.target);
        entry.target.classList.remove("lazy-target");
    }  

    if(entry.target.classList.contains("lazy-target")) {
        lazyLoad();
    }
   
  }

nav.addEventListener("click", navigate);
app.addEventListener("click", navigate);
window.addEventListener("load", () => {
    load("/nav", nav, true);
    if (!currentPath) {
        load("/main-0", app, true);
    }
}); 

window.addEventListener("hashchange", handleHashChange);
