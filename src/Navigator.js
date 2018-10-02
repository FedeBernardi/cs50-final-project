import {createStackNavigator} from 'react-navigation';

import CityScreen from './screens/CityScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import LodginScreen from './screens/LodginScreen';
import AirplanesScreen from './screens/AirplanesScreen';
import TicketsScreen from './screens/TicketsScreen';
import TripScreen from './screens/TripScreen';

import { APP_NAME } from './Utils/constants';

export default Navigator = createStackNavigator(
    {
        Trip: TripScreen,
        City: CityScreen,
        Airplanes: AirplanesScreen,
        Lodgin: LodginScreen,
        Itinerary: ItineraryScreen,
        Tickets: TicketsScreen
    },
    {
        headerLayoutPreset: 'center',
        navigationOptions: () => ({
            headerTitle: APP_NAME,
            headerMode: 'screen',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#FF637D'
            }
        }),
    }
);

