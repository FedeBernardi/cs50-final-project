import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text} from 'react-native';

import {getPlaces} from '../api/placesApi';

import TypeSearch from './formComponents/TypeSearch';
import CityOption from './formComponents/CityOption';

export default class AddTripForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cities: []
        }

        this.selectionHandler = this.selectionHandler.bind(this);
    }

    // Calls the api to get the places to suggest.
    searchFunction(queryString) {
        return getPlaces(queryString);
    }

    selectionHandler(city) {
        this.setState({cities: [...this.state.cities, city]});
    }

    mapCities(city) {
        return <CityOption description={city.description}/>
    }

    render() {
        return <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.label}>Cities</Text>
            <TypeSearch
                placeholder={'Enter a city'}
                searchFunction={this.searchFunction}
                onSelection={this.selectionHandler}
                mapToComponent={this.mapCities}
            />
        </KeyboardAvoidingView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        padding: 10
    },
    label: {
        fontSize: 25,
        marginBottom: 15
    },
});
