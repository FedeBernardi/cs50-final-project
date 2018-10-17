import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {updateHeaderTitle} from '../redux/actions';
import HeaderTitle from '../components/HeaderTitle';

class CityScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <HeaderTitle title={navigation.getParam('cityTitle')}/>
    });

    render() {
        return <View style={styles.container}>
            <Text>City Screen</Text>
            <Button title={'Airplanes'} onPress={() => this.props.navigation.navigate('Airplanes')}></Button>
            <Button title={'Lodgin'} onPress={() => this.props.navigation.navigate('Lodgin')}></Button>
            <Button title={'Itinerary'} onPress={() => this.props.navigation.navigate('Itinerary')}></Button>
            <Button title={'Tickets'} onPress={() => this.props.navigation.navigate('Tickets')}></Button>
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

export default connect(null, {updateHeaderTitle})(CityScreen);
