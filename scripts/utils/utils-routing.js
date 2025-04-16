import { animations, animate, addLazyTargetTo } from "./utils-animations.js";

export const isLocal =
  location.hostname === "127.0.0.1" || location.hostname === "localhost";
export const base = isLocal ? "" : "/portfolio";
export const state = {
  currentPath: "",
  nextPath: "",
};

export const routes = {
  "/nav": "/nav.html",
  "/main-0": "/projects/main.html",
  "/footer": "/footer.html",
  "/footer": "/footer.html",
  "/hero": "/projects/hero.html",

  "/projects/m6-0": "/projects/m6/mutesix-0.html",
  "/projects/m6-1": "/projects/m6/mutesix-1.html",
  "/projects/m6-2": "/projects/m6/mutesix-2.html",
  "/projects/m6-3": "/projects/m6/mutesix-3.html",

  "/projects/wnrs-0": "/projects/wnrs/wnrs-0.html",
  "/projects/wnrs-1": "/projects/wnrs/wnrs-1.html",
  "/projects/wnrs-2": "/projects/wnrs/wnrs-2.html",
  "/projects/wnrs-3": "/projects/wnrs/wnrs-3.html",
  "/projects/wnrs-4": "/projects/wnrs/wnrs-4.html",
  "/projects/wnrs-5": "/projects/wnrs/wnrs-5.html",
  "/projects/wnrs-6": "/projects/wnrs/wnrs-6.html",

  "/projects/wnrs-brand": "/projects/wnrs/brand-grid.html",
  "/projects/sl-0": "/projects/self-love-edition/sl-0.html",
  "/projects/sl-1": "/projects/self-love-edition/sl-1.html",

  "/projects/misc-0": "/projects/misc/misc-0.html",
  "/projects/misc-1": "/projects/misc/misc-1.html",




}


function updateState(path) {
  state.currentPath = path;
  state.nextPath = getNextPath(path);
}
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

export function getPath(hash) {
  if (!routes[hash]) {
    return null;
  }
  return routes[hash];
}

export function getNextPath(basePath) {
  if (basePath.includes("/nav")) {
    return null;
  }

  let current = parseInt(basePath.split("-")[1] || "0");
  basePath = basePath.includes("-") ? basePath.split("-")[0] : basePath;

  let nextPath = `${basePath}-${current + 1}`;
  // console.log("From getNextPath: nextPath: " + nextPath);

  if (!routes[nextPath]) {
    return null;
  }

  return nextPath;
}

export async function load(path, destination = app, lazyLoad = false) {
  //console.log("Loading... Path passed into load: " + path);
  if (path == null) return;

  const isInitialPage = path.includes("-0") || path.includes("/nav");
  const isProjectsPage = path.includes("/projects");
  const isNav = path.includes("/nav");

  if (isInitialPage) {
    destination.innerHTML = "";
    await append(path, destination);
    updateState(path);
    //console.log("Added to  " + (destination.id || destination.classList) + ": " + path);
    if (isNav) return;
    if (isProjectsPage && state.nextPath) {
      console.log("Loading next");
        load(state.nextPath, destination, true);
    }
  }
  
  if (lazyLoad) {
    if (!routes[path]) return;
    addLazyTargetTo(await append(path, destination, true));
    //console.log("Appended " + path + " to " + (destination.id || destination.classList) + " with lazyLoad");
  }

  for (let selector in animations) {
    animate(selector, animations[selector]);
  }
  return;
}

export async function append(path, destination) {
  const html = await getPage(path);
  const page = document.createElement("div");
  page.classList.add("page");
  page.innerHTML = html;
  destination.append(page);
  updateState(path);
  return page;
}

export async function navigate(event) {
  const link = event.target.closest("a");
  if (!link) return;

  event.preventDefault();
  const href = link.getAttribute("href");
  location.hash = href;
  return;
}

export function handleHashChange(event) {
  const path = location.hash.replace("#", "") || "/main-0";
  updateState(path);
  load(path, app, false);
}
