var rules = document.querySelector('.rulesPage');
var main = document.querySelector('.main');
var timer;
var secs = 3;
var time = document.querySelector('.time');
var inputWords;
var wpm = 0;
var text;
var input = document.querySelector('.inputArea').innerHTML;
var end = document.querySelector('.endPage');

const texts = [
    `You never read a book on psychology, Tippy. You didn't need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
    `I know more about the private lives of celebrities than I do about any governmental policy that will actually affect me. I'm interested in things that are none of my business, and I'm bored by things that are important to know.`,
    `Outside of two men on a train platform there's nothing in sight. They're waiting for spring to come, smoking down the track. The world could come to an end tonight, but that's alright. She could still be there sleeping when I get back.`,
    `I'm a broke-nose fighter. I'm a loose-lipped liar. Searching for the edge of darkness. But all I get is just tired. I went looking for attention. In all the wrong places. I was needing a redemption. And all I got was just cages.`
];

setText();

// ===== DISPLAY RULES =====

function showRules(){
    rules.style.display = "flex";
    fadeAll();
    clearTimeout(timer);
}

// ===== HIDE RULES =====

function hideRules(){
    rules.style.display = "none";
    removeFade();
    startTimer(secs);
}

// ===== FADE BACKGROUND =====

function fadeAll(){
    main.style.filter = "blur(8px)";
}

// ===== REMOVE FADE EFFECT =====

function removeFade(){
    main.style.filter = "blur(0)";
}

// ===== SET TEXT IN TEXTAREA =====

function setText(){
    text = texts[Math.floor(Math.random() * texts.length)];
    document.querySelector('.textArea').innerHTML = text;
}

// ===== INPUT HANDLING FUNCTION =====

function handleInput(event){
    if(event.data == null){
        input = input.substring(0 , input.length-1);
    }
    else{
        input += event.data;
    }

    if(input.length == 1){
        startGame();
    }

    setCharacters();
    setWords();
    setWPM();
    // checkInput();
}

// ===== START GAME =====

function startGame(){
    removeStartHead();
    clearTimeout(timer);
    startTimer(secs);
}

// ===== REMOVE HEAD =====

function removeStartHead(){
    document.querySelector('.startStmt').style.display = "none";
}

// ===== START TIMER =====

function startTimer(sec){
    if(sec < 10){
        time.innerHTML = "00 : 0" + secs;   
    }else{
        time.innerHTML = "00 : " + secs;
    }

    if(secs < 1){
        clearTimeout(timer);
        displayEndPage();
    }else{
        secs--;
        setWPM();
	    timer = setTimeout('startTimer('+secs+')',1000);
    }

}

// ===== SET NO. OF CHARACTERS INPUT =====

function setCharacters(){
    document.querySelector('.noOfChar').innerHTML = input.length;
}

// ===== SET NO. OF WORDS INPUT =====

function setWords(){
    inputWords = input.split(" ").length;

    if(input.length == 0){
        inputWords = '0';
    }

    document.querySelector('.noOfWords').innerHTML = inputWords;
}

// ===== SET WORDS PER MINUTE =====

function setWPM(){
    wpm = Math.floor((inputWords) * 60 / (60 - secs));
    document.querySelector('.noOfWordsPerMin').innerHTML = wpm;
}

// ===== CHECKING CORRECTNESS OF INPUT =====

function checkInput(){
    
}

// ===== DISPLAY END PAGE =====

function displayEndPage(){
    end.style.display = "flex";
    fadeAll();
    setEndPage();
}

// ===== SET END PAGE =====

function setEndPage(){
    document.querySelector('.resWPM').innerHTML += wpm;
    document.querySelector('.resChar').innerHTML += input.length;
    document.querySelector('.resWords').innerHTML += inputWords;
}