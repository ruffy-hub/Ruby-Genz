// Fetch and Display Scores
fetch('/scores')
    .then(response => response.json())
    .then(data => {
        document.getElementById('scores').innerHTML = data.map(score =>
            `<p>Event ID: ${score.event_id}, Score: ${score.score}, Date: ${score.date}</p>`
        ).join('');
    });

// Register Event
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const eventData = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        participants: document.getElementById('participants').value,
        rules: document.getElementById('rules').value
    };
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    }).then(response => response.json())
      .then(data => alert(data.message));
});

// Ask AI
document.getElementById('askForm').addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: document.getElementById('query').value })
    }).then(response => response.json())
      .then(data => {
          document.getElementById('aiResponse').innerText = data.response;
      });
});
