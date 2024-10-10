// script.js

document.getElementById('nrrForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    const runsScored = parseFloat(document.getElementById('runsScored').value);
    const oversFaced = parseFloat(document.getElementById('oversFaced').value);
    const runsConceded = parseFloat(document.getElementById('runsConceded').value);
    const oversBowled = parseFloat(document.getElementById('oversBowled').value);

    // Calculate NRR
    const nrr = (runsScored / oversFaced) - (runsConceded / oversBowled);

    // Display the result
    document.getElementById('result').innerText = `Net Run Rate (NRR): ${nrr.toFixed(2)}`;
});
