import React from "react";
import '../../../styles/ButtonStyles.css'

class OnOffButton extends React.Component {

    buttonFcn = () => {
        fetch('http://127.0.0.1:8080/' + this.props.command);
    }

    render() {
        return(
            <button className={this.props.class} onClick={this.buttonFcn}>{this.props.title}</button>
        );
    }
}

export default OnOffButton;