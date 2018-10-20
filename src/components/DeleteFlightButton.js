import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import {deleteFlightFromCity} from '../redux/actions';

import IconButton from './IconButton';
import ConfirmationModal from './ConfirmationModal';

class DeleteFlightButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }

        this.onFlightDeletion = this.onFlightDeletion.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.activateModal = this.activateModal.bind(this);
    }

    closeModal() {
        this.setState({showModal: false});
    }

    activateModal() {
        this.setState({showModal: true});
    }

    onFlightDeletion() {
        this.props.deleteFlightFromCity();
        this.closeModal();
    }

    render() {
        return <View>
            <IconButton iconName={'md-trash'} size={30} callback={this.activateModal}/>
            <ConfirmationModal
                show={this.state.showModal}
                message={'Are you sure?'}
                onConfirmation={this.onFlightDeletion}
                closeModal={this.closeModal}
            />
        </View>;
    }
}

export default connect(null, {deleteFlightFromCity})(DeleteFlightButton);
