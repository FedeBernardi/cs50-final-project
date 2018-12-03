//aviation-edge

const API_KEY = 'faf958-d346b1',
      BASE_URL = 'https://aviation-edge.com/v2/public';

// export async function getFlight(flightIataCode) {
//     try{
//         const flight = await callApiForFlight(flightIataCode),
//               departureAirport = await callApiForAirport(flight.departure.iataCode),
//               departureCity = await callApiForCity(departureAirport.codeIataCity),
//               arrivalAirport = await callApiForAirport(flight.arrival.iataCode),
//               arrivalCity = await callApiForCity(arrivalAirport.codeIataCity);

//         return {
//             flightNumber: flight.flight.iataNumber,
//             departureAirport: {
//                 iataCode: departureAirport.codeIataAirport,
//                 nameAirport: departureAirport.nameAirport,
//                 city: departureCity.nameCity,
//                 country: departureAirport.nameCountry
//             },
//             arrivalAirport: {
//                 iataCode: arrivalAirport.codeIataAirport,
//                 nameAirport: arrivalAirport.nameAirport,
//                 city: arrivalCity.nameCity,
//                 country: arrivalAirport.nameCountry
//             }
//         };
//     } catch (err) {
//         console.log(err);
//     }
// }

export function getFlight() {
    return {
        number: 'TP 1040',
        airline: 'Tap Air Portugal',
        status: 'ON TIME',
        departure: {
            cityIataCode: 'LIS',
            city: 'Lisbon',
            date: 'Sat, October 20',
            time: '9:05 AM',
            terminal: '1',
            gate: '23'
        },
        arrival: {
            cityIataCode: 'BCN',
            city: 'Barcelona',
            date: 'Sat, October 20',
            time: '11:55 AM',
            terminal: '4',
            gate: '3B'
        }
    }
}

async function callApiForFlight(flightIataCode) {
    try {
        const response = await fetch(`${BASE_URL}/flights?key=${API_KEY}&flightIata=${flightIataCode}`),
              flight = await response.json();
        return flight[0];
    } catch (err) {
        console.log(err);
    }
}

async function callApiForAirport(airportIataCode) {
    try {
        const response = await fetch(`${BASE_URL}/airportDatabase?key=${API_KEY}&codeIataAirport=${airportIataCode}`),
              airport = await response.json();

        return airport[0];
    } catch (err) {
        console.log(err);
    }
}

async function callApiForCity(cityIataCode) {
    try {
        const response = await fetch(`${BASE_URL}/cityDatabase?key=${API_KEY}&codeIataCity=${cityIataCode}`),
              city = await response.json();
    
        return city[0];
    } catch (err) {
        console.log(err);
    }
}
