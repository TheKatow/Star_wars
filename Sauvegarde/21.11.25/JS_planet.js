let movielist = new Array();
let peoplelist = new Array();
let planetlist = new Array();
let moviepeople = new Array();
let List = document.querySelector('ul');
let people = document.querySelector('.people');
let detail = document.getElementById('detail');
let card = document.querySelector('.card_people');
let card_body = document.querySelectorAll('.card_body');
let information = document.getElementById("information");


function starwarsc() {
    fetch('https://swapi.dev/api/people')
        .then(response => {
            return response.json()
                .then(data => {
                    Getstarc(data.results);
                    console.log(peoplelist);
                });
        })
}
function Getstarc(param) {
    for (let x = 0; x < param.length; x++) {
        let perso = param[x];
        peoplelist.push(perso);
        // AddDivPeople(perso);
    }
}
function AddDivPeople() {  
    let peoplecardsList = "";
    for (let i = 0; i < peoplelist.length; i++) {
        let info = peoplelist[i];
        peoplecardsList += "<div href=\"#top\" class='card_body' onclick=seedetails('" + i + "')>"
            + `<div class="people_name" style="text-align: center"><h3><b>${info.name} </b></h3></div>`
            // /div card-body
            + '</div>'
    }
    card.innerHTML = peoplecardsList;
}


function starwarsp() {
    fetch('https://swapi.dev/api/planets')
        .then(response => {
            return response.json()
                .then(data => {
                    Getstarp(data.results);
                    console.log(planetlist);
                });
        })
}
function Getstarp(param) {
    console.log(param);
    for (let x = 0; x < param.length; x++) {
        let planets = param[x];
        planetlist.push(planets);
        AddDivPlanet(planets);
    }
}
function AddDivPlanet() {
    let planetcardsList = "";
    for (let i = 0; i < planetlist.length; i++) {
        let info = planetlist[i];
        planetcardsList += "<div href=\"#top\" class='card_body' onclick=seedetails('" + i + "')>"
            + `<div class="planet_name" style="text-align: center"><h3><b>${info.name} </b></h3></div>`
            // /div card-body
            + '</div>'
    }
    card.innerHTML = planetcardsList;
}


function starwarsm() {
    fetch('https://swapi.dev/api/films')
        .then(response => {
            return response.json()
                .then(data => {
                    Getstarm(data.results);
                    console.log(movielist);
                });
        })
}
function Getstarm(param) {
    for (let x = 0; x < param.length; x++) {
        let films = param[x];
        movielist.push(films);
        // AddDivFilms(films);
    }
}
function AddDivFilms() {
    let filmscardsList = "";
    for (let i = 0; i < movielist.length; i++) {
        let info = movielist[i];
        filmscardsList += "<div href=\"#top\" class='card_body' onclick=seedetails('" + i + "')>"
            + `<div class="films_name" style="text-align: center"><h3><b>${info.name} </b></h3></div>`
            // /div card-body
            + '</div>'
    }
    card.innerHTML = filmscardsList;
}

// function clickindex() {
//     console.log("OK");
//     zoom.classList.add('zoom');
// }

// let zoom = document.querySelector('.btn');

function search() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('people');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}

function seedetails(placeChar) {
    information.style.display = "grid";
    detail.style.display = "block";
    console.log(movielist);
    console.log(planetlist);
    console.log(peoplelist);
    let detaillist = "";
    let info = peoplelist[placeChar];
    let planetChar = (info.homeworld.slice(-2, -1) - 1); //gets last character
    let infop = planetlist[planetChar];
    moviepeople = info.films;
    console.log(info);
    console.log(infop);
    
    detaillist = '<div class="people_info">'
        + '<div class="people_name"><h3><b>' + info.name + '</b></h3>' + '</div>'
        + '<div class="people_img"><img src="picture/' + placeChar + '.jpg" style= "width: 75%; border: solid 2px yellow">' + '</div>'
        + '<div class="people_gender"><p><span class="bold">Gender : </span>' + info.gender + '</p>' + '</div>'
        + '<div class="people_height"><p><span class="bold">Height : </span>' + info.height + '</p>' + '</div>'
        + '<div class="people_mass"><p>Mass : ' + info.mass + '</p></div>'
        + '<div class="people_age"><p>Age galactique : ' + info.birth_year + '</p>' + '</div>'
        + '<div class="people_home">Planête : <button onclick="window.location.href=\'Planet.html\';">' + infop.name + '</button>' + '</div>'
        + '</div>'
        + '<p>Films : </p>'
    
    for (let m = 0; m < moviepeople.length; m++) {
       let nindice = (m).toString(); // convertit m en caractère
       let zindice = moviepeople[nindice]; // selectionne le film à nindice
       let moviecar = (zindice.slice(-2, -1) -1); // récupère le numéro du film
       let infom = movielist[moviecar]; // va chercher les infos du film par rapport à son numéro
       
        detaillist += '<div class="people_films"><button onclick="window.location.href=\'Movie.html\';">' + infom.title + '</button>' + '</div>'
    }
    detail.innerHTML = detaillist;

    crawl = '<div id="crawl"><p class="scroll">' + infom.opening_crawl + '</p>'
}
