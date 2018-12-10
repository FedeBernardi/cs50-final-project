import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MapView, Location} from 'expo';
import {Permissions} from 'expo';
import PropTypes from 'prop-types';

export default class Map extends React.Component{ 
    
    static propTypes = {
        address: PropTypes.string.isRequired,
        style: PropTypes.number.isRequired
    }
    
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
                console.log(err);
            }
        }
    }

    componentDidMount() {
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
