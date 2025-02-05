// Set up initial score
let currentScore = 100;

// Function to update the score in the UI
function updateScore(score) {
  document.getElementById('currentScore').textContent = score;
}

// Event listener for when an event card is clicked to increase score
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    let eventScore = parseInt(card.querySelector('.score-label span').textContent.split(':')[1]);
    currentScore += eventScore; // Increase current score based on event score
    updateScore(currentScore); // Update score display
  });
});
