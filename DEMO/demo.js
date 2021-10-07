


let list = [];
let pokemons = [];
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(resp => resp.json())
    .then(data => {
        list = data.results;
        // Loop over every pokemon
        list.forEach(poke => {
            fetch(poke.url)
            .then(resp => resp.json())
            .then(pokeObject => {
                pokemons.push(pokeObject);
            });
        });
    });

window.onload = function(){
    setTimeout(buildList, 3000);

    function buildList(){
        console.log(pokemons);
        // build list with html and template literals
        //add to innerHTML
        let html = '';
        for(let p of pokemons){
            html += ' something extra';
        }
        //Add html to DOM

    }

}

