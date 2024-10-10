// script.js

function calculateNRR(team) {
    let runsScored, oversFaced, runsConceded, oversBowled;

    // Get values for the specified team
    if (team === 'Woodlands') {
        runsScored = parseFloat(document.getElementById('teamWoodlandsRunsScored').value);
        oversFaced = parseFloat(document.getElementById('teamWoodlandsOversFaced').value);
        runsConceded = parseFloat(document.getElementById('teamWoodlandsRunsConceded').value);
        oversBowled = parseFloat(document.getElementById('teamWoodlandsOversBowled').value);
    } else if (team === 'Bhairava') {
        runsScored = parseFloat(document.getElementById('teamBhairavaRunsScored').value);
        oversFaced = parseFloat(document.getElementById('teamBhairavaOversFaced').value);
        runsConceded = parseFloat(document.getElementById('teamBhairavaRunsConceded').value);
        oversBowled = parseFloat(document.getElementById('teamBhairavaOversBowled').value);
    } else if (team === 'Khiladis') {
        runsScored = parseFloat(document.getElementById('teamKhiladisRunsScored').value);
        oversFaced = parseFloat(document.getElementById('teamKhiladisOversFaced').value);
        runsConceded = parseFloat(document.getElementById('teamKhiladisRunsConceded').value);
        oversBowled = parseFloat(document.getElementById('teamKhiladisOversBowled').value);
    } else if (team === 'Bulls') {
        runsScored = parseFloat(document.getElementById('teamBullsRunsScored').value);
        oversFaced = parseFloat(document.getElementById('teamBullsOversFaced').value);
        runsConceded = parseFloat(document.getElementById('teamBullsRunsConceded').value);
        oversBowled = parseFloat(document.getElementById('teamBullsOversBowled').value);
    } else if (team === 'BBVS') {
        runsScored = parseFloat(document.getElementById('teamBBVSRunsScored').value);
        oversFaced = parseFloat(document.getElementById('teamBBVSOversFaced').value);
        runsConceded = parseFloat(document.getElementById('teamBBVSRunsConceded').value);
        oversBowled = parseFloat(document.getElementById('teamBBVSOversBowled').value);
    }

    // Calculate NRR
    const nrr = (runsScored / oversFaced) - (runsConceded / oversBowled);

    // Display the result
    document.getElementById(`result${team}`).innerText = `Predicted Net Run Rate (NRR) for ${team}: ${nrr.toFixed(2)}`;

    // Update the NRR in standings
    document.getElementById(`nrr${team}`).innerText = nrr.toFixed(2);

    // Recalculate and sort standings
    updateStandings();
}

function updateStandings() {
    const teams = [
        { name: 'Woodlands', elementId: 'nrrWoodlands' },
        { name: 'Bhairava', elementId: 'nrrBhairava' },
        { name: 'Khiladis', elementId: 'nrrKhiladis' },
        { name: 'Bulls', elementId: 'nrrBulls' },
        { name: 'BBVS', elementId: 'nrrBBVS' },
    ];

    // Sort teams by NRR
    teams.sort((a, b) => {
        const nrrA = parseFloat(document.getElementById(a.elementId).innerText);
        const nrrB = parseFloat(document.getElementById(b.elementId).innerText);
        return nrrB - nrrA; // Sort descending
    });

    // Update the standings table
    const standingsBody = document.getElementById('standingsBody');
    standingsBody.innerHTML = ''; // Clear current standings

    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${index + 1}</td> <!-- Placeholder for matches played -->
            <td>${index + 1}</td> <!-- Placeholder for wins -->
            <td>${index + 1}</td> <!-- Placeholder for losses -->
            <td>${index + 1}</td> <!-- Placeholder for points -->
            <td id="${team.elementId}">${document.getElementById(team.elementId).innerText}</td>
        `;
        standingsBody.appendChild(row);
    });
}
