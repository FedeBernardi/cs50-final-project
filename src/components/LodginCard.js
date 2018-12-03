import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import FooterMessage from './FooterMessage';

export default class LodginCard extends React.Component {
    
    getDateString(date) {
        const dateObj = new Date(date);

        return dateObj.toLocaleDateString('en-US');
    }

    render() {
        let {lodginInfo} = this.props;

        return <TouchableOpacity style={styles.container}>
            <Text style={styles.title}>{'You\'re staying at'}</Text>
            {
                lodginInfo.map((lodgin, index) => <View key={index} style={styles.infoContainer}>
                    <Text style={[styles.textInfo, styles.lodginName]}>{lodgin.name}</Text>
                    <Text style={styles.textInfo}>{lodgin.address}</Text>
                    <Text style={styles.textInfo}>{`From: ${this.getDateString(lodgin.dateFrom)} To: ${this.getDateString(lodginInfo.dateTo)}`}</Text>
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
    lodginName: {
        fontWeight: 'bold'
    },
    textInfo: {
        fontSize: 15
    }
});
