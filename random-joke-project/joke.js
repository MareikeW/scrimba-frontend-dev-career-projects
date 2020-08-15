/* Create 4 variables and assign them to their 
respective elements: setupDiv, punchlineDiv, punchlineBtn, 
newJokeBtn*/

const frageDiv = document.getElementById('frage');
const pointeDiv = document.getElementById('pointe');
const pointeBtn = document.getElementById('pointeBtn');
const neuerWitzBtn = document.getElementById('neuerWitzBtn');
let currentPointe = '';

// Setup an async function called getJoke
// Create a variable called jokePromise that fetches a joke from https://official-joke-api.appspot.com/jokes/programming/random
// create a variable called joke that consumes the json data

pointeBtn.addEventListener('click', getPunchline);

function getPunchline() {
    pointeDiv.innerHTML = currentPointe;
    pointeBtn.classList.toggle('hidden');
    neuerWitzBtn.classList.toggle('hidden');
}

neuerWitzBtn.addEventListener('click', getNewJoke);

function getNewJoke() {
    pointeDiv.innerHTML = '';
    getJoke();
}

async function getJoke(e) {
    const jokePromise = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
    const joke = await jokePromise.json();

     // Get the setup from the joke and insert it into the setupDiv element
     frageDiv.innerHTML = joke[0].setup; // Der gefetchte Joke ist ein Array mit einem Element, deshalb [0]

     // Create a global variable called punchline which will store the current punchline and will be updated with each new joke
    // Assign the current jokes punchline to the punchline variable.
    currentPointe = joke[0].punchline;

    pointeBtn.classList.toggle('hidden');
    neuerWitzBtn.classList.toggle('hidden');
    
}

getJoke();

// Add an event listener for the punchline button. When clicked it should call a function called getPunchline
/* Create the getPunchline function. This function should: 
    Insert the punchline into the punchlineDiv
    Add the class "bubble" to the punchlineDiv
    Toggle the "hidden" class on both buttons.
*/