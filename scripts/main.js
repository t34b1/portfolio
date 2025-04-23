import {load, navigate, handleHashChange} from './utils/utils-routing.js';

const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const sidebar = document.querySelector("#sidebar");

nav.addEventListener("click", navigate);
app.addEventListener("click", navigate);

window.addEventListener("DOMContentLoaded", () => {
    load("/nav", nav, false);
    load("/sidebar", sidebar, false);
    handleHashChange();
  });

window.addEventListener("hashchange", handleHashChange);






