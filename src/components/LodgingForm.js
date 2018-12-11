import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getAddresses} from '../api/placesApi';
import {addLodgingInfoToCity, editLodgingInfo, deleteLodgingInfo} from '../redux/actions';

import TypeSearch from './formComponents/TypeSearch';
import RadioButtonsGroup from './formComponents/RadioButtonsGroup';
import CustomTextInput from './formComponents/CustomTextInput';
import DatePicker from './formComponents/DatePicker';
import IconButton from './IconButton';

class AddLodgingForm extends React.Component {

    static propTypes = {
        submitForm: PropTypes.func.isRequired,
        onDeletion: PropTypes.func,
        lodgingToEdit: PropTypes.object,
        lodgingIndex: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = props.lodgingToEdit ?
            props.lodgingToEdit :
            {
                name: '',
                address: '',
                reservationNumber: '',
                dateFrom: props.dates.from,
                dateTo: props.dates.to,
                phoneNumber: '',
                email: '',
                isPaid: null
            };

        this.searchFunction = this.searchFunction.bind(this);
        this.mapOptions = this.mapOptions.bind(this);
        this.onAddressSelection = this.onAddressSelection.bind(this);
        this.onRadioPaidSelection = this.onRadioPaidSelection.bind(this);
        this.processTextInput = this.processTextInput.bind(this);
        this.processDateSelection = this.processDateSelection.bind(this);
        this.handleSubmition = this.handleSubmition.bind(this);
        this.isFormReady = this.isFormReady.bind(this);
        this.deleteLodging = this.deleteLodging.bind(this);
    }

    searchFunction(query) {
        return getAddresses(query, this.props.city);
    }

    mapOptions(address) {
        return <View style={styles.addressOption}><Text>{address}</Text></View>;
    }

    onAddressSelection(selectedAddress) {
        this.setState({address: selectedAddress});
    }

    onRadioPaidSelection(value) {
        this.setState({isPaid: value});
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

    processDateSelection(date, inputField) {
        if (inputField === 'dateFrom') {
            if (date > this.state.dateTo) {
                this.setState({dateTo: date, dateFrom: date});
            } else {
                this.setState({'dateFrom': date});
            }
        } else {
            this.setState({'dateTo': date});
        }
    }

    isFormReady() {
        return !(this.state.name && this.state.address && this.state.isPaid !== null);
    }

    deleteLodging() {
        this.props.deleteLodgingInfo(this.props.lodgingIndex);
        this.props.onDeletion();
    }

    handleSubmition() {
        if (this.props.lodgingIndex) {
            this.props.editLodgingInfo(this.state, this.props.lodgingIndex);
        } else {
            this.props.addLodgingInfoToCity(this.state);
        }
        this.props.submitForm();
    }

    render() {
        const isEditing = this.props.lodgingIndex !== undefined;

        return <View style={styles.container}>
            {
                !isEditing && <Text style={styles.title}>{'Where are you staying?'}</Text>
            }
            {
                isEditing && <View style={styles.editHeader}>
                    <Text style={styles.title}>{`Edit ${this.props.lodgingToEdit.name}`}</Text>
                    <IconButton iconName={'md-trash'} size={40} callback={this.deleteLodging}/>
                </View>
            }
            <Text style={styles.label}>{'Name of the place*'}</Text>
            <CustomTextInput
                value={this.state.name}
                placeholder={'eg: Sheraton Hotel'}
                onChangeText={this.processTextInput('name')}
            />
            <Text style={styles.label}>{'Address*'}</Text>
            <TypeSearch
                placeholder={'eg: Dean Street 345'}
                searchFunction={this.searchFunction}
                mapToComponent={this.mapOptions}
                onSelection={this.onAddressSelection}
                value={this.state.address}
            />
            <Text style={styles.label}>{'Reservation Number'}</Text>
            <CustomTextInput
                placeholder={'eg: 14563'}
                onChangeText={this.processTextInput('reservationNumber')}
                keyboardType={'numeric'}
                value={this.state.reservationNumber}
            />
            <View style={styles.datePickersContainer}>
                <DatePicker
                    label={'From:'}
                    dateSelectedHandler={(date) => this.processDateSelection(date, 'dateFrom')}
                    selectedDate={this.state.dateFrom}
                    minDate={this.props.dates.from}
                    maxDate={this.props.dates.to}
                />
                <DatePicker
                    label={'To:'}
                    dateSelectedHandler={(date) => this.processDateSelection(date, 'dateTo')}
                    selectedDate={this.state.dateTo}
                    minDate={this.state.dateFrom}
                    maxDate={this.props.dates.to}
                />
            </View>
            <Text style={styles.label}>{'Phone number'}</Text>
            <CustomTextInput
                placeholder={'eg: +54 11 4589 7632'}
                onChangeText={this.processTextInput('phoneNumber')}
                keyboardType={'phone-pad'}
                value={this.state.phoneNumber}
            />
            <Text style={styles.label}>{'Email'}</Text>
            <CustomTextInput
                placeholder={'eg: example@travelapp.com'}
                onChangeText={this.processTextInput('email')}
                keyboardType={'email-address'}
                value={this.state.email}
            />
            <Text style={styles.label}>{'Is it paid?*'}</Text>
            <View style={styles.radioGroupContainer}>
                <RadioButtonsGroup
                    onSelection={this.onRadioPaidSelection}
                    options={[{label: 'Yes', value: true}, {label: 'No', value: false}]}
                    defaultOption={this.state.isPaid !== null ?
                        this.state.isPaid ? 0 : 1 :
                        null
                    }
                />
            </View>
            <Button
                title={'Add Lodging Info!'}
                onPress={this.handleSubmition}
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
        alignItems: 'center',
        paddingRight: 30
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
    datePickersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    radioGroupContainer: {
        marginBottom: 20
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

export default connect(mapStateToProps, {addLodgingInfoToCity, editLodgingInfo, deleteLodgingInfo})(AddLodgingForm);
