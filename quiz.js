class Question {
  constructor(statement, correctAnswer) {
    this.statement = statement;
    this.correctAnswer = correctAnswer;
  }
}

const qList = document.querySelector("#questions");

const questions = [
  new Question("Gillar Niklas kaffe?", true),
  new Question("Är jorden platt?", false),
  new Question("Är programmering kul?", true),
];

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

  //Innehåll i element
  cardHeader.innerText = questions.indexOf(question) + 1;
  cardText.innerText = question.statement;
  trueButton.innerText = "True";
  falseButton.innerText = "False";
  //Sätta upp event på element

  //Lägg till element i dom
  cardFooter.append(trueButton, falseButton);
  cardBody.append(cardText);
  card.append(cardHeader, cardBody, cardFooter);
  qList.append(card);
}
//   const html = `<div class="card border-0 mb-2">
//       <div class="card-header bg-info fw-bold">1</div>
//       <div class="card-body bg-dark text-warning">
//         <h4 class="card-text">${question.statement}</h4>
//       </div>
//       <div class="card-footer bg-info">
//         <button class="btn btn-success border border-2 border-dark">
//           True
//         </button>
//         <button class="btn btn-danger border border-2 border-dark">
//           False
//         </button>
//       </div>
//     </div>`;
//   qList.innerHTML += html;
