import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import IconButton from './IconButton';

class ItineraryItem extends React.Component {
    static propTypes = {
        plan: PropTypes.object.isRequired,
        dayIndex: PropTypes.number,
        planIndex: PropTypes.number,
        isEditListMode: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.navigateToDetail = this.navigateToDetail.bind(this);
    }

    navigateToDetail() {
        const {dayIndex, planIndex, plan} = this.props;
        const params = {dayIndex, planIndex, title: plan.selectedDate};

        this.props.navigation.navigate('ItineraryItemDetails', {params});
    }

    render() {
        const {plan, isEditListMode, sortHandlers} = this.props;
        // The handlers will deferred depending on if it is edition mode or not.
        const touchableHandlers = isEditListMode ? sortHandlers : {onPress: this.navigateToDetail}

        return <TouchableHighlight
            underlayColor={'#EEE'}
            {...touchableHandlers}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{plan.title}</Text>
                </View>
                <View style={styles.iconsContainer}>
                    {
                        !!plan.address && !isEditListMode && <IconButton
                            iconName={'map'}
                            buttonBrand={IconButton.BUTTON_BRANDS.MaterialCommunityIcons}
                            size={15}
                        />
                    }
                    {
                        !!plan.description && !isEditListMode && <IconButton
                            iconName={'text-subject'}
                            buttonBrand={IconButton.BUTTON_BRANDS.MaterialCommunityIcons}
                            size={15}
                        />
                    }
                    {
                        isEditListMode && <IconButton
                            iconName={'md-menu'}
                            buttonBrand={IconButton.BUTTON_BRANDS.Ionicons}
                            size={25}
                        />
                    }
                </View>
            </View>
        </TouchableHighlight>;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 18
    }
});

export default withNavigation(ItineraryItem);
