import React from 'react'
import '../../styles/TestStyles.css'

let parameterOptions = ['Select','SYSID_THISMAV', 'INITIAL_MODE', 'THROW_TYPE','SERIAL1_BAUD','THROW_NEXTMODE','GPS_TYPE']

let parameters = parameterOptions.map( (param) => {
    return (
        <option value={param} key={param}>{param}</option>
    )
})

class BodyParameterControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {getAgentId: '1', getParameterId: '', getResult: '', setAgentId: "", setParameterId: "", setValue: "", 
                      setResult: '', scanResult: '', tableEntries: [], scanCount: '0'};
    }


    getParameters = () => {
        fetch('http://127.0.0.1:8080/fetch_parameters/' + this.state.getAgentId + "/" + this.state.getParameterId)
        .then(response => response.text())
        .then(data => {
        console.log(data);
        this.setState({getResult: data});
        })
        .catch(error => {
            console.error(error);
        })
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
    scanCriticalParameters = () =>{
        this.setState({scanResult: "Scanning......"})
        fetch('http://127.0.0.1:8080/scan_critical_parameters/')
        .then(response => response.text())
        .then(data => {  
            //Clean and format the string from fetch.
            let cleanedStr = data.replace(/[[\]']/g, "");
            const regex = /Agent \((\d+), (\d+)\) : , (?:'([^']*)'|(\S+)), (\d+\.\d+), (\d+\.\d+)/g;
            let resultArray = [...cleanedStr.matchAll(regex)];
            
            //Map data to respective table column. 
            let tableArray = resultArray.map(match => ({
            agent: `Agent (${match[1]},${match[2]})`,
            parameter: match[4],
            expected: match[5],
            actual: match[6],
            }));

            //Set the states. 
            this.setState({...this.state, tableEntries: tableArray});
            this.setState({scanResult: " Scan Complete - Found " + tableArray.length + " vulnerabilities."});
            this.setState({scanCount: tableArray.length});

        })
        .catch(error => {
            console.error(error);
        })
    }
    fixCriticalParameters = () =>{
        this.setState({scanResult: "Fixing Parameters......"});
        console.log(this.state.tableEntries);

        let ErrorArray = this.state.tableEntries; 
        
        for(let index = 0; index < ErrorArray.length; index++){
            let CurrentError = ErrorArray[index];

            let agentString = CurrentError.agent;
            let agentId = parseInt(agentString.substring(agentString.indexOf('(') + 1, agentString.indexOf(',')));

            fetch('http://127.0.0.1:8080/set_parameters/' + agentId + "/" + CurrentError.parameter + "/" + CurrentError.expected)
            .catch(error => {
                console.error(error);
            })
        }
        this.setState({scanResult: "Fixed " + ErrorArray.length + " vulnerabilities."});
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
                {"    Result:  " + this.state.getResult}
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
                    <h2>CRITICAL Parameters Check</h2>
                    <p>
                        This can be used to check if all connected swarm agents have the correct critical parameters set. If a vulnerability is found it can be fixed here (beta).
                    </p>
                </div>
                <div className="Bodyblue">
                    <button onClick={this.scanCriticalParameters}>Scan Agents</button>
                    <button onClick={this.fixCriticalParameters}>Fix Agents</button>
                    <br/><br/>
                    {this.state.scanResult}
                     <table>
                        <thead>
                            <th>Agent</th>
                            <th>Parameter</th>
                            <th>Expected Value</th>
                            <th>Actual Value</th>
                            <th>{this.state.scanCount}</th>
                        </thead>
                        <tbody>
                            {this.state.tableEntries.map((row, index) => (
                            <tr key={index}>
                                <td>{row.agent}</td>
                                <td>{row.parameter}</td>
                                <td>{row.expected}</td>
                                <td>{row.actual}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table> 
                    <div>
                    </div>
                    <br/><br/>
                    <br/><br/>
                </div>
            </div>
        );
    }
}

export default BodyParameterControl;