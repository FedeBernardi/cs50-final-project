import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import IconButton from './IconButton';

export default class ItineraryItem extends React.Component {
    static propTypes = {
        plan: PropTypes.object.isRequired,
        isEditMode: PropTypes.bool
    }

    render() {
        const {plan, isEditMode} = this.props;

        return <TouchableHighlight
            underlayColor={'#eee'}
            {...this.props.sortHandlers}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{plan.title}</Text>
                </View>
                <View style={styles.iconsContainer}>
                    {
                        !!plan.address && !isEditMode && <IconButton
                            iconName={'map'}
                            buttonBrand={IconButton.BUTTON_BRANDS.MaterialCommunityIcons}
                            size={15}
                        />
                    }
                    {
                        !!plan.description && !isEditMode && <IconButton
                            iconName={'text-subject'}
                            buttonBrand={IconButton.BUTTON_BRANDS.MaterialCommunityIcons}
                            size={15}
                        />
                    }
                    {
                        isEditMode && <IconButton
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
