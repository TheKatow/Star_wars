let movielist = new Array();
let peoplelist = new Array();
let planetlist = new Array();
let moviepeople = new Array();
let limitfilm = new Array();
let limitplanet = new Array();
let List = document.querySelector('ul');
let people = document.querySelector('.people');
let detail = document.getElementById('detail');
let card = document.querySelector('.card_people');
let card_body = document.querySelectorAll('.card_body');
let information = document.getElementById("information");


function starwarsc() {
    fetch('https://swapi.dev/api/people/')
        .then(response => {
            return response.json()
                .then(data => {
                    AddDivPeople(data.results);
                });
        })
}

function AddDivPeople(param) {
    peoplelist = param;
    console.log(peoplelist);
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

function seedetails(placeChar) {
    information.style.display = "grid";
    detail.style.display = "block";
    let detaillist = "";
    let detaillist2 = "";
    let info = peoplelist[placeChar];
    console.log(info.url); // url du personnage
    fetch(info.url)
        .then(response => {
            return response.json()
                .then(info => {
                    console.log(info);
                });
        })
    detaillist = '<div class="people_info">'
        + '<div><h3><b>' + info.name + '</b></h3></div>'
        + '<div><img src="picture/personnage/' + placeChar + '.jpg" style= "width: 75%; border: solid 2px yellow"></div>'
        + '<div><p><span class="bold">Gender : </span>' + info.gender + '</p></div>'
        + '<div><p><span class="bold">Height : </span>' + info.height + '</p></div>'
        + '<div><p>Mass : ' + info.mass + '</p></div>'
        + '<div><p>Age galactique : ' + info.birth_year + '</p>' + '</div>'
        + '</div>'

    let limitplanet = info.homeworld; // url de la planête
    console.log(limitplanet);
    fetch(limitplanet)
        .then(response2 => {
            return response2.json()
                .then(doc => {
                    console.log(doc);
                    detaillist += '<p>Planête : <button onclick="window.location.href=\'Planet.html\';">' + doc.name + '</button></p>'
                    detail.innerHTML = detaillist;
                })
        })

    detaillist2 += '<div>'
        + '<p>Films : </p>'
    let limitfilm = info.films; // tableau des films du personnage
    console.log(limitfilm);
    for (let i = 0; i < limitfilm.length; i++) {
        fetch(limitfilm[i]) // url des films du personnage
            .then(response1 => {
                return response1.json()
                    .then(data => {
                        console.log(data);
                        detaillist2 += '<div><button onclick="window.location.href=\'Movie.html\';">' + data.title + '</button></div>'
                        detail.innerHTML = detaillist + detaillist2;
                    })
            })
    }
}
