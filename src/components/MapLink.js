import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Link from './Link';
import IconButton from './IconButton';

export default (props) => <Link url={`https://maps.google.com/?q=${props.address}`}>
    <View style={[styles.container, props.stylesContainer]}>
        <IconButton iconName={'map-marker'} buttonBrand={IconButton.BUTTON_BRANDS.FontAwesome} size={20}/>
        <Text style={[styles.label, props.stylesLabel]}>{props.address}</Text>
    </View>
</Link>;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    label: {
        marginLeft: 10
    }
})
