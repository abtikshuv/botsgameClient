
import React, { useState, useEffect } from 'react';
import LeaderboardChart  from './LeaderboardChart';
import LeaderboardTable from './LeaderboardTable';
import {BASEURL} from '../config.js';

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState(null);
    
    useEffect(() => {
        fetchLeaderboard();
    }, [])

    function fetchLeaderboard() {
        fetch(BASEURL + '/leaderboard',{withCredentials: true}).then(res => res.json()).then(json => {
            setLeaderboard(json);
        }).catch((e)=>{});
    }


    return (
        <div style={{ display: "flex"}}>
            <LeaderboardChart leaderboard={leaderboard} />
            <LeaderboardTable leaderboard={leaderboard} />
        </div>
    );
}

export default Leaderboard;
