import {addLazyTargetTo} from './utils-animations.js';

export const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";
export const base = isLocal ? "" : "/portfolio";
export const state = { currentPath: "" };

export const routes = {
    "/nav": "/nav.html",
    "/main-0": "/projects/main.html",
    "/footer": "/footer.html",
    "/projects/m6-0": "/projects/m6/mutesix.html",
    "/projects/m6-1": "/projects/m6/mutesix-1.html",
    "/projects/m6-2": "/projects/m6/mutesix-2.html",
    "/projects/m6-3": "/projects/m6/mutesix-3.html",
};

export async function getPage(path) {
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

export function getNextPath(basePath) {
    if (basePath.includes("/nav")) {
        return null;
    }

    let current = parseInt(basePath.split("-")[1] || "0");
    basePath = basePath.includes("-") ? basePath.split("-")[0] : basePath;
    
    let nextPath = `${basePath}-${current + 1}`;
    //console.log("From getNextPath: nextPath: " + nextPath);

    if (!routes[nextPath]) {
        return null;
    }

    return nextPath;
}

export async function load(path, destination = app, lazyLoad = true) {
    //console.log("Path passed into load: " + path);
    if (path == null) {
        return;
    }
    if (path.includes("-0") || path.includes("/nav")) {
        const html = await getPage(path);
        destination.innerHTML = html;
        //console.log("Added to  " + (destination.id || destination.classList) + ": " + path);
        if(path.includes("/nav")) {
            return;
        }
        else {
            state.currentPath = path;
        }
    }
    
    if (lazyLoad) {
        let nextPath = getNextPath(path);
        //console.log("From Load: Next path: " + nextPath);

        if (!routes[nextPath]) {
            //console.log("From load: Checking route. Path doesn't exist. Ignored");
            return;
        }
    
        if (nextPath) {
            addLazyTargetTo(await append(nextPath, destination));
            //console.log("Appended " + nextPath + " to " + page + " to " + (destination.id || destination.classList));
            state.currentPath = nextPath;
        }
        else {
            return;   
        }
    }

    else {
        addLazyTargetTo(await append(path, destination));
        //console.log("Appended " + path + " to " + page + " to " + (destination.id || destination.classList));
        state.currentPath = path;
    }
   
    return;
}

export async function append(path, destination) {
    const content = await getPage(path);
    const page = document.createElement("div");
    page.classList.add("page");
    page.innerHTML = content;
    destination.append(page); 
    return page;
}

export async function navigate(event) {
    const link = event.target.closest("a");
    if (!link) return;

    event.preventDefault();
    const href = link.getAttribute('href');
    location.hash = href;
    return;
}

export function handleHashChange(event) {
    const path = location.hash.replace("#", "") || "/main-0";
    state.currentPath = path;
    load(path, app);
}