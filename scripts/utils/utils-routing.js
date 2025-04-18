import { animations, animate, addLazyTargetTo,  } from "./utils-animations.js";

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

  "/projects/m6-0": "/projects/m6/mutesix-0.html",
  "/projects/m6-1": "/projects/m6/mutesix-1.html",
  "/projects/m6-2": "/projects/m6/mutesix-2.html",
  "/projects/m6-3": "/projects/m6/mutesix-3.html",
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

  async function updateSideInfo(path) {
    if (isNav || isMain) return;

    const info = document.querySelector(".info");  
    let sidebarPath = getBasePath(path) + "-info";
    console.log("Updating sidebar with path: " + sidebarPath);

    if (routes[sidebarPath]) {
      if (!info) {
        console.log("infobar not found");
        return;
      }
      info.innerHTML = "";

      let newInfo = await getPage(sidebarPath);
      info.innerHTML = newInfo;
      return newInfo;
    }
    else {
      //console.log("No sidebar path found");
      sidebarPath = "/main-info";
      updateSideInfo(sidebarPath);
    return;
    }
  }

  async function updateRole(path) {
    let roles = {
      main: "",
      wnrs: `<span class = "label">SENIOR DIGITAL DESIGNER</span><br>
        <span class = "label">2022 - 2025</span><br></br>`,
      m6: `<span class = "label">SENIOR DIGITAL DESIGN MANAGER</span><br>
      <span class = "label">2020 - 2022</span><br></br>`,
      misc: `<span class = "label">DESIGNER</span><br>
      <span class = "label">2016 - NOW</span><br></br>`, 
    };
  
    for (let place in roles) {
      if (path.includes(place)) {
        let overlay = document.querySelector(".overlay");
  
        overlay.classList.remove("slide-down");
        void overlay.offsetWidth; 
        
        overlay.innerHTML = roles[place];
        overlay.classList.add("slide-down");
      }
    }
  }

  if (isInitialPage) {
    destination.innerHTML = "";
    let page = await append(path, destination);
    updateState(path);
    //console.log("Added to  " + (destination.id || destination.classList) + ": " + path);

    if (isMain) page.className = "appended-page";
    if (isNav || isSidebar ) return;

    page.classList.remove("slide-in");
    void page.offsetWidth; // force reflow
    page.classList.add("slide-in"); 

    updateSideInfo(path);
    updateRole(path);
  
  
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

export async function handleHashChange(event) {
  const path = location.hash.replace("#", "") || "/main-0";
  updateState(path);
  await load(path, app, false);

  document.querySelector("#sidebar").scrollTo({
    top: 0,
    behavior: "smooth" 
  });
}
