// script.js
const matchHistory = [
    { teamOne: "Top Guns", teamTwo: "Woodlands Khiladis", result: "Woodlands Khiladis", teamOneScore: 139, teamOneOvers: 22, teamTwoScore: 140, teamTwoOvers: 15.5 },
    { teamOne: "Toofan", teamTwo: "Bhairava", result: "Toofan", teamOneScore: 148, teamOneOvers: 22, teamTwoScore: 132, teamTwoOvers: 22 },
    { teamOne: "Raging Bulls", teamTwo: "Woodlands United", result: "Woodlands United", teamOneScore: 107, teamOneOvers: 22, teamTwoScore: 109, teamTwoOvers: 19.1 },
    { teamOne: "Raging Bulls", teamTwo: "Bhairava", result: "Bhairava", teamOneScore: 122, teamOneOvers: 22, teamTwoScore: 124, teamTwoOvers: 17.5 },
    { teamOne: "Top Guns", teamTwo: "Toofan", result: "Top Guns", teamOneScore: 151, teamOneOvers: 24.2, teamTwoScore: 144, teamTwoOvers: 25 },
    { teamOne: "Woodlands United", teamTwo: "Woodlands Khiladis", result: "Woodlands United", teamOneScore: 166, teamOneOvers: 25, teamTwoScore: 98, teamTwoOvers: 20.3 },
    { teamOne: "Toofan", teamTwo: "Woodlands United", result: "Toofan", teamOneScore: 130, teamOneOvers: 22, teamTwoScore: 129, teamTwoOvers: 21.5 },
    { teamOne: "Raging Bulls", teamTwo: "Woodlands Khiladis", result: "Raging Bulls", teamOneScore: 153, teamOneOvers: 22, teamTwoScore: 137, teamTwoOvers: 20.3 },
    { teamOne: "Top Guns", teamTwo: "Bhairava", result: "Top Guns", teamOneScore: 147, teamOneOvers: 22, teamTwoScore: 141, teamTwoOvers: 21.5 },
    { teamOne: "Bhairava", teamTwo: "Woodlands Khiladis", result: "Bhairava", teamOneScore: 130, teamOneOvers: 21, teamTwoScore: 126, teamTwoOvers: 22 },
    { teamOne: "Toofan", teamTwo: "Raging Bulls", result: "Toofan", teamOneScore: 154, teamOneOvers: 25, teamTwoScore: 119, teamTwoOvers: 22 },
    { teamOne: "Top Guns", teamTwo: "Woodlands United", result: "Top Guns", teamOneScore: 159, teamOneOvers: 25, teamTwoScore: 158, teamTwoOvers: 25 },
];

