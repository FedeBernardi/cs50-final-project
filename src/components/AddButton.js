import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';

export default class AddButton extends React.Component {
    static propTypes = {
        callback: PropTypes.func.isRequired,
        text: PropTypes.string
    }

    render() {
        return <TouchableHighlight onPress={this.props.callback}>
            <View>
                {this.props.text && <Text>{this.props.text}</Text>}
                <Ionicons name={'ios-add-circle-outline'} size={40}/>
            </View>
        </TouchableHighlight>
    }
}
