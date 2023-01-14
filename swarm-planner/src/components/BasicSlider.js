import React from 'react'

class BasicSlider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {alt: 0}
        const sliderId = "slider" + this.props.agentId;
    }

    handleChange = (event) => {
        this.setState({alt: event.target.value})
    }

    sendValue = () => {
        fetch('http://127.0.0.1:8080/sendDebug/' + this.state.alt)
    }

    render() {

        if (this.props.render === "Collapsed") {
            return null;
        }

        return(
            <div className="AgentStatusCardSection-Regular">
                <input type="range" min="10" max="120" id={this.sliderId} onChange={this.handleChange} />
                {this.state.alt}
                <button onClick={this.sendValue}>Set Altitude</button>
            </div>
    
        );
    }

}

export default BasicSlider;