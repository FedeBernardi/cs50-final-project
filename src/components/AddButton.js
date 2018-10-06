import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';

export default class AddButton extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        disabled: PropTypes.bool,
        callback: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.pressHandler = this.pressHandler.bind(this);
    }

    pressHandler() {
        if (!this.isButtonDisabled()) {
            this.props.callback();
        }
    }

    isButtonDisabled() {
        const {disabled} = this.props;

        return typeof disabled !== 'undefined' && disabled;
    }

    render() {
        return <TouchableHighlight onPress={this.pressHandler}>
            <View>
                {this.props.text && <Text>{this.props.text}</Text>}
                <Ionicons
                    name={'ios-add-circle-outline'}
                    size={40}
                    style={this.isButtonDisabled() ? {color: 'grey'} : {}}
                />
            </View>
        </TouchableHighlight>
    }
}
