import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class IconButton extends React.Component {
    static propTypes = {
        iconName: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired,
        isFontAwesome: PropTypes.bool,
        size: PropTypes.number,
        text: PropTypes.string,
        disabled: PropTypes.bool,
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
                {
                    !this.props.isFontAwesome && <Ionicons
                        name={this.props.iconName}
                        size={this.props.size ? this.props.size : 40}
                        style={this.isButtonDisabled() ? {color: 'grey'} : {}}
                    />
                }
                {
                    this.props.isFontAwesome && <Icon
                        name={this.props.iconName}
                        size={this.props.size ? this.props.size : 40}
                        style={this.isButtonDisabled() ? {color: 'grey'} : {}}
                    />
                }
            </View>
        </TouchableHighlight>
    }
}
