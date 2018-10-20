import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class FlightCardAirportInfo extends React.Component {

    static propTypes = {
        city: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        scheduledTime: PropTypes.string.isRequired,
        terminal: PropTypes.string,
        gate: PropTypes.string
    }


    render() {
        return <View>
            <Text>{this.props.city}</Text>
            <Text style={styles.date}>{`${this.props.date} - ${this.props.scheduledTime}`}</Text>
            <View style={styles.airportDataContainer}>
                <View style={styles.section}>
                    <Text>{'Terminal'}</Text>
                    <Text>{this.props.terminal}</Text>
                </View>
                <View style={styles.section}>
                    <Text>{'Gate'}</Text>
                    <Text>{this.props.gate}</Text>
                </View>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    airportDataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        fontSize: 12,
        marginBottom: 10
    },
    section: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
