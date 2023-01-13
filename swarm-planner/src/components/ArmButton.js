import React from 'react'

function ArmButton(props) {

    function arm() {
        console.log('arming...')
    }

    return (
        <button onClick={this.arm}>ARM</button>
    )
}

export default ArmButton;