import React from 'react';
import {StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

export default class ActionButtons extends React.Component {

    static propTypes = {
        buttons: PropTypes.array.isRequired,
        mainButtonColor: PropTypes.string
    }

    renderIcon(config) {
        switch(config.familyIcon) {
            case 'comunity':
                return <ComunityIcon name={config.iconName} style={[styles.actionButtonIcon, config.extraStyles]} />;
            default:
                return <Icon name={config.iconName} style={[styles.actionButtonIcon, config.extraStyles]} />
        }
    }

    render() {
        return <ActionButton buttonColor="rgba(231,76,60,1)">
            {this.props.buttons.map((config, index) => 
                <ActionButton.Item 
                    key={index}
                    buttonColor={config.color}
                    title={config.title}
                    onPress={config.callback}
                    textStyle={styles.label}
                >
                    {this.renderIcon(config)}
                </ActionButton.Item>
            )}
        </ActionButton>
        
    }

}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    label: {
        fontSize: 13
    }
});
