import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class IconButton extends React.Component {
    static propTypes = {
        iconName: PropTypes.string.isRequired,
        buttonBrand: PropTypes.func.isRequired,
        callback: PropTypes.func,
        size: PropTypes.number,
        text: PropTypes.string,
        stylesContainer: PropTypes.number,
        disabled: PropTypes.bool,
    }

    static BUTTON_BRANDS = {
        Ionicons: Ionicons,
        FontAwesome: FontAwesome,
        MaterialCommunityIcons: MaterialCommunityIcons
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

    getIcon() {
        const {buttonBrand, text, stylesContainer} = this.props;
        const Comp = buttonBrand;

        return <View style={stylesContainer}>
            {text && <Text>{this.props.text}</Text>}
            {
                Comp &&
                    <Comp name={this.props.iconName}
                        size={this.props.size ? this.props.size : 40}
                        style={this.isButtonDisabled() ? {color: 'grey'} : {}}
                    />
            }
        </View>;
    }

    render() {
        return this.props.callback ?
            <TouchableHighlight onPress={this.pressHandler}>{this.getIcon()}</TouchableHighlight> :
            this.getIcon();
    }
}
