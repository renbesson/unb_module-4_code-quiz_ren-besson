var highscoresEl = document.getElementById("highscores");
var clearHSEl = document.getElementById("clearHS");
var getTotalScore = JSON.parse(localStorage.getItem("totalScore"));

for (const key in getTotalScore) {
  if (getTotalScore.hasOwnProperty(key)) {
    var newEntryEl = document.createElement("li");
    newEntryEl.textContent = `${key}: ${getTotalScore[key]}`;
    highscoresEl.appendChild(newEntryEl);
  }
}

var clearHighscores = function () {
  localStorage.removeItem("totalScore");
  location.reload();
};

clearHSEl.addEventListener("click", () => clearHighscores());
