import React from 'react';
import {TouchableHighlight} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


export default Hamburguer = (props) => (<TouchableHighlight onPress={props.onPress}>
    <Ionicons name={'md-menu'} color={'#000'} size={30}/>
</TouchableHighlight>);
