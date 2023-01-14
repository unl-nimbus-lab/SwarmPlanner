import React from 'react'

class DroneLogo extends React.Component {

    render() {
        return(
            <img className={this.props.class} src={this.props.imageSource} />
        );
    }
}

export default DroneLogo;