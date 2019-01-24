import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';

class ItineraryDayButton extends React.Component {
    static propTypes = {
        dayPlans: PropTypes.object.isRequired
    }

    render() {
        const {dayPlans} = this.props;

        return <TouchableHighlight
            style={styles.headerContainer}
            onPress={() => this.props.navigation.navigate('ItineraryDayView', {dayPlans})}
        >
            <Text style={styles.headerText}>{dayPlans.title}</Text>
        </TouchableHighlight>;
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FBE4C2',
        width: '100%'
    },
    headerText: {
        fontSize: 30
    }
});

export default withNavigation(ItineraryDayButton);
