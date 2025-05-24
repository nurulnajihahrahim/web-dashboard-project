const API_KEY = 'f369d041f86c62a24d7f6e56063f2068'; // Replace with your real TMDB API key

async function getMovies() {
  const query = document.getElementById('search').value || 'popular';
  const url = query === 'popular'
    ? `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  const button = document.querySelector('button');
  button.textContent = 'Loading...';
  try {
    const res = await fetch(url);
    const data = await res.json();
    const top5 = data.results.slice(0, 5);

    const labels = top5.map(movie => movie.title);
    const ratings = top5.map(movie => movie.vote_average);

    const ctx = document.getElementById('movieChart').getContext('2d');
    if (window.movieChart instanceof Chart) {
      window.movieChart.destroy();
    }
    window.movieChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Ratings',
          data: ratings,
          backgroundColor: '#800000',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  } catch (error) {
    alert('Failed to fetch movies. Please try again later.');
    console.error(error);
  } finally {
    button.textContent = 'Search';
  }
}


getMovies();