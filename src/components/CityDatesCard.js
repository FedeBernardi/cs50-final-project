import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class CityDatesCard extends React.Component {
    static propTypes = {
        currentCity: PropTypes.object.isRequired,
        prevCity: PropTypes.object,
        nextCity: PropTypes.object
    }

    render() {
        const {currentCity, prevCity, nextCity} = this.props;

        return <View style={styles.container}>
            <Text style={styles.title}>{'Dates'}</Text>
            <View style={styles.datesContainer}>
                <View style={styles.cityContainer}>
                    {prevCity && <View style={styles.cityInfo}>
                        <Text style={styles.otherCityName}>{prevCity.name}</Text>
                        <Text style={styles.otherCityDates}>{prevCity.dates}</Text>
                    </View>}
                </View>
                <View style={[styles.cityInfo, styles.currentCityContainer]}>
                    <Text style={styles.currentCityDates}>{currentCity.dates}</Text>
                </View>
                <View style={styles.cityContainer}>
                    {nextCity && <View style={styles.cityInfo}>
                        <Text style={styles.otherCityName}>{nextCity.name}</Text>
                        <Text style={styles.otherCityDates}>{nextCity.dates}</Text>
                    </View>}
                </View>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    datesContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    container: {
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
    title: {
        fontSize: 20
    },
    cityInfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentCityContainer: {
        width: 170,
    },
    currentCityDates: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    otherCityName: {
        fontSize: 8
    },
    otherCityDates: {
        fontSize: 10
    }
});
