// variables
// timer
var timeEl = document.querySelector('#time');
var timeLeft = 65;
var timeTick;

// start 
var startBtn = document.querySelector('#start');
var startPrompt = document.querySelector('#start-prompt');

// question & answers 
var questionContainer = document.querySelector('#question-container');
var questionText = document.querySelector('#question-text');
var answerDiv = document.querySelector('#answers');
var resultDiv = document.querySelector('#result')

// user score 
var scoreContainer = document.querySelector('#score-container');
var scoreDiv = document.querySelector('#score');
var recordScore = document.querySelector('#record-score');
var initialsDiv = document.querySelector('#initials-input');
var userInitials = document.querySelector("#user-initials");

// high score
var highScoreDiv = document.querySelector('#high-score');
var hScoreContainer = document.querySelector('#hscore-container');
var rePlay = document.querySelector('#play-again');
var clearScore = document.querySelector('#clear');

// questions array
var questions = [{
        text: "Bitcoin was launched in ____.",
        answers: ["1. 2018 ", "2. 2015", "3. 2011", "4. 2009"],
        correctIndex: 3,
    },

    {
        text: "A blockchain is ____.",
        answers: ["1. a chain of lego blocks", "2. a National bank database", "3. a Chinese currency", "4. a database with information on transactions"],
        correctIndex: 3,
    },

    {
        text: "A blockchain is secured by ____.",
        answers: ["1. PIN code", "2. 'hash' code", "3. password", "4. login"],
        correctIndex: 1,
    },

    {
        text: "Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a___.",
        answers: ["1. cryptocurrency wallet", "2. blockchain", "3. nodes", "4. cryptocurrency"],
        correctIndex: 1,
    },

    {
        text: "Which of the following statement is true about bitcoin?",
        answers: ["1.There is no central server; the bitcoin network is peer-to-peer", "2. There is no central storage; the bitcoin ledger is distributed", "3. The ledger is public; anybody can store it on their computer", "4. All of the above"],
        correctIndex: 3,
    },
];
var questionIndex = 0;

// registering event handlers
startBtn.addEventListener('click', handleStartClick);
answerDiv.addEventListener('click', handleAnswerClick);
recordScore.addEventListener('click', handleSubmitClick);
rePlay.addEventListener('click', handleReplayClick);
clearScore.addEventListener('click', handleClearClick);

// functions
function handleStartClick(e) {
    // Hide start prompt
    startPrompt.style.display = 'none';

    // Start counter count down; use setInterval to determine what happens each second
    timeTick = setInterval(countDown, 1000);

    // Show questions and answers 
    questionContainer.style.display = 'block';

    administerQuiz();
};


function countDown() {
    // Display timer & start countdown
    timeEl.innerHTML = `Time: ${timeLeft}`;
    // Stop quiz
    if (timeLeft < 1) {
        clearTimeout(timeTick);

        // Display score block
        displayScore();
    }
    timeLeft--;
};

function administerQuiz() {
    // create a variable to store the current question
    var currentQuestion = questions[questionIndex];

    // set the text content for the HTML element that displays the question
    questionText.textContent = currentQuestion.text;

    // clear previous answer 
    answerDiv.innerHTML = '';
    // clear previous results
    clearResults();

    // create a button for each question and possible answer
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        // create a variable to store the answer text
        var answer = currentQuestion.answers[i];
        // create a button for each answer
        var btn = document.createElement('button');
        // set the button class='btn btn-primary btn-color'
        btn.setAttribute('class', 'btn btn-primary btn-color btn-group');
        // set the button text to the answers text
        btn.textContent = answer;
        // append the button to the answers div
        answerDiv.appendChild(btn);
    };
};

function handleAnswerClick(e) {
    e.preventDefault();
    if (!e.target.matches('button')) return;


    // store the user's answer
    var userAnswer = e.target.textContent;

    //retrieve current question
    var question = questions[questionIndex];

    // get correct answer
    var correctAnswer = question.answers[question.correctIndex];

    // compare correct answer to user's response
    if (userAnswer === correctAnswer) {
        displayCorrect();
    } else {
        // ff incorrect remove 10 seconds from time
        timeLeft -= 10;
        displayIncorrect();
    }
    questionIndex++

    if (questionIndex === questions.length) {
        clearTimeout(timeTick);
        return displayScore();
    }

    setTimeout(administerQuiz, 1000);

};

function displayCorrect() {
    // display correct answer div
    resultDiv.style.display = 'block';
    resultDiv.textContent = 'Correct!';
};

function displayIncorrect() {
    // set attributes for incorrect answers
    resultDiv.style.display = 'block';
    resultDiv.textContent = 'Incorrect!';
};

function clearResults() {
    resultDiv.style.display = 'none';
}


function displayScore() {
    // hide everything
    questionContainer.style.display = 'none';
    timeEl.style.display = 'none';

    // show score block
    scoreContainer.style.display = 'block';

    // set the text content for the HTML element that displays the score
    if (timeLeft < 0) {
        scoreDiv.textContent = 'Your score is 0'
    } else {
        scoreDiv.textContent = `Your score is ${timeLeft}`;
    }


};


function handleSubmitClick(e) {
    e.preventDefault();
    // allow user to record score
    var user = {
        userInitials: userInitials.value.trim(),
        score: timeLeft,
    };


    var scores = JSON.parse(localStorage.getItem('highscores')) || [];
    //scores.push(user);

    // create user on local storage 
    localStorage.setItem('highscores', JSON.stringify(scores));

    renderHighScore(user);

    // save initials and score to localStorage and render the last registered.

};

function renderHighScore(user) {
    // hide score block
    scoreContainer.style.display = 'none';

    // show high score block
    hScoreContainer.style.display = 'block';

    // display user's initial and score
    highScoreDiv.textContent = user.userInitials + ': ' + user.score;

    var highScoreList = localStorage.getItem('highscores');
    highScoreList = JSON.parse(highScoreList);
};

function handleReplayClick() {
    // restart the Quiz
    window.location.reload();
}

function handleClearClick() {
    // clear score
    highScoreDiv.textContent = '';
}