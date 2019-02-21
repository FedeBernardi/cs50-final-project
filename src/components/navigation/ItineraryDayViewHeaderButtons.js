import React from 'react';

import IconButton from '../IconButton';

export default (props) => {
    const {isEditionMode} = props;

    return <IconButton
        buttonBrand={IconButton.BUTTON_BRANDS.MaterialCommunityIcons}
        iconName={isEditionMode ? 'playlist-check' : 'playlist-edit'}
        size={30}
        callback={isEditionMode ? props.saveList : props.switchMode}
    />;
}