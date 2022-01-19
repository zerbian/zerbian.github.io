const days = ['sun', '', '', '', '', 'fri', 'sat'];

fetch("data.json")
    .then(res => res.json())
    .then(main);

function main(data) {
    data.events.sort((a,b) => (a.start > b.start) ? 1 : -1);
    data.events.forEach(createSlot);
}

function createSlot(event) {
    let start = new Date(event.start);
    let end = new Date(event.end);
    let duration = (end - start) / (1000 * 60);

    // find right class to insert the element
    let day = days[start.getDay()];
    let ens = event.type.toLowerCase();
    const anchor = document.querySelector(`.${day}>.${ens}`);
    
    let el = document.createElement("article");
    el.style = "--rel-height:" + duration ;

    let startText = document.createElement("span");
    startText.classList.add("time");
    startText.textContent = start.toLocaleTimeString().slice(0,5);

    let endText = document.createElement("span");
    endText.classList.add("bottom-right","time");
    endText.textContent = end.toLocaleTimeString().slice(0,5);

    let mainText = document.createElement("p");
    mainText.textContent = event.note;

    if (event.note) {
        el.appendChild(startText);
        el.appendChild(mainText);
        el.appendChild(endText);
    } else {
        el.classList.add("blank");
    }

    if (event.note.toLowerCase().endsWith('pause')) {
        el.classList.add("rest");
    }
    const now = Date.now();
    if (now > start && now < end) {
        el.classList.add("now");
    }

    anchor.appendChild(el);
}