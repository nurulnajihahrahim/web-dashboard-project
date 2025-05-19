async function getCrypto() {
  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
  const data = await res.json();
  const prices = [data.bitcoin.usd, data.ethereum.usd];

  new Chart(document.getElementById('cryptoChart'), {
    type: 'bar',
    data: {
      labels: ['Bitcoin', 'Ethereum'],
      datasets: [{
        label: 'Price (USD)',
        data: prices,
        backgroundColor: ['#f7931a', '#3c3c3d']
      }]
    }
  });
}

getCrypto();
