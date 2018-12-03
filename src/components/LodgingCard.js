import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import FooterMessage from './FooterMessage';

export default class LodgingCard extends React.Component {
    
    getDateString(date) {
        const dateObj = new Date(date);

        return dateObj.toLocaleDateString('en-US');
    }

    render() {
        let {lodgingInfo} = this.props;

        return <TouchableOpacity style={styles.container}>
            <Text style={styles.title}>{'You\'re staying at'}</Text>
            {
                lodgingInfo.map((lodging, index) => <View key={index} style={styles.infoContainer}>
                    <Text style={[styles.textInfo, styles.lodgingName]}>{lodging.name}</Text>
                    <Text style={styles.textInfo}>{lodging.address}</Text>
                    <Text style={styles.textInfo}>{`From: ${this.getDateString(lodging.dateFrom)} To: ${this.getDateString(lodgingInfo.dateTo)}`}</Text>
                </View>)
            }
            <FooterMessage message={'Tap to see the details'}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
    infoContainer: {
        marginTop: 15
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    lodgingName: {
        fontWeight: 'bold'
    },
    textInfo: {
        fontSize: 15
    }
});
