// Initial team statistics
const teamStats = {
    "TOOFAN": { matches: 4, won: 3, lost: 1, points: 6, forRuns: 576, againstRuns: 531 },
    "TOP GUNS": { matches: 4, won: 3, lost: 1, points: 6, forRuns: 596, againstRuns: 583 },
    "WOODLANDS UNITED": { matches: 4, won: 2, lost: 2, points: 4, forRuns: 562, againstRuns: 494 },
    "BHAIRAVA": { matches: 4, won: 2, lost: 2, points: 4, forRuns: 527, againstRuns: 543 },
    "WOODLANDS KHILADIS": { matches: 4, won: 1, lost: 3, points: 2, forRuns: 501, againstRuns: 588 },
    "RAGING BULLS": { matches: 4, won: 1, lost: 3, points: 2, forRuns: 501, againstRuns: 524 },
};

// Function to calculate NRR
function calculateNRR(team) {
    const { forRuns, againstRuns, matches } = teamStats[team];
    const totalOvers = matches * 25; // Assuming each match is 25 overs
    const nrr = ((forRuns / totalOvers) - (againstRuns / totalOvers)).toFixed(4);
    return nrr;
}

// Function to update team stats
function updateTeamStats(winningTeam, losingTeam, winningScore, winningOvers, losingScore, losingOvers) {
    // Update winning team
    teamStats[winningTeam].matches++;
    teamStats[winningTeam].won++;
    teamStats[winningTeam].points += 2;
    teamStats[winningTeam].forRuns += winningScore;
    teamStats[winningTeam].againstRuns += losingScore;

    // Update losing team
    teamStats[losingTeam].matches++;
    teamStats[losingTeam].lost++;
    teamStats[losingTeam].forRuns += losingScore;
    teamStats[losingTeam].againstRuns += winningScore;

    // Update the table
    updateTable();
}

// Function to update the stats table
function updateTable() {
    const tbody = document.getElementById('teamStats');
    tbody.innerHTML = ''; // Clear existing rows

    const teams = Object.keys(teamStats);
    teams.sort((a, b) => {
        const pointsDiff = teamStats[b].points - teamStats[a].points;
        return pointsDiff !== 0 ? pointsDiff : (calculateNRR(b) - calculateNRR(a));
    });

    teams.forEach((team, index) => {
        const { matches, won, lost, points, forRuns, againstRuns } = teamStats[team];
        const row = document.createElement('tr');
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
    const team1Overs = parseFloat(document.getElementById('team1Overs').value);
    const team2Score = parseInt(document.getElementById('team2Score').value);
    const team2Overs = parseFloat(document.getElementById('team2Overs').value);

    let winningTeam, losingTeam;

    if (team1Score > team2Score) {
        winningTeam = team1;
        losingTeam = team2;
    } else {
        winningTeam = team2;
        losingTeam = team1;
    }

    updateTeamStats(winningTeam, losingTeam, team1Score, team1Overs, team2Score, team2Overs);
    
    // Reset the form
    document.getElementById('scoreForm').reset();
});

// Initialize table on page load
updateTable();
