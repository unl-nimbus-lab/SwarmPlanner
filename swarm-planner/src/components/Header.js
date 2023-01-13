import React from 'react';
import ConnectionManager from './connection-manager';
import '../styles/Header.css'

class Header extends React.Component {
    
    render() {
        return(
            <div className="header">
                <div className="logo">
                    swarmplanner
                </div>
                <div className="tabs">
                    tabs go here
                </div>
                <div>
                    <ConnectionManager />
                </div>
            </div>
        );
    }
}

export default Header;