import React from 'react';
import '../styles/LeftSideBar.css'
import ArmButton from './ArmButton';
import DisarmButton from './DisarmButton';

class LeftSideBar extends React.Component {
    render() {
        return (
            <div className="LeftSideBar">
                <ArmButton />
                <DisarmButton />
            </div>
        );
    }
}

export default LeftSideBar;