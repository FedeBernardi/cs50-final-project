import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {Constants} from 'expo';

import {trips} from '../../staticData';

import AddButton from './AddButton';

const tripItem = ({item}) => (<View style={styles.tripContainer}>
    <Text style={styles.tripTitle}>{item.title}</Text>
    <Text style={styles.tripDates}>{`${item.startDate} - ${item.endDate}`}</Text>
</View>); 

export default class SideMenu extends React.Component {

    constructor(props) {
        super(props);

        this.addButtonCb = this.addButtonCb.bind(this);
    }

    addButtonCb() {
        this.props.navigation.navigate('AddTrip');
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Trips</Text>
                <AddButton callback={this.addButtonCb}/>
            </View>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    title: {
        fontSize: 25,
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
