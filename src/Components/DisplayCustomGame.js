
import React, { useState, useRef } from 'react';
import CanvasDisplay from './CanvasDisplay/CanvasDisplay';
import GamesList from './GamesList';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from '@material-ui/core';



function DisplayCustomGame() {

    const [currentGame, setCurrentGame] = useState(null);

    const textRef = useRef();

    const [gameResultOpen, setGameResultOpen] = useState(true);
    const [canvasOpen, setCanvasOpen] = useState(true);

    return (
        <div>
            <ExpansionPanel expanded={gameResultOpen}>
                <ExpansionPanelSummary onClick={() => setGameResultOpen(!gameResultOpen)}>
                    Game Output
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <textarea ref={textRef} rows={50} style={{ width: '100%' }} />
                        <Button color="primary" variant="contained" onClick={() => {
                            setCurrentGame(JSON.parse(textRef.current.value));
                            textRef.current.value = "";
                            setGameResultOpen(false);
                            setCanvasOpen(true);
                        }}>SUBMIT</Button>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={canvasOpen}>
                <ExpansionPanelSummary onClick={() => setCanvasOpen(!canvasOpen)}>
                    Game Visual
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <CanvasDisplay gameid={currentGame} gameObject={currentGame} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default DisplayCustomGame;
