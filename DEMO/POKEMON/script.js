import Team from './team.js';

let list = [];
let pokemon = [];
let team1 = new Team();
let message = {
    value: '',
    type: ''
};

function getData(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(resp => resp.json())
    .then(data => {
        list = data.results;

        list.forEach(element => {
            fetch(element.url)
            .then(resp => resp.json())
            .then(p => pokemon.push(p));
        });
    });
}

getData();
refreshTeam();
setTimeout(buildList, 3000);

function buildList(){
    let html = '';

    for(let p of pokemon){
        html += `<div class="card" style="width: 10rem; margin: 3px;">
                    <img class="card-img-top" src="${p.sprites.front_default}" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text">types TBD</p>
                    <a href="#" id="${p.id}" class="btn btn-primary ">Add to team</a>
                </div></div>`
    }
    document.getElementById('list').innerHTML = html;

    //add event listeners
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', event => {
            let p = pokemon.find(element => element.id == event.target.id );
            message = team1.addPokemon(p);
            refreshTeam();
        });
    })

    console.log(pokemon);
}

function refreshTeam(){
    document.getElementById('team').innerHTML = team1.describe();

    if(message.type){
        let alertbox = document.createElement('div');
        alertbox.classList.add('alert');
        alertbox.setAttribute('role', 'alert'); 

        // Add styling based on sort of error
        if(message.type == 'SUCCES'){
            alertbox.classList.add('alert-success');
        }else{
            alertbox.classList.add('alert-danger');
        }

        //Add the message text
        alertbox.innerText = message.value;

        //Add to DOM
        document.getElementById('messages').innerHTML = '';
        document.getElementById('messages').appendChild(alertbox);
    }
    

}