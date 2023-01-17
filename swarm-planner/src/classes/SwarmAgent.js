class SwarmAgent {
    constructor(agentId, compId, armStatus, flightMode, timeout, altitude) {
        this.agentId = agentId;
        this.compId = compId
        this.armStatus = armStatus;
        this.flightMode = flightMode;
        this.timeout = timeout;
        this.altitude = altitude;
        this.checked = false;
    }

    getId() {
        return this.agentId;
    }
    getCId() {
        return this.compId;
    }
    getArmStatus() {
        return this.armStatus;
    }
    getFlightMode() {
        return this.flightMode;
    }
    getTimeout() {
        return this.timeout;
    }
    getAltitude() {
        return this.altitude;
    }
    getChecked() {
        return this.checked;
    }
}

export default SwarmAgent;