import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import Hamburguer from '../components/Hamburguer';
import CityCard from '../components/CityCard';

class AirplanesScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: <Hamburguer
            title={'Menu'}
            onPress={() => navigation.toggleDrawer()}
        />
    });

    renderCityCard(city, index) {
        const from = new Date(city.dates.from),
              to = new Date(city.dates.to);

        return <CityCard key={index} cityName={city.cityName} fromDate={from} toDate={to}/>
    }

    render() {

        return <View style={styles.container}>
            {this.props.trip && this.props.trip.cities.map(this.renderCityCard)}
            <Button title={'City'} onPress={() => this.props.navigation.navigate('City')}></Button>
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

export default connect(mapStateToProps, null)(AirplanesScreen);
