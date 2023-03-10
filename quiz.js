class Question {
  constructor(statement, correctAnswer) {
    this.statement = statement;
    this.correctAnswer = correctAnswer;
  }
}
class PlayerScore {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.time = Date.now();
  }
}

const difficulties = ["easy", "medium", "hard"];
const questions = [];

const qList = document.querySelector("#questions");
const scoreDisplay = document.querySelector("#score");
const difficultySelection = document.querySelector("#difficultySelection");

let score = 0;
let questionsAnswered = 0;
let selectedDifficulty = "easy";

setupDifficultyButtons();

function setupDifficultyButtons() {
  for (const diff of difficulties) {
    const btn = document.createElement("button");
    btn.id = `${diff}-button`;
    btn.classList.add("btn", "btn-info", "text-dark");
    btn.textContent = diff;

    btn.onclick = () => {
      for (const selection of difficultySelection.children) {
        selection.classList.remove("active", "fw-bold");
      }
      btn.classList.add("active", "fw-bold");
      selectedDifficulty = diff;
    };

    difficultySelection.append(btn);
  }
  document.querySelector("#easy-button").classList.add("active", "fw-bold");
}

async function startButtonClick() {
  score = 0;
  questionsAnswered = 0;
  scoreDisplay.innerText = score;
  //questions.length = 0;
  const url = new URL(
    `https://opentdb.com/api.php?amount=10&difficulty=${selectedDifficulty}&type=boolean&encode=url3986`
  );

  const response = await fetch(url);
  if (response.status === 200) {
    const jsonResponse = await response.json();
    questions.splice(0, questions.length);

    for (const result of jsonResponse.results) {
      questions.push(
        new Question(decodeURIComponent(result.question), result.correct_answer)
      );
    }

    while (qList.childElementCount > 0) {
      qList.children[0].remove();
    }

    displayQuestions();
  }
}

function displayQuestions() {
  for (const question of questions) {
    //Skapa element
    const card = document.createElement("li");
    const cardHeader = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardText = document.createElement("h4");
    const cardFooter = document.createElement("div");
    const trueButton = document.createElement("button");
    const falseButton = document.createElement("button");

    //Styla element
    card.classList.add("card", "border-0", "mb-2");
    cardHeader.classList.add("card-header", "bg-info", "fw-bold");
    cardBody.classList.add("card-body", "bg-dark", "text-warning");
    cardText.classList.add("card-text");
    cardFooter.classList.add("card-footer", "bg-info");
    trueButton.classList.add(
      "btn",
      "mx-1",
      "btn-success",
      "border",
      "border-2",
      "border-dark"
    );
    falseButton.classList.add(
      "btn",
      "mx-1",
      "btn-danger",
      "border",
      "border-2",
      "border-dark"
    );

    //Inneh??ll i element
    cardHeader.innerText = questions.indexOf(question) + 1;
    cardText.innerText = question.statement;
    trueButton.innerText = "True";
    falseButton.innerText = "False";

    //S??tta upp event p?? element
    trueButton.onclick = () => {
      guessButtonClick(question, cardBody, falseButton, trueButton, "True");
    };

    falseButton.onclick = () => {
      guessButtonClick(question, cardBody, falseButton, trueButton, "False");
    };

    //L??gg till element i dom
    cardFooter.append(trueButton, falseButton);
    cardBody.append(cardText);
    card.append(cardHeader, cardBody, cardFooter);
    qList.append(card);
  }
}

function guessButtonClick(question, cardBody, falseButton, trueButton, guess) {
  if (question.correctAnswer === guess) {
    score++;
    scoreDisplay.innerText = score;
    cardBody.classList.remove("bg-dark", "text-warning");
    cardBody.classList.add("bg-success", "text-light");
  } else {
    cardBody.classList.remove("bg-dark", "text-warning");
    cardBody.classList.add("bg-danger", "text-light");
  }
  trueButton.disabled = true;
  falseButton.disabled = true;
  questionsAnswered++;
  checkAllQuestionsAnswered();
}

function checkAllQuestionsAnswered() {
  if (questionsAnswered == questions.length) {
    const name = window.prompt("give me your name!");
    const player = new PlayerScore(name, score);
    const highscoreJson = localStorage.getItem("highscore");
    if (highscoreJson) {
      console.log(highscoreJson);
      const highscore = JSON.parse(localStorage.getItem("highscore"));
      highscore.push(player);
      localStorage.setItem("highscore", JSON.stringify(highscore));
    } else {
      const highscore = [];
      highscore.push(player);
      localStorage.setItem("highscore", JSON.stringify(highscore));
    }
  }
}
