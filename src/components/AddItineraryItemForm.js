import React from 'react';
import {View, Text, TimePickerAndroid, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getAllPlaces} from '../api/placesApi';
import {getDiffBetweenDates} from '../utils/functions';

import {addPlanToCity} from '../redux/actions';

import CustomTextInput from './formComponents/CustomTextInput';
import DatePicker from './formComponents/DatePicker';
import TypeSearch from './formComponents/TypeSearch';
import IconButton from './IconButton';
import DeleteButton from '../components/DeleteButton';

class AddItineraryItemForm extends React.Component {
    static propTypes = {
        isEvent: PropTypes.bool.isRequired,
        submitForm: PropTypes.func.isRequired,
        onDeleteItem: PropTypes.func,
        itemToEdit: PropTypes.object,
        itemIndex: PropTypes.number,
        dayIndex: PropTypes.number
    }

    constructor(props) {
        super(props);

        this.state = props.itemToEdit ?
            props.itemToEdit :
            {
                title: '',
                description: '',
                address: '',
                selectedDate: this.props.dates.from,
                hour: ''
            };

        this.processTextInput = this.processTextInput.bind(this);
        this.openTimePicker = this.openTimePicker.bind(this);
        this.searchFunction = this.searchFunction.bind(this);
        this.isFormReady = this.isFormReady.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    searchFunction(query) {
        return getAllPlaces(query, this.props.city);
    }

    mapOptions(address) {
        return <View style={styles.addressOption}><Text>{address}</Text></View>;
    }

    async openTimePicker() {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 12,
                minute: 0,
                is24Hour: true
            });

            if (action !== TimePickerAndroid.dismissedAction) {
                this.setState({hour: this.formatTime(hour, minute)});
            }
        } catch(err) {
            console.log(err);
        }
    }

    formatTime(hour, minute) {
        hourString = hour.toString();
        minuteString = minute.toString();

        hourString = hourString.length === 1 ? '0' + hourString : hourString;
        minuteString = minuteString.length === 1 ? '0' + minuteString : minuteString;

        return hourString + ' : ' + minuteString;
    }

    /**
     * Used as a callback for the CustomTextInput it sets any value
     * in the state
     * 
     * @param {string} inputField 
     */
    processTextInput(inputField) {
        return value => this.setState({[inputField]: value});
    }

    isFormReady() {
        return this.props.isEvent
            ? !(this.state.title && this.state.selectedDate && this.state.hour && this.state.address)
            : !(this.state.title && this.state.selectedDate);
    }

    onSubmitForm() {
        itineraryLength = getDiffBetweenDates(this.props.dates.from, this.props.dates.to) + 1;
        dateIndex = getDiffBetweenDates(this.props.dates.from, this.state.selectedDate);
        if (!!this.props.itemToEdit) {
            //We need to do all in the details screen in order to handle the different scenarios.
            this.props.submitForm(this.state, dateIndex);
        } else {
            this.props.addPlanToCity({...this.state, isEvent: this.props.isEvent}, dateIndex, itineraryLength);
            this.props.submitForm();
        }
    }

    render() {
        const isEditing = this.props.itemToEdit !== undefined;

        return <View style={styles.container}>
            {
                !isEditing && <Text style={styles.title}>{'What do you have in mind?'}</Text>
            }
            {
                isEditing && <View style={styles.editHeader}>
                    <Text style={styles.title}>{'Change of plans?'}</Text>
                    <DeleteButton callback={this.props.onDeleteItem} />
                </View>
            }
            <View style={styles.inputSection}>
                <Text style={styles.label}>{'Title*'}</Text>
                <CustomTextInput
                    value={this.state.title}
                    placeholder={'Go for a walk in the park'}
                    onChangeText={this.processTextInput('title')}
                />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.label}>{'Date of event*'}</Text>
                <DatePicker
                    minDate={this.props.dates.from}
                    maxDate={this.props.dates.to}
                    selectedDate={this.state.selectedDate}
                    dateSelectedHandler={this.processTextInput('selectedDate')}
                />
            </View>
            {
                this.props.isEvent && <View style={styles.inputSection}>
                    <Text style={styles.label}>{'Time of event*'}</Text>
                    <View style={styles.timeInput}>
                        <IconButton
                            iconName={'clock-o'}
                            callback={this.openTimePicker}
                            buttonBrand={IconButton.BUTTON_BRANDS.FontAwesome}
                            size={50}
                        />
                        <Text style={styles.time}>{this.state.hour === '' ? '-- : --' : this.state.hour}</Text>
                    </View>
                </View>
            }
            <View style={styles.inputSection}>
                <Text style={styles.label}>{'Description'}</Text>
                <CustomTextInput
                    value={this.state.description}
                    onChangeText={this.processTextInput('description')}
                    isMultiline={true}
                    numberOfLines={10}
                    maxLength={250}
                />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.label}>{'Address' + (this.props.isEvent ? '*' : '')}</Text>
                <TypeSearch
                    placeholder={'eg: Dean Street 345'}
                    searchFunction={this.searchFunction}
                    mapToComponent={this.mapOptions}
                    onSelection={this.processTextInput('address')}
                    value={this.state.address}
                />
            </View>
            <Button
                title={this.props.isEvent ? 'Add Event!' : 'Add Plan!'}
                onPress={this.onSubmitForm}
                disabled={this.isFormReady()}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    editHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15
    },
    label: {
        fontSize: 20,
        marginBottom: 8,
        marginTop: 15
    },
    addressOption: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeInput: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    time: {
        fontSize: 50,
        marginLeft: 30
    }
});

const mapStateToProps = (store) => {
    const selectedTrip = store.trip.trips.filter(trip => trip.id === store.trip.selectedTrip)[0],
          selectedCityIndex = store.trip.selectedCityIndex,
          selectedCity = selectedTrip.cities[selectedCityIndex];

    return {
        city: selectedCity.cityName,
        dates: {
            from: new Date(selectedCity.dates.from),
            to: new Date(selectedCity.dates.to)
        }
    };
}

export default connect(mapStateToProps, {addPlanToCity})(AddItineraryItemForm);
