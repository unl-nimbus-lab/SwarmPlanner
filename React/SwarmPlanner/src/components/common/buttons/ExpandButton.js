import React from 'react'
import '../../../styles/AgentStatusCard.css'

class ExpandButton extends React.Component {
    render() {
        var buttonAction = this.props.buttonAction;
        return(
            <div className="ExpandOptions" onClick={ () => {buttonAction()} }> </div>
        );
    }
}
export default ExpandButton