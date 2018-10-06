const BASE_URL = 'https://maps.googleapis.com';

export async function getPlaces(input) {
    const response = await fetch(`${BASE_URL}/maps/api/place/autocomplete/json?input=${input}&type=(cities)&key=${API_KEY}`);
    const data = await response.json();

    cities = processPlaces(data);

    return cities;
}

function processPlaces(data) {
    return data.predictions.map((city) => ({description: city.description, id: city.place_id}));
}
