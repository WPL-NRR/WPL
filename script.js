// Initial team data
const teams = [
    { name: "TOOFAN", matches: 4, won: 3, lost: 1, points: 6, winPercentage: "75.00%", NRR: 0.4787, runsFor: 576, runsAgainst: 531, overs: 94 },
    { name: "TOP GUNS", matches: 4, won: 3, lost: 1, points: 6, winPercentage: "75.00%", NRR: -0.2971, runsFor: 596, runsAgainst: 583, overs: 94 },
    { name: "WOODLANDS UNITED", matches: 4, won: 2, lost: 2, points: 4, winPercentage: "50.00%", NRR: 0.9092, runsFor: 562, runsAgainst: 494, overs: 91 },
    { name: "BHAIRAVA", matches: 4, won: 2, lost: 2, points: 4, winPercentage: "50.00%", NRR: 0.1158, runsFor: 527, runsAgainst: 543, overs: 83 },
    { name: "WOODLANDS KHILADIS", matches: 4, won: 1, lost: 3, points: 2, winPercentage: "25.00%", NRR: -0.5558, runsFor: 501, runsAgainst: 588, overs: 84 },
    { name: "RAGING BULLS", matches: 4, won: 1, lost: 3, points: 2, winPercentage: "25.00%", NRR: -0.7326, runsFor: 501, runsAgainst: 524, overs: 91 }
];

// Historical match data
const matchHistory = [
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS KHILADIS", winner: "WOODLANDS KHILADIS", scoreOne: 139, oversOne: 22, scoreTwo: 140, oversTwo: 15.5 },
    { teamOne: "TOOFAN", teamTwo: "BHAIRAVA", winner: "TOOFAN", scoreOne: 148, oversOne: 22, scoreTwo: 132, oversTwo: 22 },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS UNITED", winner: "WOODLANDS UNITED", scoreOne: 107, oversOne: 22, scoreTwo: 109, oversTwo: 19.1 },
    { teamOne: "RAGING BULLS", teamTwo: "BHAIRAVA", winner: "BHAIRAVA", scoreOne: 122, oversOne: 22, scoreTwo: 124, oversTwo: 17.5 },
    { teamOne: "TOP GUNS", teamTwo: "TOOFAN", winner: "TOP GUNS", scoreOne: 151, oversOne: 24.2, scoreTwo: 144, oversTwo: 25 },
    { teamOne: "WOODLANDS UNITED", teamTwo: "WOODLANDS KHILADIS", winner: "WOODLANDS UNITED", scoreOne: 166, oversOne: 25, scoreTwo: 98, oversTwo: 20.3 },
    { teamOne: "TOOFAN", teamTwo: "WOODLANDS UNITED", winner: "TOOFAN", scoreOne: 130, oversOne: 22, scoreTwo: 129, oversTwo: 21.5 },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS KHILADIS", winner: "RAGING BULLS", scoreOne: 153, oversOne: 22, scoreTwo: 137, oversTwo: 20.3 },
    { teamOne: "TOP GUNS", teamTwo: "BHAIRAVA", winner: "TOP GUNS", scoreOne: 147, oversOne: 22, scoreTwo: 141, oversTwo: 21.5 },
    { teamOne: "BHAIRAVA", teamTwo: "WOODLANDS KHILADIS", winner: "BHAIRAVA", scoreOne: 130, oversOne: 21, scoreTwo: 126, oversTwo: 22 },
    { teamOne: "TOOFAN", teamTwo: "RAGING BULLS", winner: "TOOFAN", scoreOne: 154, oversOne: 25, scoreTwo: 119, oversTwo: 22 },
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS UNITED", winner: "TOP GUNS", scoreOne: 159, oversOne: 25, scoreTwo: 158, oversTwo: 25 },
];

// Function to update team statistics based on historical matches
function updateHistoricalStatistics() {
    matchHistory.forEach(match => {
        const teamOne = teams.find(team => team.name === match.teamOne);
        const teamTwo = teams.find(team => team.name === match.teamTwo);

        // Update match counts
        teamOne.matches++;
        teamTwo.matches++;

        // Update wins and losses
        if (match.winner === teamOne.name) {
            teamOne.won++;
            teamTwo.lost++;
            teamOne.points += 2; // 2 points for a win
        } else {
            teamTwo.won++;
            teamOne.lost++;
            teamTwo.points += 2; // 2 points for a win
        }

        // Update runs scored and against
        teamOne.runsFor += match.scoreOne;
        teamTwo.runsFor += match.scoreTwo;
        teamOne.runsAgainst += match.scoreTwo;
        teamTwo.runsAgainst += match.scoreOne;

        // Update overs (as per match)
        teamOne.overs += match.oversOne;
        teamTwo.overs += match.oversTwo;
    });
}

// Function to calculate NRR
function calculateNRR(team) {
    const oversFaced = team.overs > 0 ? team.overs : 1; // Avoid division by zero
    const oversBowled = team.matches * 22; // Assuming 22 overs per match

    const runRateScored = team.runsFor / oversFaced;
    const runRateConceded = team.runsAgainst / oversBowled;

    return runRateScored - runRateConceded;
}

// Function to recalculate NRR for all teams after updates
function recalculateNRR() {
    teams.forEach(team => {
        team.NRR = calculateNRR(team);
    });
}

// Function to sort teams based on points and NRR
function sortTeams() {
    teams.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points; // Sort by points
        } else {
            return b.NRR - a.NRR; // Sort by NRR
        }
    });
}

// Function to display the standings
function displayStandings() {
    const tableBody = document.getElementById('teamTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.matches}</td>
            <td>${team.won}</td>
            <td>${team.lost}</td>
            <td>${team.points}</td>
            <td>${team.winPercentage}</td>
            <td>${team.NRR.toFixed(4)}</td>
            <td>${team.runsFor}</td>
            <td>${team.runsAgainst}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Update statistics with historical matches
updateHistoricalStatistics();

// Recalculate NRR for all teams
recalculateNRR();

// Sort teams and display the standings
sortTeams();
displayStandings();
