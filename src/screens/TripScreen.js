import React from 'react';
import {View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {selectedCityFromTrip} from '../redux/actions';

import Hamburguer from '../components/Hamburguer';
import {HeaderTitleFromState} from '../components/HeaderTitle';
import CityCard from '../components/CityCard';

class TripScreen extends React.Component {
    static navigationOptions = (props) => ({
        headerLeft: <Hamburguer
            title={'Menu'}
            onPress={() => props.navigation.toggleDrawer()}
        />,
        headerTitle: <HeaderTitleFromState />
    });

    constructor(props) {
        super(props);
        this.renderCityCard = this.renderCityCard.bind(this);
        this.handleCitySelection = this.handleCitySelection.bind(this);
    }

    handleCitySelection(cityName, index) {
        const cityTitle = {
            title: cityName,
            subtitle: this.props.trip.name
        };

        this.props.selectedCityFromTrip(index);
        this.props.navigation.navigate('City', {cityTitle});
    }

    renderCityCard(city, index) {
        const from = new Date(city.dates.from),
              to = new Date(city.dates.to);

        // The index is passed in order to get the position of the city selected
        return <TouchableOpacity
            key={index}
            onPress={() => this.handleCitySelection(city.cityName, index)}
        >
            <CityCard key={index} cityName={city.cityName} fromDate={from} toDate={to}/>
        </TouchableOpacity>;
    }

    render() {
        return <View style={styles.container}>
            <ScrollView>
                {this.props.trip && this.props.trip.cities.map(this.renderCityCard)}
            </ScrollView>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    }
});

const mapStateToProps = (store) => {
    const selectedTrip = store.trip.trips.filter(trip => trip.id === store.trip.selectedTrip);

    return {
        trip: selectedTrip[0]
    }
}

export default connect(mapStateToProps, {selectedCityFromTrip})(TripScreen);
