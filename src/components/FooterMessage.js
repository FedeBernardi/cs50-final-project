import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class FooterMessage extends React.Component {
    static propTypes = {
        message: PropTypes.string.isRequired
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.message}>{this.props.message}</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 30
    },
    message: {
        fontSize: 10,
        color: '#C4C5C6'
    }
});
