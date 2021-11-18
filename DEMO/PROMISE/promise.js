let magicNumber = 0;
window.onload = function(){

    //Generate a new random number
    magicNumber = generateNumber();
    //catch the form submit event
    document.getElementById('searchform').addEventListener('submit', event => {
        event.preventDefault();
        //Capture the input value
        let value = document.getElementById('input').value;
        
        compareNumber(value).then(
            result => addMessage(result, 'S'),
            error => addMessage(error, 'E')
        )
    });

}

function addMessage(m, type){
    document.getElementById('messages').innerHTML = 
    `<div class="alert ${ type == 'S' ? 'alert-success' : 'alert-danger' }" 
    role="alert"> ${m} </div>`

}

function compareNumber(nr){
    return new Promise(function(resolve, reject){
        //comparing the nr with the magic number
        if(nr < magicNumber) reject('Go higher, you noob!')
        else if(nr > magicNumber) reject('Go lower, you fool!')
        else if(nr == magicNumber) resolve("Congratz! You go champ!")
    });
}

function generateNumber(){
    return Math.floor(Math.random() * 21);
}