let cube = document.querySelector('.cube');
let rollBtn = document.querySelector('.rollBtn');
let currentClass = '';
let score = 0;
let result = "Your turn";


// Fonction de nombre aléatoire 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function rollDice() {

    document.getElementById("score").innerHTML = score;
    document.getElementById("result").innerHTML = result;
    // Attribution d'un nombre entre 1 et 7
    let randNum = getRandomInt(1, 7)
    console.log(randNum)
    let showClass = 'show-' + randNum;
    console.log(showClass)
    if (currentClass) {
        cube.classList.remove(currentClass);
    }
    cube.classList.add(showClass);
    currentClass = showClass;
    console.log(cube);

    // Conditions du Jeu
    if (showClass != "show-1") {
        score = score + randNum;
        console.log("score = " + score);
    }

    if (score >= 15) {
        result = "Game Won!"
        console.log("Gagné!");
    }
    if (showClass == "show-1") {

        result = "Game Lost!";
        console.log("Perdu!");

    } else if ((result == "Game Won!") || (result == "Game Lost!")) {
        score = 0;
        score = score + randNum;
        result = "Your turn";
    }
    document.getElementById("result").innerHTML = result;
}

// set initial side
rollDice();
// on click eventlistener for the button element
rollBtn.addEventListener("click", rollDice);