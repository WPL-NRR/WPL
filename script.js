const teams = [
    { name: "TOOFAN", matches: 4, won: 3, lost: 1, points: 6, winPercentage: "75.00%", NRR: 0.4787, runsFor: 576, runsAgainst: 531 },
    { name: "TOP GUNS", matches: 4, won: 3, lost: 1, points: 6, winPercentage: "75.00%", NRR: -0.2971, runsFor: 596, runsAgainst: 583 },
    { name: "WOODLANDS UNITED", matches: 4, won: 2, lost: 2, points: 4, winPercentage: "50.00%", NRR: 0.9092, runsFor: 562, runsAgainst: 494 },
    { name: "BHAIRAVA", matches: 4, won: 2, lost: 2, points: 4, winPercentage: "50.00%", NRR: 0.1158, runsFor: 527, runsAgainst: 543 },
    { name: "WOODLANDS KHILADIS", matches: 4, won: 1, lost: 3, points: 2, winPercentage: "25.00%", NRR: -0.5558, runsFor: 501, runsAgainst: 588 },
    { name: "RAGING BULLS", matches: 4, won: 1, lost: 3, points: 2, winPercentage: "25.00%", NRR: -0.7326, runsFor: 501, runsAgainst: 524 }
];

// Function to calculate NRR
function calculateNRR(runsFor, runsAgainst, oversFaced) {
    if (oversFaced === 0) return 0; // Avoid division by zero
    return ((runsFor / oversFaced) - (runsAgainst / oversFaced)).toFixed(4);
}

// Function to update team statistics
function updateTeamStats(winningTeam, losingTeam, winningScore, losingScore, oversWon, oversLost) {
    // Update matches played
    winningTeam.matches++;
    losingTeam.matches++;

    // Update wins and losses
    winningTeam.won++;
    losingTeam.lost++;

    // Update points
    winningTeam.points += 2;

    // Update runs scored and conceded
    winningTeam.runsFor += winningScore;
    winningTeam.runsAgainst += losingScore;
    losingTeam.runsFor += losingScore;
    losingTeam.runsAgainst += winningScore;

    // Calculate new NRR
    winningTeam.NRR = calculateNRR(winningTeam.runsFor, winningTeam.runsAgainst, winningTeam.matches * 22); // Assuming each team plays 22 overs in matches
    losingTeam.NRR = calculateNRR(losingTeam.runsFor, losingTeam.runsAgainst, losingTeam.matches * 22);
}

// Function to update and display the team statistics
function displayTeamStats() {
    const tbody = document.querySelector("#teamStats tbody");
    tbody.innerHTML = ""; // Clear existing data
    teams.sort((a, b) => b.points - a.points || b.NRR - a.NRR); // Sort by points and NRR
    teams.forEach((team, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.matches}</td>
            <td>${team.won}</td>
            <td>${team.lost}</td>
            <td>${team.points}</td>
            <td>${((team.won / team.matches) * 100 || 0).toFixed(2)}%</td>
            <td>${team.NRR}</td>
            <td>${team.runsFor}</td>
            <td>${team.runsAgainst}</td>
        `;
    });
}

// Populate team dropdowns
function populateDropdowns() {
    const teamOneSelect = document.getElementById("teamOne");
    const teamTwoSelect = document.getElementById("teamTwo");
    teams.forEach(team => {
        const optionOne = document.createElement("option");
        optionOne.value = team.name;
        optionOne.textContent = team.name;
        teamOneSelect.appendChild(optionOne);

        const optionTwo = document.createElement("option");
        optionTwo.value = team.name;
        optionTwo.textContent = team.name;
        teamTwoSelect.appendChild(optionTwo);
    });
}

// Event listener for match submission
document.getElementById("submitMatch").addEventListener("click", function() {
    const teamOneName = document.getElementById("teamOne").value;
    const teamTwoName = document.getElementById("teamTwo").value;
    const scoreOne = parseInt(document.getElementById("scoreOne").value);
    const scoreTwo = parseInt(document.getElementById("scoreTwo").value);
    const oversOne = parseFloat(document.getElementById("oversOne").value);
    const oversTwo = parseFloat(document.getElementById("oversTwo").value);

    // Find the teams in the array
    const teamOne = teams.find(team => team.name === teamOneName);
    const teamTwo = teams.find(team => team.name === teamTwoName);

    // Determine winner and update stats
    if (scoreOne > scoreTwo) {
        updateTeamStats(teamOne, teamTwo, scoreOne, scoreTwo, oversOne, oversTwo);
    } else {
        updateTeamStats(teamTwo, teamOne, scoreTwo, scoreOne, oversTwo, oversOne);
    }

    // Update display
    displayTeamStats();
});

// Initialize
document.addEventListener("DOMContentLoaded", function() {
    populateDropdowns();
    displayTeamStats();
});
