import React from 'react'
import DebugVectorButton from './DebugVectorButton';
import ThreeValueInput from './ThreeValueInput';
import BasicSlider from './BasicSlider';
import SingleValueInput from './SingleValueInput';
import FourValueInput from './FourValueInput';
import '../styles/common.css'
import '../styles/TextStyles.css'
import '../styles/InputTextStyles.css'
import '../styles/SwarmManagerSlider.css'
import '../styles/AgentStatusCard.css'

class HRLButtons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {clusterId: "C1"}
    }
    
    handleChangeClusterId = (event) => {
        this.setState({clusterId: event.target.value})
    }

    normalVectorSend = (name,x,y,z) => {
        fetch('http://127.0.0.1:8080/debug_vector/' + name + '/' + x + '/' + y + '/' + z);
    }

    targetVectorSend = (x) => {
        fetch('http://127.0.0.1:8080/debug_vector/' + this.state.clusterId + '$10/' + x);
    }

    orbitSpeedSend = (speed) => {
        fetch('http://127.0.0.1:8080/debug_vector/' + this.state.clusterId + '$13/' + speed);
    }

    originSend = (x,y,z) => {
        fetch('http://127.0.0.1:8080/debug_vector/' + this.state.clusterId + '$7/' + x + '/' + y + '/' + z);
    }

    waypointSend = (x,y,z) => {
        fetch('http://127.0.0.1:8080/debug_vector/' + this.state.clusterId + '$4/' + x + '/' + y + '/' + z);
    }


    render() {
        return(
            <div>
                <div className="center-text">
                    <p className="PanelLabel" >HRL Control Panel</p>
                </div>
                <div className="center-input">
                    <p className="PanelSubLabel">Target Group: </p>
                    <input className="SmallInput" onChange={this.handleChangeClusterId} type='text' defaultValue="C1" />
                </div>
                <div className="center">
                    <DebugVectorButton class="ArmButton" title="START ROS" clusterId={this.state.clusterId} clusterCommand={"1"}/>
                    <DebugVectorButton class="DisarmButton" title="STOP ROS" clusterId={this.state.clusterId} clusterCommand={"2"}/>
                </div>
                <div>
                    <DebugVectorButton class="ModeButton" title="GUIDED" clusterId={this.state.clusterId} clusterCommand="3" option1="1" />
                    <DebugVectorButton class="ModeButton" title="ALT SEP" clusterId={this.state.clusterId} clusterCommand="3" option1="4" />
                    <DebugVectorButton class="ModeButton" title="TRACK"   clusterId={this.state.clusterId} clusterCommand="3" option1="5" />
                </div>
                <div>
                    <DebugVectorButton class="OrangeButton" title="ENABLE ORBIT" clusterId={this.state.clusterId} clusterCommand="11"/>
                    <DebugVectorButton class="OrangeButton" title="DISABLE ORBIT" clusterId={this.state.clusterId} clusterCommand="12"/>
                </div>
                <div>
                    <BasicSlider SliderStyle='SwarmManagerSlider' sliderClass="AgentStatusCardSection-Medium" ButtonClass="TakeoffButton" buttonFcn={this.orbitSpeedSend} min={4}  max={20} render={"render"} title="SET ORBIT SPEED" /> 
                </div>
                <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel">Set Cluster Target (Local X,Y,Z) </p>
                    </div>
                    <ThreeValueInput buttonFcn={this.waypointSend}/>
                </div>
                <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel"> Set Cluster Origin (WGS84 LAT, LON, ALT)</p>
                    </div>
                    <ThreeValueInput buttonFcn={this.originSend}/>
                </div>
                <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel">SET TARGET SYSTEM</p>
                    </div>
                        <SingleValueInput buttonFcn={this.targetVectorSend} title="SYSTEM ID" />
                    </div>
                <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel">Send Custom Vector</p>
                    </div>
                    <FourValueInput buttonFcn={this.normalVectorSend} />
                </div>


            </div>
        )
    }
}

export default HRLButtons;