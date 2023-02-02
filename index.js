const highscoreList = document.querySelector("#highscore-list");

// const highscore = [];

const highscoreJson = localStorage.getItem("highscore");

populateHighscore();

function populateHighscore() {
  const scoreEntries = JSON.parse(highscoreJson);
  if (scoreEntries) {
    scoreEntries.sort((c, p) => c.score - p.score).reverse();

    for (const entry of scoreEntries) {
      const li = document.createElement("li");
      li.classList.add("list-group-item", "bg-dark", "text-warning", "fw-bold");
      const dt = new Date(entry.time);

      li.innerText = `${entry.name} ${entry.score} ${dt.toLocaleTimeString(
        "SWE"
      )}`;
      highscoreList.append(li);
    }
  }
}
