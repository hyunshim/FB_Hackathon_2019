import React from 'react';

import map from '../images/map.png'


class MapView extends React.Component {
    render() {
        return (
            <div style={{position: "absolute", top: "0", position: "fixed"}}><img style={{height: "100%"}}src={map} /></div>
        );
    }
}

export default MapView;