import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class HeaderTitle extends React.Component {
    render() {
        return <Text style={styles.title}>{this.props.title}</Text>
    }
}

const mapStateToProps = (state) => ({
    title: state.trip.headerTitle
})

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 30
    }
});

export default connect(mapStateToProps, null)(HeaderTitle);
