import React from 'react';
import "../../styles/AgentStatusCard.css"
import dockerPlain from "../../resources/images/docker-1.svg"
import dockerBlue from "../../resources/images/docker-3.svg"
import connectPlain from "../../resources/images/wireless-plain.svg"
import connectBlue from "../../resources/images/wireless-blue.svg"
import pi from "../../resources/images/Raspberry_Pi-Logo.wine.svg"
import BasicSlider from '../common/sliders/BasicSlider'
import ExtraButtons from '../common/buttons/ExtraButtons'
import ModeButton from '../common/buttons/ModeButton'
import ArmButton from '../common/buttons/ArmButton'
import DisarmButton from '../common/buttons/DisarmButton';
import RemoveButton from '../common/buttons/RemoveButton';
import ExpandButton from '../common/buttons/ExpandButton';
import StatusTag from '../StatusTag';
import DroneLogo from '../DroneLogo';
import DropArrow from '../../resources/images/Arrow-down.svg'
import '../../styles/ButtonStyles.css'
import '../../styles/common.css'

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

    sendValue = (value) => {
        const sliderVal = value;
        fetch('http://127.0.0.1:8080/debug_vector/A' + this.props.agentId + '$14/' + sliderVal);
    }

    handleChange = (input) => {
        const value = document.getElementById(input).checked;
        console.log(value)
        console.log('click')
    }

    render() {
        const isArmed = this.armed();
        const connection = this.connected();
        
        return(
            <div key={this.props.agentId} className={"AgentStatusCard"} id={this.props.agentId} value={this.props.agentId}>
                <div className={"AgentStatusCardSection-Regular"}>
                    <img className="DropArrow" src={DropArrow} onClick={this.setOptions}/>
                    <StatusTag class="FlightModeTag" info={"AGENT-" + this.props.agentId} /> 
                    {connection}
                    <div>
                        <img className="DockerIcon" src={dockerBlue} />
                    </div>
                    <DroneLogo class="DroneLogo" imageSource={pi}/>
                    <StatusTag class="FlightModeTag" info={this.props.flightMode} />          
                    <StatusTag class={isArmed} info={isArmed} />
                    <StatusTag class="AltTag" info={this.props.altitude} />
                    <ArmButton class="ArmButton-Smol" agentId={this.props.agentId} compId={this.props.compId} />
                    <DisarmButton class="DisarmButton-Smol" agentId={this.props.agentId} compId={this.props.compId} />
                    <ModeButton class="ModeButton-Smol" mode="LAND" agentId={this.props.agentId} compId={this.props.compId} />
                    <ModeButton class="ModeButton-Smol" mode="RTL" agentId={this.props.agentId} compId={this.props.compId} />
                    {/* <input type="checkbox"  id={checkId} onChange={() => {this.handleChange(checkId)}}/> */}
                    <RemoveButton agentId={this.props.agentId} compId={this.props.compId} removeFun={this.props.removeFun}/>
                </div>
                <ExtraButtons agentId={this.props.agentId} compId={this.props.compId} render={this.state.options} />
                <BasicSlider SliderStyle='AgentStatusCard-Slider' sliderClass="AgentStatusCardSection-RegularSlider" ButtonClass="SetAltButton-Smol" buttonFcn={this.sendValue} agentId={this.props.agentId} defaultValue={10} min={10} max={120} render={this.state.options} title="SET ALTITUDE"/>
                <BasicSlider SliderStyle='AgentStatusCard-Slider' sliderClass="AgentStatusCardSection-RegularSlider" ButtonClass="SetAltButton-Smol" buttonFcn={this.sendValue} agentId={this.props.agentId} defaultValue={3}  min={3}  max={30}   render={this.state.options} title="TAKEOFF" />
            </div>
        )
    }
}

export default AgentStatusCard;