// Initial team data with exact values
const teams = [
    { name: "TOOFAN", matches: 4, won: 3, lost: 1, points: 6, winPercentage: "75.00%", NRR: 0.4787, runsFor: 576, runsAgainst: 531, overs: 94 },
    { name: "TOP GUNS", matches: 4, won: 3, lost: 1, points: 6, winPercentage: "75.00%", NRR: -0.2971, runsFor: 596, runsAgainst: 583, overs: 94 },
    { name: "WOODLANDS UNITED", matches: 4, won: 2, lost: 2, points: 4, winPercentage: "50.00%", NRR: 0.9092, runsFor: 562, runsAgainst: 494, overs: 91.1 },
    { name: "BHAIRAVA", matches: 4, won: 2, lost: 2, points: 4, winPercentage: "50.00%", NRR: 0.1158, runsFor: 527, runsAgainst: 543, overs: 83.5 },
    { name: "WOODLANDS KHILADIS", matches: 4, won: 1, lost: 3, points: 2, winPercentage: "25.00%", NRR: -0.5558, runsFor: 501, runsAgainst: 588, overs: 84.5 },
    { name: "RAGING BULLS", matches: 4, won: 1, lost: 3, points: 2, winPercentage: "25.00%", NRR: -0.7326, runsFor: 501, runsAgainst: 524, overs: 91 }
];

// Function to calculate NRR
function calculateNRR(team) {
    const runsScored = team.runsFor;
    const runsConceded = team.runsAgainst;
    const oversFaced = team.overs;

    // Calculate NRR
    return (runsScored / oversFaced) - (runsConceded / oversFaced);
}

// Function to update team statistics
function updateTeamStatistics(teamOne, teamTwo, scoreOne, oversOne, scoreTwo, oversTwo) {
    // Update match counts
    teamOne.matches++;
    teamTwo.matches++;

    // Update wins and losses
    if (scoreOne > scoreTwo) {
        teamOne.won++;
        teamTwo.lost++;
        teamOne.points += 2; // 2 points for a win
    } else {
        teamTwo.won++;
        teamOne.lost++;
        teamTwo.points += 2; // 2 points for a win
    }

    // Update runs scored and against
    teamOne.runsFor += scoreOne;
    teamTwo.runsFor += scoreTwo;
    teamOne.runsAgainst += scoreTwo;
    teamTwo.runsAgainst += scoreOne;

    // Update overs
    teamOne.overs += oversOne;
    teamTwo.overs += oversTwo;

    // Calculate new NRR
    teamOne.NRR = calculateNRR(teamOne);
    teamTwo.NRR = calculateNRR(teamTwo);
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

// Event listener for updating statistics
document.getElementById('updateButton').addEventListener('click', () => {
    const teamOneName = document.getElementById('teamOne').value;
    const teamTwoName = document.getElementById('teamTwo').value;
    const scoreOne = parseInt(document.getElementById('scoreOne').value, 10);
    const oversOne = parseInt(document.getElementById('oversOne').value, 10);
    const scoreTwo = parseInt(document.getElementById('scoreTwo').value, 10);
    const oversTwo = parseInt(document.getElementById('oversTwo').value, 10);

    const teamOne = teams.find(team => team.name === teamOneName);
    const teamTwo = teams.find(team => team.name === teamTwoName);

    updateTeamStatistics(teamOne, teamTwo, scoreOne, oversOne, scoreTwo, oversTwo);
    sortTeams();
    displayStandings();
});

// Display initial standings
displayStandings();
