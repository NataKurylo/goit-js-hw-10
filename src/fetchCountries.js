const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = countryName => fetch(`${ BASE_URL }/name/${countryName}?fields=name,capital,population,flags,languages`).then
    (response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
})