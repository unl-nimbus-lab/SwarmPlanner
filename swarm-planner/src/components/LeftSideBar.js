import React from 'react';
import '../styles/LeftSideBar.css'

class LeftSideBar extends React.Component {
    render() {
        return (
            <div className="LeftSideBar">
                <button onClick={this.armAll}>Arm</button>
                <button onClick={this.disarmAll}>Disarm</button>
            </div>
        );
    }

    armAll() {
        //console.log("arm")
        fetch('http://127.0.0.1:8080/arm')

    }
    disarmAll() {
        fetch('http://127.0.0.1:8080/disarm')
    }
}

export default LeftSideBar;