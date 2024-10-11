const teams = [
    { name: "TOOFAN", matches: 4, won: 3, lost: 1, points: 6, winPercentage: "75.00%", NRR: 0.4787, runsFor: 576, runsAgainst: 531 },
    { name: "TOP GUNS", matches: 4, won: 3, lost: 1, points: 6, winPercentage: "75.00%", NRR: -0.2971, runsFor: 596, runsAgainst: 583 },
    { name: "WOODLANDS UNITED", matches: 4, won: 2, lost: 2, points: 4, winPercentage: "50.00%", NRR: 0.9092, runsFor: 562, runsAgainst: 494 },
    { name: "BHAIRAVA", matches: 4, won: 2, lost: 2, points: 4, winPercentage: "50.00%", NRR: 0.1158, runsFor: 527, runsAgainst: 543 },
    { name: "WOODLANDS KHILADIS", matches: 4, won: 1, lost: 3, points: 2, winPercentage: "25.00%", NRR: -0.5558, runsFor: 501, runsAgainst: 588 },
    { name: "RAGING BULLS", matches: 4, won: 1, lost: 3, points: 2, winPercentage: "25.00%", NRR: -0.7326, runsFor: 501, runsAgainst: 524 }
];

// Historical match data
const matchHistory = [
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS KHILADIS", winner: "WOODLANDS KHILADIS" },
    { teamOne: "TOOFAN", teamTwo: "BHAIRAVA", winner: "TOOFAN" },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS UNITED", winner: "WOODLANDS UNITED" },
    { teamOne: "RAGING BULLS", teamTwo: "BHAIRAVA", winner: "BHAIRAVA" },
    { teamOne: "TOP GUNS", teamTwo: "TOOFAN", winner: "TOP GUNS" },
    { teamOne: "WOODLANDS UNITED", teamTwo: "WOODLANDS KHILADIS", winner: "WOODLANDS UNITED" },
    { teamOne: "TOOFAN", teamTwo: "WOODLANDS UNITED", winner: "TOOFAN" },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS KHILADIS", winner: "RAGING BULLS" },
    { teamOne: "TOP GUNS", teamTwo: "BHAIRAVA", winner: "TOP GUNS" },
    { teamOne: "BHAIRAVA", teamTwo: "WOODLANDS KHILADIS", winner: "BHAIRAVA" },
    { teamOne: "TOOFAN", teamTwo: "RAGING BULLS", winner: "TOOFAN" },
    { teamOne: "WOODLANDS UNITED", teamTwo: "BHAIRAVA", winner: "WOODLANDS UNITED" },
    { teamOne: "TOP GUNS", teamTwo: "TOOFAN", winner: "TOOFAN" },
    { teamOne: "TOP GUNS", teamTwo: "RAGING BULLS", winner: "TOP GUNS" }
];

// Function to update team statistics
function updateTeamStats() {
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
            <td>${team.winPercentage}</td>
            <td>${team.NRR.toFixed(4)}</td>
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
    // Logic to handle match result submission can be added here
    alert("Match result submitted!");
});

// Initialize
populateDropdowns();
updateTeamStats();
