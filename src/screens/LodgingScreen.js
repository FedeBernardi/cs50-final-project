import React from 'react';
import {ScrollView, View, Text, StyleSheet, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getDateString} from '../utils/functions';

import HeaderTitle from '../components/navigation/HeaderTitle';
import Map from '../components/Map';
import Link from '../components/Link';
import IconButton from '../components/IconButton';
import LodgingForm from '../components/LodgingForm';

export default class LodgingScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: <HeaderTitle
            title={{title: 'Lodging Info', subtitle: navigation.getParam('cityTitle')}}
        />
    });

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            editLodgingIndex: 0
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.getLodgingToEdit = this.getLodgingToEdit.bind(this);
        this.onLodgingDeleted = this.onLodgingDeleted.bind(this);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    /**
     * Opens the modal that contains the form to edit the info
     * of the lodging.
     *
     * @param {number} index
     */
    openModal(index) {
        this.setState({showModal: true, editLodgingIndex: index});
    }

    getLodgingToEdit(lodgingsArray) {
        let lodgingToEdit = lodgingsArray[this.state.editLodgingIndex];
        lodgingToEdit.dateFrom = new Date(lodgingToEdit.dateFrom);
        lodgingToEdit.dateTo = new Date(lodgingToEdit.dateTo);

        return lodgingToEdit;
    }

    onLodgingDeleted() {
        const lodgingInfo = this.props.navigation.getParam('lodgingInfo');
        if (lodgingInfo.length) {
            this.setState({showModal: false, editLodgingIndex: 0});
        } else {
            this.props.navigation.navigate('City');
        }
    }

    render() {
        const lodgingInfo = this.props.navigation.getParam('lodgingInfo');

        return lodgingInfo.length ? <View style={styles.container}>
            <Modal
                visible={this.state.showModal}
                onRequestClose={() => this.toggleModal()}
                transparent={false}
                animationType={'slide'}
            >
                <ScrollView>
                    <LodgingForm
                        lodgingToEdit={this.getLodgingToEdit(lodgingInfo)}
                        lodgingIndex={this.state.editLodgingIndex}
                        submitForm={this.toggleModal}
                        onDeletion={this.onLodgingDeleted}
                    />
                </ScrollView>
            </Modal>
            <ScrollView style={styles.container}>
                {
                    lodgingInfo.map((lodging, index) => <View key={index}>
                        <View style={styles.infoContainer}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>{lodging.name}</Text>
                                <IconButton isFontAwesome={true} iconName={'edit'} size={30} callback={() => this.openModal(index)}/>
                            </View>
                            <View style={styles.firstSection}>
                                <View style={styles.datesSection}>
                                    <Text>
                                        {`From: ${getDateString(lodging.dateFrom)}`}
                                    </Text>
                                    <Text>
                                        {`To: ${getDateString(lodging.dateTo)}`}
                                    </Text>
                                </View>
                                {
                                    <View style={styles.rightSection}>
                                        {
                                            !!lodging.reservationNumber &&
                                            <Text style={styles.resNumb}>{`Reservation: ${lodging.reservationNumber}`}</Text>
                                        }
                                        <View style={styles.stateSection}>
                                            <Text style={styles.stateText}>{'State:'}</Text>
                                            {
                                                lodging.isPaid ?
                                                    <Text style={styles.paid}>{'Paid'}</Text> :
                                                    <Text style={styles.notPaid}>{'Not Paid'}</Text>
                                            }
                                        </View>
                                    </View>
                                }
                            </View>
                            {
                                !!lodging.phoneNumber &&
                                <Link url={`tel:${lodging.phoneNumber}`}>
                                    <View style={styles.contactInfoRow}>
                                        <Icon name={'phone'} size={20}/>
                                        <Text style={styles.contactInfoText}>{lodging.phoneNumber}</Text>
                                    </View>
                                </Link>
                            }
                            {
                                !!lodging.email &&
                                <Link url={`mailto:${lodging.email}`}>
                                    <View style={styles.contactInfoRow}>
                                        <Ionicons name={'ios-mail'} size={20}/>
                                        <Text style={styles.contactInfoText}>{lodging.email}</Text>
                                    </View>
                                </Link>
                            }
                            <Link url={`https://maps.google.com/?q=${lodging.address}`}>
                                <View style={styles.addressRow}>
                                    <Icon name={'map-marker'} size={20}/>
                                    <Text style={styles.contactInfoText}>{lodging.address}</Text>
                                </View>
                            </Link>
                        </View>
                        <Map style={styles.map} address={lodging.address}/>
                    </View>
                    )
                }
            </ScrollView>
        </View> : null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    infoContainer: {
        padding: 15,
    },
    contactInfoRow: {
        flexDirection: 'row'
    },
    contactInfoText: {
        marginLeft: 10
    },
    addressRow: {
        flexDirection: 'row',
        marginTop: 10
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    firstSection: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    rightSection: {
        alignItems: 'flex-end'
    },
    stateSection: {
        flexDirection: 'row'
    },
    stateText: {
        marginRight: 5
    },
    paid: {
        color: '#34A853'
    },
    notPaid: {
        color: '#FF0000'
    },
    map: {
        width: '100%',
        height: 250
    }
});
