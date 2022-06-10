// VARIABLES DU JEU DE DÉ

// Attribution des éléments HTML 
let new_game = document.querySelector('#new_game');
let cube = document.querySelector('.cube');
let roll_dice = document.querySelector('.roll_dice');
let hold = document.querySelector('.hold');

// Nombre aléatoire et attribution dynamique de class
let randNum;
let showClass;
let currentClass = '';
let current_player = 'p1';
let ROUND_player1_tmp = 0;
let ROUND_player2_tmp = 0;
let ROUND_player1 = 0;
let ROUND_player2 = 0;
let GLOBAL_player1 = 0;
let GLOBAL_player2 = 0;
let result = "Player 1's turn";

// Fonction lancement des paramètres du jeu
function initialize() {
    console.log("Nouvelle Partie / Player 1 " + current_player);
    // Remplacement de innerHTML par textcontent 
    document.getElementById("GLOBAL_player1").textContent = GLOBAL_player1;
    document.getElementById("GLOBAL_player2").textContent = GLOBAL_player2;
    document.getElementById("ROUND_player1").textContent = ROUND_player1_tmp;
    document.getElementById("ROUND_player2").textContent = ROUND_player2_tmp;

    console.clear();
}
// Lancement des paramètres du jeu
initialize();

// Fonction Nouvelle Partie
function newGame() {
    cube.classList.remove(currentClass);
    cube.classList.add("showClass-1");
    initialize();
}
// Fonction des nombres aléatoires 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
// Attribution dynamique des faces du Dé
function dynamic_dice_faces() {
    // Attribution d'un nombre entre 1 et 7
    randNum = getRandomInt(1, 7)
    showClass = 'show-' + randNum;

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

    dynamic_dice_faces();

    // CONDITIONS DU JEU

    // Cas Dé face 1
    if (showClass == "show-1") {
        ROUND_player1_tmp = 0;
        console.log("Player 1 / ROUND Score = " + ROUND_player1_tmp);
        result = "Player 1's turn lost!";
        document.getElementById("ROUND_player1").textContent = ROUND_player1_tmp;
    }

    // Cas Dé autres faces
    if (showClass != "show-1") {
        ROUND_player1_tmp = ROUND_player1_tmp + randNum;
        ROUND_player1 = ROUND_player1 + randNum;
        console.log("Player 1 / ROUND Score = " + ROUND_player1_tmp);
        result = "Your turn";
        document.getElementById("ROUND_player1").textContent = ROUND_player1_tmp;
    }

    document.getElementById("result").textContent = result;
}

// PLAYER 2
function player2() {

    dynamic_dice_faces();

    // CONDITIONS DU JEU

    // Cas Dé face 1
    if (showClass == "show-1") {
        ROUND_player2_tmp = 0;
        console.log("Player 2 / ROUND Score = " + ROUND_player2_tmp);
        result = "Game Lost!";
        document.getElementById("ROUND_player2").textContent = ROUND_player2_tmp;
        //console.log("Perdu!");
    }

    // Cas Dé autres faces
    if (showClass != "show-1") {
        ROUND_player2_tmp = ROUND_player2_tmp + randNum;
        ROUND_player2 = ROUND_player2 + randNum;
        console.log("Player 2 / ROUND Score = " + ROUND_player2_tmp);
        result = "Your turn";
        document.getElementById("ROUND_player2").textContent = ROUND_player2_tmp;
    }

    document.getElementById("result").textContent = result;
}

// Lancement des fonctions sur l'évènement click
new_game.addEventListener("click", newGame);
roll_dice.addEventListener("click", player1)
hold.addEventListener("click", holdResult);

// Bouton enregistrement du Score ROUND dans GLOBAL et permutation du Joueur 
function holdResult() {
    if (current_player == 'p1') {

        GLOBAL_player1 = ROUND_player1;

        document.getElementById("GLOBAL_player1").textContent = GLOBAL_player1;
        console.log("Player 1 / GLOBAL Score = " + GLOBAL_player1);
        ROUND_player1_tmp = 0;
        document.getElementById("ROUND_player1").textContent = ROUND_player1_tmp;
        // Maximum GLOBAL Score Player1
        if (GLOBAL_player1 >= 40) {
            result = "Player 1 Won!"
            document.getElementById("result").textContent = result;
        }
    } else if (current_player == 'p2') {
        GLOBAL_player2 = ROUND_player2;

        document.getElementById("GLOBAL_player2").textContent = GLOBAL_player2;
        console.log("Player 2 / GLOBAL Score = " + GLOBAL_player2);
        ROUND_player2_tmp = 0;
        document.getElementById("ROUND_player2").textContent = ROUND_player2_tmp;
        // Maximum GLOBAL Score Player1
        if (GLOBAL_player2 >= 40) {
            result = "Player 2 Won!"
            document.getElementById("result").textContent = result;
        }
    }
    switchPlayer();
}

// Intervertir les joueurs
function switchPlayer() {
    if (current_player == 'p1') {
        roll_dice.addEventListener("click", player2);
        roll_dice.removeEventListener("click", player1);
        current_player = 'p2';
        console.log('Player2');

    } else {
        current_player = 'p1';
        roll_dice.addEventListener("click", player1);
        roll_dice.removeEventListener("click", player2);
        console.log('Player1');

    }
}