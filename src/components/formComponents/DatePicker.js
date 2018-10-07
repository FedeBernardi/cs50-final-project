import React from 'react';
import {View, Text, DatePickerAndroid, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';

export default class DatePicker extends React.Component {
    static propTypes = {
        dateSelectedHandler: PropTypes.func.isRequired,
        dissmisedHandler: PropTypes.func,
        selectedDate: PropTypes.object.isRequired,
        minDate: PropTypes.object.isRequired,
        label: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.openDatePicker = this.openDatePicker.bind(this);
    }

    async openDatePicker() {
        const {minDate, selectedDate} = this.props;

        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: selectedDate,
                minDate: minDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.props.dateSelectedHandler(new Date(year, month, day));
            }
        } catch({code, message}) {
            console.log(message);
        }
    }

    render() {
        const {selectedDate} = this.props;

        return <TouchableOpacity onPress={this.openDatePicker} style={styles.container}>
            {this.props.label && <Text>{this.props.label}</Text>}
            <View style={styles.description}>
                <Ionicons name={'ios-calendar'} size={40}/>
                <Text style={styles.date}>{selectedDate.toLocaleDateString('en-US')}</Text>
            </View>
        </TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        marginLeft: 15,
        fontSize: 20
    }
});
