async function getCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();
  const region = document.getElementById('regionFilter').value;
  const filtered = region === 'all' ? data : data.filter(c => c.region === region);

  const sorted = filtered.sort((a, b) => b.population - a.population).slice(0, 5);
  const labels = sorted.map(c => c.name.common);
  const populations = sorted.map(c => c.population);

  const ctx = document.getElementById('countryChart').getContext('2d');
  if (window.countryChart instanceof Chart) {
    window.countryChart.destroy();
  }
  window.countryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: `Population`,
        data: populations,
        backgroundColor: 'rgba(16, 185, 129, 0.7)'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

getCountries();
