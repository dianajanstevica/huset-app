window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (search) {
        //        console.log("this is a search result")
        getSearchData();
    } else if (id) {
        getSinglePage();
    } else if (category) {
        getCategory(category);
    } else {
        getFrontpageData();
    }
    getNavigation();
}

function getNavigation() {
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            //        console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    //        console.log(oneItem.name)
    if (oneItem.parent === 15 && oneItem.count > 0) {
        const link = document.createElement("a");
        link.textContent = oneItem.name;
        link.setAttribute("href", "category.html?category=" + oneItem.id);
        document.querySelector(".main_menu").appendChild(link);
    }
}


function getFrontpageData() {
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?per_page=100")
        .then(res => res.json())
        .then(handleData)
}

function getCategory(catId) {
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?_embed&categories=" + catId)
        .then(res => res.json())
        .then(handleData)
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getSinglePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    //    console.log(id)

    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event/" + id)
        .then(res => res.json())
        .then(showEvent)
}

function handleData(myData) {
    //    console.log(myData)
    //1 loop

    myData.forEach(showEvent)
}

function showEvent(event) {
    //    console.log(event)
    //2 clone template
    const imgPath = event.image.guid;

    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);
    //3 texcontent / innerHTML
    const title = eventCopy.querySelector("h1");
    title.textContent = event.title.rendered;
    //    console.log(title)

    const p = eventCopy.querySelector(".shortDescription");
    p.textContent = event.short_description;

    const img = eventCopy.querySelector(".eventImage");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event | " + event.title.rendered)

    const eventDate = new Date(event.event_date + "T" + event.event_time);

    const hours = eventDate.getHours() < 10 ? "0" + eventDate.getHours() : "" + eventDate.getHours();
//    if (hours < 10) {
//        "0" + eventDate.getHours();
//    } else {
//        "" + eventDate.getHours();
//    }
//    console.log(hours);

    const minutes = eventDate.getMinutes() < 10 ? "0" + eventDate.getMinutes() : "" + eventDate.getMinutes();
//    if (minutes < 10) {
//        "1" + eventDate.getMinutes();
//    } else {
//        "" + eventDate.getMinutes();
//    }
//    console.log(minutes);

    const time = eventCopy.querySelector(".eventTime");
    time.textContent = `${hours}:${minutes}`;

    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    const year = "" + eventDate.getFullYear();
    const month = months[eventDate.getMonth()];
    const day = "" + eventDate.getDate();
    const date = eventCopy.querySelector(".eventDate");
    date.textContent = `${day}. ${month}  ${year}`;

    const location = eventCopy.querySelector(".eventLocation");
    location.textContent = event.location;

    const price = eventCopy.querySelector(".eventPrice");
    price.textContent = event.event_price + ' kr';

    const a = eventCopy.querySelector("a");
    a.href = "event.html?id=" + event.id;

    const longDescription = eventCopy.querySelector(".longDescription");

    longDescription.textContent = event.long_description;
//    console.log(longDescription);


    //4 append
    document.querySelector("#events").appendChild(eventCopy)
}
