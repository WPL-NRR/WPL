const teams = [
    { name: "TOP GUNS", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "TOOFAN", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "BHAIRAVA", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "WOODLANDS KHILADIS", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "RAGING BULLS", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "WOODLANDS UNITED", matchesPlayed: 0, wins: 0, losses: 0, points: 0, nrr: 0 }
];

const matchHistory = [
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS KHILADIS", score: "139/6", oversFaced: 22.0, opponentScore: "140/4", opponentOvers: 15.5, result: "WOODLANDS KHILADIS won by 10 Wickets" },
    { teamOne: "TOOFAN", teamTwo: "BHAIRAVA", score: "148/8", oversFaced: 22.0, opponentScore: "132/9", opponentOvers: 22.0, result: "TOOFAN won by 16 Run(s)" },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS UNITED", score: "107/10", oversFaced: 22.0, opponentScore: "109/2", opponentOvers: 19.1, result: "WOODLANDS UNITED won by 12 Wickets" },
    { teamOne: "RAGING BULLS", teamTwo: "BHAIRAVA", score: "122/11", oversFaced: 22.0, opponentScore: "124/4", opponentOvers: 17.5, result: "BHAIRAVA won by 10 Wickets" },
    { teamOne: "TOP GUNS", teamTwo: "TOOFAN", score: "151/11", oversFaced: 24.2, opponentScore: "144/7", opponentOvers: 25.0, result: "TOP GUNS won by 7 Run(s)" },
    { teamOne: "WOODLANDS UNITED", teamTwo: "WOODLANDS KHILADIS", score: "166/10", oversFaced: 25.0, opponentScore: "98/11", opponentOvers: 20.3, result: "WOODLANDS UNITED won by 68 Run(s)" },
    { teamOne: "TOOFAN", teamTwo: "WOODLANDS UNITED", score: "130/10", oversFaced: 22.0, opponentScore: "129/11", opponentOvers: 21.5, result: "TOOFAN won by 1 Run(s)" },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS KHILADIS", score: "153/11", oversFaced: 22.0, opponentScore: "137/11", opponentOvers: 20.3, result: "RAGING BULLS won by 16 Run(s)" },
    { teamOne: "TOP GUNS", teamTwo: "BHAIRAVA", score: "147/9", oversFaced: 22.0, opponentScore: "141/10", opponentOvers: 21.5, result: "TOP GUNS won by 6 Run(s)" },
    { teamOne: "BHAIRAVA", teamTwo: "WOODLANDS KHILADIS", score: "130/11", oversFaced: 21.0, opponentScore: "126/10", opponentOvers: 22.0, result: "BHAIRAVA won by 4 Run(s)" },
    { teamOne: "TOOFAN", teamTwo: "RAGING BULLS", score: "154/10", oversFaced: 25.0, opponentScore: "119/11", opponentOvers: 22.0, result: "TOOFAN won by 35 Run(s)" },
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS UNITED", score: "159/9", oversFaced: 25.0, opponentScore: "158/9", opponentOvers: 25.0, result: "TOP GUNS won by 1 Run(s)" }
];

// Function to calculate NRR
function calculateNRR(runsScored, oversFaced, opponentScore, oversBowled) {
    const runRate = runsScored / oversFaced;
    const opponentRunRate = opponentScore / oversBowled;
    return runRate - opponentRunRate;
}

// Function to update standings
function updateStandings() {
    const tbody = document.querySelector("#standings tbody");
    tbody.innerHTML = ""; // Clear previous rows

    teams.forEach(team => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.matchesPlayed}</Here's the continuation and completion of the JavaScript code for your cricket NRR dashboard:

### Continued `script.js`
```javascript
            <td>${team.matchesPlayed}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.points}</td>
            <td>${team.nrr.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// Event listener for calculating NRR and updating points
document.getElementById("calculate-btn").addEventListener("click", () => {
    const yourTeam = document.getElementById("your-team").value;
    const runsScored = parseInt(document.getElementById("runs-scored").value);
    const oversFaced = parseFloat(document.getElementById("overs-faced").value);
    const opposition = document.getElementById("opposition").value;
    const opponentScore = parseInt(document.getElementById("opponent-score").value);
    const oversBowled = parseFloat(document.getElementById("overs-bowled").value);

    if (yourTeam && opposition && !isNaN(runsScored) && !isNaN(oversFaced) && !isNaN(opponentScore) && !isNaN(oversBowled)) {
        const yourTeamObj = teams.find(team => team.name === yourTeam);
        const oppositionTeamObj = teams.find(team => team.name === opposition);
        
        // Update matches played and wins/losses based on the result
        yourTeamObj.matchesPlayed++;
        oppositionTeamObj.matchesPlayed++;
        
        // Determine result
        if (runsScored > opponentScore) {
            yourTeamObj.wins++;
            oppositionTeamObj.losses++;
            yourTeamObj.points += 2; // Win gives 2 points
        } else {
            oppositionTeamObj.wins++;
            yourTeamObj.losses++;
            oppositionTeamObj.points += 2; // Win gives 2 points
        }

        // Calculate NRR
        const nrr = calculateNRR(runsScored, oversFaced, opponentScore, oversBowled);
        yourTeamObj.nrr = nrr;

        // Update standings
        updateStandings();

        // Reset input fields
        document.getElementById("your-team").value = "";
        document.getElementById("runs-scored").value = "";
        document.getElementById("overs-faced").value = "";
        document.getElementById("opposition").value = "";
        document.getElementById("opponent-score").value = "";
        document.getElementById("overs-bowled").value = "";
    } else {
        alert("Please fill all fields correctly.");
    }
});

// Initialize standings
updateStandings();
