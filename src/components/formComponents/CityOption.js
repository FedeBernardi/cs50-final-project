import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class CityOption extends React.Component {

    static propTypes = {
        description: PropTypes.string.isRequired
    }

    render() {
        return <View style={styles.container}>
            <Ionicons name={'ios-business'} size={20}/>
            <Text style={styles.description}>{this.props.description}</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    },
    description: {
        marginLeft: 10
    }
});
