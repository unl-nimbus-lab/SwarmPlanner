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

import OnOffButton from '../../common/buttons/OnOffButton';
import SimpleCommand from '../../common/buttons/SimpleCommand';
import LongButton from '../../common/buttons/LongButton';

let commandMap = {
    arm: "arm",
    disarm: "disarm",
    col_on: "col_on",
    col_off: "col_off",
    vel_on: "vel_on",
    vel_off: "vel_off",
    guided: "guided",
    rtl: "rtl",
    land: "land",
    brake: "brake",
    auto: "auto",
    ping: "ping",
    takeoff: "takeoff",
    mission: "mission",

};

class HRLButtons extends React.Component {
    constructor(props) {
        super(props)
    }

    goTo = (x,y,z) => {
        fetch('http://127.0.0.1:8080/goto/' + x + '/' + y + '/' + z);
    }

    normalVectorSend = (name,x,y,z) => {
        fetch('http://127.0.0.1:8080/debug_vector/' + name + '/' + x + '/' + y + '/' + z);

    }



    render() {
        return(
            <div>
                <div className="center-text">
                    <p className="PanelLabel" >Swarm Control Actions</p>
                </div>
                {/* <div className="center-input">
                    <p className="PanelSubLabel">Target Group: </p>
                    <input className="SmallInput" onChange={this.handleChangeClusterId} type='text' defaultValue="C1" />
                </div> */}
                <div className="center">
                    <OnOffButton class="ArmButton" title="ARM" command={commandMap.arm}/>
                    <OnOffButton class="DisarmButton" title="DISARM" command={commandMap.disarm}/>

                </div>
                <div className="center">
                    <OnOffButton class="ArmButton" title="Control ON" command={commandMap.vel_on} option1={"-r"}/>
                    <OnOffButton class="DisarmButton" title="Control OFF" command={commandMap.vel_off} option1={"-r"}/>

                </div>
                <div className="center">
                    <OnOffButton class="ArmButton" title="Avoidance ON" command={commandMap.col_on} option1={"-r"}/>
                    <OnOffButton class="DisarmButton" title="Avoidance OFF" command={commandMap.col_off} option1={"-r"}/>

                </div>
                <div className="center">
                    <SimpleCommand class="ModeButton" title="GUIDED"    command={commandMap.guided} option1={"-r"}/>
                    <SimpleCommand class="ModeButton" title="RTL"       command={commandMap.rtl} option1={"-r"}/>
                    <SimpleCommand class="ModeButton" title="LAND"      command={commandMap.land} option1={"-r"}/>
                </div>
                <div className="center">
                    <SimpleCommand class="ModeButton" title="BRAKE"     command={commandMap.brake} option1={"-r"}/>
                    <SimpleCommand class="ModeButton" title="AUTO"      command={commandMap.auto} option1={"-r"}/>
                    <SimpleCommand class="ModeButton" title="PING"      command={commandMap.ping} />
                </div>
                <div>
                    <SimpleCommand class="ModeButton" title="LH 4"     command={"SET_LH"} option1={"4"} />
                    <SimpleCommand class="ModeButton" title="LH 6"     command={"SET_LH"} option1={"6"} />
                    <SimpleCommand class="ModeButton" title="LH 8"     command={"SET_LH"} option1={"8"} />
                </div>
                <div>
                    <SimpleCommand class="ModeButton" title="RT 0.005"     command={"SET"} option1={"0.005"} option2={"-r"}/>
                    <SimpleCommand class="ModeButton" title="RT 0.025"     command={"SET"} option1={"0.025"} option2={"-r"}/>
                    <SimpleCommand class="ModeButton" title="RT 0.050"     command={"SET"} option1={"0.05"}  option2={"-r"}/>
                </div>

                <div>
                    <LongButton class="EmergencyRTL" title="START" command={"mission"} />
                </div>
                <div>
                    <LongButton class="EmergencyLand" title="RTL"  command={commandMap.rtl} option1={"-r"}/>
                </div>


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
                {/* <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel"> Send Collision Point (LAT, LON, ALT)</p>
                    </div>
                    <ThreeValueInput buttonFcn={this.goTo}/>
                </div> */}
                {/* <div className="HRLSeparate">
                    <div className="AgentStatusCardSection-Regular">
                        <p className="PanelSubLabel">SET TARGET SYSTEM</p>
                    </div>
                        <SingleValueInput buttonFcn={this.targetVectorSend} title="SYSTEM ID" />
                </div> */}
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