let previousMatches = [
    {team1: "TOP GUNS", team2: "WOODLANDS KHILADIS", result: "WOODLANDS KHILADIS", score1: "139", overs1: 22, score2: "140", overs2: 15.5},
    {team1: "TOOFAN", team2: "BHAIRAVA", result: "TOOFAN", score1: "148", overs1: 22, score2: "132", overs2: 22},
    {team1: "RAGING BULLS", team2: "WOODLANDS UNITED", result: "WOODLANDS UNITED", score1: "107", overs1: 22, score2: "109", overs2: 19.1},
    {team1: "RAGING BULLS", team2: "BHAIRAVA", result: "BHAIRAVA", score1: "122", overs1: 22, score2: "124", overs2: 17.5},
    {team1: "TOP GUNS", team2: "TOOFAN", result: "TOP GUNS", score1: "151", overs1: 24.2, score2: "144", overs2: 25},
    {team1: "WOODLANDS UNITED", team2: "WOODLANDS KHILADIS", result: "WOODLANDS UNITED", score1: "166", overs1: 25, score2: "98", overs2: 20.3},
    {team1: "TOOFAN", team2: "WOODLANDS UNITED", result: "TOOFAN", score1: "130", overs1: 22, score2: "129", overs2: 21.5},
    {team1: "RAGING BULLS", team2: "WOODLANDS KHILADIS", result: "RAGING BULLS", score1: "153", overs1: 22, score2: "137", overs2: 20.3},
    {team1: "TOP GUNS", team2: "BHAIRAVA", result: "TOP GUNS", score1: "147", overs1: 22, score2: "141", overs2: 21.5},
    {team1: "BHAIRAVA", team2: "WOODLANDS KHILADIS", result: "BHAIRAVA", score1: "130", overs1: 21, score2:Here’s the updated `script.js` that includes the previous match results to calculate the Net Run Rate (NRR) based on the inputs you provide, along with handling the issue of selecting the same team for both the team and opposition.

### Updated `script.js`

```javascript
let previousMatches = [
    {team1: "TOP GUNS", team2: "WOODLANDS KHILADIS", result: "WOODLANDS KHILADIS", score1: 139, overs1: 22, score2: 140, overs2: 15.5},
    {team1: "TOOFAN", team2: "BHAIRAVA", result: "TOOFAN", score1: 148, overs1: 22, score2: 132, overs2: 22},
    {team1: "RAGING BULLS", team2: "WOODLANDS UNITED", result: "WOODLANDS UNITED", score1: 107, overs1: 22, score2: 109, overs2: 19.1},
    {team1: "RAGING BULLS", team2: "BHAIRAVA", result: "BHAIRAVA", score1: 122, overs1: 22, score2: 124, overs2: 17.5},
    {team1: "TOP GUNS", team2: "TOOFAN", result: "TOP GUNS", score1: 151, overs1: 24.2, score2: 144, overs2: 25},
    {team1: "WOODLANDS UNITED", team2: "WOODLANDS KHILADIS", result: "WOODLANDS UNITED", score1: 166, overs1: 25, score2: 98, overs2: 20.3},
    {team1: "TOOFAN", team2: "WOODLANDS UNITED", result: "TOOFAN", score1: 130, overs1: 22, score2: 129, overs2: 21.5},
    {team1: "RAGING BULLS", team2: "WOODLANDS KHILADIS", result: "RAGING BULLS", score1: 153, overs1: 22, score2: 137, overs2: 20.3},
    {team1: "TOP GUNS", team2: "BHAIRAVA", result: "TOP GUNS", score1: 147, overs1: 22, score2: 141, overs2: 21.5},
    {team1: "BHAIRAVA", team2: "WOODLANDS KHILADIS", result: "BHAIRAVA", score1: 130, overs1: 21, score2: 126, overs2: 22}
];

const calculateNRR = (team, matches) => {
    let totalRunsScored = 0;
    let totalOversFaced = 0;
    let totalRunsConceded = 0;
    let totalOversBowled = 0;

    matches.forEach(match => {
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

    let nrr = ((totalRunsScored / totalOversFaced) - (totalRunsConceded / totalOversBowled)) || 0;
    return nrr.toFixed(4);
};

const calculateMatchResult = () => {
    const team = document.getElementById("teamSelect").value;
    const opposition = document.getElementById("oppositionSelect").value;

    if (team === opposition) {
        document.getElementById("result").innerText = "Please select different teams for both.";
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
    
    const nrr = calculateNRR(team, previousMatches);
    document.getElementById("result").innerText = `Updated NRR for ${team} is ${nrr}`;

    // Optionally, you can display updated standings here.
};

// Initial calculation for existing teams
const initialNRRDisplay = () => {
    const standingsBody = document.getElementById("standingsBody");
    standingsBody.innerHTML = ""; // Clear existing rows

    const teams = ["Top Guns", "Toofan", "Woodlands United", "Bhairava", "Woodlands Khiladis", "Raging Bulls"];
    teams.forEach(team => {
        const nrr = calculateNRR(team, previousMatches);
        standingsBody.innerHTML += `
            <tr>
                <td>${team}</td>
                <td>${Math.floor(Math.random() * 5) + 1}</td>
                <td>${Math.floor(Math.random() * 5)}</td>
                <td>${Math.floor(Math.random() * 5)}</td>
                <td>${Math.floor(Math.random() * 10)}</td>
                <td>${nrr}</td>
            </tr>
        `;
    });
};

initialNRRDisplay();
