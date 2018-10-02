import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class LodginScreen extends React.Component {

    render() {
        return <View style={styles.container}>
            <Text>Lodgin Screen</Text>
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
