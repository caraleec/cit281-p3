const coinObj = [1,5,10,25,50,100];
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];

function validDenomination(coin){
    //Returns true if the coin parameter is 1,5,10,25,50,100
    return false !== coinObj.indexOf(coin) >=0;
    //Must use the array indexOf() method and !==
    //coded on one line????
    
};

function valueFromCoinObject(obj) {
    //Returns calculated value of single coin value from obj
    //Use object deconstruction 
    //denom and count const from obj, default object value is 0 for denom and count
    let {denom = 0, count = 0} = obj; 
    return denom * count;
};


function valueFromArray(arr) {
    //Goes through coin object array, calculates final value of all coin objects
    //Must use Array.reduce() + arrow function 
    //Must use valueFromCoinObject()
    //Extra credit: arr parameter contains another array of coin objects

    /*
    total = 0;
    for (coin of arr) {
        let valueOfCoin = valueFromCoinObject(coin);
        total += valueOfCoin;
    } */
    let answer =  arr.reduce((accumulator, currentObj) => accumulator + valueFromCoinObject(currentObj),0);
    return answer;  
};
console.log(valueFromArray(coins));

function coinCount(...coinage) {
    //Only exported function
    //Calls and returns the result of valueFromArray()
    //value of all coin objs with the coinage array func parameter
    return valueFromArray(coinage);
};

module.exports = {
    coinCount,
    coins : [{denom: 25, count: 2},{denom: 1, count: 7}] 
};
