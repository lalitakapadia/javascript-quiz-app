
// ## User Story

// ```
// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// ```

// ## Acceptance Criteria

// ```
// GIVEN I am taking a code quiz
// WHEN I click the start button

// THEN a timer starts  # TODO

// and I am presented with a question ......DONE

// WHEN I answer a question
// THEN I am presented with another question


// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// WHEN the game is over
// THEN I can save my initials and my score

// -----------------------------------------------------
//           Global variables
// -----------------------------------------------------

var currentQuestion = 0;
var gameTime = 90; // in seconds
var penulty = 10;
var correctAnswer = "";
var playerScore = 0;
var totalQuestions = 4;
// -----------------------------------------------------
//           Global variables - HTML Elements
// -----------------------------------------------------

var startButton = document.querySelector("#start-button");
var nextButton = document.querySelector("#next-btn");
//var previousButton = document.querySelector("#pre-btn");
var timer = document.querySelector("#timer");
var score = document.querySelector("#score");
var questionDescription = document.querySelector("#question");
// Get all radio button lables from document object
// Why - so that on first or next question, the program can show the latest question's options.
var option1Lable = document.querySelector("#for-answer1");
var option2Lable = document.querySelector("#for-answer2");
var option3Lable = document.querySelector("#for-answer3");
var option4Lable = document.querySelector("#for-answer4");
// Get all radio button object, so that later on the program can change or check it's value.
var option1 = document.querySelector("#answer1");
var option2 = document.querySelector("#answer2");
var option3 = document.querySelector("#answer3");
var option4 = document.querySelector("#answer4");

var questionContainer = document.querySelector("#question-container");
var initials = document.querySelector("#initials");
// get text box html element
// -----------------------------------------------------
//           Add Event Listners
// -----------------------------------------------------

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);

// -----------------------------------------------------
//           Functions
// -----------------------------------------------------

// When quiz starts hide the question-container and only shows Start button.
function startQuiz() {

    // validate if the user has entered the name
    if(initials.value==""){
        alert("You must enter your name to start the quiz");
        return;
    } else{
        // now disable the textbox so that user can not change the name during the quiz
        initials.disabled = true;
        // set the timer and score div elements' css style visibility display
        timer.setAttribute("style","display: grid;");
        score.setAttribute("style", "display: grid;");
    }

    // initilize the current question as 1 - because the quiz is just starting
    currentQuestion = 1;

    // call showQuestion function with parameter - current question number that is 1
    showQuestion(currentQuestion);

    // hide the start button div
    var startDiv = document.querySelector("#start-show");
    startDiv.setAttribute("style","display: none;");

    // show question div
    questionContainer.classList.add("question-container-show");

    // display timer
    timer.innerHTML = "Time remaining:" + Math.floor(gameTime / 60) + ":" + gameTime % 60;

    // dispaly current score, the initial is 0 to begin
    score.innerHTML = "Score :" + playerScore;

    setInterval(checkGameTime,1000);
}

function nextQuestion(){
    currentQuestion = currentQuestion + 1;
   
    //Store the correct answer for the game.
    // If answer is correct then time reamin same else minus 10 for wrong answer.
        const radioButtons = document.querySelectorAll('input[name="answers"]');
    let selectedAnswer;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedAnswer = radioButton.value;
            break;
        }
    }
    if(selectedAnswer == correctAnswer) {
        // TODO ADD INTO SCORE
        playerScore = playerScore + 1;
        score.innerHTML = "Score :" + playerScore;
    } else {
        gameTime = gameTime - penulty;
    }

    // last question
    if(currentQuestion == totalQuestions) {
        nextButton.innerHTML = "Submit";
    }

       // if current question is less than or equal to 4 then only call showQuestion function
    if(currentQuestion <= totalQuestions){
        showQuestion(currentQuestion);
    }

    // more than last question
    if(currentQuestion > totalQuestions){
        var questionContainer = document.querySelector("#question-container");
        questionContainer.setAttribute("style","display: none;");
        timer.setAttribute("style","display: none;");
    }
    
}

function previousQuestion(){
    if(currentQuestion > 1) {
        currentQuestion = currentQuestion - 1;
        showQuestion(currentQuestion);
    }
}
// this function fetches question from local storage and displays on screen.
// this function need parameter question number.
function showQuestion(questionNumber) {
 
    // get the asked question number from local storage.
    var question = JSON.parse(localStorage.getItem(questionNumber));

    questionDescription.innerHTML = "Question" + question.id + ": " + question.question;

    option1Lable.innerHTML = question.option1;
    option1.checked = false;
    option1.value = question.option1;

    option2Lable.innerHTML = question.option2;
    option2.checked = false;
    option2.value = question.option2;
   
    option3Lable.innerHTML = question.option3;
    option3.checked = false;
    option3.value = question.option3;

    option4Lable.innerHTML = question.option4;
    option4.checked = false;
    option4.value = question.option4;

    correctAnswer = question.answer;
}


// is time up?
function checkGameTime(){
    gameTime = gameTime - 1;
    timer.innerHTML = "Time remaining:" + Math.floor(gameTime / 60) + ":" + gameTime % 60;

    if(gameTime <= 0){
        var questionContainer = document.querySelector("#question-container");
        questionContainer.setAttribute("style","display: none;");
        timer.setAttribute("style","visibility: hidden;"); 
    }    
 }
 
