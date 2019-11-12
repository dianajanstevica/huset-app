const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("id")

fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event/" + id)
    .then(res => res.json())
    .then(showEvent)

function showEvent(event) {

    document.querySelector("article h1").textContent = event.title.rendered

    const imgPath = event.image.guid;

    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    const time = eventCopy.querySelector(".eventTime");
    time.textContent = event.event_time;

    const date = eventCopy.querySelector(".eventDate");
    date.textContent = event.event_date;

    const location = eventCopy.querySelector(".eventLocation");
    location.textContent = event.location;

    const longDescription = eventCopy.querySelector(".longDescription");
    longDescription.textContent = event.long_description;

    const price = eventCopy.querySelector(".eventPrice");
    price.textContent = event.event_price + ' kr'

    const img = eventCopy.querySelector(".eventImage");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event | " + event.title.rendered)


    document.querySelector("#event").appendChild(eventCopy)
}
