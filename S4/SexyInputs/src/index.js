import Cleave from 'cleave.js';
require('cleave.js/dist/addons/cleave-phone.be');

var test = new Cleave('#name', {
    prefix: 'STUDENT-',
    uppercase: true
});

var date = new Cleave('#DOB', {
    date: true,
    delimiter: '-',
    datePattern: ['d', 'm', 'Y']
});
var RRN = new Cleave('#RRN', {
    blocks: [2, 2, 2, 3,2],
    delimiters: ['.', '.', '-', '.']
});

var age = new Cleave('#age', {
    numeral: true,
    numeralPositiveOnly: true
});
var phone = new Cleave('#phone', {
    phone: true,
    phoneRegionCode: 'BE'
});

document.getElementById('sexyform').addEventListener('submit', function(event){
    event.preventDefault();
    //getdata
    const name = document.getElementById('name').value;
    const dob = document.getElementById('DOB').value;
    const RRN = document.getElementById('RRN').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;

    //Change card
    document.getElementById('title').innerText = `${name} - Age ${age}`;
    document.getElementById('desc').innerText = `Born on ${dob}, this person was granted a unique number. That way the government could track every move. That number was ${RRN}`;
    document.getElementById('callme').innerText = `Call me: ${phone}`;

})
console.log('Finished again for real');
