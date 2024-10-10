// script.js
const historicalMatches = [
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS KHILADIS", teamOneScore: 139, teamOneOvers: 22, teamTwoScore: 140, teamTwoOvers: 15.5 },
    { teamOne: "TOOFAN", teamTwo: "BHAIRAVA", teamOneScore: 148, teamOneOvers: 22, teamTwoScore: 132, teamTwoOvers: 22 },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS UNITED", teamOneScore: 107, teamOneOvers: 22, teamTwoScore: 109, teamTwoOvers: 19.1 },
    { teamOne: "RAGING BULLS", teamTwo: "BHAIRAVA", teamOneScore: 122, teamOneOvers: 22, teamTwoScore: 124, teamTwoOvers: 17.5 },
    { teamOne: "TOP GUNS", teamTwo: "TOOFAN", teamOneScore: 151, teamOneOvers: 24.2, teamTwoScore: 144, teamTwoOvers: 25 },
    { teamOne: "WOODLANDS UNITED", teamTwo: "WOODLANDS KHILADIS", teamOneScore: 166, teamOneOvers: 25, teamTwoScore: 98, teamTwoOvers: 20.3 },
    { teamOne: "TOOFAN", teamTwo: "WOODLANDS UNITED", teamOneScore: 130, teamOneOvers: 22, teamTwoScore: 129, teamTwoOvers: 21.5 },
    { teamOne: "RAGING BULLS", teamTwo: "WOODLANDS KHILADIS", teamOneScore: 153, teamOneOvers: 22, teamTwoScore: 137, teamTwoOvers: 20.3 },
    { teamOne: "TOP GUNS", teamTwo: "BHAIRAVA", teamOneScore: 147, teamOneOvers: 22, teamTwoScore: 141, teamTwoOvers: 21.5 },
    { teamOne: "BHAIRAVA", teamTwo: "WOODLANDS KHILADIS", teamOneScore: 130, teamOneOvers: 21, teamTwoScore: 126, teamTwoOvers: 22 },
    { teamOne: "TOOFAN", teamTwo: "RAGING BULLS", teamOneScore: 154, teamOneOvers: 25, teamTwoScore: 119, teamTwoOvers: 22 },
    { teamOne: "TOP GUNS", teamTwo: "WOODLANDS UNITED", teamOneScore: 159, teamOneOvers: 25, teamTwoScore: 158, teamTwoOvers: 25 }
];

let standings = {
    "Top Guns": { matchesPlayed: 4, wins: 3, losses: 1, points: 6, nrr: -0.2971 },
    "Toofan": { matchesPlayed: 4, wins: 3, losses: 1, points: 6, nrr: 0.4787 },
    "Woodlands United": { matchesPlayed: 4, wins: 2, losses: 2, points: 4, nrr: 0.9092 },
    "Bhairava": { matchesPlayed: 4, wins: 2, losses: 2, points: 4, nrr: 0.1158 },
    "Woodlands Khiladis": { matchesPlayed: 4, wins: 1, losses: 3, points: 2, nrr: -0.5558 },
    "Raging Bulls": { matchesPlayed: 4, wins: 1, losses: 3, points: 2, nrr: -0.7326 }
};

const calculateNRR = (runsScored, oversFaced, oppositionScore, oversBowled) => {
    const runRateTeam = runsScored / oversFaced;
    const runRateOpposition = oppositionScore / oversBowled;
    return (runRateTeam - runRateOpposition).toFixed(4);
};

const calculateMatchResult = () => {
    const team = document.getElementById('teamSelect').value;
    const opposition = document.getElementById('oppositionSelect').value;

Here's the continuation and completion of the updated `script.js`, as well as the `styles.css` file.

### Continued and Updated `script.js`
```javascript
    const teamRunsScored = Number(document.getElementById('teamRunsScored').value);
    const teamOversFaced = Number(document.getElementById('teamOversFaced').value);
    const oppositionRunsScored = Number(document.getElementById('oppositionRunsScored').value);
    const oppositionOversBowled = Number(document.getElementById('oppositionOversBowled').value);

    // Check for duplicate matches
    if (team === opposition) {
        alert("A team cannot play against itself!");
        return;
    }

    // Historical Matches
    const historicalMatchesForTeam = historicalMatches.filter(match => 
        (match.teamOne === team && match.teamTwo === opposition) || 
        (match.teamOne === opposition && match.teamTwo === team)
    );

    if (historicalMatchesForTeam.length >= 5) {
        alert("Maximum number of matches played against this team reached!");
        return;
    }

    // Calculate NRR
    const nrr = calculateNRR(teamRunsScored, teamOversFaced, oppositionRunsScored, oppositionOversBowled);
    const totalMatchesPlayed = standings[team].matchesPlayed + 1;
    
    standings[team].matchesPlayed = totalMatchesPlayed;
    standings[team].nrr = ((standings[team].nrr * (totalMatchesPlayed - 1)) + Number(nrr)) / totalMatchesPlayed;

    // Update Points
    if (teamRunsScored > oppositionRunsScored) {
        standings[team].wins += 1;
        standings[opposition].losses += 1;
        standings[team].points += 2;
    } else {
        standings[opposition].wins += 1;
        standings[team].losses += 1;
        standings[opposition].points += 2;
    }

    // Update the standings display
    displayStandings();
    document.getElementById('result').innerText = `Calculated NRR: ${nrr}`;
};

const displayStandings = () => {
    const standingsBody = document.getElementById('standingsBody');
    standingsBody.innerHTML = '';
    for (let team in standings) {
        const row = `<tr>
            <td>${team}</td>
            <td>${standings[team].matchesPlayed}</td>
            <td>${standings[team].wins}</td>
            <td>${standings[team].losses}</td>
            <td>${standings[team].points}</td>
            <td>${standings[team].nrr.toFixed(4)}</td>
        </tr>`;
        standingsBody.innerHTML += row;
    }
};

document.getElementById('calculateBtn').addEventListener('click', calculateMatchResult);
