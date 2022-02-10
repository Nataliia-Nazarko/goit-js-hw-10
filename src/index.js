import './css/styles.css';
import Notiflix from 'notiflix';
import API from './fetchCountries';
/* import debounce from 'lodash.debounce'; */

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };

refs.searchBox.addEventListener('submit', _.debounce(onSearch, 300));


function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountryCard(country) {
    if (country > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (2 <= country <= 10) {
        const markup = countryCardTpl(country);
        refs.countryList.innerHTML = markup;
    } else {
            
        countryInfo.insertAdjacentHTML('beforeend', createCountryMarkup((galleryItems) => {
            return galleryItems
                .map(({ preview, original, description }) => {
                    return `
                    <div class="gallery__item">
                        <a class="gallery__link" href="${original}">
                                <img class="gallery__image" 
                                    src="${preview}" 
                                    alt="${description}"
                                />
                            </a>
                    </div >
                    `;
                })
                .join('');
        }
        ));
  
    }
}

function onFetchError(error) {
    if (searchQuery === '404') {
        return Notiflix.Notify.failure('Oops, there is no country with that name');
    }
}

