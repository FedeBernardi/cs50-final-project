import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {addFlightToCity} from '../redux/actions';
import {getFlight} from '../api/flightsApi';

class AddFlightForm extends React.Component {
    static propTypes = {
        submitForm: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            flightNumber: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmition = this.onSubmition.bind(this);
    }

    onChangeHandler(text) {
        this.setState({flightNumber: text});
    }

    async onSubmition() {
        const {addFlightToCity, submitForm} = this.props;

        const flight = await getFlight(this.state.flightNumber);
        if (flight) {
            addFlightToCity(flight);
            submitForm();
        }
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.label}>{'Enter the flight number:'}</Text>
            <TextInput style={styles.input} onChangeText={this.onChangeHandler}/>
            <Button title={'Submit!'} onPress={this.onSubmition}/>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 30
    },
    label: {
        fontSize: 20,
        marginBottom: 10
    },
    input: {
        width: '100%',
        height: 40,
    }
});

export default connect(null, {addFlightToCity})(AddFlightForm);
