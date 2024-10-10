const previousMatches = [
    { teamOne: 'TOP GUNS', teamTwo: 'WOODLANDS KHILADIS', result: 'WOODLANDS KHILADIS won', teamOneRuns: 139, teamTwoRuns: 140, teamOneOvers: 22.0, teamTwoOvers: 15.5 },
    { teamOne: 'TOOFAN', teamTwo: 'BHAIRAVA', result: 'TOOFAN won', teamOneRuns: 148, teamTwoRuns: 132, teamOneOvers: 22.0, teamTwoOvers: 22.0 },
    { teamOne: 'RAGING BULLS', teamTwo: 'WOODLANDS UNITED', result: 'WOODLANDS UNITED won', teamOneRuns: 107, teamTwoRuns: 109, teamOneOvers: 22.0, teamTwoOvers: 19.1 },
    { teamOne: 'RAGING BULLS', teamTwo: 'BHAIRAVA', result: 'BHAIRAVA won', teamOneRuns: 122, teamTwoRuns: 124, teamOneOvers: 22.0, teamTwoOvers: 17.5 },
    { teamOne: 'TOP GUNS', teamTwo: 'TOOFAN', result: 'TOP GUNS won', teamOneRuns: 151, teamTwoRuns: 144, teamOneOvers: 24.2, teamTwoOvers: 25.0 },
    { teamOne: 'WOODLANDS UNITED', teamTwo: 'WOODLANDS KHILADIS', result: 'WOODLANDS UNITED won', teamOneRuns: 166, teamTwoRuns: 98, teamOneOvers: 25.0, teamTwoOvers: 20.3 },
    { teamOne: 'TOOFAN', teamTwo: 'WOODLANDS UNITED', result: 'TOOFAN won', teamOneRuns: 130, teamTwoRuns: 129, teamOneOvers: 22.0, teamTwoOvers: 21.5 },
    { teamOne: 'RAGING BULLS', teamTwo: 'WOODLANDS KHILADIS', result: 'RAGING BULLS won', teamOneRuns: 153, teamTwoRuns: 137, teamOneOvers: 22.0, teamTwoOvers: 20.3 },
    { teamOne: 'TOP GUNS', teamTwo: 'BHAIRAVA', result: 'TOP GUNS won', teamOneRuns: 147, teamTwoRuns: 141, teamOneOvers: 22.0, teamTwoOvers: 21.5 },
    { teamOne: 'BHAIRAVA', teamTwo: 'WOODLANDS KHILADIS', result: 'BHAIRAVA won', teamOneRuns: 130, teamTwoRuns: 126, teamOneOvers: 21.0, teamTwoOvers: 22.0 },
    { teamOne: 'TOOFAN', teamTwo: 'RAGING BULLS', result: 'TOOFAN won', teamOneRuns: 154, teamTwoRuns: 119, teamOneOvers: 25.0, teamTwoOvers: 22.0 },
    { teamOne: 'TOP GUNS', teamTwo: 'WOODLANDS UNITED', result: 'TOP GUNS won', teamOneRuns: 159, teamTwoRuns: 158, teamOneOvers: 25.0, teamTwoOvers: 25.0 },
];

