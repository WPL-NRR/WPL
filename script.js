// Initialize team statistics
let teamStats = {
    "TOOFAN": { matches: 4, won: 3, lost: 1, points: 6, forRuns: 576, againstRuns: 531 },
    "TOP GUNS": { matches: 4, won: 3, lost: 1, points: 6, forRuns: 596, againstRuns: 583 },
    "WOODLANDS UNITED": { matches: 4, won: 2, lost: 2, points: 4, forRuns: 562, againstRuns: 494 },
    "BHAIRAVA": { matches: 4, won: 2, lost: 2, points: 4, forRuns: 527, againstRuns: 543 },
    "WOODLANDS KHILADIS": { matches: 4, won: 1, lost: 3, points: 2, forRuns: 501, againstRuns: 588 },
    "RAGING BULLS": { matches: 4, won: 1, lost: 3, points: 2, forRuns: 501, againstRuns: 524 },
};

// Populate team dropdowns
const teamSelect1 = document.getElementById('team1');
const teamSelect2 = document.getElementById('team2');

Object.keys(teamStats).forEach(team => {
    const option1 = document.createElement('option');
    option1.value = team;
    option1.textContent = team;
    teamSelect1.appendChild(option1);
    
    const option2 = document.createElement('option');
    option2.value = team;
    option2.textContent = team;
    teamSelect2.appendChild(option2);
});

// Function to calculate Net Run Rate (NRR)
function calculateNRR(team) {
    const { forRuns, againstRuns, matches } = teamStats[team];
    const totalOversFaced = matches * 25; // Assuming 25 overs for each match
    const totalOversBowled = matches * 25;

    const runRateFor = forRuns / totalOversFaced;
    const runRateAgainst = againstRuns / totalOversBowled;

    return (runRateFor - runRateAgainst).toFixed(4);
}

// Function to update team stats
function updateTeamStats(winningTeam, losingTeam, winningScore, losingScore) {
    // Update winning team stats
    teamStats[winningTeam].matches++;
    teamStats[winningTeam].won++;
    teamStats[winningTeam].points += 2;
    teamStats[winningTeam].forRuns += winningScore;
    teamStats[winningTeam].againstRuns += losingScore;

    // Update losing team stats
    teamStats[losingTeam].matches++;
    teamStats[losingTeam].lost++;
    teamStats[losingTeam].forRuns += losingScore;
    teamStats[losingTeam].againstRuns += winningScore;

    // Update the tables
    updateCurrentTable();
    updateMatchResultTable();
}

// Function to update the current stats table
function updateCurrentTable() {
    const tbody = document.getElementById('teamStatsCurrent');
    tbody.innerHTML = ''; // Clear existing rows

    const teams = Object.keys(teamStats);
    teams.forEach((team, index) => {
        const { matches, won, lost, points, forRuns, againstRuns } = teamStats[team];
        row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team}</td>
            <td>${matches}</td>
            <td>${won}</td>
            <td>${lost}</td>
            <td>${points}</td>
            <td>${((won / matches) * 100).toFixed(2)}%</td>
            <td>${calculateNRR(team)}</td>
            <td>${forRuns}</td>
            <td>${againstRuns}</td>
        `;
        tbody.appendChild(row);
    });
}

// Function to update the stats table
function updateMatchResultTable() {
    const tbody = document.getElementById('teamStats');
    tbody.innerHTML = ''; // Clear existing rows

    const teams = Object.keys(teamStats);
    teams.sort((a, b) => {
        const pointsDiff = teamStats[b].points - teamStats[a].points;
        return pointsDiff !== 0 ? pointsDiff : (calculateNRR(b) - calculateNRR(a));
    });

    teams.forEach((team, index) => {
        const { matches, won, lost, points, forRuns, againstRuns } = teamStats[team];
        row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team}</td>
            <td>${matches}</td>
            <td>${won}</td>
            <td>${lost}</td>
            <td>${points}</td>
            <td>${((won / matches) * 100).toFixed(2)}%</td>
            <td>${calculateNRR(team)}</td>
            <td>${forRuns}</td>
            <td>${againstRuns}</td>
        `;
        tbody.appendChild(row);
    });
}

// Event listener for the score form submission
document.getElementById('scoreForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const team1Score = parseInt(document.getElementById('team1Score').value);
    const team2Score = parseInt(document.getElementById('team2Score').value);

    let winningTeam, losingTeam;

    if (team1Score > team2Score) {
        winningTeam = team1;
        losingTeam = team2;
    } else {
        winningTeam = team2;
        losingTeam = team1;
    }

    updateTeamStats(winningTeam, losingTeam, team1Score, team2Score);
    
    // Reset the form
    document.getElementById('scoreForm').reset();
});

// Initialize tables on page load
updateCurrentTable();
updateMatchResultTable();
