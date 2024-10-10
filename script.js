function calculateNRR(runsScored, oversFaced, oppositionScore, oversBowled) {
    const runRateTeam = runsScored / oversFaced;
    const runRateOpposition = oppositionScore / oversBowled;
    return (runRateTeam - runRateOpposition).toFixed(4);
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

    // Update points and matches played
    const standings = document.getElementById('standingsBody').getElementsByTagName('tr');

    for (let row of standings) {
        if (row.cells[0].innerText === team) {
            let teamPoints = parseInt(row.cells[4].innerText);
            let teamWins = parseInt(row.cells[2].innerText);
            teamPoints += 2; // Add points for winning
            teamWins += 1; // Increment wins
            row.cells[2].innerText = teamWins; // Update wins
            row.cells[4].innerText = teamPoints; // Update points
            row.cells[5].innerText = nrr; // Update NRR
        }

        if (row.cells[0].innerText === opposition) {
            const matchesPlayed = parseInt(row.cells[1].innerText) + 1;
            row.cells[1].innerText = matchesPlayed; // Update matches played
        }
    }

    // Display the new NRR
    document.getElementById('result').innerText = `New NRR for ${team}: ${nrr}`;
    alert(`Match Result: ${team} won against ${opposition}.`);
    sortStandings(); // Sort standings after updating points
}

function sortStandings() {
    const table = document.getElementById("standingsBody");
    const rows = Array.from(table.rows);
    rows.sort((a, b) => {
        const pointsA = parseInt(a.cells[4].innerText);
        const pointsB = parseInt(b.cells[4].innerText);
        if (pointsA === pointsB) {
            // If points are equal, sort by NRR
            const nrrA = parseFloat(a.cells[5].innerText);
            const nrrB = parseFloat(b.cells[5].innerText);
            return nrrB - nrrA; // Sort by NRR descending
        }
        return pointsB - pointsA; // Sort by points descending
    });
    // Clear existing rows
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    // Append sorted rows
    rows.forEach(row => table.appendChild(row));
}

// Event listener for the button
document.getElementById('calculateButton').addEventListener('click', calculateMatchResult);
