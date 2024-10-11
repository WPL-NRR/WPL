// Sample teams data structure with the provided initial values
let teams = [
  { team: "TOOFAN", mat: 4, won: 3, lost: 1, pts: 6, winPercent: 75.00, netRR: 0.4500, for: 576, against: 531 },
  { team: "TOP GUNS", mat: 4, won: 3, lost: 1, pts: 6, winPercent: 75.00, netRR: 0.1300, for: 596, against: 583 },
  { team: "WOODLANDS UNITED", mat: 4, won: 2, lost: 2, pts: 4, winPercent: 50.00, netRR: 0.6800, for: 562, against: 494 },
  { team: "BHAIRAVA", mat: 4, won: 2, lost: 2, pts: 4, winPercent: 50.00, netRR: -0.1600, for: 527, against: 543 },
  { team: "WOODLANDS KHILADIS", mat: 4, won: 1, lost: 3, pts: 2, winPercent: 25.00, netRR: -0.8700, for: 501, against: 588 },
  { team: "RAGING BULLS", mat: 4, won: 1, lost: 3, pts: 2, winPercent: 25.00, netRR: -0.7326, for: 501, against: 524 }
];

// Function to update NRR and points
function updateStats(teamOneName, teamTwoName, teamOneRuns, teamOneOvers, teamTwoRuns, teamTwoOvers) {
  let teamOne = teams.find(t => t.team === teamOneName);
  let teamTwo = teams.find(t => t.team === teamTwoName);

  // Calculate new totals
  teamOne.for += teamOneRuns;
  teamOne.against += teamTwoRuns;
  teamTwo.for += teamTwoRuns;
  teamTwo.against += teamOneRuns;

  // Update matches played
  teamOne.mat += 1;
  teamTwo.mat += 1;

  // Determine the winning team and update points
  if (teamOneRuns > teamTwoRuns) {
    teamOne.won += 1;
    teamTwo.lost += 1;
    teamOne.pts += 2;
  } else {
    teamTwo.won += 1;
    teamOne.lost += 1;
    teamTwo.pts += 2;
  }

  // Calculate Net Run Rate for both teams
  teamOne.netRR = ((teamOne.for / teamOne.mat) - (teamOne.against / teamOne.mat)).toFixed(4);
  teamTwo.netRR = ((teamTwo.for / teamTwo.mat) - (teamTwo.against / teamTwo.mat)).toFixed(4);

  // Update Win%
  teamOne.winPercent = ((teamOne.won / teamOne.mat) * 100).toFixed(2);
  teamTwo.winPercent = ((teamTwo.won / teamTwo.mat) * 100).toFixed(2);

  // Sort the teams by Points and NRR
  teams.sort((a, b) => b.pts - a.pts || b.netRR - a.netRR);

  // Update the table in the HTML
  updateTable();
}

// Function to update the table in the HTML
function updateTable() {
  const tableBody = document.querySelector("#teamsTable tbody");
  tableBody.innerHTML = "";

  teams.forEach((team, index) => {
    const row = `<tr>
        <td>${index + 1}</td>
        <td>${team.team}</td>
        <td>${team.mat}</td>
        <td>${team.won}</td>
        <td>${team.lost}</td>
        <td>${team.pts}</td>
        <td>${team.winPercent}%</td>
        <td>${team.netRR}</td>
        <td>${team.for}</td>
        <td>${team.against}</td>
      </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Event listener for the form submission
document.querySelector("#scoreForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const teamOneName = document.querySelector("#teamOne").value;
  const teamTwoName = document.querySelector("#teamTwo").value;
  const teamOneRuns = parseInt(document.querySelector("#teamOneRuns").value);
  const teamOneOvers = parseFloat(document.querySelector("#teamOneOvers").value);
  const teamTwoRuns = parseInt(document.querySelector("#teamTwoRuns").value);
  const teamTwoOvers = parseFloat(document.querySelector("#teamTwoOvers").value);

  updateStats(teamOneName, teamTwoName, teamOneRuns, teamOneOvers, teamTwoRuns, teamTwoOvers);
});

// Initial table population
updateTable();
