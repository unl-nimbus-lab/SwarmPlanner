import React from 'react'
import DebugVectorButton from '../../common/buttons/DebugVectorButton';
import ThreeValueInput from '../../common/inputs/ThreeValueInput';
import BasicSlider from '../../common/sliders/BasicSlider';
import SingleValueInput from '../../common/inputs/SingleValueInput';
import FourValueInput from '../../common/inputs/FourValueInput';
import DebugIntButton  from '../../common/buttons/DebugIntButton';
import '../../../styles/common.css'
import '../../../styles/TextStyles.css'
import '../../../styles/InputTextStyles.css'
import '../../../styles/SwarmManagerSlider.css'
import '../../../styles/AgentStatusCard.css'

class HRLButtons extends React.Component {
    constructor(props) {
        super(props)
    }

    goTo = (x,y,z) => {
        fetch('http://127.0.0.1:8080/goto/' + x + '/' + y + '/' + z);
    }


    render() {
        return(
            <div>
                <div className="center-text">
                    <p className="PanelLabel" >Verifier Control Actions</p>
                </div>
                {/* <div className="center-input">
                    <p className="PanelSubLabel">Target Group: </p>
                    <input className="SmallInput" onChange={this.handleChangeClusterId} type='text' defaultValue="C1" />
                </div> */}
                <div className="center">
                    <DebugIntButton class="ArmButton" title="START ROS" value={"1"}/>
                    <DebugIntButton class="DisarmButton" title="STOP ROS" value={"2"}/>
                </div>
                {/* <div className="center">
                    <DebugVectorButton class="ModeButton" title="GUIDED" clusterId={this.state.clusterId} clusterCommand="3" option1="1" />
                    <DebugVectorButton class="ModeButton" title="ALT SEP" clusterId={this.state.clusterId} clusterCommand="3" option1="4" />
                    <DebugVectorButton class="ModeButton" title="TRACK"   clusterId={this.state.clusterId} clusterCommand="3" option1="5" />
                </div> */}
                {/* <div className="center">
                    <DebugVectorButton class="ModeButton" title="HRL NAV" clusterId={this.state.clusterId} clusterCommand="3" option1="9" />
                    <DebugVectorButton class="ModeButton" title="RALLY" clusterId={this.state.clusterId} clusterCommand="3" option1="1" />
                    <DebugVectorButton class="ModeButton" title="SEND IT"   clusterId={this.state.clusterId} clusterCommand="3" option1="5" />
                </div> */}
                {/* <div className="center">
                    <DebugVectorButton class="OrangeButton" title="ENABLE ORBIT" clusterId={this.state.clusterId} clusterCommand="11"/>
                    <DebugVectorButton class="OrangeButton" title="DISABLE ORBIT" clusterId={this.state.clusterId} clusterCommand="12"/>
                </div> */}
                {/* <div>
                    <BasicSlider SliderStyle='SwarmManagerSlider' sliderClass="AgentStatusCardSection-Medium" ButtonClass="TakeoffButton" buttonFcn={this.orbitSpeedSend} min={4}  max={20} render={"render"} title="SET ORBIT SPEED" /> 
                </div> */}
                {/* <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel">Set Cluster Target (Local X,Y,Z) </p>
                    </div>
                    <ThreeValueInput buttonFcn={this.waypointSend}/>
                </div> */}
                <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel"> Send Collision Point (LAT, LON, ALT)</p>
                    </div>
                    <ThreeValueInput buttonFcn={this.goTo}/>
                </div>
                {/* <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel">SET TARGET SYSTEM</p>
                    </div>
                        <SingleValueInput buttonFcn={this.targetVectorSend} title="SYSTEM ID" />
                </div> */}
                {/* <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel">Send Custom Vector</p>
                    </div>
                    <FourValueInput buttonFcn={this.normalVectorSend} />
                </div> */}


            </div>
        )
    }
}

export default HRLButtons;