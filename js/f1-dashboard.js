    let allDrivers = [];
    let f1Chart;

    async function getF1Standings() {
      const res = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
      const data = await res.json();
      const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      allDrivers = standings;

      const top5 = standings.slice(0, 5);
      const labels = top5.map(d => `${d.Driver.givenName} ${d.Driver.familyName}`);
      const points = top5.map(d => parseInt(d.points));

      if (f1Chart instanceof Chart) f1Chart.destroy();
      const ctx = document.getElementById('f1Chart').getContext('2d');
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
        options: { scales: { y: { beginAtZero: true } } }
      });

      const photoGrid = document.getElementById('driverPhotos');
      photoGrid.innerHTML = '';
      top5.forEach(driver => {
        const img = `https://flagsapi.com/${driver.Driver.nationality.slice(0, 2).toUpperCase()}/flat/64.png`;
        photoGrid.innerHTML += `
          <div class="text-center">
            <img src="${img}" alt="${driver.Driver.familyName}" class="w-24 h-24 object-cover rounded-full mx-auto mb-2">
            <div class="font-semibold">${driver.Driver.givenName} ${driver.Driver.familyName}</div>
            <div class="text-sm text-gray-500">${driver.Constructors[0].name}</div>
          </div>`;
      });
    }

    async function getRaceSchedule() {
      const res = await fetch('https://ergast.com/api/f1/current.json');
      const data = await res.json();
      const races = data.MRData.RaceTable.Races;

      const tbody = document.getElementById('raceSchedule');
      tbody.innerHTML = '';
      races.forEach(race => {
        const row = `
          <tr class="border-t">
            <td class="p-2">${race.round}</td>
            <td class="p-2">${race.raceName}</td>
            <td class="p-2">${race.date}</td>
            <td class="p-2">${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</td>
          </tr>`;
        tbody.innerHTML += row;
      });
    }

    function searchDriver() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const photoGrid = document.getElementById('driverPhotos');
      const filtered = allDrivers.filter(d => `${d.Driver.givenName} ${d.Driver.familyName}`.toLowerCase().includes(query));
      photoGrid.innerHTML = '';
      filtered.forEach(driver => {
        const img = `https://flagsapi.com/${driver.Driver.nationality.slice(0, 2).toUpperCase()}/flat/64.png`;
        photoGrid.innerHTML += `
          <div class="text-center">
            <img src="${img}" alt="${driver.Driver.familyName}" class="w-24 h-24 object-cover rounded-full mx-auto mb-2">
            <div class="font-semibold">${driver.Driver.givenName} ${driver.Driver.familyName}</div>
            <div class="text-sm text-gray-500">${driver.Constructors[0].name}</div>
          </div>`;
      });
    }

    window.onload = () => {
      getF1Standings();
      getRaceSchedule();
    };
