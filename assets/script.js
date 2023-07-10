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


function startGame() {
    startTimers();
    timerCount = 75;

    i = 0;

    startPage.hidden = true;
    questionPage.hidden = false;
    endPage.hidden = true;
    highScorePage.hidden = true;
    renderQuestion();
}

function endGame(score) {
    startPage.hidden = true;
    questionPage.hidden = true;
    endPage.hidden = false;
    highScorePage.hidden = true;

    finalScore.textContent = score;
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
        endGame(timerScore);
        highScore = timerScore;
        timerEL.textContent = "0";
    }

    
});

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
});

function saveScores() {
    localStorage.setItem("savedInitials", JSON.stringify(savedInitials));
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
}

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
  
        highScoreList.appendChild(li);
    }
}

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
}

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


