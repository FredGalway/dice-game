// VARIABLES DU JEU DE DÉ

// Variables des Boutons HTML et du Cube Dé(dice)
let new_game = document.querySelector('#new_game');
let roll_dice = document.querySelector('.roll_dice');
let hold = document.querySelector('.hold');
let cube = document.querySelector('.cube');

// Variables du Jeu
let randNum;
let showClass;
let currentClass;
let current_player = 'p1';
let ROUND_player1_tmp = 0;
let ROUND_player2_tmp = 0;
let ROUND_player1 = 0;
let ROUND_player2 = 0;
let GLOBAL_player1 = 0;
let GLOBAL_player2 = 0;
let win_score = 50;
let result;
let audio_turn_lost = new Audio("audio/lost.wav");
audio_turn_lost.volume = 0.3;


// Fonction lancement des paramètres du jeu
function initialize() {
    current_player = 'p1';
    roll_dice.addEventListener("click", player1);
    roll_dice.removeEventListener("click", player2);
    ROUND_player1_tmp = 0;
    ROUND_player2_tmp = 0;
    ROUND_player1 = 0;
    ROUND_player2 = 0;
    GLOBAL_player1 = 0;
    GLOBAL_player2 = 0;
    result = "Player 1's turn";
    // Remplacement de innerHTML par textcontent 
    document.getElementById("ROUND_player1").textContent = ROUND_player1_tmp;
    document.getElementById("ROUND_player2").textContent = ROUND_player2_tmp;
    document.getElementById("ROUND_player1").textContent = ROUND_player1;
    document.getElementById("ROUND_player2").textContent = ROUND_player2;
    document.getElementById("GLOBAL_player1").textContent = GLOBAL_player1;
    document.getElementById("GLOBAL_player2").textContent = GLOBAL_player2;
    document.getElementById("result").textContent = result;

    console.clear();
    console.log("Nouvelle Partie / Player 1 ");
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

// JOUEUR 1 / CONDITIONS DU JEU
function player1() {

    dynamic_dice_faces();

    // Cas Dé face 1
    if (showClass == "show-1") {
        ROUND_player1_tmp = 0;
        GLOBAL_player1 = GLOBAL_player1 - ROUND_player1_tmp;
        document.getElementById("ROUND_player1").textContent = ROUND_player1_tmp;
        document.getElementById("GLOBAL_player1").textContent = GLOBAL_player1;

        console.log("ROUND_player1_tmp = " + ROUND_player1_tmp);
        console.log("ROUND_player1 = " + ROUND_player1);

        console.clear();
        console.log("Changement de joueur");

        audio_turn_lost.play();
        switchPlayer();
    }

    // Cas Dé autres faces
    if (showClass != "show-1") {
        ROUND_player1_tmp = ROUND_player1_tmp + randNum;
        ROUND_player1 = ROUND_player1 + randNum;
        console.log("Player 1 / ROUND Score tmp = " + ROUND_player1_tmp);
        document.getElementById("ROUND_player1").textContent = ROUND_player1_tmp;
    }
}

// JOUEUR 2 / CONDITIONS DU JEU
function player2() {

    dynamic_dice_faces();

    // Cas Dé face 1
    if (showClass == "show-1") {
        ROUND_player2_tmp = 0;
        GLOBAL_player2 = GLOBAL_player2 - ROUND_player2_tmp;
        document.getElementById("ROUND_player2").textContent = ROUND_player2_tmp;
        document.getElementById("GLOBAL_player2").textContent = GLOBAL_player2;

        console.log("ROUND_player2_tmp = " + ROUND_player2_tmp);
        console.log("ROUND_player2 = " + ROUND_player2);

        console.clear();
        console.log("Changement de joueur");

        audio_turn_lost.play();
        switchPlayer();
    }

    // Cas Dé autres faces
    if (showClass != "show-1") {
        ROUND_player2_tmp = ROUND_player2_tmp + randNum;
        ROUND_player2 = ROUND_player2 + randNum;
        console.log("Player 2 / ROUND Score tmp = " + ROUND_player2_tmp);
        document.getElementById("ROUND_player2").textContent = ROUND_player2_tmp;
    }
}

// Lancement des fonctions sur l'évènement click 
new_game.addEventListener("click", newGame);
roll_dice.addEventListener("click", player1)
hold.addEventListener("click", holdResult);

// Bouton enregistrement du Score ROUND dans GLOBAL et permutation du Joueur 
function holdResult() {

    if (current_player == 'p1') {
        GLOBAL_player1 = ROUND_player1;
        ROUND_player1_tmp = 0;
        document.getElementById("GLOBAL_player1").textContent = GLOBAL_player1;
        document.getElementById("ROUND_player1").textContent = ROUND_player1_tmp;
        console.log("Player 1 / GLOBAL Score = " + GLOBAL_player1);
        console.log("Player 1 / ROUND Score = " + ROUND_player1_tmp);

        // Maximum GLOBAL Score Player1
        if (GLOBAL_player1 >= win_score) {
            result = "Player 1 wins!"
            document.getElementById("result").textContent = result;
        }

    } else if (current_player == 'p2') {
        GLOBAL_player2 = ROUND_player2;
        ROUND_player2_tmp = 0;
        document.getElementById("GLOBAL_player2").textContent = GLOBAL_player2;
        document.getElementById("ROUND_player2").textContent = ROUND_player2_tmp;
        console.log("Player 2 / GLOBAL Score = " + GLOBAL_player2);
        console.log("Player 2 / ROUND Score = " + ROUND_player2_tmp);

        // Maximum GLOBAL Score Player1
        if (GLOBAL_player2 >= win_score) {
            result = "Player 2 wins!"
            document.getElementById("result").textContent = result;
        }
    }
    switchPlayer();
}

// Intervertir les joueurs
function switchPlayer() {

    ROUND_player1_tmp = 0;
    ROUND_player2_tmp = 0;

    if (current_player == 'p1') {
        roll_dice.addEventListener("click", player2);
        roll_dice.removeEventListener("click", player1);
        current_player = 'p2';
        result = "Player 2's turn";
        console.log('Player2');

    } else if (current_player == 'p2') {
        roll_dice.addEventListener("click", player1);
        roll_dice.removeEventListener("click", player2);
        current_player = 'p1';
        result = "Player 1's turn";
        console.log('Player1');
    }
    document.getElementById("result").textContent = result;
}