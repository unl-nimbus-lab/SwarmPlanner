import React from 'react'
import '../styles/Header.css'

class TabButton extends React.Component {
    render() {
        let buttonHandle = this.props.buttonFcn
        return(
            <div className={this.props.class} onClick={() => {buttonHandle(this.props.title)}}>
                {this.props.title}
            </div>
        );
    }
}

export default TabButton;