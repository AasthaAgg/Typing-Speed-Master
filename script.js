var rules = document.querySelector('.rulesPage');
var main = document.querySelector('.main');

// ===== DISPLAY RULES =====

function showRules(){
    rules.style.display = "flex";
    fadeAll();
}

// ===== HIDE RULES =====

function hideRules(){
    rules.style.display = "none";
    removeFade();
}

// ===== FADE BACKGROUND =====

function fadeAll(){
    main.style.filter = "blur(8px)";
}

// ===== REMOVE FADE EFFECT =====

function removeFade(){
    main.style.filter = "blur(0)";
}

// ===== START TIMER =====

function startTimer(){

}