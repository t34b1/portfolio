const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const base = isLocal ? "" : "/portfolio";

const routes = {
    "/nav": "/nav.html",
    "/main": "/projects/main.html",
    "/footer": "/footer.html",
    "/projects/m6": "/projects/m6/mutesix.html",
    "/projects/m6-1": "/projects/m6/mutesix-1.html",
};

const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const footer = document.querySelector("#footer");

async function load(destination = app, path) {
    if (!routes[path]) {
        console.error(`No route found for path: ${path}`);
        return;
    }

    console.log("Fetching " + routes[path]);
    const response = await fetch(base + routes[path]);
    if (!response.ok) {
        console.error(`Failed to load ${routes[path]} — ${response.status}`);
        return;
      }
    const html = await fetch(routes[path]).then(response=>response.text());
    destination.innerHTML = html;
}

async function loadNext(destination = app, path) {
    const response = await fetch(routes[path]);
    if (!response.ok) {
        console.error(`Failed to load ${routes[path]} — ${response.status}`);
        return;
      }
    const html = await response.text();
    const page = document.createElement("div");
    page.classList.add("page");
    page.innerHTML = html;
    destination.appendChild(page);
}

async function navigate(event) {
    event.preventDefault();
    isLocal ? console.log("Local server") : console.log("Github server. Base: " + base);
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.getAttribute('href');
    location.hash = href;
    return;
}

function handleHashChange() {
    const path = location.hash.replace("#", "") || "/main";
    console.log("Hash changed to:", path);
    load(app, path);
}
  

const lazyLoadObserver = new IntersectionObserver((entries) => {

});


load(nav, "/nav");
load(app, "/main");
nav.addEventListener("click", navigate);
app.addEventListener("click", navigate);


window.addEventListener("hashchange", handleHashChange);
window.addEventListener("load", handleHashChange); 

