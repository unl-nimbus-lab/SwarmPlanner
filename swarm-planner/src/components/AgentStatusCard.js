import React from 'react';
import "../styles/AgentStatusCard.css"
import dockerPlain from "../resources/images/docker-1.svg"
import dockerBlue from "../resources/images/docker-3.svg"
import connectPlain from "../resources/images/wireless-plain.svg"
import connectBlue from "../resources/images/wireless-blue.svg"
import quad from "../resources/images/Simple_drone.svg"
import BasicSlider from './BasicSlider';


class AgentStatusCard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {options: 'Collapsed'}
    }
    
    armed = () => {
        if (this.props.armStatus === 'true') {
            return 'ARMED';
        } else {
            return 'DISARMED';
        }
    }

    arm = () => {
        //console.log("arming [" + this.props.agentId + "," + this.props.compId + "]")
        fetch('http://127.0.0.1:8080/arm/' + "[" + this.props.agentId + "," + this.props.compId + "]" )
    }

    disarm = () => {
        fetch('http://127.0.0.1:8080/disarm/' + "[" + this.props.agentId + "," + this.props.compId + "]" )
    }

    setLand = () => {
        fetch('http://127.0.0.1:8080/set_mode/LAND/' + "[" + this.props.agentId + "," + this.props.compId + "]" )
    }

    setRTL = () => {
        fetch('http://127.0.0.1:8080/set_mode/RTL/' + "[" + this.props.agentId + "," + this.props.compId + "]" )
    }

    setOptions = () => {
        if (this.state.options === 'Collapsed') {
            //change to not collapsed
            this.setState({options: 'Expanded'})
        } else {
            this.setState({options: 'Collapsed'})
        }
    }

    render() {
        const isArmed = this.armed();
        
        //if (this.state.options)

        const sliderId = "SetAltitude" + this.props.agentId;

        return(
            <div key={this.props.agentId} className={"AgentStatusCard"} id={this.props.agentId} value={this.props.agentId}>
                <div className={"AgentStatusCardSection-Regular"}>
                    <img className="DroneLogo" src={quad} />
                    <div className="IdTag">{"agent-" + this.props.agentId}</div>
                    <img className="ConnectIcon" src={connectPlain} />
                    <img className="DockerIcon" src={dockerBlue} />
                    <div className="FlightModeTag">{this.props.flightMode}</div>
                    <div className="ArmTag">{isArmed}</div>
                    <div className="AltTag">{this.props.altitude}</div>
                    <button className="ArmingButton" onClick={this.arm}>ARM</button>
                    <button className="DisarmButton" onClick={this.disarm}>DISARM</button>
                    <button className="LandButton"   onClick={this.setLand}>LAND</button>
                    <button className="RTLButton"    onClick={this.setRTL}>RTL</button>
                    <div className="ExpandOptions"   onClick={this.setOptions}>
                    </div>
                </div>
                <BasicSlider id={this.props.agentId} render={this.state.options}/>
            </div>
        )
    }
}

export default AgentStatusCard;