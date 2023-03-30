const messages = document.getElementById('messages');
const chatForm = document.getElementById('form');
const input = document.getElementById('input');

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = input.value;

  if (message) {
    const response = await fetch('/api/users/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      input.value = '';
      window.location.reload()
    } else {
      alert(response.statusText);
    }
  }
});

function reset() {
  window.scrollTo(0, document.body.scrollHeight);
  input.focus()
}

reset()
