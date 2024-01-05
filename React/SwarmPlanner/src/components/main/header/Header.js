import React , {useContext} from 'react';
import ConnectionManager from './ConnectionManager';
import TabButton from '../../common/buttons/TabButton';
import '../../../styles/Header.css'
import Swarm from '../../../resources/images/swarm.svg'
import Path from '../../../resources/images/location-path.svg'
import tool from '../../../resources/images/wrench.svg'
import {appContext} from '../../../App'



class Header extends React.Component {
    render() {

        var swarmOverviewStyle = "SwarmOverviewDefault"
        var clusterControlStyle = "ClusterControlDefault"
        var swarmConfigStyle = "SwarmConfigDefault"
        var swarmParameterStyle = "SwarmConfigDefault"


        if (this.props.selected === "SwarmOverview") {
            swarmOverviewStyle = "SwarmOverviewSelected"
        } else if (this.props.selected === "SwarmConfig") {
            swarmConfigStyle = "SwarmConfigSelected"
        } else if (this.props.selected === "ParameterControl") {
            swarmParameterStyle = "SwarmParameterSelected"
        }


        return(
            <div className="header">
                <div className="logo">
                    <p className="logoText" >Swarm Planner</p>
                </div>
                <div className="tabs">
                    <TabButton image={Swarm} class={swarmOverviewStyle} title="SwarmOverview" buttonFcn={this.props.buttonFcn} message="Overview"/>
                    <TabButton image={tool} class={swarmConfigStyle} title="SwarmConfig" buttonFcn={this.props.buttonFcn} message="Simulator Setup"/>
                    <TabButton image={tool} class={swarmConfigStyle} title="ParameterControl" buttonFcn={this.props.buttonFcn} message="Parameters"/>
                </div>
                <div>
                    <ConnectionManager />
                </div>
            </div>
        );
    }
}

export default Header;