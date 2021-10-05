window.onload = function(){
    console.log('loaded');

    // Add event listener to submit button of the FORM
    document.getElementById('form')
    .addEventListener('submit', event => {
        event.preventDefault();      

        //Get values of input fields
        let name = document.getElementById('nameInput').value;
        let email = document.getElementById('emailInput').value;
        let order = document.getElementById('orderInput').value;
        
        //Create the object
        //Easily transfer the values of the variables to the properties
        let orderdetails = {
            name,email,order
        }
        //Print on the screen
        document.getElementById('messages').innerHTML = printOrder(orderdetails);
    });
}

function printOrder(orderdetails){
    return `<p>The order for the customer ${orderdetails.name} is the following:  
        ${orderdetails.order}. The customer may be notified by email: ${orderdetails.email}</p>`;
}