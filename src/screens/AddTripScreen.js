import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Constants} from 'expo';

import {addTrip} from '../redux/actions';

import AddTripForm from '../components/AddTripForm';

class AddTripScreen extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    handleFormSubmition = (tripName, cities) => {
        const tripObject = {
            id: tripName + Math.floor(Math.random() * Math.floor(100)),
            name: tripName,
            cities: cities
        }

        this.props.addTrip(tripObject);
        this.props.navigation.navigate('Trip');
    }

    render() {
        return <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Create a new Trip!</Text>
                </View>
                <View style={styles.formContainer}>
                    <AddTripForm handleFormSubmition={this.handleFormSubmition}/>
                </View>
            </ScrollView>
        </View>;
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    scroll: {
        width: '100%'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25
    },
    title: {
        fontSize: 30
    },
    formContainer: {
        flex: 1,
        alignItems: 'flex-start',
        width: '100%'
    }
});

export default connect(null, {addTrip})(AddTripScreen);
