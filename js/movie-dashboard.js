// Driver Search
document.getElementById('driverSearch').addEventListener('input', async function () {
  const query = this.value.toLowerCase();
  const res = await fetch('https://api.openf1.org/v1/drivers');
  const drivers = await res.json();

  const match = drivers.find(d => {
    const name = `${d.first_name} ${d.last_name}`.toLowerCase();
    return name.includes(query);
  });

  const container = document.getElementById('driverInfo');
  if (match) {
    container.innerHTML = `
      <p><strong>Name:</strong> ${match.first_name} ${match.last_name}</p>
      <p><strong>Team:</strong> ${match.team_name || 'N/A'}</p>
      <p><strong>Car Number:</strong> ${match.driver_number}</p>
      <p><strong>Country:</strong> ${match.country_code || 'N/A'}</p>
    `;
  } else {
    container.innerHTML = '<p>No driver found.</p>';
  }
});

// Circuit Search
document.getElementById('circuitSearch').addEventListener('input', async function () {
  const query = this.value.toLowerCase();
  const res = await fetch('https://api.openf1.org/v1/sessions');
  const sessions = await res.json();

  const match = sessions.find(s => s.circuit_short_name.toLowerCase().includes(query));

  const container = document.getElementById('circuitInfo');
  if (match) {
    container.innerHTML = `
      <p><strong>Circuit:</strong> ${match.circuit_short_name}</p>
      <p><strong>Location:</strong> ${match.location}</p>
      <p><strong>Country:</strong> ${match.country_code}</p>
      <p><strong>Session Start:</strong> ${match.session_start}</p>
    `;
  } else {
    container.innerHTML = '<p>No circuit found.</p>';
  }
});
