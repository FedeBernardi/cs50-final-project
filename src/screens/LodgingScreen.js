import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getDateString} from '../utils/functions';

import HeaderTitle from '../components/navigation/HeaderTitle';
import Map from '../components/Map';
import Link from '../components/Link';

export default class LodgingScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: <HeaderTitle
            title={{title: 'Lodging Info', subtitle: navigation.getParam('cityTitle')}}
        />
    });

    render() {
        const lodgingInfo = this.props.navigation.getParam('lodgingInfo');

        return <ScrollView style={styles.container}>
            {
                lodgingInfo.map((lodging, index) => <View key={index}>
                    <View style={styles.infoContainer}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>{lodging.name}</Text>
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
                                        lodging.reservationNumber &&
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
                        <View style={styles.addressRow}>
                            <Icon name={'map-marker'} size={20}/>
                            <Text style={styles.contactInfoText}>{lodging.address}</Text>
                        </View>
                    </View>
                    <Map style={styles.map} address={lodging.address}/>
                </View>
                )
            }
        </ScrollView>;
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
