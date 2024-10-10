// script.js

// Initialize the history array
let matchHistory = [];

// Add initial match history
const initialHistory = [
    { team1: "TOP GUNS", team2: "WOODLANDS KHILADIS", score1: 139, score2: 140, overs1: 22, overs2: 15.5 },
    { team1: "TOOFAN", team2: "BHAIRAVA", score1: 148, score2: 132, overs1: 22, overs2: 22 },
    { team1: "RAGING BULLS", team2: "WOODLANDS UNITED", score1: 107, score2: 109, overs1: 22, overs2: 19.1 },
    { team1: "RAGING BULLS", team2: "BHAIRAVA", score1: 122, score2: 124, overs1: 22, overs2: 17.5 },
    { team1: "TOP GUNS", team2: "TOOFAN", score1: 151, score2: 144, overs1: 24.2, overs2: 25 },
    { team1: "WOODLANDS UNITED", team2: "WOODLANDS KHILADIS", score1: 166, score2: 98, overs1: 25, overs2: 20.3 },
    { team1: "TOOFAN", team2: "WOODLANDS UNITED", score1: 130, score2: 129, overs1: 22, overs2: 21.5 },
    { team1: "RAGING BULLS", team2: "WOODLANDS KHILADIS", score1: 153, score2: 137, overs1: 22, overs2: 20.3 },
    { team1: "TOP GUNS", team2: "BHAIRAVA", score1: 147, score2: 141, overs1: 22, overs2: 21.5 },
    { team1: "BHAIRAVA", team2: "WOODLANDS KHILADIS", score1: 130, score2: 126, overs1: 21, overs2: 22 },
    { team1: "TOOFAN", team2: "RAGING BULLS", score1: 154, score2: 119, overs1: 25, overs2: 22 },
    { team1: "TOP GUNS", team2: "WOODLANDS UNITED", score1: 159, score2: 158, overs1: 25, overs2: 25 }
];

// Initialize the match history
matchHistory = initialHistory.slice(); // Copy initial history

// Function to calculate NRR
function calculateNRR(score1, overs1, score2, overs2) {
    const netRunRate = ((score1 / overs1) - (score2 / overs2)).toFixed(2);
    return netRunRate;
}

// Function to update team stats
function updateTeamStats(team1, team2, score1, overs1, score2, overs2) {
    const nrr = calculateNRR(score1, overs1, score2, overs2);
    const stats = {
        team: team1,
        matches: 1,
        won: score1 > score2 ? 1 : 0,
        lost: score1 < score2 ? 1 : 0,
        points: score1 > score2 ? 2 : 0,
        nrr: nrr,
        forRuns: score1,
        againstRuns: score2
    };
    
    // Update or add team stats
    const teamStats = document.getElementById("teamStats");
    const existingRow = [...teamStats.rows].find(row => row.cells[1].innerText === team1);
    
    if (existingRow) {
        existingRow.cells[2].innerText = parseInt(existingRow.cells[2].innerText) + stats.matches;
        existingRow.cells[3].innerText = parseInt(existingRow.cells[3].innerText) + stats.won;
        existingRow.cells[4].innerText = parseInt(existingRow.cells[4].innerText) + stats.lost;
        existingRow.cells[5].innerText = parseFloat(existingRow.cells[5].innerText) + stats.points;
        existingRow.cells[8].innerText = `${parseInt(existingRow.cells[8].innerText) + stats.forRuns}/XX.0`;
        existingRow.cells[9].innerText = `${parseInt(existingRow.cells[9].innerText) + stats.againstRuns}/XX.0`;
    } else {
        const newRow = teamStats.insertRow(-1);
        newRow.insertCell(0).innerText = teamStats.rows.length; // S.No
        newRow.insertCell(1).innerText = team1; // Team
        newRow.insertCell(2).innerText = stats.matches; // Mat
        newRow.insertCell(3).innerText = stats.won; // Won
        newRow.insertCell(4).innerText = stats.lost; // Lost
        newRow.insertCell(5).innerText = stats.points; // Pts
        newRow.insertCell(6).innerText = ((stats.won / stats.matches) * 100).toFixed(2) + '%'; // Win%
        newRow.insertCell(7).innerText = nrr; // Net RR
        newRow.insertCell(8).innerText = `${stats.forRuns}/XX.0`; // For
        newRow.insertCell(9).innerText = `${stats.againstRuns}/XX.0`; // Against
    }
}

// Event listener for form submission
document.getElementById("scoreForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const team1 = document.getElementById("team1").value;
    const team1Score = parseInt(document.getElementById("team1Score").value);
    const team1Overs = parseFloat(document.getElementById("team1Overs").value);
    const team2 = document.getElementById("team2").value;
    const team2Score = parseInt(document.getElementById("team2Score").value);
    const team2Overs = parseFloat(document.getElementById("team2Overs").value);

    // Add match data to history
    matchHistory.push({
        team1,
        team2,
        score1: team1Score,
        overs1: team1Overs,
        score2: team2Score,
        overs2: team2Overs
    });

    // Update team stats
    updateTeamStats(team1, team2, team1Score, team1Overs, team2Score, team2Overs);

    // Reset the form
    document.getElementById("scoreForm").reset();
});
