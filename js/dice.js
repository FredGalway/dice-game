// Variables des Boutons HTML et du Cube Dé(dice)
let new_game = document.querySelector('#new_game');
let roll_dice = document.querySelector('.roll_dice');
let hold = document.querySelector('.hold');
let cube = document.querySelector('.cube');

// Variables player actif
let player1_title_witness_active = document.querySelector('#player1 .witness');
let player2_title_witness_active = document.querySelector('#player2 .witness');
let player1_current_active = document.querySelector('#left_column .current');
let player2_current_active = document.querySelector('#right_column .current');
let players_background_active = document.querySelector('#active_bg');

// Variables du Jeu
let randNum, showClass, currentClass, game_status;
let current_player = 'p1';
let ROUND_player1;
let ROUND_player2;
let GLOBAL_player1;
let GLOBAL_player2;
let win_score = 100;
let audio_turn_lost = new Audio("audio/lost.wav");
audio_turn_lost.volume = 0.3;

// Fonction lancement des paramètres du jeu
function initialize() {
    current_player = 'p1';
    player1_title_witness_active.style.opacity = 1;
    player2_title_witness_active.style.opacity = 0;
    player1_current_active.style.background = '#028546';
    player2_current_active.style.background = '#868686';
    players_background_active.style.right = 0 + 'px';
    roll_dice.addEventListener("click", player1);
    roll_dice.removeEventListener("click", player2);
    ROUND_player1 = 0;
    ROUND_player2 = 0;
    GLOBAL_player1 = 0;
    GLOBAL_player2 = 0;
    game_status = "Player 1's turn";

    // Remplacement de innerHTML par textcontent 
    document.getElementById("ROUND_player1").textContent = ROUND_player1;
    document.getElementById("ROUND_player2").textContent = ROUND_player2;
    document.getElementById("GLOBAL_player1").textContent = GLOBAL_player1;
    document.getElementById("GLOBAL_player2").textContent = GLOBAL_player2;
    document.getElementById("game_status").textContent = game_status;

    // Lancement des fonctions sur l'évènement click 
    new_game.addEventListener("click", newGame);
    roll_dice.addEventListener("click", player1)
    hold.addEventListener("click", hold_fx);
}
// Lancement des paramètres du jeu
initialize();

// changement Player actif
function active_player() {
    if (current_player != 'p1') {
        player1_title_witness_active.style.opacity = 1;
        player2_title_witness_active.style.opacity = 0;
        player1_current_active.style.background = '#028546';
        player2_current_active.style.background = '#868686';
        players_background_active.style.right = 0 + 'px';
    } else {
        player1_title_witness_active.style.opacity = 0;
        player2_title_witness_active.style.opacity = 1;
        player1_current_active.style.background = '#868686';
        player2_current_active.style.background = '#028546';
        players_background_active.style.right = 490 + 'px';
    }
}
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
        audio_turn_lost.play();
        switchPlayer();
    }
    // Cas Dé autres faces
    else {
        ROUND_player1 = (ROUND_player1 + randNum);
        document.getElementById("ROUND_player1").textContent = ROUND_player1;
    }
}

// JOUEUR 2 / CONDITIONS DU JEU
function player2() {

    dynamic_dice_faces();
    // Cas Dé face 1
    if (showClass == "show-1") {
        audio_turn_lost.play();
        switchPlayer();
    }
    // Cas Dé autres faces
    else {
        ROUND_player2 = (ROUND_player2 + randNum);
        document.getElementById("ROUND_player2").textContent = ROUND_player2;
    }
}
// Conserver le résultat
function hold_fx() {

    if (current_player == 'p1') {
        GLOBAL_player1 = GLOBAL_player1 + ROUND_player1;
        ROUND_player1 = 0;
        document.getElementById("GLOBAL_player1").textContent = GLOBAL_player1;
    } else {
        GLOBAL_player2 = GLOBAL_player2 + ROUND_player2;
        ROUND_player2 = 0;
        document.getElementById("ROUND_player2").textContent = ROUND_player2;
        document.getElementById("GLOBAL_player2").textContent = GLOBAL_player2;
    }
    switchPlayer();
}

// Intervertir les joueurs
function switchPlayer() {

    active_player();

    if (current_player == 'p1') {
        roll_dice.addEventListener("click", player2);
        roll_dice.removeEventListener("click", player1);
        current_player = 'p2';
        game_status = "Player 2's turn";
        ROUND_player1 = 0;
        document.getElementById("ROUND_player1").textContent = ROUND_player1;
    } else {
        roll_dice.addEventListener("click", player1);
        roll_dice.removeEventListener("click", player2);
        current_player = 'p1';
        game_status = "Player 1's turn";
        ROUND_player2 = 0;
        document.getElementById("ROUND_player2").textContent = ROUND_player2;
    }
    document.getElementById("game_status").textContent = game_status;
    winner();
}

function winner() {
    // Maximum GLOBAL Score Player1
    if (GLOBAL_player1 >= win_score) {
        game_status = "Player 1 wins!"
        document.getElementById("game_status").textContent = game_status;
    }
    // Maximum GLOBAL Score Player1
    else if (GLOBAL_player2 >= win_score) {
        game_status = "Player 2 wins!"
        document.getElementById("game_status").textContent = game_status;
    }
}