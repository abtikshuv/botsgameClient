import React, { useState } from 'react';
import FlightIcon from '@material-ui/icons/Flight';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import EvStation from '@material-ui/icons/EvStation';

//import FlightIcon from '../../Icons/animal7.svg';
//import BlurCircularIcon from '../../Icons/sea4.svg';
//import FuelStation from '../../Icons/Wheel.svg';

// import FuelStationIcon from '../IconComponents/FuelStationIcon';
import DroneIcon from '../IconComponents/DroneIcon';
// import ZoneIcon from '../IconComponents/ZoneIcon';

function GameFrame(props) {

    const drones = props.drones || [];
    const zones = props.zones || [];
    const multipliers = [4, 5]
    const droneSize = 22;
    const zoneSize = 70;

    const width = 200 * multipliers[0];
    const height = 100 * multipliers[1];

    const [dronesInfoState, setDronesInfoState] = useState([]);

    return (
        <div className="gameFrameContainer" style={{ position: "relative", width: width, height: height }}>

            {zones.map(zone => {
                let zoneStyle = {
                    position: "absolute",
                    width: zoneSize,
                    height: zoneSize,
                    color: zone.color,
                    top: zone.y * multipliers[1] - zoneSize / 2,
                    left: zone.x * multipliers[0] - zoneSize / 2
                }
                let iconStyle = {
                    width: zoneSize,
                    height: zoneSize,
                    color: zone.color,
                    top: zone.y * multipliers[1] - zoneSize / 2,
                    left: zone.x * multipliers[0] - zoneSize / 2
                }
                let statusStyle = {
                    position: "absolute",
                    color: "white",
                    width: 20,
                    height: 16,
                    fontSize: 10,
                    fontWeight: 300
                }
                return (
                    <div style={zoneStyle}>
                        {
                            zone.playerDronesCount.map((player, i) =>
                                <div style={Object.assign({ background: props.playersColors[player.playerid], left: 20 * i }, statusStyle)}>{player.drones}</div>
                            )
                        }
                        {/* <BlurCircularIcon style={iconStyle} /> */}
                        {zone.type === "FUEL" ?
                            // <img src={FuelStation} style={iconStyle} />
                            <EvStation style={iconStyle} />
                            :
                            // <img src={BlurCircularIcon} style={iconStyle} />}
                            <BlurCircularIcon style={iconStyle} />
                        }
                    </div>
                )
            }
            )}
            {drones.map(drone => {
                let droneStyle = {
                    position: "absolute",
                    width: droneSize,
                    height: droneSize,
                    color: drone.color,
                    top: drone.y * multipliers[1] - droneSize / 2,
                    left: drone.x * multipliers[0] - droneSize / 2,
                    transform: 'rotate(' + drone.deg + 'deg)',
                    transition: "top 1s, left 1s"
                };
                let fuelStyle = {
                    position: "absolute",
                    color: "white",
                    background: "black",
                    fontSize: 11,
                    fontWeight: 600,
                    top: drone.y * multipliers[1] - droneSize / 2,
                    left: (drone.x * multipliers[0] - droneSize / 2) - droneSize,
                    transition: "top 1s, left 1s"
                }
                // return < FlightIcon style={droneStyle} />
                return <div>
                    <div onMouseOut={() => setDronesInfoState([...dronesInfoState].filter(d => d !== drone.droneID))} onMouseOver={() => setDronesInfoState([...dronesInfoState, drone.droneID])} style={droneStyle}>
                        {/*<img src={FlightIcon} style={droneStyle} />*/}
                        <DroneIcon fill={drone.color} />
                    </div>
                    {dronesInfoState.includes(drone.droneID) && drone.fuel!==undefined && <div style={fuelStyle}>{drone.fuel}</div>}
                </div>
            }
            )}
        </div>
    );
}

export default GameFrame;
