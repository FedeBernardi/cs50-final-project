import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Constants} from 'expo';

export default class AddTripScreen extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    render() {
        return <View style={styles.container}>
            <Text>Add Trip Screen</Text>
        </View>;
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight
    }
});
