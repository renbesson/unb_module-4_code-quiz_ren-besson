var timer = 60;
var currentQuestion = null;
var score = 0;

// Variable to keep track of which questions have been picked
var pickedQuestions = [];

var timerEl = document.getElementById("timer");
var questionEl = document.getElementById("question");
var startBtnEl = document.getElementById("startBtn");

var timerCountdown;

var resetEnv = function () {
  clearInterval(timerCountdown);
  timerCountdown = null;
  timer = 60;
  score = 0;
  currentQuestion = null;
  pickedQuestions = [];
  timerEl.style.color = "black";
};

var resetTimer = function () {
  if (!timerCountdown) {
    timer = 60;
    timerCountdown = setInterval(() => {
      timer--;
      timerEl.textContent = timer;
      if (timer <= 9) timerEl.style.color = "red";

      // When time's up
      if (timer <= 0) {
        showResults();
        resetEnv();
      }
    }, 1000);
  }
};

var pickQuestion = function () {
  var selected = null;

  do {
    selected = Math.floor(Math.random() * 9);
  } while (
    pickedQuestions.includes(selected) &&
    pickedQuestions.length !== questions.length
  );

  if (pickedQuestions.length <= questions.length) {
    pickedQuestions.push(selected);
    return selected;
  }
};

var removeIntro = function () {
  var introEl = document.getElementById("intro");
  if (introEl) introEl.remove();
};

var printQuestion = function (question) {
  var questionText = document.createElement("h2");
  questionText.classList.add("title");
  questionText.textContent = question.question;

  questionEl.appendChild(questionText);

  question.answers.forEach((el, index) => {
    var newButton = document.createElement("button");
    newButton.textContent = el;
    newButton.id = `btn-${index}`;
    newButton.addEventListener("click", () => submitAnswer(index));
    questionEl.appendChild(newButton);
  });
  questionEl.style.display = "flex";
};

var clearQuestion = function () {
  questionEl.innerHTML = "";
  questionEl.style.pointerEvents = "all";
};

var submitAnswer = function (index) {
  var correctBtn = document.getElementById("btn-0");
  var selectedBtn = document.getElementById(`btn-${index}`);

  // If the answer is wrong
  if (index !== 0) {
    timer -= 10;
    selectedBtn.style.animation = "wrong-blinking 1s infinite";
  } else {
    score++;
  }
  correctBtn.style.animation = "correct-blinking 0.8s infinite";

  questionEl.style.pointerEvents = "none";

  if (pickedQuestions.length < 9 && timer > 0) {
    setTimeout(() => {
      clearQuestion();
      console.log("shoudnt happen");
      printQuestion(questions[pickQuestion()]);
    }, 1500);
  } else showResults();
};

var startGame = function () {
  currentQuestion = pickQuestion();
  clearQuestion();
  removeIntro();
  printQuestion(questions[currentQuestion]);
  resetEnv();
  resetTimer();
};

var showResults = function () {
  var showScoreEl = document.createElement("h2");
  var startOverBtn = document.createElement("button");
  startBtnEl.textContent = "Start Over";
  startOverBtn.addEventListener("click", () => startGame());

  clearQuestion();

  showScoreEl.classList.add("title");
  showScoreEl.textContent = `You got ${score} question(s) right!`;
  questionEl.appendChild(showScoreEl);
  questionEl.appendChild(startBtnEl);

  if (timer > 0) {
    clearInterval(timerCountdown);
    timerCountdown = null;
  }

  saveScore();
};

var saveScore = function () {
  var totalScore = localStorage.getItem("totalScore");

  localStorage.setItem("lastScore", score);
  localStorage.setItem("totalScore", Number(totalScore) + score);
};

startBtnEl.addEventListener("click", () => startGame());

var questions = [
  {
    question: "Inside which HTML element do we declare a Javascript file?",
    answers: ["<script>", "<javascript>", "<js>", "<scripting>"],
  },
  {
    question: "Which HTML attribute should we use to point a javascript file?",
    answers: [
      "<##### src='xxx.js'>",
      "<##### name='xxx.js'>",
      "<##### href='xxx.js'>",
      "<##### value='xxx.js'>",
    ],
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answers: [
      "myFunction()",
      "call myFunction",
      "call function myFunction",
      "Call.myFunction()",
    ],
  },
  {
    question:
      "How do you write a conditional statement for executing some statements only if 'i' is equal to 5?",
    answers: ["if (i == 5)", "if i == 5 then", "if i = 5 then", "if i = 5"],
  },
  {
    question:
      "There are four primary elements used within the <form> element to create form controls: <input>, <button>, <select>, and ____.",
    answers: ["<textarea>", "<message>", "<output>", "<textfield>"],
  },
  {
    question:
      "An <input> element with a type of “____” creates a box that can be set to Yes (checked) or No (unchecked).",
    answers: ["checkbok", "radio", "button", "push"],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      "alert('Hello World')",
      "msgBox('Hello World')",
      "alertBox = 'Hello World'",
      "alertBox('Hello World')",
    ],
  },
  {
    question: "Which tag does the <title> tag fall between?",
    answers: ["<head>", "<body>", "<div>", "<section>"],
  },
  {
    question:
      "Which function is used so the browser doesn't refresh the page after a form is submitted?",
    answers: [
      "event.preventDefault()",
      "event.preventRefresh()",
      "event.preventUpdate()",
      "event.doNotRefresh()",
    ],
  },
];
