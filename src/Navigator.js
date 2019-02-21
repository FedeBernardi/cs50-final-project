import React from 'react';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

import CityScreen from './screens/CityScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import LodgingScreen from './screens/LodgingScreen';
import TicketsScreen from './screens/TicketsScreen';
import TripScreen from './screens/TripScreen';
import AddTripScreen from './screens/AddTripScreen';
import ItineraryDayViewScreen from './screens/ItineraryDayViewScreen';
import ItineraryItemDetailsScreen from './screens/ItineraryItemDetailsScreen';

import SideMenu from './components/navigation/SideMenu';

const StackNavigator = createStackNavigator(
    {
        Trip: TripScreen,
        City: CityScreen,
        Lodging: LodgingScreen,
        Itinerary: ItineraryScreen,
        Tickets: TicketsScreen,
        AddTrip: AddTripScreen,
        ItineraryDayView: ItineraryDayViewScreen,
        ItineraryItemDetails: ItineraryItemDetailsScreen
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

