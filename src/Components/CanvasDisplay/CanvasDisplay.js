import React, { useState, useEffect, useMemo } from 'react';
import GameFrame from './GameFrame';
import { ownerDocument, Button, ButtonGroup, Slider } from '@material-ui/core';

import { BASEURL } from '../../config.js';



function CanvasDisplay(props) {

    //const COLORS = ["linear-gradient(to right bottom, rgb(255, 0, 0), rgb(255, 153, 0))", "linear-gradient(to right bottom, rgb(255, 247, 0), rgb(255, 200, 0))", "linear-gradient(to right bottom, rgb(33, 138, 26), rgb(125, 216, 96))"];
    const COLORS = ["#a91717", "#1f6f16", "#16396f", "#962092"]

    const [info, setInfo] = useState();
    const [users, setUsers] = useState();
    const [playMode, setPlayMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        fetchGameScript(props.gameid);
        fetchUsers();
    }, [props.gameid, props.gameObject])

    useEffect(() => {
        if (playMode) {
            let autoIncStep = setTimeout(() => {
                if (currentStep < info.script.length - 1) setCurrentStep(currentStep + 1);
                else { setPlayMode(false) }
                clearTimeout(autoIncStep);
            }, 200)
        }
    }, [playMode, currentStep])

    function fetchGameScript(gameid) {
        if (props.gameObject) {
            setInfo(props.gameObject);
            setCurrentStep(0);
        }
        if (gameid) {
            fetch(BASEURL + `/game/byid/${gameid}`,{withCredentials: true}).then(res => res.json()).then(json => {
                setInfo(json);
                setCurrentStep(0);
            })
        }
    }

    function fetchUsers() {
        if (props.gameObject) {
            setUsers([{ id: 999, name: "YOU" }, { id: 888, name: "ENEMY" }]);
        }
        else {
            fetch(BASEURL + `/users`,{withCredentials: true}).then(res => res.json()).then(json => {
                setUsers(json);
            })
        }
    }


    let zones = info ? info.script[currentStep].zones : [];
    let drones = info ? info.script[currentStep].drones : [];

    let playersColors = {};

    if (info) {
        info.players.forEach((player, i) => {
            playersColors[player] = COLORS[i];
        })
    }

    drones.map(drone => {
        drone.color = playersColors[drone.owner];
        if (currentStep > 0) { // FOR ROTATING
            let sameDroneLastStep = info.script[currentStep - 1].drones.find(d => d.droneID === drone.droneID)

            if (sameDroneLastStep.x == drone.x && sameDroneLastStep.y == drone.y) drone.deg = 0;
            if (sameDroneLastStep.x < drone.x && sameDroneLastStep.y == drone.y) drone.deg = 90;
            if (sameDroneLastStep.x > drone.x && sameDroneLastStep.y == drone.y) drone.deg = 270;

            if (sameDroneLastStep.x == drone.x && sameDroneLastStep.y < drone.y) drone.deg = 180;
            if (sameDroneLastStep.x < drone.x && sameDroneLastStep.y < drone.y) drone.deg = 135;
            if (sameDroneLastStep.x > drone.x && sameDroneLastStep.y < drone.y) drone.deg = 225;

            if (sameDroneLastStep.x == drone.x && sameDroneLastStep.y > drone.y) drone.deg = 0;
            if (sameDroneLastStep.x < drone.x && sameDroneLastStep.y > drone.y) drone.deg = 45;
            if (sameDroneLastStep.x > drone.x && sameDroneLastStep.y > drone.y) drone.deg = 315;
        }
    })

    zones.map(zone => {
        zone.color = playersColors[zone.owner] || "black";
    })

    return (
        <div className="displayContainer" style={{ margin: "auto", textAlign: "-webkit-center" }}>
            <div style={{ padding: 50, borderWidth: 5, borderStyle: "ridge", backgroundImage: '../../Icons/SeaBackground.png', background: "linear-gradient(to bottom right, #66d7e2, #529dc1)", width: "max-content" }}>
                <GameFrame playersColors={playersColors} drones={drones} zones={zones} />
            </div>
            <div id="scores" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {info &&
                    info.players.map(player =>
                        <div style={{ width: 100, paddingBottom: 10, background: playersColors[player], color: "white", fontSize: 22, fontWeight: 600 }}>
                            <span style={{ fontSize: 12 }}>{users.find(u => u.id === player).name}</span>
                            <br />
                            <span>{info.script[currentStep].scores[player]}</span>
                        </div>
                    )
                }
            </div>
            {info &&
                <Slider
                    onChange={(e, v) => { setCurrentStep(v); setPlayMode(false) }}
                    style={{ width: "50%" }}
                    value={currentStep}
                    deafultValue={0}
                    step={1}
                    mark
                    min={0}
                    max={info.script.length - 1}
                    valueLabelDisplay="auto"
                />
            }
            <br />
            {info &&
                <ButtonGroup style={{ background: "linear-gradient(to right bottom, rgb(98, 241, 255), rgb(0, 172, 255))" }}>
                    <Button style={{ width: 180 }} onClick={() => setCurrentStep(currentStep > 0 ? (currentStep - 1) : 0)}>Previous Step</Button>
                    <Button style={{ background: "#e6e6e6", fontSize: 20, width: 260 }}>{"Step " + currentStep + "/" + (info.script.length - 1)}</Button>
                    <Button style={{ width: 180 }} onClick={() => setCurrentStep(currentStep < info.script.length - 1 ? (currentStep + 1) : info.script.length - 1)}>Next Step</Button>
                </ButtonGroup>
            }
            <br />
            {info &&
                <ButtonGroup style={{ background: "linear-gradient(to right bottom, rgb(98, 241, 255), rgb(0, 172, 255))" }}>
                    <Button onClick={() => setPlayMode(true)}>Play</Button>
                    <Button onClick={() => setPlayMode(false)}>Pause</Button>
                    {!playMode && <Button onClick={() => { setPlayMode(false); setCurrentStep(0) }}>Reset</Button>}
                </ButtonGroup>
            }
        </div>
    );
}

export default CanvasDisplay;
