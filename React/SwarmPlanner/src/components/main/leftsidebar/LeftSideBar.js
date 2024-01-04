import React from 'react';
import '../../../styles/LeftSideBar.css'
import HRLButtons from './HRLButtons';
import SwarmManager from './SwarmManager'


class LeftSideBar extends React.Component {
    render() {
        return (
            <div className="LeftSideBar">
                <div className="HRLManager">
                    <HRLButtons />
                </div>
                <div className="SwarmManager">
                    <SwarmManager />
                </div>
                <div className="TopBox">

                </div>
            </div>
        );
    }
}

export default LeftSideBar;