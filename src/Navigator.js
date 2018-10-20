import React from 'react';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

import CityScreen from './screens/CityScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import LodginScreen from './screens/LodginScreen';
import AirplanesScreen from './screens/AirplanesScreen';
import TicketsScreen from './screens/TicketsScreen';
import TripScreen from './screens/TripScreen';
import AddTripScreen from './screens/AddTripScreen';

import SideMenu from './components/navigationHeader/SideMenu';

const StackNavigator = createStackNavigator(
    {
        Trip: TripScreen,
        City: CityScreen,
        Airplanes: AirplanesScreen,
        Lodgin: LodginScreen,
        Itinerary: ItineraryScreen,
        Tickets: TicketsScreen,
        AddTrip: AddTripScreen
    },
    {
        headerLayoutPreset: 'center',
        navigationOptions: () => ({
            headerMode: 'screen',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#FF637D'
            },
            headerLeftContainerStyle: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 50
            }
        })
    }
);

export default Navigator = createDrawerNavigator(
    {
        Stack: { screen: StackNavigator }
    },
    {
        contentComponent: (props) => <SideMenu {...props} />
    }
);

