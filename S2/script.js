import Team from './team.js';

let list = [];
let pokemon = [];
// Create new team
let team1 = new Team();

function getData(){
    //get the list
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => {
        return response.json();
    }).then(data => {
        list = data.results;
        //Loop over the list to get each pokemon
        for(let element of list){
            fetch(element.url).then(response => {
                return response.json();
             }).then(data => {
                 pokemon.push(data);
             })
        }
    });
}

window.onload = function(){

    getData();
    setTimeout(buildList, 3000);

    function buildList(){
        let html = '';
        // Order the list
        pokemon.sort(function(a,b) {
            return a.id - b.id;
        });


        for(let p of pokemon){
            html += `<div class="card" style="width: 10rem; margin: 3px;">
            <img class="card-img-top" src="${p.sprites.front_default}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">types TBD</p>
            <a href="#" id="${p.id}" class="btn btn-primary ">Add to team</a>
            </div>
            </div>`
        }
        document.getElementById('list').innerHTML = html;

        //Add event listeners to all the buttons
        document.querySelectorAll('.btn').forEach(item => {
            item.addEventListener('click', event => {
                //Get the id of the clicked item
                let id = event.target.id;
                // Two ways of retrieving the correct pokemon data
                // 1. Make a new fetch call
                // 2. search for the pokemon in the array
                let p = pokemon.find(ele => ele.id == id);
                
                //Add the pokemon to the team
                let message = team1.addPokemon(p);
                refreshTeam(message);


            });
        });
    }

    refreshTeam();

    
    
    

}

function refreshTeam(m){
    //Add the team description to the page
    document.getElementById('team').innerHTML = team1.describe();

    if(m){
        //Create the message div
        let alertbox = document.createElement('div');
        alertbox.classList.add('alert');
        alertbox.setAttribute('role', 'alert'); 

        // Add styling based on sort of error
        if(m.type == 'SUCCES'){
            alertbox.classList.add('alert-success');
        }else{
            alertbox.classList.add('alert-danger');
        }

        //Add the message text
        alertbox.innerText = m.value;

        //Add to DOM
        document.getElementById('messages').innerHTML = '';
        document.getElementById('messages').appendChild(alertbox);

    }
}



