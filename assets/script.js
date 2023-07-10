var timerEL = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitEl = document.querySelector("#submit");

var finalScore = document.querySelector(".final-score");
var initials = document.querySelector(".form-input");

var startPage = document.getElementById("starting-page");
var questionPage = document.getElementById("question-page");
var endPage = document.getElementById("ending-page");
var highScorePage = document.getElementById("high-score-page");

var quizQuestion = document.querySelector(".question");
var quizAnswerChoices = document.querySelector(".answers");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");

var i = 0;

var timer1;
var timer2;
var timerCount = 0;
var timerScore = 0;

var quizQuestions = [
    {
        "question": "Arrays in Javascript can be used to store: ", 
        "answer1": "Arrays",
        "answer2": "Booleans", 
        "answer3": "Numbers and Strings", 
        "answer4": "All of the above",  
    },
    {
        "question": "_______ loops through a block of code while a specified condition is ture. ", 
        "answer1": "for",
        "answer2": "while", 
        "answer3": "for/in", 
        "answer4": "for/each",   
    },
    {
        "question": "A useful tool for debugging and checking variables is: ", 
        "answer1": "Command terminal",
        "answer2": "CSS", 
        "answer3": "console.log", 
        "answer4": "Javascript",  
    },
    {
        "question": "Arrays in Javascript can be used to store: ", 
        "answer1": "Arrays",
        "answer2": "Booleans", 
        "answer3": "Numbers and Strings", 
        "answer4": "All of the above",   
    },
    {
        "question": "Arrays in Javascript can be used to store: ", 
        "answer1": "Arrays",
        "answer2": "Booleans", 
        "answer3": "Numbers and Strings", 
        "answer4": "All of the above",   
    },
    {
        "question": "Arrays in Javascript can be used to store: ", 
        "answer1": "Arrays",
        "answer2": "Booleans", 
        "answer3": "Numbers and Strings", 
        "answer4": "All of the above",   
    },
    {
        "question": "Arrays in Javascript can be used to store: ", 
        "answer1": "Arrays",
        "answer2": "Booleans", 
        "answer3": "Numbers and Strings", 
        "answer4": "All of the above",    
    },
    {
        "question": "Arrays in Javascript can be used to store: ", 
        "answer1": "Arrays",
        "answer2": "Booleans", 
        "answer3": "Numbers and Strings", 
        "answer4": "All of the above",   
    },
    {
        "question": "Arrays in Javascript can be used to store: ", 
        "answer1": "Arrays",
        "answer2": "Booleans", 
        "answer3": "Numbers and Strings", 
        "answer4": "All of the above",    
    },
    {
        "question": "Arrays in Javascript can be used to store: ", 
        "answer1": "Arrays",
        "answer2": "Booleans", 
        "answer3": "Numbers and Strings", 
        "answer4": "All of the above",   
    }
]
var quizKey = [ 
    "All of the above", 
    "while", 
    "console.log", 
    "All of the above",
    "All of the above", 
    "All of the above", 
    "All of the above", 
    "All of the above", 
    "All of the above", 
    "All of the above",  
]

//save initials and score to local storage from event listener function
//render highscore page

function startGame() {
    startTimers();
    timerCount = 75;

    startPage.hidden = true;
    questionPage.hidden = false;
    endPage.hidden = true;
    highScorePage.hidden = true;
    renderQuestion();
}

function endGame(highScore) {
    startPage.hidden = true;
    questionPage.hidden = true;
    endPage.hidden = false;
    highScorePage.hidden = true;

    finalScore.textContent = highScore;
}

function renderQuestion() {
    console.log(i);
    console.log(quizQuestions[i].question);

    quizQuestion.textContent = quizQuestions[i].question;
    answer1.textContent = quizQuestions[i].answer1;
    answer2.textContent = quizQuestions[i].answer2;
    answer3.textContent = quizQuestions[i].answer3;
    answer4.textContent = quizQuestions[i].answer4;

}

quizAnswerChoices.addEventListener("click", function(event) {
    var element = event.target;
    console.log(i); 

    if( i < (quizQuestions.length - 1)) {
        
        if (element.matches(".answer-choice")) {

            console.log(element.textContent);
            console.log(timerCount);
            console.log(timerScore);
    
            if(element.textContent === quizKey[i]) {
                console.log("correct");
                i++;
                renderQuestion();
            } else {
                console.log("wrong");
                timerCount = timerCount - 10;
                i++;
                renderQuestion();
            }
        }
    } else {
        clearInterval(timer1);
        clearInterval(timer2);
        endGame(timerScore);
        timerEL.textContent = "0";
    }

    
});

function startTimers() {
    // Sets timer
    timer1 = setInterval(function() {
      timerCount--;
      timerEL.textContent = timerCount;
      if (timerCount > 0) {

      }
      // Tests if time has run out
      if (timerCount <= 0) {
        clearInterval(timer1);
        clearInterval(timer2);
        endGame(timerScore);
        timerEL.textContent = "0";
      }
    }, 1000);

    timer2 = setInterval(function() {
        timerScore++;
    }, 1000)
}

function saveScore() {
    console.log("score saved");

}

function init() {
    startPage.hidden = false;
    questionPage.hidden = true;
    endPage.hidden = true;
    highScorePage.hidden = true;
}


startButton.addEventListener("click", startGame);
submitEl.addEventListener("click", saveScore);

// Calls init() so that it fires when page opened
init();


