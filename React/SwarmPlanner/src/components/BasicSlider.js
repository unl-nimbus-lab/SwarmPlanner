import React from 'react'
import '../styles/ButtonStyles.css'
import '../styles/SwarmManagerSlider.css'

class BasicSlider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {stateVal: 0}
    }

    handleChange = (event) => {
        this.setState({stateVal: event.target.value})
    }

    render() {
        if (this.props.render === "Collapsed") {
            return null;
        }
        
        let buttonHandle = this.props.buttonFcn;

        return(
            <div className={this.props.sliderClass}>
                <input className={this.props.SliderStyle} type="range" min={this.props.min} max={this.props.max} onChange={this.handleChange} defaultValue={this.props.defaultValue}/>
                {this.state.stateVal}
                <button className={this.props.ButtonClass} onClick={ ()=>{buttonHandle(this.state.stateVal)} }>{this.props.title}</button>
            </div>
    
        );
    }

}

export default BasicSlider;