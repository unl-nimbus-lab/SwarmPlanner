import React from 'react'
import '../styles/Header.css'

class TabButton extends React.Component {
    render() {
        let buttonHandle = this.props.buttonFcn
        return(
            <div className={this.props.class} onClick={() => {buttonHandle(this.props.title)}}>
                <img className="HeaderPicture" src={this.props.image} />
                <p className="HeaderText">{this.props.message}</p>
                
            </div>
        );
    }
}

export default TabButton;