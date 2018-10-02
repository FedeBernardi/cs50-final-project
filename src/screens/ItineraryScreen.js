import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ItineraryScreen extends React.Component {

    render() {
        return <View style={styles.container}>
            <Text>Itinerary Screen</Text>
        </View>;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    }
});
