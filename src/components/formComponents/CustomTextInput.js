import React from 'react';
import {TextInput, KeyboardAvoidingView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class CustomTextInput extends React.Component {

    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        keyboardType: PropTypes.string,
        isMultiline: PropTypes.bool,
        numberOfLines: PropTypes.number,
        maxLength: PropTypes.number
    }

    render() {
        return <KeyboardAvoidingView>
            <TextInput
                style={[styles.input, this.props.isMultiline ? styles.multilineStyles : {}]}
                onChangeText={this.props.onChangeText}
                placeholder={this.props.placeholder}
                value={this.props.value}
                keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                multiline={this.props.isMultiline}
                numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : null}
                maxLength={this.props.maxLength ? this.props.maxLength : null}
                underlineColorAndroid='transparent'
            />
        </KeyboardAvoidingView>
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
    },
    multilineStyles: {
        height: 100,
        padding: 5,
        textAlignVertical: 'top'
    }
});
