import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import { BASEURL } from '../config.js';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root:
    {
        width: '100%',
        height: '100%',
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
        float: 'right'

    }
}))

function GamesList(props) {
    const classes = useStyles();

    const [games, setGames] = useState([]);
    const [myplayerid, setmyplayerid] = useState(null);

    useEffect(() => {
        fetchGames();
    }, [])

    function fetchGames() {
        Axios.get(BASEURL + `/game/all`,{withCredentials: true}).then(res => res.json()).then(json => {
            setGames(json.games);
            setmyplayerid(json.userId);
        })
    }



    function displayGame(index) {
        props.setCurrentGame(games[index].gameid)
    }

    function getBGCOLOR(players, score) {
        if (players <= 2) {
            switch (score) {
                case 0:
                    return "#ff9898";
                case 1:
                    return "#cbda77";
                default:
                    return "#b2c8d0";
            }
        }
        else {
            switch (score) {
                case 0:
                    return "#ff9898";
                case 1:
                    return "#ffd28e";
                case 2:
                    return "#fff68a";
                case 3:
                    return "#cbda77";
                default:
                    return "#b2c8d0";
            }
        }
    }

    function renderRow(props) {
        const { index, style } = props;
        let po = games[index].finalPoints.find(s => s.playerid === myplayerid);
        return (
            <ListItem onClick={() => displayGame(index)} button style={Object.assign(Object.assign({}, style), { background: getBGCOLOR(games[index].players.length, po ? po.points : 0) })} key={index}>
                <ListItemText primary={`משחק ${games[index].gameid} - משתתפים ${games[index].players.length} - ניקוד ${po ? po.points : '?'}`} />
            </ListItem>
        )
    }



    return (
        <div className={classes.root}>
            <span style={{
                textAlign: "center",
                display: "block",
                fontSize: 22,
                background: "#3d7590",
                color: "white",
            }
            }>רשימת משחקים בהרצה אחרונה</span>
            <FixedSizeList style={{ background: "#b2c8d0" }} height={500} width={300} itemSize={46} itemCount={games.length}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}

export default GamesList;
