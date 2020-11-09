(() => {
  const symbols = {
    Sunny: '&#x2600;',
    'Partly sunny': '&#x26C5;',
    Overcast: '&#x2601;',
    Rain: '&#x2614;',
    Degrees: '&#176;',
  };

  const elements = document.querySelectorAll('#location, #submit, #forecast, #current, #upcoming');
  const [locationIn, weatherBtn, forecastDiv, current, upcoming] = elements;

  const get = (endpoint = 'locations') => {
    return fetch(`https://judgetests.firebaseio.com/${endpoint}.json`).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    });
  };

  const getWeather = (location) => {
    get()
      .then(async (res) => {
        const locationRegExp = new RegExp(location, 'i');
        const found = res.find((l) => locationRegExp.test(l.name));
        if (!found) {
          throw new Error('Location not found');
        }

        const { code } = found;
        const [{ name, forecast }, coming] = await Promise.all([
          get(`forecast/today/${code}`),
          get(`forecast/upcoming/${code}`),
        ]);
        // teq tuka nqma kvo da gi hvashtam, endpoint gumcopin naprimer (koito e greshen) mi vrushta null vmesto adekvatna network greshka

        current.innerHTML =
          '<div class="label">Current conditions</div>' +
          '<div class="forecasts">' +
          `<span class="condition symbol">${symbols[forecast.condition]}</span>` +
          '<span class="condition">' +
          `<span class="forecast-data">${name}</span>` +
          `<span class="forecast-data">${forecast.low}${symbols.Degrees}/${forecast.high}${symbols.Degrees}</span>` +
          `<span class="forecast-data">${forecast.condition}</span>` +
          '</span>' +
          '</div>';

        upcoming.innerHTML =
          '<div class="label">Three-day forecast</div>' +
          '<div class="forecast-info">' +
          coming.forecast.map(
            ({ condition, high, low }) =>
              '<span class="upcoming">' +
              `<span class="symbol">${symbols[condition]}</span>` +
              `<span class="forecast-data">${low}${symbols.Degrees}/${high}${symbols.Degrees}</span>` +
              `<span class="forecast-data">${condition}</span>` +
              '</span>'
          ) +
          '</div>';
      })
      .catch((error) => ([current.innerHTML, upcoming.innerHTML] = [`Error: ${error.message}`, '']))
      .finally(() => (forecastDiv.style.display = 'block'));
  };

  weatherBtn.addEventListener('click', () => {
    forecastDiv.style.display = 'none';
    const location = locationIn.value.trim();
    if (location) {
      getWeather(location);
    }
  });
})();
