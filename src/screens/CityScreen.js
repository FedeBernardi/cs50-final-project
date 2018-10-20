import React from 'react';
import {View, ScrollView, Button, Modal, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import ActionButtons from '../components/navigation/ActionButtons';
import {updateHeaderTitle} from '../redux/actions';
import HeaderTitle from '../components/navigation/HeaderTitle';
import CityDatesCard from '../components/CityDatesCard';
import FlightCard from '../components/FlightCard';
import AddFlightForm from '../components/AddFlightForm';

class CityScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <HeaderTitle title={navigation.getParam('cityTitle')}/>
    });

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalOptions: {
                transparent: true,
                animationType: 'fade'
            }
        }

        this.addFlightCallback = this.addFlightCallback.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.actionButtonsConfig = [
            {
                color: '#34A853',
                title: 'Flight',
                callback: this.addFlightCallback,
                iconName: 'airplanemode-active'
            },
            {
                color: '#4286f4',
                title: 'Lodgin',
                callback: this.addLodginCallback,
                iconName: 'hotel'
            }
        ];
    }

    closeModal() {
        this.setState({showModal: false});
    }

    addFlightCallback() {
        this.setState({
            showModal: true,
            modalOptions: {
                transparent: true,
                animationType: 'fade'
            }
        });
    }

    addLodginCallback() {
        console.log('add lodgin');
    }

    render() {
        const {prevCity, nextCity, selectedCity} = this.props,
              currentCity = createCityDatesObject(selectedCity),
              {showModal, modalOptions} = this.state;

        return <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <CityDatesCard currentCity={currentCity} prevCity={prevCity} nextCity={nextCity}/>
                {selectedCity.flight && <FlightCard flight={selectedCity.flight}/>}
                <Button title={'Lodgin'} onPress={() => this.props.navigation.navigate('Lodgin')}></Button>
                <Button title={'Itinerary'} onPress={() => this.props.navigation.navigate('Itinerary')}></Button>
                <Button title={'Tickets'} onPress={() => this.props.navigation.navigate('Tickets')}></Button>
            </ScrollView>
            <Modal
                transparent={modalOptions.transparent}
                visible={showModal}
                onRequestClose={() => this.closeModal()}
                animationType={modalOptions.animationType}
            >
                <View style={styles.modalContainer}>
                    <AddFlightForm submitForm={this.closeModal}/>
                </View>
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
        width: '100%',
        padding: 10,
        backgroundColor: '#FFF'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    scroll: {
        width: '100%',
    }
});

/**
 * Creates the dates objects that will be passed to the CityDatesCard
 * @param {object} city 
 */
function createCityDatesObject(city) {
    if (city) {
        const from = new Date(city.dates.from),
              to = new Date(city.dates.to),
              fromString = `${from.getMonth() + 1}/${from.getDate()}`,
              toString = `${to.getMonth() + 1}/${to.getDate()}`;

        return {
            name: city.cityName,
            dates: fromString === toString ? fromString : `${fromString} - ${toString}`
        }
    }
}

const mapStateToProps = (store) => {
    const selectedTrip = store.trip.trips.filter(trip => trip.id === store.trip.selectedTrip)[0],
          selectedCityIndex = store.trip.selectedCityIndex,
          selectedCity = selectedTrip.cities[selectedCityIndex],
          nextCity = createCityDatesObject(selectedTrip.cities[selectedCityIndex + 1]),
          prevCity = createCityDatesObject(selectedTrip.cities[selectedCityIndex - 1]);

    return {
        selectedCity,
        nextCity,
        prevCity
    }
}

export default connect(mapStateToProps, {updateHeaderTitle})(CityScreen);
