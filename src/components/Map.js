import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MapView, Location, Permissions} from 'expo';
import PropTypes from 'prop-types';

export default class Map extends React.Component{ 
    
    static propTypes = {
        address: PropTypes.string.isRequired,
        style: PropTypes.number.isRequired
    }

    /**
     * It determines if the Location API is available to be used.
     * It's set to false when the API is being used by other instance of
     * this component.
     */
    static geoRequestAvailable = true;

    state = {
        addressMarker: null
    }

    async getAddressLocation() {
        if (this.constructor.geoRequestAvailable) {
            this.constructor.geoRequestAvailable = false;
            try {
                let {status} = await Permissions.askAsync(Permissions.LOCATION);
                if (status !== 'granted') {
                    console.error('No permission for Location');
                    return;
                }

                const addressLocation = await Location.geocodeAsync(this.props.address);
                this.setState({addressMarker: {
                    latitude: addressLocation[0].latitude,
                    longitude: addressLocation[0].longitude
                }});
                this.constructor.geoRequestAvailable = true;
                clearInterval(this.interval);
            } catch(err) {
                clearInterval(this.interval);
                console.log(err);
            }
        }
    }

    componentDidMount() {
        // Had to set an interval to keep executing the method that gets the
        // information to show the marker to the user. Having more than one map
        // on the same screen was making them to show the marker from the first one
        // instead of showing the corresponding one.
        this.interval = setInterval(() => {
            this.getAddressLocation();
        }, 500);
    }

    render() {
        const {addressMarker} = this.state;

        return <View style={this.props.style}>
            {
                addressMarker && <MapView
                    initialRegion={{
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121,
                        ...addressMarker
                    }}
                    style={styles.map}
                >
                    <MapView.Marker coordinate={addressMarker}/>
                </MapView>
            }
            {
                !addressMarker && <View style={styles.loadingMsgContainer}>
                    <Text>{'Map Loading...'}</Text>
                </View>
            }
        </View>;
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    loadingMsgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D8D8D8'
    }
});
