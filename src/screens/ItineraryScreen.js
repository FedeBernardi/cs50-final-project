import React from 'react';
import {View, Text, ScrollView, StyleSheet, Modal} from 'react-native';
import ActionButtons from '../components/navigation/ActionButtons';

import HeaderTitle from '../components/navigation/HeaderTitle';
import AddItineraryItemForm from '../components/AddItineraryItemForm';

export default class ItineraryScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <HeaderTitle
            title={{title: 'Itinerary', subtitle: navigation.getParam('cityTitle')}}
        />
    });

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            addEvent: false
        }

        this.closeModal = this.closeModal.bind(this);
        this.addPlanCallback = this.addPlanCallback.bind(this);
        this.addEventCallback = this.addEventCallback.bind(this);

        this.actionButtonsConfig = [
            {
                color: '#34A853',
                title: 'Event',
                callback: this.addEventCallback,
                iconName: 'event'
            },
            {
                color: '#4286f4',
                title: 'Plan',
                callback: this.addPlanCallback,
                iconName: 'calendar-text',
                familyIcon: 'comunity'
            }
        ];
    }

    addPlanCallback() {
        this.setState({showModal: true, addEvent: false});
    }

    addEventCallback() {
        this.setState({showModal: true, addEvent: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        const {showModal} = this.state;

        return <View style={styles.container}>
            <Text>Itinerary Screen</Text>
            <Modal
                visible={showModal}
                transparent={false}
                animationType={'slide'}
                onRequestClose={this.closeModal}
            >
                <ScrollView>
                    <AddItineraryItemForm
                        isEvent={this.state.addEvent}
                        submitForm={this.closeModal}
                    />
                </ScrollView>
            </Modal>
            <ActionButtons buttons={this.actionButtonsConfig}/>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    }
});
