import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';

import {getPlaces} from '../api/placesApi';

import TypeSearch from './formComponents/TypeSearch';
import CityOption from './formComponents/CityOption';
import AddButton from './AddButton';

export default class AddTripForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cities: [{}]
        }

        this.selectionHandler = this.selectionHandler.bind(this);
        this.addNewCity = this.addNewCity.bind(this);
    }

    // Calls the api to get the places to suggest.
    searchFunction(queryString) {
        return getPlaces(queryString);
    }

    selectionHandler(city, index) {
        let cities = this.state.cities;
        cities[index] = city;
        this.setState({cities: [...cities]});
    }

    mapCities(city) {
        return <CityOption description={city.description}/>
    }

    addNewCity() {
        this.setState({cities: [...this.state.cities, {}]})
    }

    render() {
        return <KeyboardAvoidingView
            behavior="position"
            style={styles.container}
            keyboardVerticalOffset={200}
        >
            <View style={styles.citiesHeader}>
                <Text style={[styles.label, styles.citiesLabel]}>Cities</Text>
                <AddButton callback={this.addNewCity}/>
            </View>
            {this.state.cities.map((value, index) => (
                <TypeSearch
                    placeholder={'Enter a city'}
                    searchFunction={this.searchFunction}
                    onSelection={this.selectionHandler}
                    mapToComponent={this.mapCities}
                    index={index}
                    key={index}
                />
            ))}
        </KeyboardAvoidingView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 10
    },
    citiesHeader: {
        flexDirection: 'row'
    },
    citiesLabel: {
        marginRight: 50
    },
    label: {
        fontSize: 25,
        marginBottom: 15
    },
});
