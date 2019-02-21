import React from 'react';
import PropTypes from 'prop-types';
import {Button, View, StyleSheet} from 'react-native';

import {getPlaces} from '../../api/placesApi';
import {isEmpty} from '../../utils/functions';

import TypeSearch from './TypeSearch';
import CityOption from './CityOption';
import DatePicker from './DatePicker';

export default class CitySubForm extends React.Component {

    static propTypes = {
        onSaveHandler: PropTypes.func.isRequired,
        minDate: PropTypes.object.isRequired,
        isFromCalendarDisabled: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedCity: {},
            fromDate: props.minDate,
            toDate: props.minDate
        }

        this.selectionHandler = this.selectionHandler.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    // Calls the api to get the places to suggest.
    searchFunction(queryString) {
        return getPlaces(queryString);
    }

    mapOptions(city) {
        return <CityOption description={city.description}/>;
    }

    selectionHandler(city) {
        this.setState({selectedCity: city});
    }

    // Formats and sends the form info to the parent component
    onSave() {
        const cityObject = {
            cityName: this.state.selectedCity.description,
            id: this.state.selectedCity.id,
            dates: {
                from: this.state.fromDate,
                to: this.state.toDate
            },
            itinerary: []
        }
        this.props.onSaveHandler(cityObject);
    }

    dateSelectedHandler(date, typeDate) {
        if (typeDate === 'fromDate') {
            if (date > this.state.toDate) {
                this.setState({fromDate: date, toDate: date});
            } else {
                this.setState({fromDate: date});
            }
            
        } else {
            this.setState({toDate: date});
        }
    }

    render() {
        return <View>
            <TypeSearch
                placeholder={'Enter a city'}
                searchFunction={this.searchFunction}
                onSelection={this.selectionHandler}
                mapToComponent={this.mapOptions}
            />
            <View style={styles.datePickersContainer}>
                <DatePicker
                    dateSelectedHandler={(date) => this.dateSelectedHandler(date, 'fromDate')}
                    minDate={this.state.fromDate}
                    selectedDate={this.state.fromDate}
                    isDisabled={this.props.isFromCalendarDisabled}
                />
                <DatePicker
                    dateSelectedHandler={(date) => this.dateSelectedHandler(date, 'toDate')}
                    minDate={this.state.fromDate}
                    selectedDate={this.state.toDate}
                />
            </View>
            <Button title='Add!' onPress={this.onSave} disabled={isEmpty(this.state.selectedCity)}/>
        </View>;
    }
}

const styles = StyleSheet.create({
    datePickersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
