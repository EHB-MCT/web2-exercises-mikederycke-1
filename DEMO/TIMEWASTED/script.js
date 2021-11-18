import url from './config.js';
let counter = 0;
let currentMovie = {};

window.onload = function(){
    updateCounter();
    //get the value from inputfield on submit
    document.getElementById('inputTitle').addEventListener('keyup', event => {
      
        //retrieve value from inputfield
        let value = document.getElementById('inputTitle').value;
        
        //build the url
        let finalUrl = `${url}&s=${value}`;

        //fetch the data
        getData(finalUrl).then(result => {
            updateList(result);
            // addMovie(result);
        });
        
    });

    //Add the add movie button event listener
    document.getElementById('addMovie').addEventListener('click', event =>{
        if(currentMovie){
            counter += parseInt(currentMovie.Runtime);
            updateCounter();
        }
        
    });

    Array.from(document.getElementsByClassName('list-group-item')).forEach(element => {
        element.addEventListener('click', selectMovie);
    });
}

function selectMovie(event){
    let str = event.target.text;
    let year = str.split('- Year: ')[1].trim();
    let title = str.split('- Year: ')[0].trim();
    
    //Get movie from api
    //build the url
    let finalUrl = `${url}&t=${title}&y=${year}`;

    //fetch the data
    getData(finalUrl).then(result => {
        addMovie(result);
        // hide resultlist
        document.getElementById('resultlist').setAttribute('hidden', true);
    });

}

function updateList(list){
    console.log(list);
    if(list.Error){
        document.getElementById(`error`).innerText = 'No movies found! Keep trying';
    }
    if(list.Search){
        let count = 1;
        list.Search.forEach(movie => {
            let string = `${movie.Title} - Year: ${movie.Year}`;
            document.getElementById(`result${count}`).innerText = string;
            count++;
        });
        document.getElementById('resultlist').removeAttribute('hidden');
        document.getElementById('error').setAttribute('hidden', true);
    }
    
    
}

function addMovie(m){
    currentMovie = m;
    document.getElementById('poster').src = m.Poster;
    document.getElementById('cardtitle').innerText = m.Title;
    document.getElementById('carddesc').innerText = m.Plot;
    document.getElementById('carddirector').innerText = `Director: ${m.Director}`;
    document.getElementById('cardruntime').innerText = `Year: ${m.Year} - Runtime: ${m.Runtime}`;
    document.getElementById('moviecard').removeAttribute('hidden');
}

async function getData(url){
    let response = await fetch(url);
    return await response.json();
}

function updateCounter(){
    if(counter === 0){
        if(localStorage.getItem('movieCounter')){
            counter = parseInt(localStorage.getItem('movieCounter'));
        }
    }
    document.getElementById('counter').innerText = counter;

    //save latest state to local storage
    localStorage.setItem('movieCounter', counter);
}



