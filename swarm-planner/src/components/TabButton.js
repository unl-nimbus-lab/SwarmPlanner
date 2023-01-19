import React from 'react'
import '../styles/Header.css'
import '../styles/common.css'

class TabButton extends React.Component {
    render() {
        let buttonHandle = this.props.buttonFcn
        return(
            <div className={this.props.class} onClick={() => {buttonHandle(this.props.title)}}>
                {/* <img className="HeaderPicture" src={this.props.image} /> */}
                {this.props.title}
            </div>
        );
    }
}

export default TabButton;