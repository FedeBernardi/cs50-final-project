import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';

import {isEmpty} from '../utils/functions';

import CitySubForm from './formComponents/CitySubForm';
import AddButton from './AddButton';

export default class AddTripForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cities: [{}]
        }

        this.addNewCity = this.addNewCity.bind(this);
        this.isAddCityDisabled = this.isAddCityDisabled.bind(this);
        this.saveCityHandler = this.saveCityHandler.bind(this);
    }

    // Adds a new space in the cities array
    addNewCity() {
        this.setState({cities: [...this.state.cities, {}]})
    }

    isAddCityDisabled() {
        let emptyCities = this.getEmptyCities();

        return !!emptyCities.length;
    }

    getSubmitedCities() {
        return  this.state.cities.filter((city) => !isEmpty(city));
    }

    getEmptyCities() {
        return this.state.cities.filter((city) => isEmpty(city));
    }

    saveCityHandler(cityObject) {
        let cities = this.state.cities;
        cities[this.state.cities.length - 1] = cityObject;
        this.setState({cities: [...cities]});
    }

    // Returns the corresponding min date depending on the last city sub-form submitted
    getMinDate() {
        let lastDate = new Date();
        const {cities} = this.state;
        const lastCity = cities.length > 1 ? cities[cities.length - 2] : cities[0];

        // We use the Date constructor despite of returning the same object structure
        // due to the "day + 1" which could lead to an error in cases where the finishDate
        // is the last day of a month, Date takes care of this cases.
        if (!isEmpty(lastCity)) {
            let {to} = lastCity.dates;
            lastDate = new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1);
        }

        return lastDate;
    }

    render() {
        const emptyCities = this.getEmptyCities(),
              submitedCities = this.getSubmitedCities();

        return <KeyboardAvoidingView
            behavior="position"
            style={styles.container}
            keyboardVerticalOffset={200}
        >
            <View style={styles.citiesHeader}>
                <Text style={[styles.label, styles.citiesLabel]}>Cities</Text>
                <AddButton disabled={this.isAddCityDisabled()} callback={this.addNewCity}/>
            </View>
            {/* {submitedCities.map((city, index) => (
                <Text>{city.description}</Text>
            ))} */}
            {emptyCities.map((value, index) => (
                <CitySubForm
                    key={index}
                    onSaveHandler={this.saveCityHandler}
                    minDate={this.getMinDate()}
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
