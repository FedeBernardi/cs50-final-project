import React from 'react';
import {View, Text, DatePickerAndroid, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';

export default class DatePicker extends React.Component {
    static propTypes = {
        dateSelectedHandler: PropTypes.func.isRequired,
        selectedDate: PropTypes.object.isRequired,
        minDate: PropTypes.object.isRequired,
        dismissedHandler: PropTypes.func,
        maxDate: PropTypes.object,
        isDisabled: PropTypes.bool,
        label: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.openDatePicker = this.openDatePicker.bind(this);
    }

    async openDatePicker() {
        const {minDate, selectedDate, maxDate} = this.props;

        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: selectedDate,
                minDate: minDate,
                maxDate: maxDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.props.dateSelectedHandler(new Date(year, month, day));
            }
        } catch({code, message}) {
            console.log(message);
        }
    }

    renderContent() {
        const {selectedDate, label, isDisabled} = this.props;

        return <View>
            {label && <Text>{label}</Text>}
            <View style={styles.description}>
                <Ionicons name={'ios-calendar'} style={isDisabled ? styles.disabled : {}} size={40}/>
                <Text style={[styles.date, isDisabled ? styles.disabled : {}]}>
                    {selectedDate.toLocaleDateString('en-US')}
                </Text>
            </View>
        </View>
    }

    render() {
        if (this.props.isDisabled) {
            return this.renderContent();
        } else {
            return <TouchableOpacity onPress={this.openDatePicker} style={styles.container}>
                {this.renderContent()}
            </TouchableOpacity>;
        }
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
    },
    disabled: {
        color: 'grey'
    }
});
