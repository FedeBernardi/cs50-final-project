import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Constants} from 'expo';
import {connect} from 'react-redux';

import {selectTripFromMenu, updateHeaderTitle} from '../../redux/actions';

import IconButton from '../IconButton';

const tripItem = (trip) => (<View style={styles.tripContainer}>
    <Text style={styles.tripTitle}>{trip.name}</Text>
    <Text style={styles.tripDates}>{getTripRange(trip.cities)}</Text>
</View>); 

function getTripRange(cities) {
    const startsAt = new Date(cities[0].dates.from).toLocaleDateString('en-US'),
          endsAt = new Date(cities[cities.length - 1].dates.to).toLocaleDateString('en-US');
    return `${startsAt} - ${endsAt}`;
}

class SideMenu extends React.Component {

    constructor(props) {
        super(props);

        this.IconButtonCb = this.IconButtonCb.bind(this);
        this.renderTrip = this.renderTrip.bind(this);
        this.switchTrip = this.switchTrip.bind(this);
    }

    IconButtonCb() {
        this.props.navigation.navigate('AddTrip');
    }

    switchTrip(trip) {
        this.props.selectTripFromMenu(trip.id);
        this.props.updateHeaderTitle(trip.name);
        this.props.navigation.toggleDrawer();
    }

    renderTrip({item}) {
        return <TouchableOpacity onPress={() => this.switchTrip(item)}>
            {tripItem(item)}
        </TouchableOpacity>;
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Trips</Text>
                <IconButton iconName={'ios-add-circle-outline'} callback={this.IconButtonCb}/>
            </View>
            <FlatList
                data={this.props.trips}
                renderItem={this.renderTrip}
                keyExtractor={(item, index) => index + item.id}
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

const mapStateToProps = (store) => ({
    trips: store.trip.trips
});

export default connect(mapStateToProps, {selectTripFromMenu, updateHeaderTitle})(SideMenu);
