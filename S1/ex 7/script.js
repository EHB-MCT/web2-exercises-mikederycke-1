//Create an array with 3 dishes
const dishes = [{
    id: 1,
    name: 'Burger and fries',
    price: 12
},{
    id: 2,
    name: 'Pizza',
    price: 15

},{
    id: 3,
    name: 'Spaghetti',
    price: 10
}]

window.onload = function(){
    console.log('loaded');

    // Add event listener to submit button of the FORM
    document.getElementById('form')
    .addEventListener('submit', event => {
        event.preventDefault();    
        console.log(event);
        //Get values of input fields
        let name = document.getElementById('nameInput').value;
        let email = document.getElementById('emailInput').value;
        let order = document.querySelector('input[name="dish"]:checked').value;

        //Easily find the first element in an array
        //using a callback function
        let dish = dishes.find(d => d.id == order);
        //Docu: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        
        //Create the object
        //Easily transfer the values of the variables to the properties
        let orderdetails = {
            name,email,dish
        }

        //Print on the screen
        document.getElementById('messages').innerHTML = printOrder(orderdetails);
    });
}

function printOrder(orderdetails){
    return `<p>The order for the customer ${orderdetails.name} is the following:  
        ${orderdetails.dish.name}. The customer may be notified by email: ${orderdetails.email}</p>`;
}