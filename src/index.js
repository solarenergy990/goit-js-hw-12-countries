import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import countryCard from '../src/templates/country-card.hbs';
import countryListCard from '../src/templates/country-list.hbs';
import API from './js/fetchCountries';
import debounce from 'lodash.debounce';
import getRefs from './js/refs';

const refs = getRefs();

const onSearch = searchQuery => {
  refs.cardContainer.innerHTML = '';
  if (!searchQuery) {
    return;
  }
  API.fetchCountries(searchQuery).then(renderCountries).catch(onError);
};

function renderCountries(country) {
  if (country.length >= 10) {
    return error({
      delay: 2000,
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
  if (country.length >= 2 && country.length <= 10) {
    const countryListMarkup = countryListCard(country);
    return (refs.cardContainer.innerHTML = countryListMarkup);
  }

  if (country.length === 1) {
    const countryMarkup = countryCard(country);
    refs.cardContainer.innerHTML = countryMarkup;
  }
}

const onError = () => {
  return error({ delay: 2000, text: 'Nothing found' });
};

refs.searchForm.addEventListener(
  'input',
  debounce(evt => onSearch(evt.target.value.trim()), 500),
);
