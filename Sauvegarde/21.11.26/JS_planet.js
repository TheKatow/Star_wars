let movielist = new Array();
let peoplelist = new Array();
let planetlist = new Array();
let moviepeople = new Array();
let people = document.querySelector('.people');
let detail = document.getElementById('detail');
let card = document.querySelector('.card_people');
let card_body = document.querySelectorAll('.card_body');
let information = document.getElementById("information");


function starwarsp() {
    fetch('https://swapi.dev/api/planets/')
        .then(response => {
            return response.json()
                .then(data => {
                    AddDivPeople(data.results);
                });
        })
}
function AddDivPeople(param) {
    planetlist = param;
    console.log(planetlist);
    let planetcardsList = "";
    for (let i = 0; i < planetlist.length; i++) {
        let info = planetlist[i];
        planetcardsList += "<div href=\"#top\" class='card_body' onclick=seedetails('" + i + "')>"
            + `<div class="planet_name" style="text-align: center"><h3><b>${info.name} </b></h3></div>`
            + '</div>'
    }
    card.innerHTML = planetcardsList;
}

function seedetails(placeChar) {
    information.style.display = "grid";
    detail.style.display = "block";
    let detaillist = "";
    let detaillist2 = "";
    let info = planetlist[placeChar];
    console.log(info.url); // url du film
    fetch(info.url)
        .then(response => {
            return response.json()
                .then(info => {
                    console.log(info); // info du film
                });
        })
        detaillist = '<div>'
        + '<div><h3><b>' + info.name + '</b></h3>' + '</div>'
        + '<div><img src="picture/Planet/' + placeChar + '.jpg" style= "width: 75%; border: solid 2px yellow">' + '</div>'
        + '<div><p>Climate : ' + info.climate + '</p>' + '</div>'
        + '<div><p>Population : ' + info.population + '</p>' + '</div>'
        + '<div><p>Terrain : ' + info.terrain + '</p>' + '</div>'
        + '</div>'
        + '<div>'
        + '<p>Residents : </p></div>'

    let limitperso = info.residents; // url des residents
    console.log(limitperso);
    for (let j = 0; j < limitperso.length; j++) {
    fetch(limitperso[j])
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
        + '<p>Films : </p>'
    let limitfilm = info.films; // tableau des planêtes du film
    console.log(limitfilm);
    for (let i = 0; i < limitfilm.length; i++) {
        fetch(limitfilm[i]) // url des planêtes du film
            .then(response1 => {
                return response1.json()
                    .then(data => {
                        console.log(data);
                        detaillist2 += '<button onclick="window.location.href=\'Planet.html\';">' + data.title + '</button>'
                        detail.innerHTML = detaillist + detaillist2;
                    })
            })
    }
    detailscroll = '<p class="scroll">' + info.opening_crawl + '</p>'

    detail.innerHTML = detaillist + detaillist2;
}
