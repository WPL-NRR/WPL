const teams = [
    { name: "Top Guns", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Toofan", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Woodlands United", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Bhairava", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Woodlands Khiladis", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Raging Bulls", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
];

const matchHistory = [
    { team1: "Top Guns", team2: "Woodlands Khiladis", score1: 139, overs1: 22, score2: 140, overs2: 15.5 },
    { team1: "Toofan", team2: "Bhairava", score1: 148, overs1: 22, score2: 132, overs2: 22 },
    { team1: "Raging Bulls", team2: "Woodlands United", score1: 107, overs1: 22, score2: 109, overs2: 19.1 },
    { team1: "Raging Bulls", team2: "Bhairava", score1: 122, overs1: 22, score2: 124, overs2: 17.5 },
    { team1: "Top Guns", team2: "Toofan", score1: 151, overs1: 24.2, score2: 144, overs2: 25 },
    { team1: "Woodlands United", team2: "Woodlands Khiladis", score1: 166, overs1: 25, score2: 98, overs2: 20.3 },
    { team1: "Toofan", team2: "Woodlands United", score1: 130, overs1: 22, score2: 129, overs2: 21.5 },
    { team1: "Raging Bulls", team2: "Woodlands Khiladis", score1: 153, overs1: 22, score2: 137, overs2: 20.3 },
    { team1: "Top Guns", team2: "Bhairava", score1: 147, overs1: 22, score2: 141, overs2: 21.5 },
    { team1: "Bhairava", team2: "Woodlands Khiladis", score1: 130, overs1: 21, score2: 126, overs2: 22 },
    { team1: "Toofan", team2: "Raging Bulls", score1: 154, overs1: 25, score2: 119, overs2: 22 },
    { team1: "Top Guns", team2: "Woodlands United", score1: 159, overs1: 25, score2: 158, overs2: 25 }
];

function calculateInitialNRR() {
    teams.forEach(team => {
        const totalRunsScored = matchHistory.reduce((sum, match) => {
            return sum + (match.team1 === team.name ? match.score1 : match.team2 === team.name ? match.score2 : 0);
        }, 0);

        const totalOversFaced = matchHistory.reduce((sum, match) => {
            return sum + (match.team1 === team.name ? match.overs1 : match.team2 === team.name ? match.overs2 : 0);
        }, 0);

        const totalRunsConceded = matchHistory.reduce((sum, match) => {
            return sum + (match.team1 === team.name ? match.score2 : match.team2 === team.name ? match.score1 : 0);
        }, 0);

        const totalOversBowled = matchHistory.reduce((sum, match) => {
            return sum + (match.team1 === team.name ? match.overs2 : match.team2 === team.name ? match.overs1 : 0);
        }, 0);

        team.nrr = totalOversFaced > 0 && totalOversBowled > 0
            ? ((totalRunsScored / totalOversFaced) - (totalRunsConceded / totalOversBowled)).toFixed(4)
            : 0;

        team.matchesPlayed = matchHistory.filter(match => match.team1 === team.name || match.team2 === team.name).length;
    });
}

function populateDropdowns() {
    const teamSelect = document.getElementById('teamSelect');
    const oppositionSelect = document.getElementById('oppositionSelect');

    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        teamSelect.appendChild(option);

        const oppositionOption = document.createElement('option');
        oppositionOption.value = team.name;
        oppositionOption.textContent = team.name;
        oppositionSelect.appendChild(oppositionOption);
    });
}

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
            <td>${team.points}</td>
            <td>${team.nrr.toFixed(4)}</td>
        `;
        standingsBody.appendChild(row);
    });
}

function calculateMatchResult() {
    const team = document.getElementById('teamSelect').value;
    const opposition = document.getElementById('oppositionSelect').value;

    if (team === opposition) {
        alert("You cannot select the same team as both your team and the opposition.");
        return;
    }

    const runsScored = parseInt(document.getElementById('teamRunsScored').value);
    const oversFaced = parseFloat(document.getElementById('teamOversFaced').value);
    const oppositionScore = parseInt(document.getElementById('oppositionRunsScored').Here's the completed **script.js** code, including all the match history you've provided:

### **script.js**
```javascript
const teams = [
    { name: "Top Guns", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Toofan", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Woodlands United", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Bhairava", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Woodlands Khiladis", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "Raging Bulls", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
];

const matchHistory = [
    { team1: "Top Guns", team2: "Woodlands Khiladis", score1: 139, overs1: 22, score2: 140, overs2: 15.5 },
    { team1: "Toofan", team2: "Bhairava", score1: 148, overs1: 22, score2: 132, overs2: 22 },
    { team1: "Raging Bulls", team2: "Woodlands United", score1: 107, overs1: 22, score2: 109, overs2: 19.1 },
    { team1: "Raging Bulls", team2: "Bhairava", score1: 122, overs1: 22, score2: 124, overs2: 17.5 },
    { team1: "Top Guns", team2: "Toofan", score1: 151, overs1: 24.2, score2: 144, overs2: 25 },
    { team1: "Woodlands United", team2: "Woodlands Khiladis", score1: 166, overs1: 25, score2: 98, overs2: 20.3 },
    { team1: "Toofan", team2: "Woodlands United", score1: 130, overs1: 22, score2: 129, overs2: 21.5 },
    { team1: "Raging Bulls", team2: "Woodlands Khiladis", score1: 153, overs1: 22, score2: 137, overs2: 20.3 },
    { team1: "Top Guns", team2: "Bhairava", score1: 147, overs1: 22, score2: 141, overs2: 21.5 },
    { team1: "Bhairava", team2: "Woodlands Khiladis", score1: 130, overs1: 21, score2: 126, overs2: 22 },
    { team1: "Toofan", team2: "Raging Bulls", score1: 154, overs1: 25, score2: 119, overs2: 22 },
    { team1: "Top Guns", team2: "Woodlands United", score1: 159, overs1: 25, score2: 158, overs2: 25 }
];

function calculateInitialNRR() {
    teams.forEach(team => {
        const totalRunsScored = matchHistory.reduce((sum, match) => {
            return sum + (match.team1 === team.name ? match.score1 : match.team2 === team.name ? match.score2 : 0);
        }, 0);

        const totalOversFaced = matchHistory.reduce((sum, match) => {
            return sum + (match.team1 === team.name ? match.overs1 : match.team2 === team.name ? match.overs2 : 0);
        }, 0);

        const totalRunsConceded = matchHistory.reduce((sum, match) => {
            return sum + (match.team1 === team.name ? match.score2 : match.team2 === team.name ? match.score1 : 0);
        }, 0);

        const totalOversBowled = matchHistory.reduce((sum, match) => {
            return sum + (match.team1 === team.name ? match.overs2 : match.team2 === team.name ? match.overs1 : 0);
        }, 0);

        team.nrr = totalOversFaced > 0 && totalOversBowled > 0
            ? ((totalRunsScored / totalOversFaced) - (totalRunsConceded / totalOversBowled)).toFixed(4)
            : 0;

        team.matchesPlayed = matchHistory.filter(match => match.team1 === team.name || match.team2 === team.name).length;
    });
}

function populateDropdowns() {
    const teamSelect = document.getElementById('teamSelect');
    const oppositionSelect = document.getElementById('oppositionSelect');

    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        teamSelect.appendChild(option);

        const oppositionOption = document.createElement('option');
        oppositionOption.value = team.name;
        oppositionOption.textContent = team.name;
        oppositionSelect.appendChild(oppositionOption);
    });
}

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
            <td>${team.points}</td>
            <td>${team.nrr.toFixed(4)}</td>
        `;
        standingsBody.appendChild(row);
    });
}

function calculateMatchResult() {
    const team = document.getElementById('teamSelect').value;
    const opposition = document.getElementById('oppositionSelect').value;

    if (team === opposition) {
        alert("You cannot select the same team as both your team and the opposition.");
        return;
    }

    const runsScored = parseInt(document.getElementById('teamRunsScored').value);
    const oversFaced = parseFloat(document.getElementById('teamOversFaced').value);
    const oppositionScore = parseInt(document.getElementById('oppositionRunsScored').value);
    const oversBowled = parseFloat(document.getElementById('oppositionOversBowled').value);

    const nrr = calculateNRR(runsScored, oversFaced, oppositionScore, oversBowled);
    updateStats(team, opposition, runsScored, oversFaced, oppositionScore, oversBowled, nrr);

    document.getElementById('result').innerText = `New NRR for ${team}: ${nrr}`;
    alert(`Match Result: ${team} won against ${opposition}.`);
}

function calculateNRR(runsScored, oversFaced, oppositionScore, oversBowled) {
    const runRateTeam = runsScored / oversFaced;
    const runRateOpposition = oppositionScore / oversBowled;
    return (runRateTeam - runRateOpposition).toFixed(4);
}

function updateStats(team, opposition, runsScored, oversFaced, oppositionScore, oversBowled, nrr) {
    const teamData = teams.find(t => t.name === team);
    const oppositionData = teams.find(t => t.name === opposition);

    // Update team stats
    teamData.matchesPlayed++;
    teamData.wins++;
    teamData.points += 2; // Assuming a win gives 2 points
    teamData.nrr = calculateNRR(runsScored, oversFaced, oppositionScore, oversBowled);

    // Update opposition stats
    oppositionData.matchesPlayed++;
    oppositionData.losses++;
    oppositionData.nrr = calculateNRR(oppositionScore, oversBowled, runsScored, oversFaced);

    // Add to match history
    matchHistory.push({
        team1: team,
        team2: opposition,
        score1: runsScored,
        overs1: oversFaced,
        score2: oppositionScore,
        overs2: oversBowled,
    });

    updateStandings();
    updateMatchHistory();
}

function updateMatchHistory() {
    const historyBody = document.getElementById('historyBody');
    historyBody.innerHTML = ''; // Clear previous history

    matchHistory.forEach(match => {
        const row = document.createElement('tr');
        const winner = (match.score1 > match.score2) ? match.team1 : match.team2;
        row.innerHTML = `
            <td>${match.team1} vs ${match.team2}</td>
            <td>${winner}</td>
            <td>${match.team1} ${match.score1} (${match.overs1} overs) - ${match.team2} ${match.score2} (${match.overs2} overs)</td>
        `;
        historyBody.appendChild(row);
    });
}

// Initialize
calculateInitialNRR();
populateDropdowns();
updateStandings();
updateMatchHistory();
