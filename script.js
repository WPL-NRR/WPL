const teams = [
    { name: "WOODLANDS UNITED", matches: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "WOODLANDS KHILADIS", matches: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "BHAIRAVA", matches: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "RAGING BULLS", matches: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "TOP GUNS", matches: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: "TOOFAN", matches: 0, wins: 0, losses: 0, points: 0, nrr: 0 },
];

const matchHistory = [
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS KHILADIS", result: "WOODLANDS KHILADIS", scoreSummary: "TOP GUNS: 139/6(22.0) WOODLANDS KHILADIS: 140/4(15.5)" },
    { teamOne: "TOOFAN", teamTwo: "BHAIRAVA", result: "TOOFAN", scoreSummary: "TOOFAN: 148/8(22.0) BHAIRAVA: 132/9(22.0)" },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS UNITED", result: "WOODLANDS UNITED", scoreSummary: "RAGING BULLS: 107/10(22.0) WOODLANDS UNITED: 109/2(19.1)" },
    { teamOne: "RAGING BULLS", teamTwo: "BHAIRAVA", result: "BHAIRAVA", scoreSummary: "RAGING BULLS: 122/11(22.0) BHAIRAVA: 124/4(17.5)" },
    { teamOne: "TOP GUNS", teamTwo: "TOOFAN", result: "TOP GUNS", scoreSummary: "TOP GUNS: 151/11(24.2) TOOFAN: 144/7(25.0)" },
    { teamOne: "WOODLANDS UNITED", teamTwo: "WOODLANDS KHILADIS", result: "WOODLANDS UNITED", scoreSummary: "WOODLANDS UNITED: 166/10(25.0) WOODLANDS KHILADIS: 98/11(20.3)" },
    { teamOne: "TOOFAN", teamTwo: "WOODLANDS UNITED", result: "TOOFAN", scoreSummary: "TOOFAN: 130/10(22.0) WOODLANDS UNITED: 129/11(21.5)" },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS KHILADIS", result: "RAGING BULLS", scoreSummary: "RAGING BULLS: 153/11(22.0) WOODLANDS KHILADIS: 137/11(20.3)" },
    { teamOne: "TOP GUNS", teamTwo: "BHAIRAVA", result: "TOP GUNS", scoreSummary: "TOP GUNS: 147/9(22.0) BHAIRAVA: 141/10(21.5)" },
    { teamOne: "BHAIRAVA", teamTwo: "WOODLANDS KHILADIS", result: "BHAIRAVA", scoreSummary: "BHAIRAVA: 130/11(21.0) WOODLANDS KHILADIS: 126/10(22.0)" },
    { teamOne: "TOOFAN", teamTwo: "RAGING BULLS", result: "TOOFAN", scoreSummary: "TOOFAN: 154/10(25.0) RAGING BULLS: 119/11(22.0)" },
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS UNITED", result: "TOP GUNS", scoreSummary: "TOP GUNS: 159/9(25.0) WOODLANDS UNITED: 158/9(25.0)" },
];

function populateTeamDropdowns() {
    const yourTeamSelect = document.getElementById("yourTeam");
    const opponentTeamSelect = document.getElementById("opponentTeam");

    teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team.name;
        option.textContent = team.name;
        yourTeamSelect.appendChild(option);

        const opponentOption = document.createElement("option");
        opponentOption.value = team.name;
        opponentOption.textContent = team.name;
        opponentTeamSelect.appendChild(opponentOption);
    });
}

function updateStandings() {
    const standingsTable = document.getElementById("standings");
    standingsTable.innerHTML = `
        <tr>
            <th>Team</th>
            <th>Matches Played</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Points</th>
            <th>Net Run Rate (NRR)</th>
        </tr>
    `;

    teams.forEach(team => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.matches}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.points}</td>
            <td>${team.nrr.toFixed(2)}</td>
        `;
        standingsTable.appendChild(row);
    });
}

function calculateNRR() {
    const yourTeam = document.getElementById("yourTeam").value;
    const yourRuns = parseInt(document.getElementById("yourRuns").value);
    const yourOvers = parseFloat(document.getElementById("yourOvers").value);
    const opponentTeam = document.getElementById("opponentTeam").value;
    const opponentRuns = parseInt(document.getElementById("opponentRuns").value);
    const opponentOvers = parseFloat(document.getElementById("opponentOvers").value);

    if (!yourTeam || !opponentTeam || yourTeam === opponentTeam) {
        alert("Please select valid teams.");
        return;
    }

    const yourTeamData = teams.find(team => team.name === yourTeam);
    const opponentTeamData = teams.find(team => team.name === opponentTeam);

    // Ensure each team only plays one match
    if (yourTeamData.matches >= 1 || opponentTeamData.matches >= 1) {
        alert("Each team can only play one match.");
        return;
    }

It seems the previous message was cut off. Here is the continuation of the `script.js` file and the complete updates:

```javascript
    // Update matches played
    yourTeamData.matches++;
    opponentTeamData.matches++;

    // Update runs and overs for NRR calculation
    const yourTeamRunsForNRR = yourRuns;
    const yourTeamOversForNRR = yourOvers;

    const opponentTeamRunsForNRR = opponentRuns;
    const opponentTeamOversForNRR = opponentOvers;

    // Calculate NRR
    const yourNRR = (yourTeamRunsForNRR / yourTeamOversForNRR) - (opponentTeamRunsForNRR / opponentTeamOversForNRR);
    const opponentNRR = (opponentTeamRunsForNRR / opponentTeamOversForNRR) - (yourTeamRunsForNRR / yourTeamOversForNRR);

    // Update NRR for teams
    yourTeamData.nrr = yourNRR;
    opponentTeamData.nrr = opponentNRR;

    // Update points based on results
    if (yourRuns > opponentRuns) {
        yourTeamData.wins++;
        opponentTeamData.losses++;
        yourTeamData.points += 2; // Winner gets 2 points
    } else if (yourRuns < opponentRuns) {
        opponentTeamData.wins++;
        yourTeamData.losses++;
        opponentTeamData.points += 2; // Winner gets 2 points
    } else {
        // In case of a draw
        yourTeamData.points++;
        opponentTeamData.points++;
    }

    // Update standings display
    updateStandings();
}

// Initialize the page
populateTeamDropdowns();
updateStandings();
document.getElementById("calculateButton").addEventListener("click", calculateNRR);
