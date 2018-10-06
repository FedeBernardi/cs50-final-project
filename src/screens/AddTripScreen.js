import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Constants} from 'expo';

import AddTripForm from '../components/AddTripForm';

export default class AddTripScreen extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    render() {
        return <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Create a new Trip!</Text>
                </View>
                <View style={styles.formContainer}>
                    <AddTripForm />
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
