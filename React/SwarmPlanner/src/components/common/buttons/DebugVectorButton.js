import React from "react";
import '../../../styles/ButtonStyles.css'

class DebugVectorButton extends React.Component {

    buttonFcn = () => {
        if ('option3' in this.props) {
            fetch('http://127.0.0.1:8080/debug_vector/' + this.props.clusterId + '$' + this.props.clusterCommand + '/' + this.props.option1 + '/' + this.props.option2 + '/' + this.props.option3);
        } 
        else if ('option2' in this.props) {
            fetch('http://127.0.0.1:8080/debug_vector/' + this.props.clusterId + '$' + this.props.clusterCommand + '/' + this.props.option1 + '/' + this.props.option2);
        }

        else if ('option1' in this.props) {
            fetch('http://127.0.0.1:8080/debug_vector/' + this.props.clusterId + '$' + this.props.clusterCommand + '/' + this.props.option1);
        }

        else {
            fetch('http://127.0.0.1:8080/debug_vector/' + this.props.clusterId + '$' + this.props.clusterCommand);
        }
    }

    render() {
        return(
            <button className={this.props.class} onClick={this.buttonFcn}>{this.props.title}</button>
        );
    }
}

export default DebugVectorButton;