import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import {deleteFlightFromCity} from '../redux/actions';

import FlightCardAirportInfo from './FlightCardAirportInfo';
import DeleteButton from './DeleteButton';

class FlightCard extends React.Component {
    static propTypes = {
        flight: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.deleteFlight = this.deleteFlight.bind(this);
    }

    deleteFlight() {
        this.props.deleteFlightFromCity();
    }

    render() {
        const {flight} = this.props;

        return <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerInfo}>
                    <Text style={[styles.status, styles.headerText]}>{flight.status}</Text>
                    <Text style={styles.headerText}>{flight.airline}</Text>
                    <Text style={styles.headerText}>{flight.number}</Text>
                </View>
                <DeleteButton callback={this.deleteFlight}/>
            </View>
            <View>
                <View style={styles.aitasSection}>
                    <Text style={styles.aitaCode}>{flight.departure.cityIataCode}</Text>
                    <Ionicons name={'ios-airplane'} color={'#34A853'} size={45}/>
                    <Text style={styles.aitaCode}>{flight.arrival.cityIataCode}</Text>
                </View>
                <View style={styles.airportsInfoContainer}>
                    <FlightCardAirportInfo
                        city={flight.departure.city}
                        date={flight.departure.date}
                        scheduledTime={flight.departure.time}
                        terminal={flight.departure.terminal}
                        gate={flight.departure.gate}
                    />
                    <FlightCardAirportInfo
                        city={flight.arrival.city}
                        date={flight.arrival.date}
                        scheduledTime={flight.arrival.time}
                        terminal={flight.arrival.terminal}
                        gate={flight.arrival.gate}
                    />
                </View>
            </View>
        </View>;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 10
    },
    status: {
        padding: 5,
        backgroundColor: '#34A853',
        color: '#FFF',
        borderRadius: 5
    },
    aitasSection: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    aitaCode: {
        fontSize: 30
    },
    airportsInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default connect(null, {deleteFlightFromCity})(FlightCard);
