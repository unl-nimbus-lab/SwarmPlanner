import React from 'react'
import "../styles/RemoveButton.css"

class RemoveButton extends React.Component {

    render() {
        var handleRemove = this.props.removeFun;
        return (
            <div className="RemoveButton" onClick={() => {handleRemove(this.props.compId)}}>
                x
            </div>
        )
    }
}

export default RemoveButton;