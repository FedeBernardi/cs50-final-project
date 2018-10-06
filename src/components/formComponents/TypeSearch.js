import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

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
            selectedValue: ''
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    // Erases the previous selection, if there was any, and resets the
    // input to search again. Also it executes the onSelection callback
    // to tell the parent component that there is no selected option now.
    onFocusHandler() {
        this.setState({selectedValue: ''});
        this.props.onSelection('');
    }

    // Will execute the callback searchFunction, where the call to the
    // api is made.
    async handleOnChange(value) {
        if (!this.state.selectedValue && value.length >= 4) {
            const results = await this.props.searchFunction(value);
            this.setState({resultsFromSearch: results});
        }
    }

    // Executes the onSelection callback, where the selected input is
    // passed to the parent component. The resultsFromSearch is cleaned.
    handleSelection(selectedValue) {
        this.props.onSelection(selectedValue);
        this.setState({resultsFromSearch: [], selectedValue});
        this.refs['input'].blur();
    }

    render() {
        const {placeholder, label, mapToComponent} = this.props;
        const {resultsFromSearch} = this.state;

        return <View style={styles.container}>
            {label && <Text>{label}</Text>}
            <TextInput
                ref='input'
                style={styles.input}
                value={this.state.selectedValue ? this.state.selectedValue : null}
                onFocus={this.onFocusHandler}
                placeholder={placeholder}
                onChangeText={this.handleOnChange}
            />
            {resultsFromSearch && resultsFromSearch.map((result, index) => <View key={index}>
                <TouchableOpacity onPress={() => this.handleSelection(result)}>
                    {mapToComponent(result)}
                </TouchableOpacity>
            </View>)}
        </View>;
    }

}

const styles = StyleSheet.create({
    container: {
        width: 150
    },
    input: {
        marginBottom: 10
    }
});
