const API_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nslYEPpt500fFqeTXs8e';

async function submitScore(name, score) {
  const response = await fetch(`${API_URL}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: name,
      score,
    }),
  });
  const result = await response.json();
  return result;
}

async function getScores() {
  const response = await fetch(`${API_URL}/scores`);
  const result = await response.json();
  return result;
}

const scoreForm = document.getElementById('score-form');
scoreForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value;
  const score = scoreInput.value;
  await submitScore(name, score);
  nameInput.value = '';
  scoreInput.value = '';
});

function createScoreRow(score) {
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.textContent = score.user;
  row.appendChild(nameCell);
  const scoreCell = document.createElement('td');
  scoreCell.textContent = score.score;
  row.appendChild(scoreCell);
  return row;
}

function displayScores(scores) {
  const scoreTable = document.getElementById('score-table');
  scoreTable.innerHTML = '';
  scores.forEach((score) => {
    const row = createScoreRow(score);
    scoreTable.appendChild(row);
  });
}

const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', async () => {
  const result = await getScores();
  const scores = result.result.sort((a, b) => b.score - a.score);
  displayScores(scores);
});
