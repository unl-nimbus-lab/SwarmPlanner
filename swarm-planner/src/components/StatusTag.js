import React from 'react'
import '../styles/common.css'

class StatusTag extends React.Component {
    render() {
        return(
            <div className={this.props.class}>
                <p className="pain"> {this.props.info}</p></div>
        )
    }
}

export default StatusTag