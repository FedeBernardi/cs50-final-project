import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {isEmpty} from '../../utils/functions';

export default class TypeSearch extends React.Component {

    static propTypes = {
        label: PropTypes.string,
        placeholder: PropTypes.string,
        searchFunction: PropTypes.func.isRequired,
        mapToComponent: PropTypes.func.isRequired,
        onSelection: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            resultsFromSearch: [],
            selectedOption: {}
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    // Erases the previous selection, if there was any, and resets the
    // input to search again. Also it executes the onSelection callback
    // to tell the parent component that there is no selected option now.
    onFocusHandler() {
        this.setState({selectedOption: {}, resultsFromSearch: []});
        this.props.onSelection('');
    }

    // Will execute the callback searchFunction, where the call to the
    // api is made.
    async handleOnChange(value) {
        if (isEmpty(this.state.selectedOption) && value.length >= 4) {
            const results = await this.props.searchFunction(value);
            this.setState({resultsFromSearch: results});
        }
    }

    // Executes the onSelection callback, where the selected input is
    // passed to the parent component. The resultsFromSearch is cleaned.
    handleSelection(selectedOption) {
        this.props.onSelection(selectedOption);
        this.setState({resultsFromSearch: [], selectedOption});
        this.refs['input'].blur();
    }

    render() {
        const {placeholder, label, mapToComponent} = this.props;
        const {resultsFromSearch, selectedOption} = this.state;

        return <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                ref='input'
                style={styles.input}
                value={isEmpty(selectedOption) ? null : selectedOption.description}
                onFocus={this.onFocusHandler}
                onBlur={this.onBlurHandler}
                placeholder={placeholder}
                onChangeText={this.handleOnChange}
                underlineColorAndroid='transparent'
            />
            {!!resultsFromSearch.length && <View style={styles.resultsContainer}>
                {resultsFromSearch.map((result, index) => <View key={index} style={styles.optionContainer}>
                    <TouchableOpacity onPress={() => this.handleSelection(result)}>
                        {mapToComponent(result)}
                    </TouchableOpacity>
                    <View style={styles.separatorContainer}>
                        <View style={styles.separator}></View>
                    </View>
                </View>)}
            </View>}
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    input: {
        marginBottom: 10,
        width: '100%',
        height: 40,
        paddingLeft: 5,
        borderWidth: 1,
        backgroundColor: '#FFF'
    },
    resultsContainer: {
        width: '100%',
        borderWidth: 1,
        backgroundColor: '#FFF'
    },
    optionContainer: {
        marginBottom: 10
    },
    separatorContainer: {
        alignItems: 'center'
    },
    separator: {
        width: '75%',
        borderBottomWidth: 0.4
    }
});
