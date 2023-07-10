var timerEL = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitEl = document.querySelector("#submit");
var takeQuiz = document.querySelector("#back-to-start");
var resetScores = document.querySelector("#reset-scores");
var highScoreButton = document.querySelector("#view-scores");

var finalScore = document.querySelector(".final-score");
var initials = document.querySelector(".form-input");
var highScoreList = document.querySelector(".score-list");

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
var answerGrade = document.querySelector(".answer-grade");

var i = 0;

var highScore = 0;

var savedInitials = [];
var savedScores = [];

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
        "question": "The Assignment operator ____ assigns a value to a variable. ", 
        "answer1": "-",
        "answer2": ":", 
        "answer3": ";", 
        "answer4": "=",   
    },
    {
        "question": "To execute the code inside of a function, it must be placed inside of:  ", 
        "answer1": "{}",
        "answer2": "[]", 
        "answer3": "''", 
        "answer4": "Any of the above",   
    },
    {
        "question": "To find the length of a string 'text' use property: ", 
        "answer1": ".size",
        "answer2": ".arrayLength", 
        "answer3": ".length", 
        "answer4": ".properties",   
    },
    {
        "question": "Math.random() returns a number between ___ and ___ .", 
        "answer1": "0, 10",
        "answer2": "0, 100", 
        "answer3": "0, 1", 
        "answer4": "-1, 1",    
    },
    {
        "question": "JavaScript has 3 types of scope: ", 
        "answer1": "Block, function and global scope",
        "answer2": "Boolean, string and number scope", 
        "answer3": "Variable, object and function scope", 
        "answer4": "None of the above",   
    },
    {
        "question": "JavaScript booleans represents ____ and _____", 
        "answer1": "one, two",
        "answer2": "on, off", 
        "answer3": "true, false", 
        "answer4": "stop, continue",    
    },
    {
        "question": "In JavaScript, the 'this' keyword refers to a(n) ______", 
        "answer1": "array",
        "answer2": "variable", 
        "answer3": "function", 
        "answer4": "object",   
    }
]//holds quiz questions
var quizKey = [ 
    "All of the above", 
    "while", 
    "console.log", 
    "=",
    "{}", 
    ".length", 
    "0, 1", 
    "Block, function and global scope", 
    "true, false", 
    "object",  
]//holds answer key

function startGame() {
    startTimers();
    timerCount = 75;

    i = 0;

    startPage.hidden = true;
    questionPage.hidden = false;
    endPage.hidden = true;
    highScorePage.hidden = true;
    renderQuestion();
}//start game starts questions and timer

function endGame(score) {
    startPage.hidden = true;
    questionPage.hidden = true;
    endPage.hidden = false;
    highScorePage.hidden = true;

    finalScore.textContent = score;
}//end game prompts end page to enter initials

function renderQuestion(grade) {
    console.log(i);
    console.log(quizQuestions[i].question);

    quizQuestion.textContent = quizQuestions[i].question;
    answer1.textContent = quizQuestions[i].answer1;
    answer2.textContent = quizQuestions[i].answer2;
    answer3.textContent = quizQuestions[i].answer3;
    answer4.textContent = quizQuestions[i].answer4;

}

quizAnswerChoices.addEventListener("click", function(event) {
    event.preventDefault();
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
        highScore = timerScore * 5;
        endGame(highScore);
        timerEL.textContent = "0";
    }  
});//renders next question after every click, reduces time if answer is wrong

submitEl.addEventListener("click", function(event) {
    event.preventDefault();
  
    // Return from function early if submitted todoText is blank
    if (initials === "") {
      return;
    }

    initialInput = initials.value.trim();
  
    // Add new todoText to todos array, clear the input
    savedInitials.push(initialInput);
    savedScores.push(highScore);
    console.log(savedInitials);
    console.log(savedScores);

    initials.value = "";

    saveScores();
    renderScores();
});//takes in initial input from end page

function saveScores() {
    localStorage.setItem("savedInitials", JSON.stringify(savedInitials));
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
}//saves scores and initials to local storage

function renderScores() {
    startPage.hidden = true;
    questionPage.hidden = true;
    endPage.hidden = true;
    highScorePage.hidden = false;

    highScoreList.innerHTML = " ";

    for (var i = 0; i < savedInitials.length; i++) {
        var initials = savedInitials[i].toUpperCase();
        var scores = savedScores[i];
        var li = document.createElement("li");
        li.textContent = initials + "  -  " + scores;
        li.setAttribute("data-index", i);
        li.setAttribute("style", "background: grey; color: white; padding: 10px; margin: 10px auto; width: 200px; list-style: none " )

        highScoreList.appendChild(li);
    }
}//renders scores and lists them on high score page

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
}//first timer is for user, second timer is for score

function init() {
    startPage.hidden = false;
    questionPage.hidden = true;
    endPage.hidden = true;
    highScorePage.hidden = true;

    var storedInitials = JSON.parse(localStorage.getItem("savedInitials"));
    var storedScores = JSON.parse(localStorage.getItem("savedScores"));

    // If scores & initials were retrieved from localStorage, update the array to it
    if ((storedInitials !== null) && (storedScores !== null)) {
      savedInitials = storedInitials;
      savedScores = storedScores;
    }
}//intial function used for take quiz button and gets scores and initials from local storage

function clearStorage() {
    localStorage.clear();
    savedInitials = "";
    savedScores = "";
    renderScores();
}

startButton.addEventListener("click", startGame);
resetScores.addEventListener("click", clearStorage);
takeQuiz.addEventListener("click", init);
highScoreButton.addEventListener("click", renderScores);


// Calls init() so that it fires when page opened
init();


