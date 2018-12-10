import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import PropTypes from 'prop-types';

export default class Link extends React.Component {

    static propTypes = {
        url: PropTypes.string.isRequired
    }

    async excecuteLink() {
        const {url} = this.props;

        try {
            const supported = Linking.canOpenURL(url);
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return <TouchableOpacity onPress={() => this.excecuteLink()}>
            {this.props.children}
        </TouchableOpacity>
    }
}
