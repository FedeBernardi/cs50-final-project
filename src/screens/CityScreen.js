import React from 'react';
import {View, ScrollView, Button, Modal, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import ActionButtons from '../components/navigation/ActionButtons';
import {updateHeaderTitle} from '../redux/actions';
import HeaderTitle from '../components/navigation/HeaderTitle';
import CityDatesCard from '../components/CityDatesCard';
import FlightCard from '../components/FlightCard';
import AddFlightForm from '../components/AddFlightForm';
import AddLodgingForm from '../components/AddLodgingForm';
import LodgingCard from '../components/LodgingCard';

const MODAL_TYPES = {
    FLIGHT: 'FLIGHT',
    LODGING: 'LODGING'
}

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
                animationType: 'fade',
                modalType: null
            }
        }

        this.addFlightCallback = this.addFlightCallback.bind(this);
        this.addLodgingCallback = this.addLodgingCallback.bind(this);
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
                title: 'Lodging',
                callback: this.addLodgingCallback,
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
                animationType: 'fade',
                modalType: MODAL_TYPES.FLIGHT
            }
        });
    }

    addLodgingCallback() {
        this.setState({
            showModal: true,
            modalOptions: {
                transparent: false,
                animationType: 'slide',
                modalType: MODAL_TYPES.LODGING
            }
        });
    }

    render() {
        const {prevCity, nextCity, selectedCity} = this.props,
              currentCity = createCityDatesObject(selectedCity),
              {showModal, modalOptions} = this.state;

        return <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <CityDatesCard currentCity={currentCity} prevCity={prevCity} nextCity={nextCity}/>
                {selectedCity.flight && <FlightCard flight={selectedCity.flight}/>}
                {selectedCity.lodgingInfo && <LodgingCard lodgingInfo={selectedCity.lodgingInfo}/>}
                <Button title={'Itinerary'} onPress={() => this.props.navigation.navigate('Itinerary')}></Button>
                <Button title={'Tickets'} onPress={() => this.props.navigation.navigate('Tickets')}></Button>
            </ScrollView>
            <Modal
                transparent={modalOptions.transparent}
                visible={showModal}
                onRequestClose={() => this.closeModal()}
                animationType={modalOptions.animationType}
            >
                <View style={[
                        styles.modalContainer,
                        modalOptions.transparent === true ?
                            styles.modalTransparentBackground :
                            styles.modalFullBackground
                    ]}
                >
                    {
                        modalOptions.modalType === MODAL_TYPES.FLIGHT &&
                        <AddFlightForm submitForm={this.closeModal}/>
                    }
                    {
                        modalOptions.modalType === MODAL_TYPES.LODGING &&
                        <ScrollView><AddLodgingForm submitForm={this.closeModal}/></ScrollView>
                    }
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
        flex: 1
    },
    modalTransparentBackground: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 30
    },
    modalFullBackground: {
        backgroundColor: '#FFF'
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
