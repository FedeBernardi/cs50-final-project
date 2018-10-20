import React from 'react';
import {Button, Modal, View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class ConfirmationModal extends React.Component {

    static propTypes = {
        show: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        onConfirmation: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
        onCancel: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.onConfirmationHandler = this.onConfirmationHandler.bind(this);
        this.onCancelationHandler = this.onCancelationHandler.bind(this);
    }

    onConfirmationHandler() {
        this.props.onConfirmation();
        this.props.closeModal();
    }

    onCancelationHandler() {
        if (this.props.onCancel) {
            this.props.onCancel();
        };
        this.props.closeModal();
    }

    render() {
        return <Modal
            transparent={true}
            visible={this.props.show}
            onRequestClose={this.props.closeModal}
            animationType={'fade'}
        >
            <View style={styles.backgroundLayer}>
                <View style={styles.container}>
                    <View style={styles.messageHolder}>
                        <Text style={styles.message}>{this.props.message}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.leftButton}>
                            <Button title={'Confirm'} onPress={this.onConfirmationHandler}/>
                        </View>
                        <View>
                            <Button title={'Cancel'} onPress={this.onCancelationHandler}/>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    }
}

const styles = StyleSheet.create({
    backgroundLayer: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 30
    },
    messageHolder: {
        marginBottom: 15
    },
    message: {
        fontSize: 30
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },
    leftButton: {
        marginRight: 10
    }
});
