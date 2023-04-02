import React from 'react'
import '../styles/TestStyles.css'

let parameterOptions = ['Select','SYS_MAVID', 'Parameter2']

let parameters = parameterOptions.map( (param) => {
    return (
        <option value={param} key={param}>{param}</option>
    )
})

class BodyParameterControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {getAgentId: '1', getParameterId: '', getResult: '', setAgentId: "", setParameterId: "", setValue: "", 
                      setResult: '', swapCurrentId: "", swapNewId: "", swapConfirm: false, swapResult: ''};
    }

    

    getParameters = () => {
        fetch('http://127.0.0.1:8080/fetch_parameters/' + this.state.getAgentId + "/" + this.state.getParameterId)
    }
    setParameters = () => {
        fetch('http://127.0.0.1:8080/set_parameters/' + this.state.setAgentId + "/" + this.state.setParameterId + "/" + this.state.setValue)
        .then(response => response.text())
        .then(data => {
        console.log(data);
        this.setState({setResult: data});
        })
        .catch(error => {
            console.error(error);
        })
    }

    setGetAgentId = () => {
        this.setState({getAgentId: (document.getElementById("getAgentId").value + "")})
    }
    setGetParameterId = () => {
        this.setState({getParameterId: (document.getElementById("getParameterId").value + "")})
    }
    setSetAgentId = () => {
        this.setState({setAgentId: (document.getElementById("setAgentId").value + "")})
    }
    setSetParameterId = () => {
        this.setState({setParameterId: (document.getElementById("setParameterId").value + "")})
    }
    setSetValue= () => {
        this.setState({setValue: (document.getElementById("setValue").value + "")})
    }
    setSwapCurrentID= () => {
        this.setState({swapCurrentId: (document.getElementById("swapCurrentId").value + "")})
    }
    setSwapNewID= () => {
        this.setState({swapNewId: (document.getElementById("swapNewId").value + "")})
    }
    setSwapConfirm = () => {
        if (document.getElementById("swapConfirm").checked) {
            this.setState({swapConfirm: true})
        }
        else {
            this.setState({swapConfirm: false})
        }
    }
    swapAgents = () => {
        //Implement
    }
    scanSwarm = () =>{
        //Implement
    }
    




    render() {
        return(
            <div className="Bodymain">
                <div className="Bodypink">
                    <h1> Global Agent Parameters </h1>
                    <p> This is the Global Parameters Control page. From here you can fetch all the connected agents respective global parameters that might
                        impact the swarm performance. Use fetch all or fetch single buttons to update information. Use Analyze Swarm to check through all agents to check for errors
                        Use the set parameters functionality at the bottom to modify single agent parameters, or to swap agents in and out of the swarm. 
                    </p>
                </div>
                <div>
                    <h2>GET Specific Agent Parameter</h2>
                </div>
                <div className="Bodypink">
                    Agent Id: 
                    <input type="text" id="getAgentId" onChange={this.setGetAgentId}></input> 
                </div>
                <div className="Bodypink">
                    Select Parameter Id:
                    <select onChange={this.setGetParameterId} id="getParameterId">
                        {parameters}
                    </select>
                      
                </div>
                <div className="Bodypink">
                <button onClick={this.getParameters}>Get Value</button>
                <br/>
                {"    Result: " }
                 </div>
                <div>
                    <h2>SET Specific Agent Parameter</h2>
                </div>
                <div className="Bodyblue">
                    Agent Id: 
                    <input type="text" id="setAgentId" onChange={this.setSetAgentId}></input> 
                </div>
                <div className="Bodyblue">
                    Select Parameter Id:
                    <select onChange={this.setSetParameterId} id="setParameterId">
                        {parameters}
                    </select>
                      
                </div>
                <div className="Bodyblue">
                    Value: 
                    <input type="text" id="setValue" onChange={this.setSetValue}></input> 
                </div>
                <div className="Bodyblue">
                <button onClick={this.setParameters}>Set Value</button>
                <br/>
                {"    Result: " + this.state.setResult}
                </div>
                <div>
                    <h2>SWAP / REPLACE Swarm Agents</h2>
                    <p>
                        This can be used to swap out agents, assumming the other agents paremeters holding only
                        the agents id constant.
                    </p>
                </div>
                <div className="Bodyblue">
                    Current Agent ID: 
                    <input type="text" id="swapCurrentId" onChange={this.setSwapCurrentID}></input> 
                </div>
                <div className="Bodyblue">
                    New Agent ID: 
                    <input type="text" id="swapNewId" onChange={this.setSwapNewID}></input> 
                </div>
                <div className="Bodyblue">
                    Confirm Swap: 
                    <input type="checkbox" id="swapConfirm" onChange={this.setSwapConfirm}></input>
                </div>
                <div className="Bodyblue">
                    <button onClick={this.swapAgents}>Swap Agents</button>
                    <br/>
                    {"    Result: "}
                </div>
                <div>
                    <h2>Swarm Scan</h2>
                    <p>
                        This can be used to scan all the connected agents to ensure no issues are present. Issues may include: Duplicate agent parameters, conflicting drop settings, etc. 
                    </p>
                </div>
                <div className="Bodyblue">
                    <button onClick={this.scanSwarm}>Scan Swarm</button>
                    <br/><br/>
                    {"    Result: "}
                    <br/><br/>
                </div>
            </div>

        );
    }
}

export default BodyParameterControl;