import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

export default class HeaderTitle extends React.Component {

    renderText() {
        return <Text style={styles.title}>{this.props.title}</Text>;
    }

    renderObject() {
        return <View>
            <Text style={styles.titleObject}>{this.props.title.title}</Text>
            {this.props.title.subtitle && <Text style={styles.subtitle}>{this.props.title.subtitle}</Text>}
            {this.props.title.subtitle2 && <Text style={styles.subtitle2}>{this.props.title.subtitle2}</Text>}
        </View>
    }

    render() {
        return typeof this.props.title === 'string' ? this.renderText() : this.renderObject(); 
    }
}

const mapStateToProps = (state) => ({
    title: state.trip.headerTitle
})

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30
    },
    titleObject: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    subtitle: {
        fontSize: 15
    },
    subtitle2: {
        fontSize: 10
    }
});

export const HeaderTitleFromState = connect(mapStateToProps, null)(HeaderTitle);
