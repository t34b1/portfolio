import {load, navigate, handleHashChange} from './utils/utils-routing.js';
import {fillIcons} from './utils/utils-animations.js';

const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const sidebar = document.querySelector("#sidebar");

nav.addEventListener("click", navigate);
app.addEventListener("click", navigate);

window.addEventListener("DOMContentLoaded", async () => {
    await load("/nav", nav, false);
    await load("/sidebar", sidebar, false);
    handleHashChange();
    fillIcons();
  });

window.addEventListener("hashchange", handleHashChange);






