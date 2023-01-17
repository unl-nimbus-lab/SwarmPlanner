import React from 'react'
import DebugVectorButton from './DebugVectorButton';
import ThreeValueInput from './ThreeValueInput';
import '../styles/AgentStatusCard.css'
import BasicSlider from './BasicSlider';
import SingleValueInput from './SingleValueInput';
import FourValueInput from './FourValueInput';

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
                <div>
                    <input onChange={this.handleChangeClusterId} type='text' defaultValue="C1" />
                </div>

                <DebugVectorButton title="START ROS"            clusterId={this.state.clusterId} clusterCommand={"1"}/>
                <DebugVectorButton title="STOP ROS"             clusterId={this.state.clusterId} clusterCommand={"2"}/>
                <DebugVectorButton title="CLUSTER GUIDED LOCAL" clusterId={this.state.clusterId} clusterCommand="3" option1="1" />
                <DebugVectorButton title="ALTITUDE SEPARATION"  clusterId={this.state.clusterId} clusterCommand="3" option1="4" />
                <DebugVectorButton title="TRACK"                clusterId={this.state.clusterId} clusterCommand="3" option1="5" />
                <DebugVectorButton title="ENABLE ORBIT"         clusterId={this.state.clusterId} clusterCommand="11"/>
                <DebugVectorButton title="DISABLE ORBIT"        clusterId={this.state.clusterId} clusterCommand="12"/>
                <div>
                    <div className="AgentStatusCardSection-Regular">CLUSTER POSITION</div>
                    <ThreeValueInput buttonFcn={this.waypointSend}/>
                </div>
                <div>
                    <div className="AgentStatusCardSection-Regular">SET CLUSTER ORIGIN</div>
                    <ThreeValueInput buttonFcn={this.originSend}/>
                </div>
                <div>
                    <BasicSlider buttonFcn={this.orbitSpeedSend} min={4}  max={20} render={"render"} title="SET ORBIT SPEED" /> 
                </div>
                <div>
                <div className="AgentStatusCardSection-Regular">SET TARGET SYSTEM</div>
                    <SingleValueInput buttonFcn={this.targetVectorSend} title="SYSTEM ID" />
                </div>
                <div>
                    <div className="AgentStatusCardSection-Regular">CUSTOM VECTOR</div>
                    <FourValueInput buttonFcn={this.normalVectorSend} />
                </div>


            </div>
        )
    }
}

export default HRLButtons;