const teams = [
    { name: 'TOP GUNS', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'WOODLANDS KHILADIS', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'TOOFAN', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'BHAIRAVA', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'RAGING BULLS', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'WOODLANDS UNITED', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
];

// Initialize teams data
function initializeTeams() {
    previousMatches.forEach(match => {
        const teamOne = teams.find(team => team.name === match.teamOne);
        const teamTwo = teams.find(team => team.name === match.teamTwo);
        
        if (match.result.includes('won')) {
            teamOne.wins++;
            teamTwo.losses++;
            teamOne.points += 3; // Assuming 3 points for a win
        } else {
            teamTwo.wins++;
            teamOne.losses++;
            teamTwo.points += 3; // Assuming 3 points for a win
        }
        
        teamOne.matches.push(match);
        teamTwo.matches.push(match);
        
        const teamOneNRR = calculateNRR(match.teamOneRuns, match.teamOneOvers, match.teamTwoRuns, match.teamTwoOvers);
        const teamTwoNRR = calculateNRRHere’s the corrected and complete version of the **script.js** file:

### **script.js**
```javascript
const previousMatches = [
    { teamOne: 'TOP GUNS', teamTwo: 'WOODLANDS KHILADIS', result: 'WOODLANDS KHILADIS won', teamOneRuns: 139, teamTwoRuns: 140, teamOneOvers: 22.0, teamTwoOvers: 15.5 },
    { teamOne: 'TOOFAN', teamTwo: 'BHAIRAVA', result: 'TOOFAN won', teamOneRuns: 148, teamTwoRuns: 132, teamOneOvers: 22.0, teamTwoOvers: 22.0 },
    { teamOne: 'RAGING BULLS', teamTwo: 'WOODLANDS UNITED', result: 'WOODLANDS UNITED won', teamOneRuns: 107, teamTwoRuns: 109, teamOneOvers: 22.0, teamTwoOvers: 19.1 },
    { teamOne: 'RAGING BULLS', teamTwo: 'BHAIRAVA', result: 'BHAIRAVA won', teamOneRuns: 122, teamTwoRuns: 124, teamOneOvers: 22.0, teamTwoOvers: 17.5 },
    { teamOne: 'TOP GUNS', teamTwo: 'TOOFAN', result: 'TOP GUNS won', teamOneRuns: 151, teamTwoRuns: 144, teamOneOvers: 24.2, teamTwoOvers: 25.0 },
    { teamOne: 'WOODLANDS UNITED', teamTwo: 'WOODLANDS KHILADIS', result: 'WOODLANDS UNITED won', teamOneRuns: 166, teamTwoRuns: 98, teamOneOvers: 25.0, teamTwoOvers: 20.3 },
    { teamOne: 'TOOFAN', teamTwo: 'WOODLANDS UNITED', result: 'TOOFAN won', teamOneRuns: 130, teamTwoRuns: 129, teamOneOvers: 22.0, teamTwoOvers: 21.5 },
    { teamOne: 'RAGING BULLS', teamTwo: 'WOODLANDS KHILADIS', result: 'RAGING BULLS won', teamOneRuns: 153, teamTwoRuns: 137, teamOneOvers: 22.0, teamTwoOvers: 20.3 },
    { teamOne: 'TOP GUNS', teamTwo: 'BHAIRAVA', result: 'TOP GUNS won', teamOneRuns: 147, teamTwoRuns: 141, teamOneOvers: 22.0, teamTwoOvers: 21.5 },
    { teamOne: 'BHAIRAVA', teamTwo: 'WOODLANDS KHILADIS', result: 'BHAIRAVA won', teamOneRuns: 130, teamTwoRuns: 126, teamOneOvers: 21.0, teamTwoOvers: 22.0 },
    { teamOne: 'TOOFAN', teamTwo: 'RAGING BULLS', result: 'TOOFAN won', teamOneRuns: 154, teamTwoRuns: 119, teamOneOvers: 25.0, teamTwoOvers: 22.0 },
    { teamOne: 'TOP GUNS', teamTwo: 'WOODLANDS UNITED', result: 'TOP GUNS won', teamOneRuns: 159, teamTwoRuns: 158, teamOneOvers: 25.0, teamTwoOvers: 25.0 },
];

const teams = [
    { name: 'TOP GUNS', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'WOODLANDS KHILADIS', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'TOOFAN', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'BHAIRAVA', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'RAGING BULLS', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
    { name: 'WOODLANDS UNITED', matches: [], wins: 0, losses: 0, points: 0, nrr: 0 },
];

// Initialize teams data
function initializeTeams() {
    previousMatches.forEach(match => {
        const teamOne = teams.find(team => team.name === match.teamOne);
        const teamTwo = teams.find(team => team.name === match.teamTwo);
        
        if (match.result.includes('won')) {
            teamOne.wins++;
            teamTwo.losses++;
            teamOne.points += 3; // Assuming 3 points for a win
        } else {
            teamTwo.wins++;
            teamOne.losses++;
            teamTwo.points += 3; // Assuming 3 points for a win
        }
        
        teamOne.matches.push(match);
        teamTwo.matches.push(match);
        
        // Calculate NRR
        teamOne.nrr = calculateNRR(teamOne);
        teamTwo.nrr = calculateNRR(teamTwo);
    });
}

// Calculate NRR for a team
function calculateNRR(team) {
    let totalRunsScored = 0;
    let totalOversFaced = 0;
    let totalRunsConceded = 0;
    let totalOversBowled = 0;

    team.matches.forEach(match => {
        if (match.teamOne === team.name) {
            totalRunsScored += match.teamOneRuns;
            totalOversFaced += match.teamOneOvers;
            totalRunsConceded += match.teamTwoRuns;
            totalOversBowled += match.teamTwoOvers;
        } else {
            totalRunsScored += match.teamTwoRuns;
            totalOversFaced += match.teamTwoOvers;
            totalRunsConceded += match.teamOneRuns;
            totalOversBowled += match.teamOneOvers;
        }
    });

    const nrr = (totalRunsScored / totalOversFaced) - (totalRunsConceded / totalOversBowled);
    return isNaN(nrr) ? 0 : nrr; // Return 0 if NRR is NaN
}

// Populate dropdowns
function populateDropdowns() {
    const teamSelect = document.getElementById('teamSelect');
    const oppositionSelect = document.getElementById('oppositionSelect');

    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });

    teamSelect.addEventListener('change', () => {
        oppositionSelect.innerHTML = ''; // Clear previous options
        teams.forEach(team => {
            if (team.name !== teamSelect.value) {
                const option = document.createElement('option');
                option.value = team.name;
                option.textContent = team.name;
                oppositionSelect.appendChild(option);
            }
        });
    });
}

// Calculate match result and update NRR
function calculateMatchResult() {
    const selectedTeam = document.getElementById('teamSelect').value;
    const oppositionTeam = document.getElementById('oppositionSelect').value;
    const teamRunsScored = parseInt(document.getElementById('teamRunsScored').value);
    const teamOversFaced = parseFloat(document.getElementById('teamOversFaced').value);
    const oppositionRunsScored = parseInt(document.getElementById('oppositionRunsScored').value);
    const oppositionOversBowled = parseFloat(document.getElementById('oppositionOversBowled').value);

    if (!selectedTeam || !oppositionTeam) {
        document.getElementById('result').textContent = "Please select teams.";
        return;
    }

    // Update teams
    const team = teams.find(t => t.name === selectedTeam);
    const opposition = teams.find(t => t.name === oppositionTeam);

    if (team.matches.length >= 5 || opposition.matches.length >= 5) {
        document.getElementById('result').textContent = "Each team can only play 5 matches.";
        return;
    }

    // Create a match result object
    const matchResult = {
        teamOne: selectedTeam,
        teamTwo: oppositionTeam,
        teamOneRuns: teamRunsScored,
        teamTwoRuns: oppositionRunsScored,
        teamOneOvers: teamOversFaced,
        teamTwoOvers: oppositionOversBowled,
        result: teamRunsScored > oppositionRunsScored ? `${selectedTeam} won` : `${oppositionTeam} won`
    };

    // Update teams with the new match result
    team.matches.push(matchResult);
    opposition.matches.push(matchResult);

    if (matchResult.result.includes('won')) {
        team.wins++;
        opposition.losses++;
        team.points += 3; // Assuming 3 points for a win
    } else {
        opposition.wins++;
        team.losses++;
        opposition.points += 3; // Assuming 3 points for a win
    }

    // Update NRR
    team.nrr = calculateNRR(team);
    opposition.nrr = calculateNRR(opposition);

    // Display result
    document.getElementById('result').textContent = `Match Result: ${matchResult.result}. ${selectedTeam} NRR:Here's the continuation and completion of the **script.js** file:

### **script.js** (continued)
```javascript
    document.getElementById('result').textContent += ` NRR: ${team.nrr.toFixed(2)}, ${oppositionTeam} NRR: ${opposition.nrr.toFixed(2)}`;

    // Update the standings table
    updateStandings();
}

// Update the standings table in the HTML
function updateStandings() {
    const standingsBody = document.getElementById('standingsBody');
    standingsBody.innerHTML = ''; // Clear previous standings

    teams.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.wins + team.losses}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.points}</td>
            <td>${team.nrr.toFixed(2)}</td>
        `;
        standingsBody.appendChild(row);
    });
}

// Initialize the application
initializeTeams();
populateDropdowns();
updateStandings();
