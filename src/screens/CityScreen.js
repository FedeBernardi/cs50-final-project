import React from 'react';
import {View, ScrollView, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {updateHeaderTitle} from '../redux/actions';
import HeaderTitle from '../components/HeaderTitle';
import CityDatesCard from '../components/CityDatesCard';
import FlightCard from '../components/FlightCard';

class CityScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <HeaderTitle title={navigation.getParam('cityTitle')}/>
    });

    render() {
        const {prevCity, nextCity, selectedCity} = this.props,
              currentCity = createCityDatesObject(selectedCity);

        return <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <CityDatesCard currentCity={currentCity} prevCity={prevCity} nextCity={nextCity}/>
                {selectedCity.flight && <FlightCard flight={selectedCity.flight}/>}
                <Button title={'Lodgin'} onPress={() => this.props.navigation.navigate('Lodgin')}></Button>
                <Button title={'Itinerary'} onPress={() => this.props.navigation.navigate('Itinerary')}></Button>
                <Button title={'Tickets'} onPress={() => this.props.navigation.navigate('Tickets')}></Button>
            </ScrollView>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#FFF'
    },
    scroll: {
        width: '100%',
    }
});

/**
 * Creates the dates objects that will be passed to the CityDatesCard
 * @param {object} city 
 */
function createCityDatesObject(city) {
    if (city) {
        const from = new Date(city.dates.from),
              to = new Date(city.dates.to),
              fromString = `${from.getMonth() + 1}/${from.getDate()}`,
              toString = `${to.getMonth() + 1}/${to.getDate()}`;

        return {
            name: city.cityName,
            dates: fromString === toString ? fromString : `${fromString} - ${toString}`
        }
    }
}

const mapStateToProps = (store) => {
    const selectedTrip = store.trip.trips.filter(trip => trip.id === store.trip.selectedTrip)[0],
          selectedCityIndex = store.trip.selectedCityIndex,
          selectedCity = selectedTrip.cities[selectedCityIndex],
          nextCity = createCityDatesObject(selectedTrip.cities[selectedCityIndex + 1]),
          prevCity = createCityDatesObject(selectedTrip.cities[selectedCityIndex - 1]);

    return {
        selectedCity,
        nextCity,
        prevCity
    }
}

export default connect(mapStateToProps, {updateHeaderTitle})(CityScreen);
