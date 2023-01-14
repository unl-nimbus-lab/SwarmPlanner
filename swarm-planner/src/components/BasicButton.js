import React from 'react'
import ModeButton from './ModeButton'

class BasicButton extends React.Component {
    render() {
        return(
            <button style={this.props.style} onClick={this.props.clickFunction} >{this.props.name}</button>
        );
    }
}

export default BasicButton