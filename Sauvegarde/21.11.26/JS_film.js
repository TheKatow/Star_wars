let movielist = new Array();
let peoplelist = new Array();
let planetlist = new Array();
let planetfilm = new Array();
let peoplefilm = new Array();
let people = document.querySelector('.people');
let detail = document.getElementById('detail');
let crawl = document.getElementById('crawl');
let card = document.querySelector('.card_people');
let card_body = document.querySelectorAll('.card_body');
let information = document.getElementById("information");


function starwarsm() {
    fetch('https://swapi.dev/api/films/')
        .then(response => {
            return response.json()
                .then(data => {
                    AddDivPeople(data.results);
                });
        })
}
function AddDivPeople(param) {
    movielist = param;
    console.log(movielist);
    let moviecardsList = "";
    for (let i = 0; i < movielist.length; i++) {
        let info = movielist[i];
        moviecardsList += "<div href=\"#top\" class='card_body' onclick=seedetails('" + i + "')>"
            + `<div class="movie_name" style="text-align: center"><h3><b>${info.title} </b></h3></div>`
            // /div card-body
            + '</div>'
    }
    card.innerHTML = moviecardsList;
}

function seedetails(placeChar) {
    information.style.display = "grid";
    detail.style.display = "block";
    crawl.style.display = "block";
    let detaillist = "";
    let detaillist2 = "";
    let info = movielist[placeChar];
    console.log(info.url); // url du film
    fetch(info.url)
        .then(response => {
            return response.json()
                .then(info => {
                    console.log(info); // info du film
                });
        })
        detaillist = '<div>'
        + '<div><h3><b>' + info.title + '</b></h3>' + '</div>'
        + '<div><img src="picture/film/' + placeChar + '.jpg" style= "width: 75%; border: solid 2px yellow">' + '</div>'
        + '<div><p><span class="bold">Director : </span>' + info.director + '</p>' + '</div>'
        + '<div><p><span class="bold">Date : </span>' + info.release_date + '</p>' + '</div>'
        + '</div>'
        + '<div><p>Personnages : </p></div>'

    let limitplanet = info.characters; // url des personnages
    console.log(limitplanet);
    for (let j = 0; j < limitplanet.length; j++) {
    fetch(limitplanet[j])
        .then(response2 => {
            return response2.json()
                .then(doc => {
                    console.log(doc);
                    detaillist += '<button onclick="window.location.href=\'People.html\';">' + doc.name + '</button>'
                    detail.innerHTML = detaillist;
                })
        })
    }
    detaillist2 += '<div>'
        + '<p>Planêtes : </p>'
    let limitfilm = info.planets; // tableau des planêtes du film
    console.log(limitfilm);
    for (let i = 0; i < limitfilm.length; i++) {
        fetch(limitfilm[i]) // url des planêtes du film
            .then(response1 => {
                return response1.json()
                    .then(data => {
                        console.log(data);
                        detaillist2 += '<button onclick="window.location.href=\'Planet.html\';">' + data.name + '</button>'
                        detail.innerHTML = detaillist + detaillist2;
                    })
            })
    } 
    detailscroll = '<p class="scroll">' + info.opening_crawl + '</p>'
    crawl.innerHTML = detailscroll;
}
