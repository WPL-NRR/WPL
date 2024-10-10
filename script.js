// script.js
let previousMatches = [];

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
                <td>${matchesPlayed}</td>
                <td>${wins}</td>
                <td>${losses}</td>
                <td>${nrr}</td>
            </tr>
        `;
    });
};

// Attach event listener
document.getElementById("calculateBtn").addEventListener("click", calculateMatchResult);

// Initial calculation for existing teams
updateStandings();
