import React from 'react'
import '../styles/TestStyles.css'

let agentChoices = [0,1,2,3,4,5,6,7,8,9,10,11,12]

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
        this.state = {copters: '1', helis: '0', blimps: '0', planes: '0', rovers: '0', subs: '0', defaultCompProcess: "", gazebo: ""};
    }

    buildComposeString = () => {
        console.log(this.state.vehicles)
    }

    coptersChange = () => {
        const number = document.getElementById("numCopters").value;
        this.setState({copters: number})

    }

    helisChange = () => { 
        const number = document.getElementById("numHelis").value;
        this.setState({helis: number})
    }

    blimpsChange = () => { 
        const number = document.getElementById("numBlimps").value;
        this.setState({blimps: number})
    }

    planesChange = () => {
        const number = document.getElementById("numPlanes").value;
        this.setState({planes: number})
    }

    roversChange = () => {
        const number = document.getElementById("numRovers").value;
        this.setState({rovers: number})
    }

    subsChange = () => {
        const number = document.getElementById("numSubs").value;
        this.setState({subs: number})
    }

    generateCompose = () => {
        fetch('http://127.0.0.1:8080/generate_compose/' + this.state.copters + "/"+ this.state.helis + "/"+ this.state.blimps +"/"+ this.state.planes +"/"+ this.state.rovers +"/"+ this.state.subs +"/"+ this.state.defaultCompProcess + "/" + this.state.gazebo)
    }

    setContainerGazebo = () => {
        if (document.getElementById("checkbox2").checked) {
            this.setState({gazebo: "-g"})
        }
        else {
            this.setState({gazebo: ""})
        }
    }

    setDefaultComp = () => {
        if (document.getElementById("checkbox1").checked) {
            this.setState({defaultCompProcess: "-m"})
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

    startSim = () => {
        fetch('http://127.0.0.1:8080/startSim/')
    }

    stopSim = () => {
        fetch('http://127.0.0.1:8080/stopSim/')
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

                    <div className="Bodypink">
                        Number of Copters to Simulate: 
                        <select onChange={this.coptersChange} id="numCopters">
                            {options}
                        </select>
                    </div>

                    {/* <div className="Bodyblue">
                        Number of Helis to Simulate: 
                        <select onChange={this.helisChange} id="numHelis">
                            {options}
                        </select>
                    </div>

                    <div className="Bodypink">
                        Number of Blimps to Simulate: 
                        <select onChange={this.blimpsChange} id="numBlimps">
                            {options}
                        </select>
                    </div>
                    <div className="Bodyblue">
                        Number of Planes to Simulate: 
                        <select onChange={this.planesChange} id="numPlanes">
                            {options}
                        </select>
                    </div>
                    <div className="Bodypink">
                        Number of Rovers to Simulate: 
                        <select onChange={this.roversChange} id="numRovers">
                            {options}
                        </select>
                    </div>
                    <div className="Bodyblue">
                        Number of Subs to Simulate: 
                        <select onChange={this.subsChange} id="numSubs">
                            {options}
                        </select>
                    </div> */}
                </div>
                

                {/* <div className="Bodypink">
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
                </div> */}
                <div className="Bodyblue">
                    <label>
                        <input type="checkbox" id="checkbox1" onChange={this.setDefaultComp}></input>
                        MAVROS
                    </label>
                </div>
                <div className="Bodypink">
                    <label>
                        <input type="checkbox" id="checkbox2" onChange={this.setContainerGazebo}></input>
                        gazebo
                    </label>
                </div>
                {/* <div className="Bodypink">
                    For host gazebo, Input the absolute path the the "multi_drone.world" file:
                    <input type="text" id="pathInput"></input> 
                </div> */}
                {/* <div className="Bodyblue">
                    Number of GCS Endpoints: 
                    <select onChange={this.endChange} id="numOfEndPoints">
                        {endpoints}
                    </select>
                </div> */}
                {/* <div className="Bodypink">
                    <label>
                        <input type="checkbox" id="checkbox2" onChange={this.setAltComp}></input>
                        Specify Companion Process
                    </label>
                    <label>
                        Container Name: 
                        <input type="text" id="compContainerName" onChange={this.setAltComp}></input>
                    </label>
                </div> */}
                <div className="Bodyblue">
                    <h2>Simulation Generate Command</h2>
                    {"python3 generate_compose.py" + " " + this.state.copters + " " + this.state.helis + " "+ this.state.blimps + " " + this.state.planes +" " + this.state.rovers + " " + this.state.subs + " " + this.state.defaultCompProcess + " " + this.state.gazebo}
                </div>
                <div className="Bodypink">
                        <h2>Press to Generate the Compose File</h2>
                        <button onClick={this.generateCompose}>Generate Compose</button>
                </div>
                <div className="Bodyblue">
                        <h2> Press to start simulation (beta)</h2>
                        <button onClick={this.startSim}>Start Simulation</button>
                        <button onClick={this.stopSim}>Stop Simulation</button>
                </div>
            </div>

        );
    }
}

export default BodySwarmConfig;