const highscoreList = document.querySelector("#highscore-list");

// const highscore = [];

const highscoreJson = `
[
    {
        "name":"Niklas",
        "score": 10
    },
    {
        "name":"Banarne",
        "score": 0
    },
    {
        "name":"Trazan",
        "score": 5
    }
]
`;

populateHighscore();

function populateHighscore() {
  const scoreEntries = JSON.parse(highscoreJson);

  scoreEntries.sort((c, p) => c.score - p.score).reverse();

  for (const entry of scoreEntries) {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "bg-dark", "text-warning");
    li.innerText = `${entry.name} ${entry.score}`;
    highscoreList.append(li);
  }
}
