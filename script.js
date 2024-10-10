// script.js

function calculateNRR(team) {
    let runsScored, oversFaced, runsConceded, oversBowled;

    // Get values for the specified team
    if (team === 'Khiladis') {
        runsScored = parseFloat(document.getElementById('teamKhiladisRunsScored').value);
        oversFaced = parseFloat(document.getElementById('teamKhiladisOversFaced').value);
        runsConceded = parseFloat(document.getElementById('teamKhiladisRunsConceded').value);
        oversBowled = parseFloat(document.getElementById('teamKhiladisOversBowled').value);
    } else if (team === 'Bulls') {
        runsScored = parseFloat(document.getElementById('teamBullsRunsScored').value);
        oversFaced = parseFloat(document.getElementById('teamBullsOversFaced').value);
        runsConceded = parseFloat(document.getElementById('teamBullsRunsConceded').value);
        oversBowled = parseFloat(document.getElementById('teamBullsOversBowled').value);
    }

    // Calculate NRR
    const nrr = (runsScored / oversFaced) - (runsConceded / oversBowled);

    // Display the result
    document.getElementById(`result${team}`).innerText = `Predicted Net Run Rate (NRR) for ${team}: ${nrr.toFixed(2)}`;
}
