import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class AirplanesScreen extends React.Component {

    render() {
        return <View style={styles.container}>
            <Text>Airplanes Screen</Text>
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
