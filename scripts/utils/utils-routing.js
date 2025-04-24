import { animations, animate, addLazyTargetTo, delay, updateSideInfo, updateRole} from "./utils-animations.js";

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
  "/main-info": "/projects/main-info.html",
  "/footer": "/footer.html",
  "/sidebar": "/sidebar.html",
  "/hero": "/projects/hero.html",
  "/project-display": "/projects/project-display.html",


  "/projects/m6-0": "/projects/m6/mutesix-0.html",
  "/projects/m6-1": "/projects/m6/mutesix-1.html",
  "/projects/m6-2": "/projects/m6/mutesix-2.html",
  "/projects/m6-info": "/projects/m6/mutesix-info.html",

  "/projects/wnrs-0": "/projects/wnrs/wnrs-0.html",
  "/projects/wnrs-1": "/projects/wnrs/wnrs-1.html",
  "/projects/wnrs-2": "/projects/wnrs/wnrs-2.html",
  "/projects/wnrs-3": "/projects/wnrs/wnrs-3.html",
  "/projects/wnrs-4": "/projects/wnrs/wnrs-4.html",
  "/projects/wnrs-5": "/projects/wnrs/wnrs-5.html",
  "/projects/wnrs-info": "/projects/wnrs/wnrs-info.html",
  "/projects/wnrs-brand": "/projects/wnrs/brand-grid.html",

  "/projects/sl-0": "/projects/self-love-edition/sl-0.html",
  "/projects/sl-info": "/projects/self-love-edition/sl-info.html",


  "/projects/x-0": "/projects/x-edition/x-0.html",
  "/projects/x-1": "/projects/x-edition/x-1.html",
  "/projects/x-2": "/projects/x-edition/x-2.html",
  "/projects/x-3": "/projects/x-edition/x-3.html",
  "/projects/x-info": "/projects/x-edition/x-info.html",
  "/projects/pop-up": "/projects/x-edition/pop-up.html",
  "/projects/exploration": "/projects/x-edition/self-exploration-pack.html",

  "/projects/piggy-0": "/projects/piggy/piggy-0.html",
  "/projects/piggy-1": "/projects/piggy/piggy-1.html",
  "/projects/piggy-solutions": "/projects/piggy/piggy-solutions.html",



  "/projects/misc-0": "/projects/misc/misc-0.html",
  "/projects/misc-1": "/projects/misc/misc-1.html",

}

function updateState(path) {
  state.currentPath = path;
  state.nextPath = getNextPath(path);
}

export async function loadPage(path) {
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

export function getBasePath(path) {
  return path.includes("-") ? path.split("-")[0] : path; 
}

export function getNextPath(path) {
  
  if (path.includes("/nav")) {
    return null;
  }

  let current = parseInt(path.split("-")[1] || "0");
  path = getBasePath(path);
  let nextPath = `${path}-${current + 1}`;
  //console.log("From getNextPath: nextPath: " + nextPath);

  if (!routes[nextPath]) {
    return null;
  }

  return nextPath;
}

export async function load(path, destination = app, lazyLoad = false) {
  //console.log("Loading... Path passed into load: " + path);
  if (path == null) return;

  const isInitialPage = path.includes("-0") || path.includes("/nav") || path.includes("/sidebar");
  const isProjectsPage = path.includes("/projects");
  const isNav = path.includes("/nav");
  const isSidebar = path.includes("/sidebar");
  const isMain = path.includes("/main");

  if (isInitialPage) {
    destination.innerHTML = "";
    let page = await append(path, destination);
    updateState(path);
    //console.log("Added to  " + (destination.id || destination.classList) + ": " + path);

    if (isMain) page.className = "appended-page";
    if (isNav) return;

    updateSideInfo(path);
    updateRole(path);

    if (!isSidebar) {
      page.classList.remove("slide-in");
      void page.offsetWidth; 
      page.classList.add("slide-in"); 
    }

    if (isProjectsPage && state.nextPath) {
      //console.log("Loading next");
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
  const html = await loadPage(path);
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
  const isExternal = href.startsWith("http") || href.includes(".");

  if (isExternal) {
    window.open(href, "_blank");
    return;
  }

  location.hash = href;
}

export async function handleHashChange(event) {
  const path = location.hash.replace("#", "") || "/main-0";
  updateState(path);
  await load(path, app, false);

  document.querySelector("#sidebar").scrollTo({
    top: 0,
    behavior: "smooth" 
  });

  return;
}
