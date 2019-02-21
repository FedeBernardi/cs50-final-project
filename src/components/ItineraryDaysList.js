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
    }

    processItinerary() {
        return this.props.itinerary.map((dayPlans, index) => {
            return dayPlans.length ?
                {title: getDateString(dayPlans[0].selectedDate), dayPosition: index} :
                null;
        });
    }

    render() {
        return <ScrollView style={styles.scrollContainer}>
            {
                this.processItinerary()
                    .filter((day) => !!day)
                    .map((day, index) => <ItineraryDayButton key={index} dayPlans={day}/>)
            }
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
