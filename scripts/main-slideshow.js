import {loop} from './utils.js';

const params = new URLSearchParams(window.location.search);
const frame = document.querySelector(".slide");

const project = params.get("project");
const slideCount = parseInt(params.get("count"));

loop (project, frame, slideCount);