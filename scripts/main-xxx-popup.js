import {createObserver, delay} from './utils.js';

async function spamDuplicate(entry) {
    let target = entry.target;
    let left = +target.dataset.left;
    let top = +target.dataset.top;
    for (let i = 0; i < 10; i++) {
        await delay(150);
        let dup = new Image(); 
        dup.src = target.src;
        dup.className = target.className;
        dup.style.position = "absolute";
        left += 2;
        top -= 2;
        dup.style.left = left + "%";
        dup.style.top = top + "%";
        entry.target.parentElement.append(dup);
    }
}

let popUp = document.querySelector(".pop-up");
    if (popUp) {
        createObserver(popUp, spamDuplicate, true);
    }


