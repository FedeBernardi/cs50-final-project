import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import {isEmpty} from '../utils/functions';

import CitySubForm from './formComponents/CitySubForm';
import CityCard from './CityCard';
import IconButton from './IconButton';

export default class AddTripForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tripName: '',
            cities: [{}]
        }

        this.addNewCity = this.addNewCity.bind(this);
        this.isAddCityDisabled = this.isAddCityDisabled.bind(this);
        this.saveCityHandler = this.saveCityHandler.bind(this);
        this.removeCity = this.removeCity.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }

    // Adds a new space in the cities array
    addNewCity() {
        this.setState({cities: [...this.state.cities, {}]})
    }

    removeCity() {
        let {cities} = this.state;
        cities.pop();

        // If there are no more populated cities in the array
        // we push a new empty object to show the city form
        if (cities.length < 1) {
            this.setState({cities: [{}]})
        } else {
            this.setState({cities: [...cities]});
        }
    }

    isAddCityDisabled() {
        let emptyCities = this.getEmptyCities();

        return !!emptyCities.length;
    }

    isRemoveCityDisabled() {
        return this.state.cities.length <= 1 && isEmpty(this.state.cities[0]);
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

    onChangeName(value) {
        this.setState({tripName: value});
    }

    isFormReady() {
        return isEmpty(this.state.cities[0]) || this.state.tripName.length < 4;
    }

    render() {
        const emptyCities = this.getEmptyCities(),
              submitedCities = this.getSubmitedCities();

        return <KeyboardAvoidingView
            behavior="position"
            style={styles.container}
        >
            <View style={styles.tripNameInputContainer}>
                <Text style={styles.label}>Name of the trip</Text>
                <TextInput style={styles.input} onChange={this.onChangeName}/>
            </View>
            <View style={styles.citiesHeader}>
                <Text style={[styles.label, styles.citiesLabel]}>Cities</Text>
                <View style={styles.iconsContainer}>
                    <IconButton
                        iconName={'ios-add-circle-outline'}
                        disabled={this.isAddCityDisabled()}
                        callback={this.addNewCity}
                        style={styles.addIcon}
                    />
                    <IconButton
                        iconName={'ios-trash'}
                        disabled={this.isRemoveCityDisabled()}
                        callback={this.removeCity}
                    />
                </View>
            </View>
            {submitedCities.map((city, index) => (
                <View style={styles.cityCardContainer} key={index}>
                    <CityCard
                        cityName={city.cityName}
                        fromDate={city.dates.from}
                        toDate={city.dates.to}
                    />
                </View>
            ))}
            {emptyCities.map((value, index) => (
                <CitySubForm
                    key={index}
                    onSaveHandler={this.saveCityHandler}
                    minDate={this.getMinDate()}
                />
            ))}
            <Button
                style={styles.submitButton}
                title={'Create trip!'}
                onPress={() => console.log('asd')}
                underlineColorAndroid='transparent'
                disabled={this.isFormReady()}
            />
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 70
    },
    tripNameInputContainer: {
        marginBottom: 30
    },
    input: {
        marginBottom: 10,
        width: '100%',
        height: 40,
        paddingLeft: 5,
        borderWidth: 1,
        backgroundColor: '#FFF'
    },
    citiesLabel: {
        marginRight: 50
    },
    label: {
        fontSize: 25,
        marginBottom: 15
    },
    cityCardContainer: {
        marginBottom: 20
    },
    submitButton: {
        alignSelf: 'flex-end'
    }
});
