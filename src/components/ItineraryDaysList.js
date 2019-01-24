import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {getDateString} from '../utils/functions';

import ItineraryDayButton from './ItineraryDayButton';

export default class ItineraryDaysList extends React.Component {
    static propTypes = {
        itinerary: PropTypes.array
    }

    constructor(props) {
        super(props);

        this.processItinerary = this.processItinerary.bind(this);
        this.getDayPlansObject = this.getDayPlansObject.bind(this);
    }

    processItinerary() {
        return this.props.itinerary.map(this.getDayPlansObject);
    }

    getDayPlansObject(dayPlans, index) {
        const date = getDateString(dayPlans[0].selectedDate);
        return {title: date, dayPosition: index};
    }

    render() {
        return <ScrollView style={styles.scrollContainer}>
            {this.processItinerary().map((day, index) => <ItineraryDayButton key={index} dayPlans={day}/>)}
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%'
    },
    headerContainer: {
        alignItems: 'flex-start',
        width: '100%'
    },
    touchableComponent: {
        width: '100%'
    }
});
