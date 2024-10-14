import React from 'react'
import '../../../styles/ButtonStyles.css'

class ModeButton extends React.Component {

    buttonFcn = () => {

        let option1 = ""
        let option2 = ""
        let option3 = ""
        let option4 = ""
        let option5 = ""

        if ('option1' in this.props) {
            option1 = this.props.option1
        }
        if ('option2' in this.props) {
            option2 = this.props.option2
        }
        if ('option3' in this.props) {
            option3 = this.props.option3
        }
        if ('option4' in this.props) {
            option4 = this.props.option4
        }
        if ('option5' in this.props) {
            option5 = this.props.option5
        }

        fetch('http://127.0.0.1:8080/' + this.props.command + "/" + option1 + "/" + option2 + "/" + option3 + "/" + option4 + "/" + option5);

    }

    render() {
        return(
            <button className={this.props.class} onClick={this.buttonFcn}>{this.props.title}</button>
        );
    }
}

export default ModeButton