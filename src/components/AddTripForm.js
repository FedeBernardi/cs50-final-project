import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text} from 'react-native';

import {getPlaces} from '../api/placesApi';

import TypeSearch from './formComponents/TypeSearch';

export default class AddTripForm extends React.Component {
    
    static state = {
        cities = []
    }

    // Calls the api to get the places to suggest.
    searchFunction(queryString) {
        return getPlaces(queryString);
    }

    selectionHandler(city) {
        this.setState({cities: [...this.state.cities, city]})  
    }

    mapCities(city) {
        return <Text>{city.description}</Text>
    }

    render() {
        return <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <TypeSearch 
                label={'City'}
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});
