// Tip: run the code in your terminal using 'node destructing.js' 
// instead of using an html page. Makes it much easier to test things

let x, y, z;
let numbers = [10,20,30,40,50,60,70];

// regular way of assigning array values to variables
x = numbers[0];
y = numbers[1];
z = numbers[2];

// standard array destructing
[x,y,z] = numbers;

console.log('Destructing: ',x, y, z);

//-----------------------------------------------------//

// Finding the right value
// take only values 50, 60, 70
[,,,,x,y,z] = numbers;

console.log('Destructing specific values: ', x, y, z);

//-----------------------------------------------------//

// Defaulting values
let letters = ['A', 'B'];

[x,y,z='No value!'] = letters;

console.log('Destructing with defaults: ', x, y, z);

//-----------------------------------------------------//

// Collecting more data using rest parameters
let numbers2 = [10,20,30,40,50,60,70];

[x,y,...z] = numbers2;

console.log('Destructing with rest: ', x, y, z);

//-----------------------------------------------------//

// Object destructing
let person = {
    firstname: 'Mike',
    age: 32,
    hobby: 'Guitar',
    occupation: 'teacher'
}

x = person.firstname;
y = person.age;
z = person.hobby;

let { age, hobby, firstname} = person;

console.log(`Object destructuring: My name is ${firstname}, I am ${age} and I love ${hobby}`);

//-----------------------------------------------------//

// Properties of an object
let {occupation} = person;

console.log(`Object destructuring for specific property:`, occupation);