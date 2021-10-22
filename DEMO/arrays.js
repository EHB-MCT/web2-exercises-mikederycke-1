// Multiple ways to loop over arrays
let names = ['Mike', 'James', 'Owen', 'Hellen']; 
let numbers = [1,2,3,4,5,6,7,8,9,10];

// For loop
for(let i=0; i < 4; i++){
    //console.log(names[i]);
}
//-----------------------------------------------------//


// Using the length of the array
for(let i=0; i < numbers.length; i++){
    // console.log(numbers[i]);
}
//-----------------------------------------------------//

// for ... of
for(let n of names){
    // console.log(n);
}

//-----------------------------------------------------//


// .forEach
let example1 = numbers.forEach( element => {
    // console.log(`${element} * ${element} = ${element*element}`);
    return element * element;
});
console.log('forEach function after running:', example1)

//-----------------------------------------------------//

// .map
let example2 = numbers.map( element => {
    return element * element;
});
console.log('Map function after running:', example2)

//-----------------------------------------------------//



