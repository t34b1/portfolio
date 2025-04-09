const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const base = isLocal ? "" : "/portfolio";

const routes = {
    "/nav": `${base}/nav.html`,
    "/main": `${base}/projects/main.html`,
    "/footer": `${base}/footer.html`,
    "/projects/m6": `${base}/projects/m6/mutesix.html`,
    "/projects/m6-1": `${base}/projects/m6/mutesix-1.html`,
};

const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const footer = document.querySelector("#footer");

async function load(destination = app, path) {
    console.log("Fetching " + routes[path]);
    const response = await fetch(routes[path]);
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
    isLocal ? console.log("Local server") : console.log("Github server. Base: " + base);
    event.preventDefault();
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.getAttribute('href');
    if (href.includes("/projects")) {
        console.log("its a project");
    };
    history.pushState({}, "", href);
    await load(app, href);

    /*
    if (window.location.pathname.includes("projects")) {
        let page = 0;
        console.log(window.location.pathname);
        let nextPage =  `${base}/projects/m6/mutesix-1.html`;
        loadNext(app, nextPage);
    }
        */
    return;
}

const lazyLoadObserver = new IntersectionObserver((entries) => {

});

load(nav, "/nav");
load(app, "/main");


nav.addEventListener("click", navigate);
app.addEventListener("click", navigate);

