import React from 'react'
import '../styles/TestStyles.css'

let agentChoices = [1,2,3,4,5,6,7,8,9,10,11,12]

let options = agentChoices.map( (agent) => {
    return (
        <option value={agent} key={agent}>{agent}</option>
    )
})


class BodySwarmConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {vehicles: '1', gazebo: '', defaultCompProcess: "", path: ""};
    }

    buildComposeString = () => {
        console.log(this.state.vehicles)
    }

    numberChange = () => {
        const number = document.getElementById("numOfAgents").value;
        this.setState({vehicles: number})
    }

    generateCompose = () => {
        fetch('http://127.0.0.1:8080/generate_compose/' + (this.state.vehicles + "") + this.state.gazebo)
    }

    setNoGazebo = () => {
        this.setState({gazebo: ""})
        this.setState({path: ("")})
    }

    setHostGazebo = () => {
        this.setState({gazebo: "-gh"})
        this.setState({path: (document.getElementById("pathInput").value + "")})
    }

    setContainerGazebo = () => {
        this.setState({gazebo: "-gc"})
        this.setState({path: ("")})
    }

    setDefaultComp = () => {
        if (document.getElementById("checkbox1").checked) {
            this.setState({defaultCompProcess: "-c"})
        }
        else {
            this.setState({defaultCompProcess: ""})
        }
    }

    render() {
        return(
            <div>
                <div className="Bodyblue">
                    Number of Agents to Simulate: 
                    <select onChange={this.numberChange} id="numOfAgents">
                        {options}
                    </select>
                </div>

                <div className="Bodypink">
                    <div>
                        <label>
                            <input 
                                type="radio" 
                                value="No Gazebo" 
                                name="gazeboOption"
                                onChange={this.setNoGazebo}
                                />
                            Do not build for Gazebo
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="Host Gazebo" 
                                name="gazeboOption"
                                onChange={this.setHostGazebo}
                                />
                            Build for Gazebo on the host
                        </label>
                        
                        <label>
                            <input 
                                type="radio" 
                                value="Container Gazebo" 
                                name="gazeboOption" 
                                onChange={this.setContainerGazebo}
                                />
                            Build for Gazebo in a container
                        </label>
                        
                    </div>
                </div>
                <div className="Bodyblue">
                    <label>
                        <input type="checkbox" id="checkbox1" onChange={this.setDefaultComp}></input>
                        Default Companion Process
                    </label>
                </div>
                <div className="Bodypink">
                    For host gazebo, Input the absolute path the the "multi_drone.world" file:
                    <input type="text" id="pathInput"></input> 
                </div>
                <div className="Bodyblue">
                    {"python3 generate_compose.py" + " " + this.state.vehicles + " " + this.state.gazebo + " "+ this.state.path + " " + this.state.defaultCompProcess}
                </div>
                <div className="Bodypink">
                        <button onClick={this.generateCompose}>Generate Compose</button>
                </div>
            </div>

        );
    }
}

export default BodySwarmConfig;