const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("id")

fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event/45")
    .then(res => res.json())
    .then(showEvent)

function showEvent(event) {
    console.log(event)
    document.querySelector("article h1").textContent = event.title.rendered
}
