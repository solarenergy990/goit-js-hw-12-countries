const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
    if (response.ok === false) {
      return error({ delay: 1000, text: 'Nothing found' }); // in case fetch reacts wrong on error 404
    }

    return response.json();
  });
}

export default { fetchCountries };
