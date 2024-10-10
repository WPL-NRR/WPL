// script.js
// Historical match data
const historicalMatches = [
    { team1: "TOP GUNS", team2: "WOODLANDS KHILADIS", score1: 139, overs1: 22, score2: 140, overs2: 15.5 },
    { team1: "TOOFAN", team2: "BHAIRAVA", score1: 148, overs1: 22, score2: 132, overs2: 22 },
    { team1: "RAGING BULLS", team2: "WOODLANDS UNITED", score1: 107, overs1: 22, score2: 109, overs2: 19.1 },
    { team1: "RAGING BULLS", team2: "BHAIRAVA", score1: 122, overs1: 22, score2: 124, overs2: 17.5 },
    { team1: "TOP GUNS", team2: "TOOFAN", score1: 151, overs1: 24.2, score2: 144, overs2: 25 },
    { team1: "WOODLANDS UNITED", team2: "WOODLANDS KHILADIS", score1: 166, overs1: 25, score2: 98, overs2: 20.3 },
    { team1: "TOOFAN", team2: "WOODLANDS UNITED", score1: 130, overs1: 22, score2: 129, overs2: 21.5 },
    { team1: "RAGING BULLS", team2: "WOODLANDS KHILADIS", score1: 153, overs1: 22, score2: 137, overs2: 20.3 },
    { team1: "TOP GUNS", team2: "BHAIRAVA", score1: 147, overs1: 22, score2: 141, overs2: 21.5 },
    { team1: "BHAIRAVA", team2: "WOODLANDS KHILADIS", score1: 130, overs1: 21, score2: 126, overs2: 22 },
    { team1: "TOOFAN", team2: "RAGING BULLS", score1: 154, overs1: 25, score2: 119, overs2: 22 },
    { team1: "TOP GUNS", team2: "WOODLANDS UNITED", score1: 159, overs1: 25, score2: 158, overs2: 25 }
];

let previousMatches = [...historicalMatches];

const calculateNRR = (team) => {
    let totalRunsScored = 0;
    let totalOversFaced = 0;
    let totalRunsConceded = 0;
    let totalOversBowled = 0;

    previousMatches.forEach(match => {
        if (match.team1 === team) {
            totalRunsScored += match.score1;
            totalOversFaced += match.overs1;
            totalRunsConceded += match.score2;
            totalOversBowled += match.overs2;
        } else if (match.team2 === team) {
            totalRunsScored += match.score2;
            totalOversFaced += match.overs2;
            totalRunsConceded += match.score1;
            totalOversBowled += match.overs1;
        }
    });

    const nrr = totalOversFaced && totalOversBowled ? ((totalRunsScored / totalOversFaced) - (totalRunsConceded / totalOversBowled)).toFixed(4) : 0;
    return nrr;
};

const calculateMatchResult = () => {
    const team = document.getElementById("teamSelect").value;
    const opposition = document.getElementById("oppositionSelect").value;

    if (team === opposition) {
        document.getElementById("result").innerText = "Please select different teams for both.";
        return;
    }

    if (previousMatches.some(match => (match.team1 === team && match.team2 === opposition) || (match.team1 === opposition && match.team2 === team))) {
        document.getElementById("result").innerText = `${team} and ${opposition} have already played one match against each other.`;
        return;
    }

    const teamRunsScored = parseInt(document.getElementById("teamRunsScored").value);
    const teamOversFaced = parseFloat(document.getElementById("teamOversFaced").value);
    const oppositionRunsScored = parseInt(document.getElementById("oppositionRunsScored").value);
    const oppositionOversBowled = parseFloat(document.getElementById("oppositionOversBowled").value);

    const newMatch = {
        team1: team,
        team2: opposition,
        score1: teamRunsScored,
        overs1: teamOversFaced,
        score2: oppositionRunsScored,
        overs2: oppositionOversBowled
    };

    previousMatches.push(newMatch);
    
    const nrr = calculateNRR(team);
    document.getElementById("result").innerText = `Updated NRR for ${team} is ${nrr}`;

    updateStandings();
};

const updateStandings = () => {
    const standingsBody = document.getElementById("standingsBody");
    standingsBody.innerHTML = ""; // Clear existing rows

    const teams = ["TOP GUNS", "TOOFAN", "WOODLANDS UNITED", "BHAIRAVA", "WOODLANDS KHILADIS", "RAGING BULLS"];
    teams.forEach(team => {
        const nrr = calculateNRR(team);
        const matchesPlayed = previousMatches.filter(match => match.team1 === team || match.team2 === team).length;
        const wins = previousMatches.filter(match => (match.team1 === team && match.score1 > match.score2) || (match.team2 === team && match.score2 > match.score1)).length;
        const losses = matchesPlayed - wins;

        standingsBody.innerHTML += `
            <tr>
                <td>${team}</td>
                <td>${matches### Updated `script.js` (continued)
```javascript
                <td>${matchesPlayed}</td>
                <td>${wins}</td>
                <td>${losses}</td>
                <td>${nrr}</td>
            </tr>`;
    });
};

document.getElementById("calculateBtn").addEventListener("click", calculateMatchResult);
updateStandings();
