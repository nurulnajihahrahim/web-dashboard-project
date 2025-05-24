let allDrivers = [];
let f1Chart;

async function getF1Standings() {
  const res = await fetch('https://ergast.com/api/f1/2024/driverStandings.json');
  const data = await res.json();
  const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  allDrivers = standings;

  const top5 = standings.slice(0, 5);
  const labels = top5.map(d => `${d.Driver.givenName} ${d.Driver.familyName}`);
  const points = top5.map(d => parseInt(d.points));

  const ctx = document.getElementById('f1Chart').getContext('2d');
  if (f1Chart instanceof Chart) f1Chart.destroy();
  f1Chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Championship Points',
        data: points,
        backgroundColor: '#800000'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const teams = new Set();
  allDrivers.forEach(driver => teams.add(driver.Constructors[0].name));
  const dropdown = document.getElementById('teamDropdown');
  teams.forEach(team => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = team;
    dropdown.appendChild(option);
  });

  renderDrivers(allDrivers);
}

function renderDrivers(driverList) {
  const photoGrid = document.getElementById('driverPhotos');
  photoGrid.innerHTML = '';
  driverList.forEach(driver => {
    const block = `
      <div class="text-center">
        <div class="w-24 h-24 bg-beigeDark rounded-full mx-auto flex items-center justify-center font-bold text-sm">
          ${driver.Driver.givenName[0]}${driver.Driver.familyName[0]}
        </div>
        <div class="font-semibold mt-2">${driver.Driver.givenName} ${driver.Driver.familyName}</div>
        <div class="text-sm text-gray-500">${driver.Constructors[0].name}</div>
      </div>
    `;
    photoGrid.innerHTML += block;
  });
}

function filterByTeam() {
  const selected = document.getElementById('teamDropdown').value;
  const filtered = selected === 'all'
    ? allDrivers
    : allDrivers.filter(d => d.Constructors[0].name === selected);
  renderDrivers(filtered);
}

window.onload = () => {
  getF1Standings();
};
