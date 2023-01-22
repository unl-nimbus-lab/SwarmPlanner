import React from 'react'
import ModeButton from './ModeButton'
import '../styles/AgentStatusCard.css'

class ExtraButtons extends React.Component {
    render() {
        if (this.props.render === "Collapsed") {
            return null;
        }

        return(
            <div className="AgentStatusCardSection-RegularSpaced">
                <ModeButton class="ModeButton-Mid" mode="STABILIZE" agentId={this.props.agentId} compId={this.props.compId} />
                <ModeButton class="ModeButton-Mid" mode="ALT_HOLD" agentId={this.props.agentId} compId={this.props.compId} />
                <ModeButton class="ModeButton-Mid"  mode="LOITER" agentId={this.props.agentId} compId={this.props.compId} />
                <ModeButton class="ModeButton-Mid"  mode="GUIDED" agentId={this.props.agentId} compId={this.props.compId} />
                <ModeButton class="ModeButton-Mid"  mode="AUTO" agentId={this.props.agentId} compId={this.props.compId} />
                <ModeButton class="ModeButton-Mid"  mode="THROW" agentId={this.props.agentId} compId={this.props.compId} />
                <ModeButton class="ModeButton-Mid"  mode="BRAKE" agentId={this.props.agentId} compId={this.props.compId} />
                <ModeButton class="ModeButton-Mid"  mode="STRIKE" agentId={this.props.agentId} compId={this.props.compId} />
            </div>
        );
    }
}

export default ExtraButtons