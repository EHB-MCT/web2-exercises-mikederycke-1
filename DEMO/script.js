let kil = 'http://api.openweathermap.org/data/2.5/weather?q=denderleeuw&appid=d3cdfff8a9c9b9f89b250cc4b6bc8e18';
let bent = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=966c67d47e7545acbb794c9dda82b8d6&ingredients=apples,+flour%27`;
let jens = `https://cartes.io/api/maps/048eebe4-8dac-46e2-a947-50b6b8062fec`;


// Demo Api calls

async function getData(url){
    let response = await fetch(url);
    console.log(response);
    return await response.json();
}

getData(jens).then(data => {
    document.getElementById('message').innerText = JSON.stringify(data);
});