function initializeStandings() {
    const standingsBody = document.getElementById('standingsBody');
    standingsBody.innerHTML = "";
    const teams = ["Top Guns", "Toofan", "Woodlands United", "Bhairava", "Woodlands Khiladis", "Raging Bulls"];
    const initialStats = {
        "Top Guns": { matches: 4, wins: 3, losses: 1, points: 6, nrr: -0.2971 },
        "Toofan": { matches: 4, wins: 3, losses: 1, points: 6, nrr: 0.4787 },
        "Woodlands United": { matches: 4, wins: 2, losses: 2, points: 4, nrr: 0.9092 },
        "Bhairava": { matches: 4, wins: 2, losses: 2, points: 4, nrr: 0.1158 },
        "Woodlands Khiladis": { matches: 4, wins: 1, losses: 3, points: 2, nrr: -0.5558 },
        "Raging Bulls": { matches: 4, wins: 1, losses: 3, points: 2, nrr: -0.7326 }
    };

    teams.forHere's the complete code for `script.js` and `styles.css` files, integrating match history, current stats, and restrictions as per your requirements:

### `script.js`
```javascript
const matchHistory = [
    { teamOne: "Top Guns", teamTwo: "Woodlands Khiladis", result: "Woodlands Khiladis", teamOneScore: 139, teamOneOvers: 22, teamTwoScore: 140, teamTwoOvers: 15.5 },
    { teamOne: "Toofan", teamTwo: "Bhairava", result: "Toofan", teamOneScore: 148, teamOneOvers: 22, teamTwoScore: 132, teamTwoOvers: 22 },
    { teamOne: "Raging Bulls", teamTwo: "Woodlands United", result: "Woodlands United", teamOneScore: 107, teamOneOvers: 22, teamTwoScore: 109, teamTwoOvers: 19.1 },
    { teamOne: "Raging Bulls", teamTwo: "Bhairava", result: "Bhairava", teamOneScore: 122, teamOneOvers: 22, teamTwoScore: 124, teamTwoOvers: 17.5 },
    { teamOne: "Top Guns", teamTwo: "Toofan", result: "Top Guns", teamOneScore: 151, teamOneOvers: 24.2, teamTwoScore: 144, teamTwoOvers: 25 },
    { teamOne: "Woodlands United", teamTwo: "Woodlands Khiladis", result: "Woodlands United", teamOneScore: 166, teamOneOvers: 25, teamTwoScore: 98, teamTwoOvers: 20.3 },
    { teamOne: "Toofan", teamTwo: "Woodlands United", result: "Toofan", teamOneScore: 130, teamOneOvers: 22, teamTwoScore: 129, teamTwoOvers: 21.5 },
    { teamOne: "Raging Bulls", teamTwo: "Woodlands Khiladis", result: "Raging Bulls", teamOneScore: 153, teamOneOvers: 22, teamTwoScore: 137, teamTwoOvers: 20.3 },
    { teamOne: "Top Guns", teamTwo: "Bhairava", result: "Top Guns", teamOneScore: 147, teamOneOvers: 22, teamTwoScore: 141, teamTwoOvers: 21.5 },
    { teamOne: "Bhairava", teamTwo: "Woodlands Khiladis", result: "Bhairava", teamOneScore: 130, teamOneOvers: 21, teamTwoScore: 126, teamTwoOvers: 22 },
    { teamOne: "Toofan", teamTwo: "Raging Bulls", result: "Toofan", teamOneScore: 154, teamOneOvers: 25, teamTwoScore: 119, teamTwoOvers: 22 },
    { teamOne: "Top Guns", teamTwo: "Woodlands United", result: "Top Guns", teamOneScore: 159, teamOneOvers: 25, teamTwoScore: 158, teamTwoOvers: 25 },
];

const teams = ["Top Guns", "Toofan", "Woodlands United", "Bhairava", "Woodlands Khiladis", "Raging Bulls"];

function initializeStandings() {
    const standingsBody = document.getElementById('standingsBody');
    standingsBody.innerHTML = "";
    const initialStats = {
        "Top Guns": { matches: 4, wins: 3, losses: 1, points: 6, nrr: -0.2971 },
        "Toofan": { matches: 4, wins: 3, losses: 1, points: 6, nrr: 0.4787 },
        "Woodlands United": { matches: 4, wins: 2, losses: 2, points: 4, nrr: 0.9092 },
        "Bhairava": { matches: 4, wins: 2, losses: 2, points: 4, nrr: 0.1158 },
        "Woodlands Khiladis": { matches: 4, wins: 1, losses: 3, points: 2, nrr: -0.5558 },
        "Raging Bulls": { matches: 4, wins: 1, losses: 3, points: 2, nrr: -0.7326 }
    };

    for (const team of teams) {
        const row = standingsBody.insertRow();
        row.insertCell(0).innerText = team;
        row.insertCell(1).innerText = initialStats[team].matches;
        row.insertCell(2).innerText = initialStats[team].wins;
        row.insertCell(3).innerText = initialStats[team].losses;
        row.insertCell(4).innerText = initialStats[team].points;
        row.insertCell(5).innerText = initialStats[team].nrr.toFixed(4);
    }
}

function calculateNRR(team, runsScored, oversFaced, oppositionScore, oppositionOvers) {
    const totalRunsScored = runsScored - oppositionScore;
    const totalOversFaced = oversFaced - oppositionOvers;

    return totalRunsScored / totalOversFaced;
}

function calculateMatchResult() {
    const selectedTeam = document.getElementById('teamSelect').value;
    const oppositionTeam = document.getElementById('oppositionSelect').value;

    if (selectedTeam === oppositionTeam) {
        alert("You cannot select the same team for both sides!");
        return;
    }

    const teamRunsScored = parseInt(document.getElementById('teamRunsScored').value);
    const teamOversFaced = parseFloat(document.getElementById('teamOversFaced').value);
    const oppositionRunsScored = parseInt(document.getElementById('oppositionRunsScored').value);
    const oppositionOversBowled = parseFloat(document.getElementById('oppositionOversBowled').value);

    // Calculate NRR
    const nrr = calculateNRR(selectedTeam, teamRunsScored, teamOversFaced, oppositionRunsScored, oppositionOversBowled);

    // Update the standings based on match results
    updateStandings(selectedTeam, oppositionTeam, nrr, teamRunsScored, oppositionRunsScored);
}

function updateStandings(selectedTeam, oppositionTeam, nrr, teamRunsScored, oppositionRunsScored) {
    const standingsBody = document.getElementById('standingsBody');
    const rows = standingsBody.getElementsByTagName('tr');

    // Find the rows for both teams
    let selectedRow, oppositionRow;
    for (let row of rows) {
        if (row.cells[0].innerText === selectedTeam) selectedRow = row;
        if (row.cells[0].innerText === oppositionTeam) oppositionRow = row;
    }

    // Update selected team's stats
    selectedRow.cells[1].innerText = parseInt(selectedRow.cells[1].innerText) + 1; // Matches Played
    selectedRow.cells[4].innerText = parseInt(selectedRow.cells[4].innerText) + (teamRunsScored > oppositionRunsScored ? 2 : 0); // Points
    selectedRow.cells[5].innerText = (parseFloat(selectedRow.cells[5].innerText) + nrr).toFixed(4); // Update NRR

    // Update opposition team's stats
    oppositionRow.cells[1].innerText = parseInt(oppositionRow.cells[1].innerText) + 1; // Matches Played
    oppositionRow.cells[4].innerText = parseInt(oppositionRow.cells[4].innerText) + (teamRunsScored < oppositionRunsScored ? 2 : 0); // Points
    oppositionRow.cells[5].innerText = (parseFloat(oppositionRow.cells[5].innerText) - nrr).toFixed(4); // Update NRR

    document.getElementById('result').innerText = `NRR for ${selectedTeam}: ${nrr.toFixed(4)}`;
}

// Prevent selecting the same team in opposition
document.getElementById('teamSelect').addEventListener('change', function() {
    const selectedTeam = this.value;
    const oppositionSelect = document.getElementById('oppositionSelect');
    
    for (const option of oppositionSelect.options) {
        option.disabled = (option.value === selectedTeam);
    }
});

// Initialize standings on load
initializeStandings();
