// Initialize teams and match history
let teams = [
    { name: "Top Guns", wins: 0, losses: 0, points: 0, matchesPlayed: 0, nrr: 0 },
    { name: "Toofan", wins: 0, losses: 0, points: 0, matchesPlayed: 0, nrr: 0 },
    { name: "Woodlands United", wins: 0, losses: 0, points: 0, matchesPlayed: 0, nrr: 0 },
    { name: "Bhairava", wins: 0, losses: 0, points: 0, matchesPlayed: 0, nrr: 0 },
    { name: "Woodlands Khiladis", wins: 0, losses: 0, points: 0, matchesPlayed: 0, nrr: 0 },
    { name: "Raging Bulls", wins: 0, losses: 0, points: 0, matchesPlayed: 0, nrr: 0 }
];

// Sample match history
const matchHistory = [
    { team1: "Top Guns", team2: "Woodlands Khiladis", score1: 139, score2: 140, overs1: 22, overs2: 15.5 },
    { team1: "Toofan", team2: "Bhairava", score1: 148, score2: 132, overs1: 22, overs2: 22 },
    { team1: "Raging Bulls", team2: "Woodlands United", score1: 107, score2: 109, overs1: 22, overs2: 19.1 },
    { team1: "Bhairava", team2: "Woodlands Khiladis", score1: 130, score2: 126, overs1: 21, overs2: 22 },
    { team1: "Top Guns", team2: "Toofan", score1: 151, score2: 144, overs1: 24.2, overs2: 25 }
];

// Calculate initial NRR from the match history
function calculateInitialNRR() {
    matchHistory.forEach(match => {
        const team1 = teams.find(t => t.name === match.team1);
        const team2 = teams.find(t => t.name === match.team2);
        
        if (team1 && team2) {
            team1.matchesPlayed++;
            team2.matchesPlayed++;

            if (match.score1 > match.score2) {
                team1.wins++;
                team2.losses++;
                team1.points += 2;
            } else {
                team1.losses++;
                team2.wins++;
                team2.points += 2;
            }

            // NRR Calculation
            team1.nrr = ((team1.nrr * (team1.matchesPlayed - 1)) + (match.score1 / match.overs1) - (match.score2 / match.overs2)) / team1.matchesPlayed;
            team2.nrr = ((team2.nrr * (team2.matchesPlayed - 1)) + (match.score2 / match.overs2) - (match.score1 / match.overs1)) / team2.matchesPlayed;
        }
    });
}

// Populate team dropdowns
function populateDropdowns() {
    const teamSelect = document.getElementById('teamSelect');
    const oppositionSelect = document.getElementById('oppositionSelect');

    teams.forEach(team => {
        const option1 = document.createElement('option');
        option1.value = team.name;
        option1.textContent = team.name;
        teamSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = team.name;
        option2.textContent = team.name;
        oppositionSelect.appendChild(option2);
    });
}

// Calculate and update NRR based on match result
function calculateMatchResult() {
    const teamName = document.getElementById('teamSelect').value;
    const oppositionName = document.getElementById('oppositionSelect').value;

    if (teamName === oppositionName) {
        alert("You cannot select the same team as both your team and the opposition.");
        return;
    }

    const teamRuns = parseInt(document.getElementById('teamRunsScored').value);
    const teamOvers = parseFloat(document.getElementById('teamOversFaced').value);
    const oppositionRuns = parseInt(document.getElementById('oppositionRunsScored').value);
    const oppositionOvers = parseFloat(document.getElementById('oppositionOversBowled').value);

    const team = teams.find(t => t.name === teamName);
    const opposition = teams.find(t => t.name === oppositionName);

    if (team && opposition) {
        // Update team stats
        team.matchesPlayed++;
        opposition.matchesPlayed++;

        if (teamRuns > oppositionRuns) {
            team.wins++;
            opposition.losses++;
            team.points += 2;
        } else {
            team.losses++;
            opposition.wins++;
            opposition.points += 2;
        }

        // Update NRR calculations
        team.nrr = ((team.nrr * (team.matchesPlayed - 1)) + (teamRuns / teamOvers) - (oppositionRuns / oppositionOvers)) / team.matchesPlayed;
        opposition.nrr = ((opposition.nrr * (opposition.matchesPlayed - 1)) + (oppositionRuns / oppositionOvers) - (teamRuns / teamOvers)) / opposition.matchesPlayed;

        // Log the match to history
        matchHistory.push({ team1: team.name, team2: opposition.name, score1: teamRuns, score2: oppositionRuns, overs1: teamOvers, overs2: oppositionOvers });
        
        // Display result
        document.getElementById('result').textContent = `${team.name} NRR: ${team.nrr.toFixed(2)}, ${opposition.name} NRR: ${opposition.nrr.toFixed(2)}`;
        updateStandings();
        updateMatchHistory();
    }
}

// Update the standings table in the HTML
function updateStandings() {
    const standingsBody = document.getElementById('standingsBody');
    standingsBody.innerHTML = ''; // Clear previous standings

    teams.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.matchesPlayed}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <Here’s the corrected `script.js` with the missing parts included and complete functionality for updating both the current standings and match history.

### **script.js** (continued)
```javascript
            <td>${team.points}</td>
            <td>${team.nrr.toFixed(2)}</td>
        `;
        standingsBody.appendChild(row);
    });
}

// Update the match history table in the HTML
function updateMatchHistory() {
    const historyBody = document.getElementById('historyBody');
    historyBody.innerHTML = ''; // Clear previous history

    matchHistory.forEach(match => {
        const row = document.createElement('tr');
        const winner = match.score1 > match.score2 ? match.team1 : match.team2;
        row.innerHTML = `
            <td>${match.team1} vs ${match.team2}</td>
            <td>${winner}</td>
            <td>${match.team1}: ${match.score1} in ${match.overs1} overs, ${match.team2}: ${match.score2} in ${match.overs2} overs</td>
        `;
        historyBody.appendChild(row);
    });
}

// Initialize the application
function init() {
    calculateInitialNRR();
    populateDropdowns();
    updateStandings();
    updateMatchHistory();
}

// Call init on load
window.onload = init;
