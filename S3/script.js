let baseurl = 'http://www.omdbapi.com/?apikey=10531ad7&';

window.onload = function(){
    document.getElementById('searchform').addEventListener('submit', event => {
        event.preventDefault();
        //Build the url
        let url = baseurl + `t=${document.getElementById('input').value}`;
        // Get the data
        getData(url).then(movie => {
            addMovie(movie);
        });
    });
}

async function getData(url){
    let response = await fetch(url);
    return await response.json();
}

function addMovie(m){
    document.getElementById('poster').src = m.Poster;
    document.getElementById('title').innerText = m.Title;
    document.getElementById('desc').innerText = m.Plot;
    document.getElementById('runtime').innerText = m.Runtime;
}