window.addEventListener("DOMContentLoaded", getData);


function getData(){
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?per_page=100")
    .then(res=>res.json())
    .then(handleData)
}
function handleData(myData){
//    console.log(myData)
    //1 loop
    myData.forEach(showEvent)
}
function showEvent(event){
//    console.log(event)
    //2 clone template
    const imgPath = event.image.guid;

    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);
    //3 texcontent / innerHTML
    const title = eventCopy.querySelector("h1");
    title.textContent = event.title.rendered;

    const p = eventCopy.querySelector("p");
    p.textContent = event.short_description;

    const img = eventCopy.querySelector(".eventImage");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event | " + event.title.rendered)

    const time = eventCopy.querySelector(".eventTime");
    time.textContent = event.event_time;

    const date = eventCopy.querySelector(".eventDate");
    date.textContent = event.event_date;

    const location = eventCopy.querySelector(".eventLocation");
    location.textContent = event.location;

    const price = eventCopy.querySelector(".eventPrice");
    price.textContent = event.event_price + ' kr';

    const a = eventCopy.querySelector("a");
    a.href = "event.html?id="+event.id;

    //4 append
    document.querySelector("#events").appendChild(eventCopy)
}
