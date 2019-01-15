import {mockedCities} from '../../staticData';

const BASE_URL = 'https://maps.googleapis.com';

export async function getPlaces(input) {
    return mockedCities;
    const response = await fetch(`${BASE_URL}/maps/api/place/autocomplete/json?input=${input}&type=(cities)&key=${API_KEY}`);
    const data = await response.json();

    cities = processPlaces(data);

    return cities;
}

function processPlaces(data) {
    return data.predictions.map((city) => ({description: city.description, id: city.place_id}));
}

export async function getAddresses(input, city) {
    const response = await fetch(`${BASE_URL}/maps/api/place/autocomplete/json?input=${city}, ${input}&types=address&language=en_US&key=${API_KEY}`);
    const data = await response.json();

    return processData(data);
}

function processData(data) {
    return data.predictions.map((address) => address.description);
}

export async function getAllPlaces(input, city) {
    const response = await fetch(`${BASE_URL}/maps/api/place/autocomplete/json?input=${city}, ${input}&language=en_US&key=${API_KEY}`);
    const data = await response.json();

    return processData(data);
}
