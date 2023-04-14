const API_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nslYEPpt500fFqeTXs8e';

// Function to submit score
async function submitScore(name, score) {
  const response = await fetch(API_URL + '/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: name,
      score: score
    })
  });
  const result = await response.json();
  return result;
}

// Function to get scores
async function getScores() {
  const response = await fetch(API_URL + '/scores');
  const result = await response.json();
  return result;
}

// Bind form submit event to submitScore function
const scoreForm = document.getElementById('score-form');
scoreForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value;
  const score = scoreInput.value;
  const result = await submitScore(name, score);
  console.log(result);
  nameInput.value = '';
  scoreInput.value = '';
});

// Function to create a table row for a score
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

// Function to display scores in table
function displayScores(scores) {
  const scoreTable = document.getElementById('score-table');
  scoreTable.innerHTML = '';
  scores.forEach(score => {
    const row = createScoreRow(score);
    scoreTable.appendChild(row);
  });
}

// Bind refresh button click event to getScores function
const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', async () => {
  const result = await getScores();
  const scores = result.result.sort((a, b) => b.score - a.score);
  displayScores(scores);
});

