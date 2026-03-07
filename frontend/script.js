// public/script.js
document.getElementById('orderForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const selected = Array.from(document.querySelectorAll('input[name="items"]:checked'))
    .map(el => el.value);

  if (selected.length === 0) {
    document.getElementById('confirmation').innerText = '⚠️ Please select at least one item.';
    return;
  }

  try {
    const res = await fetch('/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: selected })
    });

    const data = await res.json();
    document.getElementById('confirmation').innerText = data.message;

    // ✅ Clear checkboxes after successful submission
    document.querySelectorAll('input[name="items"]').forEach(el => el.checked = false);
  } catch (error) {
    document.getElementById('confirmation').innerText = '❌ Error placing order. Try again.';
    console.error('Error:', error);
  }
});
