// VARIABLES DU JEU DE DÉ

// Colonne centrale
let new_game = document.querySelector('#new_game');
let cube = document.querySelector('.cube');
let roll_dice = document.querySelector('.roll_dice');
let hold = document.querySelector('.hold');

// Colonnes Players
let currentClass = '';
let score1 = 0;
let score2 = 0;
let current_score1 = 0;
let current_score2 = 0;
let result = "Your turn";

// Fonction lancement des paramètres du jeu
function initialize() {
    score1 = 0;
    score2 = 0;
    current_score1 = 0;
    current_score2 = 0;

    document.getElementById("score1").innerHTML = score1;
    document.getElementById("score2").innerHTML = score2;
    document.getElementById("current_score1").innerHTML = current_score1;
    document.getElementById("current_score2").innerHTML = current_score2;
}

initialize();

// Fonction lancement du Jeu 
function newGame() {
    cube.classList.remove(currentClass);
    cube.classList.add("showClass-1");
    initialize();
}
// Fonction de nombres aléatoires 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Fonction du Jeu de Dé en 3D
function rollDice() {

    // Attribution d'un nombre entre 1 et 7
    let randNum = getRandomInt(1, 7)
    console.log(randNum)
    let showClass = 'show-' + randNum;
    console.log(showClass)

    // Modifications dynamique de class css sur l'élément du Dé 3D (cube)
    if (currentClass) {
        cube.classList.remove(currentClass);
    }
    cube.classList.add(showClass);
    currentClass = showClass;

    // CONDITIONS DU JEU

    // Cas Dé face 1
    if (showClass == "show-1") {
        score1 = 0;
        current_score1 = 0;
        result = "Game Lost!";
        document.getElementById("current_score1").innerHTML = current_score1;
        document.getElementById("score1").innerHTML = score1;
        console.log("Perdu!");
    }

    // Cas Dé autres face
    if (showClass != "show-1") {
        current_score1 = current_score1 + randNum;
        console.log("current score = " + current_score1);
        result = "Your turn";
        document.getElementById("current_score1").innerHTML = current_score1;
    }

    // Score
    if (score1 >= 30) {
        result = "Game Won!"
        console.log("Gagné!");
    }

    document.getElementById("result").innerHTML = result;

}

function holdResult() {
    console.log("Hold");
    score1 = current_score1;
    document.getElementById("score1").innerHTML = score1;
}

// Lancement des fonctions sur l'évènement : addEventListener
new_game.addEventListener("click", newGame);
roll_dice.addEventListener("click", rollDice);
hold.addEventListener("click", holdResult);