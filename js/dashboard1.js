async function getWeather() {
  const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=3.14&longitude=101.69&current_weather=true');
  const data = await res.json();
  const temp = data.current_weather.temperature;

  new Chart(document.getElementById('weatherChart'), {
    type: 'bar',
    data: {
      labels: ['Temperature (°C)'],
      datasets: [{
        label: 'Kuala Lumpur',
        data: [temp],
        backgroundColor: ['#3b82f6']
      }]
    }
  });
}

getWeather();
