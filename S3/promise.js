let magicNumber = 0;

window.onload = function(){
    // Generate first number
    generateNumber();

    document.getElementById('guessBtn').addEventListener('click', function(event){
        let message = '';
        compareNumber(document.getElementById('input').value).then(
            result => addMessage(result, 'S'),
            error => addMessage(error, 'E')
        );  
    });
}
function compareNumber(nr){
    return new Promise(function(resolve,reject){
        //compare nr with magicnumber

        if(nr < magicNumber) reject('Go higher, you noob!')
        else if(nr > magicNumber) reject('Go lower, you fool!')
        else if(nr == magicNumber) resolve("Congratz! You go champ!")
    });
}

function addMessage(m, type){
    
    document.getElementById('messages').innerHTML = 
    `<div class="alert 
    ${type == 'S' ? 'alert-success' : 'alert-danger'}"  role="alert">
        ${m}
    </div>`;
}

function generateNumber(){
    magicNumber = Math.floor(Math.random() * 21);
    return magicNumber;
}