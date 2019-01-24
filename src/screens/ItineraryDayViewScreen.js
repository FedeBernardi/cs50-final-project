import React from 'react';
import {connect} from 'react-redux';

import {editDayPlansList} from '../redux/actions';

import HeaderTitle from '../components/navigation/HeaderTitle';
import ItineraryList from '../components/ItineraryList';
import ItineraryDayViewHeaderButtons from '../components/navigation/ItineraryDayViewHeaderButtons';

class ItineraryDayViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <HeaderTitle
            title={{title: 'Itinerary', subtitle: navigation.getParam('dayPlans').title}}
        />,
        headerRight: <ItineraryDayViewHeaderButtons {...navigation.getParam('params')} />
    });

    constructor(props) {
        super(props);

        const dayPosition = props.navigation.getParam('dayPlans').dayPosition;
        const items = props.itinerary[dayPosition];

        this.state = {
            listOrder: Object.keys(items),
            isEditionMode: false
        }

        this.updateListOrder = this.updateListOrder.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.saveList = this.saveList.bind(this);
        this.sendParams = this.sendParams.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({params: this.sendParams(false)});
    }

    sendParams(editionState) {
        return {
            switchMode: this.switchMode,
            saveList: this.saveList,
            isEditionMode: editionState
        }
    }

    switchMode() {
        this.setState({isEditionMode: !this.state.isEditionMode});
        this.props.navigation.setParams({params: this.sendParams(!this.state.isEditionMode)});
    }

    saveList() {
        const {dayPosition} = this.props.navigation.getParam('dayPlans');
        this.props.editDayPlansList(this.state.listOrder, dayPosition);
        this.switchMode();
    }

    updateListOrder(newOrder) {
        this.setState({listOrder: newOrder});
    }

    render() {
        //const items = this.props.navigation.getParam('dayPlans').dayPlans;
        const dayPosition = this.props.navigation.getParam('dayPlans').dayPosition;
        const items = this.props.itinerary[dayPosition];

        return <ItineraryList
            items={items}
            order={this.state.listOrder}
            updateListCallback={this.updateListOrder}
            isEditing={this.state.isEditionMode}
        />;
    }
}

function mapStateToProps(store) {
    const selectedTrip = store.trip.trips.filter(trip => trip.id === store.trip.selectedTrip)[0],
          selectedCityIndex = store.trip.selectedCityIndex,
          selectedCity = selectedTrip.cities[selectedCityIndex],
          itinerary = selectedCity.itinerary.filter((day) => !!day);

    return {itinerary};
}

export default connect(mapStateToProps, {editDayPlansList})(ItineraryDayViewScreen);
