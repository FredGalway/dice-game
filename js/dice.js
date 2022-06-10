// VARIABLES DU JEU DE DÉ

// Colonne centrale
let new_game = document.querySelector('#new_game');
let cube = document.querySelector('.cube');
let roll_dice = document.querySelector('.roll_dice');
let hold = document.querySelector('.hold');

// Colonnes Players
let current_player = '';
let currentClass = '';
let GLOBAL_player1 = 0;
let GLOBAL_player2 = 0;
let ROUND_player1 = 0;
let ROUND_player2 = 0;
let result = "Your turn";

// Nombre aléatoire et attribution dynamique de class
let randNum;
let showClass;

// Fonction lancement des paramètres du jeu
function initialize() {
    GLOBAL_player1 = 0;
    GLOBAL_player2 = 0;
    ROUND_player1 = 0;
    ROUND_player2 = 0;
    current_player = 'p1';
    console.log("Nouvelle Partie / Player 1 " + current_player);

    document.getElementById("GLOBAL_player1").innerHTML = GLOBAL_player1;
    document.getElementById("GLOBAL_player2").innerHTML = GLOBAL_player2;
    document.getElementById("ROUND_player1").innerHTML = ROUND_player1;
    document.getElementById("ROUND_player2").innerHTML = ROUND_player2;
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

function dynamic_faces_and_classes() {
    // Attribution d'un nombre entre 1 et 7
    randNum = getRandomInt(1, 7)
    showClass = 'show-' + randNum;
    //console.log(showClass);

    // Modifications dynamique de class css sur l'élément du Dé 3D (cube)
    if (currentClass) {
        cube.classList.remove(currentClass);
    }
    cube.classList.add(showClass);
    currentClass = showClass;
}
// Fonction du Jeu de Dé en 3D

// PLAYER 1
function player1() {

    dynamic_faces_and_classes();

    // CONDITIONS DU JEU

    // Cas Dé face 1
    if (showClass == "show-1") {
        GLOBAL_player1 = 0;
        ROUND_player1 = 0;
        console.log("Player 1 / ROUND Score = " + ROUND_player1);
        result = "Game Lost!";
        document.getElementById("ROUND_player1").innerHTML = ROUND_player1;
        document.getElementById("GLOBAL_player1").innerHTML = GLOBAL_player1;
        //console.log("Perdu!");
    }

    // Cas Dé autres face
    if (showClass != "show-1") {
        ROUND_player1 = ROUND_player1 + randNum;
        console.log("Player 1 / ROUND Score = " + ROUND_player1);
        result = "Your turn";
        document.getElementById("ROUND_player1").innerHTML = ROUND_player1;
    }

    // Score
    if (GLOBAL_player1 >= 30) {
        result = "Game Won!"
            //console.log("Gagné!");
    }

    document.getElementById("result").innerHTML = result;
}

// PLAYER 2
function player2() {

    dynamic_faces_and_classes();

    // CONDITIONS DU JEU

    // Cas Dé face 1
    if (showClass == "show-1") {
        GLOBAL_player2 = 0;
        ROUND_player2 = 0;
        console.log("Player 2 / ROUND Score = " + ROUND_player2);
        result = "Game Lost!";
        document.getElementById("ROUND_player2").innerHTML = ROUND_player2;
        document.getElementById("GLOBAL_player2").innerHTML = GLOBAL_player2;
        //console.log("Perdu!");
    }

    // Cas Dé autres face
    if (showClass != "show-1") {
        ROUND_player2 = ROUND_player2 + randNum;
        console.log("Player 2 / ROUND Score = " + ROUND_player2);
        result = "Your turn";
        document.getElementById("ROUND_player2").innerHTML = ROUND_player2;
    }

    // Score
    if (GLOBAL_player1 >= 30) {
        result = "Game Won!"
            //console.log("Gagné!");
    }

    document.getElementById("result").innerHTML = result;
}


// Lancement des fonctions sur l'évènement : addEventListener
new_game.addEventListener("click", newGame);
roll_dice.addEventListener("click", player1)
hold.addEventListener("click", holdResult);

GLOBAL_player1 = ROUND_player1;
document.getElementById("GLOBAL_player1").innerHTML = GLOBAL_player1;


function holdResult() {
    switchPlayer();
}

// Switch Players

function switchPlayer() {
    if (current_player == 'p1') {
        roll_dice.addEventListener("click", player2);
        roll_dice.removeEventListener("click", player1);
        current_player = 'p2';
        console.log('Player2');
        GLOBAL_player2 = ROUND_player2;
        document.getElementById("GLOBAL_player2").innerHTML = GLOBAL_player2;
    } else {
        current_player = 'p1';
        roll_dice.addEventListener("click", player1);
        roll_dice.removeEventListener("click", player2);
        console.log('Player1');
        GLOBAL_player1 = ROUND_player1;
        document.getElementById("GLOBAL_player1").innerHTML = GLOBAL_player1;
    }
}