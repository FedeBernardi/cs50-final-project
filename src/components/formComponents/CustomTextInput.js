import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class CustomTextInput extends React.Component {

    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        keyboardType: PropTypes.string
    }

    render() {
        return <TextInput
            style={styles.input}
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
            keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
            underlineColorAndroid='transparent'
        />
    }

}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        width: '100%',
        height: 40,
        paddingLeft: 5,
        borderWidth: 1,
        backgroundColor: '#FFF'
    }
});
