import React from 'react'

class BasicSlider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {alt: 0}
    }

    handleChange = (event) => {
        this.setState({alt: event.target.value})
    }

    render() {

        const sliderId = "slider" + this.props.id;

        if (this.props.render === "Collapsed") {
            return null;
        }

        return(
            <div className="AgentStatusCardSection-Regular">
                <input type="range" min="10" max="120" id={sliderId} onChange={this.handleChange} />
                {this.state.alt}
                <button>Set</button>
            </div>
    
        );
    }

}

export default BasicSlider;