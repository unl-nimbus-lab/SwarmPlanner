import React from 'react';
import ConnectionManager from './ConnectionManager';
import TabButton from './TabButton';
import '../styles/Header.css'


class Header extends React.Component {
    
    render() {
        return(
            <div className="header">
                <div className="logo">
                    swarmplanner
                </div>
                <div className="tabs">
                    <TabButton class="SwarmOverviewTab" title="SwarmOverview" buttonFcn={this.props.buttonFcn}/>
                    <TabButton class="ClusterControlTab" title="ClusterControl" buttonFcn={this.props.buttonFcn}/>
                    <TabButton class="SwarmConfigTab" title="SwarmConfig" buttonFcn={this.props.buttonFcn}/>
                    <TabButton class="ParameterManagerTab" title="ParameterManager" buttonFcn={this.props.buttonFcn}/>
                    <TabButton class="SwarmOverViewTab" title="DeploymentManager" buttonFcn={this.props.buttonFcn}/>
                </div>
                <div>
                    <ConnectionManager />
                </div>
            </div>
        );
    }
}

export default Header;