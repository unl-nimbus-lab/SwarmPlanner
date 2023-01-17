import React from 'react'
import ArmButton from './ArmButton';
import ModeButton from './ModeButton'
import DisarmButton from './DisarmButton';
import TakeoffButton from './TakeoffButton';
import BasicSlider from './BasicSlider';

class SwarmManager extends React.Component {

    takeoff = (val) => {
        const altitude = val;
        fetch('http://127.0.0.1:8080/takeoff/' + altitude);
    }

    render() {
        return(
            <div>
                <ArmButton />
                <DisarmButton />
                <TakeoffButton />
                <ModeButton mode="STABILIZE" />
                <ModeButton mode="ALT_HOLD" />
                <ModeButton mode="LOITER" />
                <ModeButton mode="GUIDED" />
                <ModeButton mode="AUTO"/>
                <ModeButton mode="THROW"/>
                <BasicSlider buttonFcn={this.takeoff} min={3}  max={30} render={"render"} title="TAKEOFF" />
                <ModeButton mode="LAND"/>

            </div>

        );
    }
}

export default SwarmManager;