import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class AirplanesScreen extends React.Component {

    render() {
        return <View style={styles.container}>
            <Text>Trip Screen</Text>
            <Button title={'City'} onPress={() => this.props.navigation.navigate('City')}></Button>
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
