import React from 'react'
import '../styles/TestStyles.css'

let agentChoices = [1,2,3,4,5,6,7,8,9,10,11,12]

let options = agentChoices.map( (agent) => {
    return (
        <option value={agent} key={agent}>{agent}</option>
    )
})

let endPointOptions = [1,2,3,4]

let endpoints = endPointOptions.map( (end) => {
    return (
        <option value={end} key={end}>{end}</option>
    )
})


class BodySwarmConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {vehicles: '1', gazebo: '', defaultCompProcess: "", path: "", alternateCompProcess: "", alternateCompProcessName: ""};
    }

    buildComposeString = () => {
        console.log(this.state.vehicles)
    }

    numberChange = () => {
        const number = document.getElementById("numOfAgents").value;
        this.setState({vehicles: number})
    }

    generateCompose = () => {
        fetch('http://127.0.0.1:8080/generate_compose/' + this.state.vehicles + "/"+ this.state.gazebo + "/"+ this.state.path +"/"+ this.state.defaultCompProcess +"/"+ this.state.alternateCompProcess +"/"+ this.state.alternateCompProcessName)
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

    setAltComp = () => {
        if (document.getElementById("checkbox2").checked) {
            this.setState({alternateCompProcess: "-d"})
            this.setState({alternateCompProcessName: (document.getElementById("compContainerName").value + "")})
        }
        else {
            this.setState({alternateCompProcess: ""})
            this.setState({alternateCompProcessName: ""})
        }        
    }

    render() {
        return(
            <div className="Bodymain">
                <div className="Bodypink">
                    <h1> Swarm Simulation Generator </h1>
                    <p>Welcome to the swarm simulation generator. Customize your simulation by chaning the parameters below. Once all of your parameters are selected, the
                        command to generate that simulation will appear below, starting with "python3 genearte_compose ...". Copy and run this command in a terminal, or simply
                        press the "Generate Compose" button (beta) to genearte a docker-compose file for the swarm you have specified.
                    </p>
                </div>
                <div className="Bodyblue">
                    <h2>Simulation Options</h2>
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
                        Include Companion Process
                    </label>
                </div>
                <div className="Bodypink">
                    For host gazebo, Input the absolute path the the "multi_drone.world" file:
                    <input type="text" id="pathInput"></input> 
                </div>
                <div className="Bodyblue">
                    Number of GCS Endpoints: 
                    <select onChange={this.endChange} id="numOfEndPoints">
                        {endpoints}
                    </select>
                </div>
                <div className="Bodypink">
                    <label>
                        <input type="checkbox" id="checkbox2" onChange={this.setAltComp}></input>
                        Specify Companion Process
                    </label>
                    <label>
                        Container Name: 
                        <input type="text" id="compContainerName" onChange={this.setAltComp}></input>
                    </label>
                </div>
                <div className="Bodyblue">
                    <h2>Simulation Generate Command</h2>
                    {"python3 generate_compose.py" + " " + this.state.vehicles + " " + this.state.gazebo + " "+ this.state.path + " " + this.state.defaultCompProcess +" " + this.state.alternateCompProcess + " " + this.state.alternateCompProcessName}
                </div>
                <div className="Bodypink">
                        <h2>Press to Generate the Compose File</h2>
                        <button onClick={this.generateCompose}>Generate Compose</button>
                </div>
            </div>

        );
    }
}

export default BodySwarmConfig;