import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class ActionButton extends React.Component {
    static propTypes = {
        callback: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired
    }

    render() {
        return <TouchableOpacity style={styles.container} onPress={this.props.callback}>
            <Text>{this.props.label}</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        height: 50
    }
});
