import React from 'react';
import {ScrollView, Text, Modal, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {getDateString} from '../utils/functions';
import {editItineraryItem, deleteItineraryItem} from '../redux/actions';

import AddItineraryItemForm from '../components/AddItineraryItemForm';
import HeaderTitle from '../components/navigation/HeaderTitle';
import MapLink from '../components/MapLink';
import Map from '../components/Map';
import IconButton from '../components/IconButton';

const HeaderRightButton = (props) => <IconButton
    iconName={'edit'}
    size={30}
    stylesContainer={styles.headerRightButton}
    callback={props.callback}
    buttonBrand={IconButton.BUTTON_BRANDS.FontAwesome}
/>

class ItineraryItemDetailsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <HeaderTitle
            title={{title: 'Itinerary\'s Plan', subtitle: getDateString(navigation.getParam('params').title)}}
        />,
        headerRight: <HeaderRightButton callback={navigation.getParam('openForm')} />
    });

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({openForm: this.toggleModal});
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    /**
     * Handles the form submition and posterior behavior.
     * If dateIndex and dayIndex are different, the user is redirected to the
     * itinerary list day view.
     * 
     * @param {object} editedPlan 
     * @param {number} dateIndex index of the selected date.
     */
    onSubmitForm(editedPlan, dateIndex) {
        const {dayIndex, planIndex} = this.props.navigation.getParam('params');
        this.props.editItineraryItem(editedPlan, dayIndex, planIndex, dateIndex);
        this.toggleModal();
        if (dayIndex !== dateIndex) {
            this.props.navigation.navigate('Itinerary');
        }
    }

    getItemForEdit() {
        const {dayIndex, planIndex} = this.props.navigation.getParam('params');
        let plan = this.props.itinerary[dayIndex][planIndex];

        plan.selectedDate = new Date(plan.selectedDate);
        return plan;
    }

    deleteItem() {
        const {dayIndex, planIndex} = this.props.navigation.getParam('params');
        this.props.deleteItineraryItem(dayIndex, planIndex);
        this.toggleModal();
        if (this.props.itinerary[dayIndex].length) {
            this.props.navigation.goBack(null);
        } else {
            this.props.navigation.pop(2);
        }
    }

    render() {
        const {dayIndex, planIndex} = this.props.navigation.getParam('params');
        const plan = this.props.itinerary[dayIndex][planIndex];
        return plan ? <ScrollView style={styles.container}>
            <Text style={styles.headerText}>{plan.title}</Text>
            <Text style={styles.detailsText}>{plan.description ? plan.description : 'Add a description.'}</Text>
            {
                !!plan.hour && <Text style={styles.detailsText}>{`Hour of event: ${plan.hour}`}</Text>
            }
            {
                !!plan.address && <MapLink address={plan.address} />
            }
            {
                !plan.address && <Text>{'No address. If you know where it is, add it!'}</Text>
            }
            {
                !!plan.address && <Map address={plan.address} style={styles.map} />
            }
            <Modal
                visible={this.state.showModal}
                onRequestClose={() => this.toggleModal()}
                transparent={false}
                animationType={'slide'}
            >
                <ScrollView>
                    <AddItineraryItemForm
                        isEvent={!!plan.hour}
                        submitForm={this.onSubmitForm}
                        onDeleteItem={this.deleteItem}
                        itemToEdit={this.getItemForEdit()}
                        dayIndex={dayIndex}
                        itemIndex={planIndex}
                    />
                </ScrollView>
            </Modal>
        </ScrollView> :
        null;
    }
}

function mapStateToProps(store) {
    const selectedTrip = store.trip.trips.filter(trip => trip.id === store.trip.selectedTrip)[0],
          selectedCityIndex = store.trip.selectedCityIndex,
          selectedCity = selectedTrip.cities[selectedCityIndex],
          itinerary = selectedCity.itinerary.filter((day) => !!day);

    return {itinerary};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    headerText: {
        marginBottom: 25,
        fontSize: 25
    },
    detailsText: {
        marginBottom: 20,
        fontSize: 18
    },
    map: {
        width: '100%',
        height: 330,
        marginTop: 15
    },
    headerRightButton: {
        marginRight: 10
    }
});

export default withNavigation(
    connect(
        mapStateToProps,
        {editItineraryItem, deleteItineraryItem}
    )
(ItineraryItemDetailsScreen));
