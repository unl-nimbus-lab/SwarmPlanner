import React from 'react'
import ArmButton from '../../common/buttons/ArmButton';
import ModeButton from '../../common/buttons/ModeButton'
import DisarmButton from '../../common/buttons/DisarmButton';
import BasicSlider from '../../common/sliders/BasicSlider';
import '../../../styles/SwarmManagerSlider.css'
import '../../../styles/common.css'
import '../../../styles/TextStyles.css'

class SwarmManager extends React.Component {

    takeoff = (val) => {
        const altitude = val;
        fetch('http://127.0.0.1:8080/takeoff/' + altitude);
    }

    render() {
        return(
            <div>
                <div className="center-text">
                    <p className="PanelLabel" >MAVLink Quick Actions</p>
                </div>
                <div className="center">
                    <ArmButton class="ArmButton"/>
                    <DisarmButton class="DisarmButton"/>
                </div>
                <div className="center">
                    <ModeButton class="ModeButton" mode="STABILIZE" />
                    <ModeButton class="ModeButton" mode="ALT_HOLD" />
                    <ModeButton class="ModeButton" mode="LOITER" />
                </div>
                <div className="center">
                    <ModeButton class="ModeButton" mode="GUIDED" />
                    <ModeButton class="ModeButton"mode="AUTO"/>
                    <ModeButton class="ModeButton" mode="THROW"/>            
                </div>
                <div>
                    <BasicSlider SliderStyle='SwarmManagerSlider' sliderClass="AgentStatusCardSection-Medium" ButtonClass="TakeoffButton" buttonFcn={this.takeoff} min={3}  max={30} render={"render"} title="TAKEOFF" />
                </div>
                <div>
                    <ModeButton class="EmergencyLand" mode="LAND"/>
                </div>
                <div>
                    <ModeButton class="EmergencyRTL" mode="RTL"/>
                </div>
            </div>

        );
    }
}

export default SwarmManager;