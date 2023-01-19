import React from 'react'
import "../styles/RemoveButton.css"
import "../styles/common.css"

class RemoveButton extends React.Component {

    render() {
        var handleRemove = this.props.removeFun;
        return (
            <div className="RemoveButton" onClick={() => {handleRemove(this.props.compId)}}>
                <p className="pain">x</p>
            </div>
        )
    }
}

export default RemoveButton;