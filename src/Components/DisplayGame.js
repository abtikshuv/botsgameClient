
import React, { useState } from 'react';
import CanvasDisplay from './CanvasDisplay/CanvasDisplay';
import GamesList from './GamesList';



function DisplayGame() {
    
    const [currentGame, setCurrentGame] = useState(null);

    return (
        <div>
            <GamesList setCurrentGame={setCurrentGame} />
            <CanvasDisplay gameid={currentGame} />
        </div>
    );
}

export default DisplayGame;
