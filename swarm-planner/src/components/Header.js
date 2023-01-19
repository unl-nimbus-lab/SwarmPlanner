import React from 'react';
import ConnectionManager from './ConnectionManager';
import TabButton from './TabButton';
import '../styles/Header.css'
import Swarm from '../resources/images/swarm.svg'
import Path from '../resources/images/location-path.svg'
import tool from '../resources/images/wrench.svg'


class Header extends React.Component {
    render() {

        var swarmOverviewStyle = "SwarmOverviewDefault"
        var clusterControlStyle = "ClusterControlDefault"
        var swarmConfigStyle = "SwarmConfigDefault"

        if (this.props.selected === "SwarmOverview") {
            swarmOverviewStyle = "SwarmOverviewSelected"
        } else if (this.props.selected === "ClusterControl") {
            clusterControlStyle = "ClusterControlSelected"
        } else if (this.props.selected === "SwarmConfig") {
            swarmConfigStyle = "SwarmConfigSelected"
        }


        return(
            <div className="header">
                <div className="logo">
                    <p className="logoText" >Swarm Planner</p>
                </div>
                <div className="tabs">
                    <TabButton image={Swarm} class={swarmOverviewStyle} title="SwarmOverview" buttonFcn={this.props.buttonFcn} message="Overview"/>
                    <TabButton image={Path} class={clusterControlStyle} title="ClusterControl" buttonFcn={this.props.buttonFcn} message="Mission"/>
                    <TabButton image={tool} class={swarmConfigStyle} title="SwarmConfig" buttonFcn={this.props.buttonFcn} message="Setup"/>
                </div>
                <div>
                    <ConnectionManager />
                </div>
            </div>
        );
    }
}

export default Header;