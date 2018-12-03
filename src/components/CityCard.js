import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class CityCard extends React.Component {
    static propTypes = {
        cityName: PropTypes.string.isRequired,
        fromDate: PropTypes.object.isRequired,
        toDate: PropTypes.object.isRequired
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name={'ios-business'} size={30}/>
                <Text style={styles.cityName}>{this.props.cityName}</Text>
            </View>
            <View style={styles.datesContainer}>
                <View style={styles.dateContainer}>
                    <Ionicons name={'ios-calendar'} size={30}/>
                    <Text style={styles.date}>{`From: ${this.props.fromDate.toLocaleDateString('en-US')}`}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Ionicons name={'ios-calendar'} size={30}/>
                    <Text style={styles.date}>{`To: ${this.props.toDate.toLocaleDateString('en-US')}`}</Text>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: 100,
        padding: 20,
        backgroundColor: '#FFF'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cityName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    datesContainer: {
        flexDirection: 'row'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    date: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10
    }
});
