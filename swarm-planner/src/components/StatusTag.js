import React from 'react'

class StatusTag extends React.Component {
    render() {
        return(
            <div className={this.props.class}>{this.props.info}</div>
        )
    }
}

export default StatusTag