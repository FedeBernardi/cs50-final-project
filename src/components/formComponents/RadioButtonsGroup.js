import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class RadioButtonsGroup extends React.Component {

    static propTypes = {
        options: PropTypes.array.isRequired,
        onSelection: PropTypes.func.isRequired,
        defaultOption: PropTypes.number,
        isVertical: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: props.defaultOption !== null ? props.defaultOption : -1
        }
        
        this.onSelection = this.onSelection.bind(this);
    }

    onSelection(optionIndex, value) {
        this.setState({selectedOption: optionIndex});
        this.props.onSelection(value);
    }

    render() {
        const {isVertical, options} = this.props;

        return <View style={isVertical ? {} : styles.horizontalContainer}>
            {options.map(({label, value}, index) => <TouchableOpacity
                onPress={() => this.onSelection(index, value)}
                style={[styles.optionContainer, isVertical ? styles.verticalOption : styles.horizontalOption]}
                key={index}
            >
                <View style={styles.circle}>
                    <View style={[styles.innerCircle, this.state.selectedOption === index ? styles.selected : {}]}></View>
                </View>
                <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>)}
        </View>;
    }
}

const styles = StyleSheet.create({
    horizontalContainer: {
        flexDirection: 'row'
    },
    verticalOption: {
        marginBottom: 20
    },
    horizontalOption: {
        marginRight: 20
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        borderColor: '#FF637D',
        borderWidth: 4,
        padding: 20,
        marginRight: 10
    },
    innerCircle: {
        width: 30,
        height: 30,
        borderRadius: 20
    },
    label: {
        fontSize: 20
    },
    selected: {
        backgroundColor: '#FF637D'
    }
});
