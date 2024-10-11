const teams = {
    "TOOFAN": {
        runsFor: 576,
        oversFor: 94,
        runsAgainst: 531,
        oversAgainst: 94,
        matchesPlayed: 4,
        won: 3,
        lost: 1,
        points: 6
    },
    "TOP GUNS": {
        runsFor: 596,
        oversFor: 94,
        runsAgainst: 583,
        oversAgainst: 87.5,
        matchesPlayed: 4,
        won: 3,
        lost: 1,
        points: 6
    },
    "WOODLANDS UNITED": {
        runsFor: 562,
        oversFor: 91.1,
        runsAgainst: 494,
        oversAgainst: 94,
        matchesPlayed: 4,
        won: 2,
        lost: 2,
        points: 4
    },
    "BHAIRAVA": {
        runsFor: 527,
        oversFor: 83.5,
        runsAgainst: 543,
        oversAgainst: 88,
        matchesPlayed: 4,
        won: 2,
        lost: 2,
        points: 4
    },
    "WOODLANDS KHILADIS": {
        runsFor: 501,
        oversFor: 84.5,
        runsAgainst: 588,
        oversAgainst: 91,
        matchesPlayed: 4,
        won: 1,
        lost: 3,
        points: 2
    },
    "RAGING BULLS": {
        runsFor: 501,
        oversFor: 91,
        runsAgainst: 524,
        oversAgainst: 84,
        matchesPlayed: 4,
        won: 1,
        lost: 3,
        points: 2
    },
};

document.getElementById("matchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const teamOne = document.getElementById("teamOne").value;
    const scoreOne = parseInt(document.getElementById("scoreOne").value);
    const oversOne = parseFloat(document.getElementById("oversOne").value);
    const teamTwo = document.getElementById("teamTwo").value;
    const scoreTwo = parseInt(document.getElementById("scoreTwo").value);
    const oversTwo = parseFloat(document.getElementById("oversTwo").value);

    // Update team statistics
    updateTeamStats(teamOne, scoreOne, oversOne, teamTwo, scoreTwo, oversTwo);

    // Clear the form
    document.getElementById("matchForm").reset();
});

function updateTeamStats(teamOne, scoreOne, oversOne, teamTwo, scoreTwo, oversTwo) {
    // Update team one stats
    teams[teamOne].runsFor += scoreOne;
    teams[teamOne].oversFor += oversOne;
    teams[teamOne].matchesPlayed += 1;

    // Update team two stats
    teams[teamTwo].runsFor += scoreTwo;
    teams[teamTwo].oversFor += oversTwo;
    teams[teamTwo].matchesPlayed += 1;

    // Update runs against
    teams[teamOne].runsAgainst += scoreTwo;
    teams[teamTwo].runsAgainst += scoreOne;

    teams[teamOne].oversAgainst += oversTwo;
    teams[teamTwo].oversAgainst += oversOne;

    // Update wins and losses
    if (scoreOne > scoreTwo) {
        teams[teamOne].won += 1;
        teams[teamTwo].lost += 1;
        teams[teamOne].points += 2;
    } else {
        teams[teamTwo].won += 1;
        teams[teamOne].lost += 1;
        teams[teamTwo].points += 2;
    }

    // Update NRR and display
    updateDisplay();
}

function calculateNRR(runsFor, oversFor, runsAgainst, oversAgainst) {
    return (runsFor / oversFor) - (runsAgainst / oversAgainst);
}

function updateDisplay() {
    const tableBody = document.getElementById("teamStats").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear existing rows

    let teamDataArray = [];

    // Calculate NRR for each team and add to an array for sorting
    for (const team in teams) {
        const teamStats = teams[team];
        const netRR = calculateNRR(teamStats.runsFor, teamStats.oversFor, teamStats.runsAgainst, teamStats.oversAgainst);

        teamDataArray.push({
            teamName: team,
            matchesPlayed: teamStats.matchesPlayed,
            won: teamStats.won,
            lost: teamStats.lost,
            points: teamStats.points,
            winPercentage: ((teamStats.won / teamStats.matchesPlayed) * 100).toFixed(2) + "%",
            netRR: netRR.toFixed(4),
            runsFor: teamStats.runsFor,
            runsAgainst: teamStats.runsAgainst
        });
    }

    // Sort teams by NRR in descending order
    teamDataArray.sort((a, b) => parseFloat(b.netRR) - parseFloat(a.netRR));

    // Update the table with sorted teams
    let sNo = 1;
    teamDataArray.forEach((teamData) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = sNo++;
        row.insertCell(1).textContent = teamData.teamName;
        row.insertCell(2).textContent = teamData.matchesPlayed;
        row.insertCell(3).textContent = teamData.won;
        row.insertCell(4).textContent = teamData.lost;
        row.insertCell(5).textContent = teamData.points;
        row.insertCell(6).textContent = teamData.winPercentage;
        row.insertCell(7).textContent = teamData.netRR;
        row.insertCell(8).textContent = teamData.runsFor;
        row.insertCell(9).textContent = teamData.runsAgainst;
    });
}
