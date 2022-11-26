let text;
let timer;
let secs = 60;
let userInputChars;
let inputWords = 0;
let wpm = 0;
let incorrect = 0;
let keyStrokes = 0;

const welcome = document.querySelector('.welcome');
const rules = document.querySelector('.rulesPage');
const main = document.querySelector('.main');
const inputArea = document.querySelector('.inputArea');
const textArea = document.querySelector('.textArea');
const time = document.querySelector('.time');
const end = document.querySelector('.endPage');


const texts = [
    `You never read a book on psychology, Tippy. You didn't need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
    `I know more about the private lives of celebrities than I do about any governmental policy that will actually affect me. I'm interested in things that are none of my business, and I'm bored by things that are important to know.`,
    `Outside of two men on a train platform there's nothing in sight. They're waiting for spring to come, smoking down the track. The world could come to an end tonight, but that's alright. She could still be there sleeping when I get back.`,
    `I'm a broke-nose fighter. I'm a loose-lipped liar. Searching for the edge of darkness. But all I get is just tired. I went looking for attention. In all the wrong places. I was needing a redemption. And all I got was just cages.`
];


// ===== START =====

function start(){
    // remove welcome box
    welcome.style.display = "none";

    // remove blur effect and set text in textArea
    removeBlur();
    setText();
}


// ===== SET TEXT IN TEXTAREA =====

function setText(){

    // select random text from texts array
    text = texts[Math.floor(Math.random() * texts.length)];

    // array of characters in the text
    let textArray = text.split("").map((value) => {
        
        // wrap the characters in a span tag
        return "<span class = 'text-chars'>" + value + "</span>";
    });

    // join array to display
    textArea.innerHTML += textArray.join("");

}


// ===== DISPLAY RULES =====

function showRules(){
        
    // display rules block
    rules.style.display = "flex";
    BlurAll();

    // pause timer
    clearTimeout(timer);
}

// ===== HIDE RULES =====

function hideRules(){
   
    // hide rules block
    rules.style.display = "none";
    removeBlur();

    // if the timer is already started, continue timer
    if(secs < 60){
        startTimer(secs);
    }
}

// ===== Blur BACKGROUND =====

function BlurAll(){
    main.style.filter = "blur(8px)";
    
    // disable the input area
    document.querySelector('textarea').disabled = true;
}

// ===== REMOVE Blur EFFECT =====

function removeBlur(){
    main.style.filter = "blur(0)";

     // enable the input area
     document.querySelector('textarea').disabled = false;
}


// ===== INPUT HANDLING FUNCTION =====

function handleInput(){

    // array of user input characters
    userInputChars = inputArea.value.split("");
    
    let textChars = document.querySelectorAll('.text-chars');

    // create array of span tags
    textChars = Array.from(textChars);

    
    // when first character is entered 
    if(userInputChars.length == 1){

        // remove start head
        document.querySelector('.startStmt').style.display = "none";

        // start timer
        clearTimeout(timer);
        startTimer(secs);
    }

    // count total keystrokes
    keyStrokes++;

    // set all parameters
    setCharacters();
    setWords();
    setWPM();


    // if user input is backspace or null character

    if(textChars[userInputChars.length].classList.contains("correct")){
        textChars[userInputChars.length].classList.remove("correct");
    }
    else{
        textChars[userInputChars.length].classList.remove("incorrect");
    }

    // check accuracy of input
    checkInput(textChars[userInputChars.length-1], userInputChars.length-1);
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
        setWPM();
        secs--;
	    timer = setTimeout('startTimer('+secs+')',1000);
    }

}

// ===== SET NO. OF CHARACTERS INPUT =====

function setCharacters(){
    document.querySelector('.noOfChar').innerHTML = userInputChars.length;
}

// ===== SET NO. OF WORDS INPUT =====

function setWords(){
    inputWords = inputArea.value.split(" ").length;

    if(userInputChars.length == 0){
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

function checkInput(char, index){

        // if user input is correct
        if(char.innerText == userInputChars[index]) {
            char.classList.add("correct");
        }
        // if user input is incorrect
        else{
            char.classList.add("incorrect");
            incorrect++;
        }
}

// ===== DISPLAY END PAGE =====

function displayEndPage(){
    end.style.display = "flex";
    BlurAll();
    setEndPage();
}

// ===== SET END PAGE =====

function setEndPage(){
    document.querySelector('.resWPM').innerHTML = wpm+" wpm";
    document.querySelector('.accuracy').innerHTML = Math.trunc((userInputChars.length)*100/keyStrokes) + "%";
    document.querySelector('.keyStrokes').innerHTML = keyStrokes;
    document.querySelector('.incorrectWords').innerHTML = incorrect;
}
