import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {Constants} from 'expo';

import {trips} from '../../staticData';

const tripItem = ({item}) => (<View style={styles.tripContainer}>
    <Text style={styles.tripTitle}>{item.title}</Text>
    <Text style={styles.tripDates}>{`${item.startDate} - ${item.endDate}`}</Text>
</View>); 

export default class SideMenu extends React.Component {

    render() {
        return <View style={styles.container}>
            <Text style={styles.title}>Next Trips</Text>
            <FlatList
                data={trips}
                renderItem={tripItem}
                keyExtractor={(item, index) => index + ''}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        padding: 10
    },
    title: {
        fontSize: 25,
        marginBottom: 15
    },
    tripContainer: {
        marginBottom: 10
    },
    tripTitle: {
        fontSize: 20
    },
    tripDates: {
        fontSize: 10
    }
});
