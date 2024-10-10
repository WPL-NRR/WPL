<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cricket Team NRR Predictor</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 800px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h1, h2, h3 {
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }

        label {
            display: block;
            margin: 10px 0 5px;
            color: #555;
        }

        input, select {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
        }

        button {
            padding: 10px 15px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #218838;
        }

        #result {
            margin-top: 20px;
            font-weight: bold;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Cricket Team NRR Predictor</h1>
        
        <h2>Current Standings</h2>
        <table>
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Matches Played</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Points</th>
                    <th>Net Run Rate (NRR)</th>
                </tr>
            </thead>
            <tbody id="standingsBody">
                <tr>
                    <td>Top Guns</td>
                    <td>4</td>
                    <td>3</td>
                    <td>1</td>
                    <td>6</td>
                    <td>-0.2971</td>
                </tr>
                <tr>
                    <td>Toofan</td>
                    <td>4</td>
                    <td>3</td>
                    <td>1</td>
                    <td>6</td>
                    <td>0.4787</td>
                </tr>
                <tr>
                    <td>Woodlands United</td>
                    <td>4</td>
                    <td>2</td>
                    <td>2</td>
                    <td>4</td>
                    <td>0.9092</td>
                </tr>
                <tr>
                    <td>Bhairava</td>
                    <td>4</td>
                    <td>2</td>
                    <td>2</td>
                    <td>4</td>
                    <td>0.1158</td>
                </tr>
                <tr>
                    <td>Woodlands Khiladis</td>
                    <td>4</td>
                    <td>1</td>
                    <td>3</td>
                    <td>2</td>
                    <td>-0.5558</td>
                </tr>
                <tr>
                    <td>Raging Bulls</td>
                    <td>4</td>
                    <td>1</td>
                    <td>3</td>
                    <td>2</td>
                    <td>-0.7326</td>
                </tr>
            </tbody>
        </table>

        <h2>Update NRR</h2>
        <div id="matchInput">
            <h3>Your Team Input</h3>
            <label for="teamSelect">Select Your Team:</label>
            <select id="teamSelect">
                <option value="Top Guns">Top Guns</option>
                <option value="Toofan">Toofan</option>
                <option value="Woodlands United">Woodlands United</option>
                <option value="Bhairava">Bhairava</option>
                <option value="Woodlands Khiladis">Woodlands Khiladis</option>
                <option value="Raging Bulls">Raging Bulls</option>
            </select>

            <label for="teamRunsScored">Total Runs Scored:</label>
            <input type="number" id="teamRunsScored" required>
            <label for="teamOversFaced">Total Overs Faced:</label>
            <input type="number" id="teamOversFaced" step="0.1" required>

            <h3>Opponent Team Input</h3>
            <label for="oppositionSelect">Select Opposition:</label>
            <select id="oppositionSelect">
                <option value="Top Guns">Top Guns</option>
                <option value="Toofan">Toofan</option>
                <option value="Woodlands United">Woodlands United</option>
                <option value="Bhairava">Bhairava</option>
                <option value="Woodlands Khiladis">Woodlands Khiladis</option>
                <option value="Raging Bulls">Raging Bulls</option>
            </select>

            <label for="oppositionRunsScored">Opposition Team Score:</label>
            <input type="number" id="oppositionRunsScored" required>
            <label for="oppositionOversBowled">Total Overs Bowled:</label>
            <input type="number" id="oppositionOversBowled" step="0.1" required>

            <button onclick="calculateMatchResult()">Calculate NRR & Update Points</button>
            <p id="result"></p>
        </div>
    </div>

    <script>
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

                    // Calculate new NRR for the opposition
                    const updatedOppositionNRR = calculateNRR(
                        parseInt(row.cells[5].innerText) * (matchesPlayed - 1) + oppositionScore,
                        matchesPlayed,
                        oppositionScore,
                        oversBowled
                    );

                    row.cells[5].innerText = updatedOppositionNRR; // Update NRR for opposition
                }
            }

            // Display the new NRR
            document.getElementById('result').innerText = `New NRR for ${team}: ${nrr}`;
            alert(`Match Result: ${team} won against ${opposition}.`);
            sortStandings(); // Sort standings after updating points
        }

It looks like the script was incomplete. Here’s the full JavaScript code along with the sort functionality to ensure everything works correctly:

```html
<script>
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

                // Calculate new NRR for the opposition
                const updatedOppositionNRR = calculateNRR(
                    parseFloat(row.cells[5].innerText) * (matchesPlayed - 1) + oppositionScore,
                    matchesPlayed,
                    oppositionScore,
                    oversBowled
                );

                row.cells[5].innerText = updatedOppositionNRR; // Update NRR for opposition
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
</script>
