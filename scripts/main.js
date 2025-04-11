import {load, navigate, handleHashChange} from './utils/utils-routing.js';

const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
nav.addEventListener("click", navigate);
app.addEventListener("click", navigate);

window.addEventListener("DOMContentLoaded", () => {
    load("/nav", nav, false);
    handleHashChange();
  });

window.addEventListener("hashchange", handleHashChange);


