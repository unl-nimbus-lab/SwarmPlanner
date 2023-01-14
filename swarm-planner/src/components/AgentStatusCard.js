import React from 'react';
import "../styles/AgentStatusCard.css"
import dockerPlain from "../resources/images/docker-1.svg"
import dockerBlue from "../resources/images/docker-3.svg"
import connectPlain from "../resources/images/wireless-plain.svg"
import connectBlue from "../resources/images/wireless-blue.svg"
import quad from "../resources/images/Simple_drone.svg"
import BasicSlider from './BasicSlider'
import ExtraButtons from './ExtraButtons'
import ModeButton from './ModeButton'
import ArmButton from './ArmButton'
import DisarmButton from './DisarmButton';
import RemoveButton from './RemoveButton';
import ExpandButton from './ExpandButton';
import StatusTag from './StatusTag';
import DroneLogo from './DroneLogo';


class AgentStatusCard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {options: 'Collapsed'}
    }
    
    armed = () => {
        if (this.props.armStatus === true) {
            return 'ARMED';
        } else {
            return 'DISARMED';
        }
    }

    connected = () => {
        if (this.props.timeout === true) {
            return <img className="ConnectIcon" src={connectPlain} />
        } else {
            return <img className="ConnectIcon" src={connectBlue} />
        }
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
        const connection = this.connected();

        return(
            <div key={this.props.agentId} className={"AgentStatusCard"} id={this.props.agentId} value={this.props.agentId}>
                <div className={"AgentStatusCardSection-Regular"}>
                    <DroneLogo class="DroneLogo" imageSource={quad}/>
                    <div className="IdTag">{"agent-" + this.props.agentId}</div>
                    {connection}
                    <img className="DockerIcon" src={dockerBlue} />
                    <StatusTag class="FlightModeTag" info={this.props.flightMode} />          
                    <StatusTag class="ArmTag" info={isArmed} />
                    <StatusTag class="AltTag" info={this.props.altitude} />
                    <ArmButton agentId={this.props.agentId} compId={this.props.compId} />
                    <DisarmButton agentId={this.props.agentId} compId={this.props.compId} />
                    <ModeButton mode="LAND" agentId={this.props.agentId} compId={this.props.compId} />
                    <ModeButton mode="RTL" agentId={this.props.agentId} compId={this.props.compId} />
                    <ExpandButton buttonAction={this.setOptions} />
                    <RemoveButton agentId={this.props.agentId} compId={this.props.compId} removeFun={this.props.removeFun}/>
                </div>
                <ExtraButtons agentId={this.props.agentId} compId={this.props.compId} render={this.state.options} />
                <BasicSlider agentId={this.props.agentId} render={this.state.options} />
            </div>
        )
    }
}

export default AgentStatusCard;