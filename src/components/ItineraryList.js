import React from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import SortableListView from 'react-native-sortable-listview';

import ItineraryItem from './ItineraryItem';

export default class ItineraryList extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        order: PropTypes.array.isRequired,
        updateListCallback: PropTypes.func.isRequired,
        isEditing: PropTypes.bool.isRequired,
        dayIndex: PropTypes.number.isRequired
    }

    render() {
        const {items, isEditing, order, dayIndex, updateListCallback} = this.props;

        return !isEditing ?
            items.map((item, index) => <ItineraryItem key={index} plan={item} dayIndex={dayIndex} planIndex={index}/>) :
            <SortableListView
                data={items}
                order={order}
                renderRow={item => <ItineraryItem plan={item} isEditListMode={true}/>}
                onRowMoved={e => {
                    order.splice(e.to, 0, order.splice(e.from, 1)[0]);
                    updateListCallback(order);
                }}
            />;
    }
}
