

import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import groups from '../data/groups.json';
import Axios from 'axios';
import { BASEURL } from '../config.js';

function BotsDisplay() {

    const botEntryRef = useRef();

    const [msg, setMsg] = useState();
    const [allBots, setAllBots] = useState([]);

    const findGroupColor = (groupName) => {
        let group = groups.filter(g => g.name == groupName)[0];
        return group ? group.color : "#565656";
    }

    const useStyles = makeStyles(theme => ({
        root: {
            width: '90%',
            left: '5%',
            margin: 'auto',
        },
        botname: {
            fontSize: theme.typography.pxToRem(13),
            background: "gray",
            color: "white"
        },
        newBotExpansionDetails: {
            flexDirection: 'column',
        },
    }));

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        Axios.get(BASEURL + '/upload/allBots', {
            withCredentials: true
        }).then(res => {
            if (res.status !== 200) {
                setMsg('error loading all bots versions');
                return;
            }
            console.log(res.data)

            setAllBots(res.data.bots);
        }).catch((reason) => {
            setMsg('error loading all bots versions');
        });
    }, []);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    //const [botsList, setBotsList] = useState(botsList);

    const onSubmit = () => {
        let botEntry = botEntryRef.current.value;

        Axios.post(BASEURL + '/upload/bot', {
            botCode: botEntry,
        }, {
            withCredentials: true
        }).then(res => {
            if (res.status !== 200) {
                setMsg('error submitting bot');
                return;
            }
            console.log(res.data)

            if (res.data && res.data !== true) {
                setMsg(res.data);
                return;
            }

            setMsg('bot submitted');
        }).catch((reason) => {
            setMsg('error submitting bot');
        });
    };

    return (
        <div className={classes.root}>
            <ExpansionPanel className={classes.exppanel} expanded={expanded === 'newEntry'} onChange={handleChange('newEntry')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Chip className={classes.botname} style={{ backgroundColor: 'green' }} label={"New Bot Entry"} />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: classes.newBotExpansionDetails }}>
                    <textarea ref={botEntryRef} rows="30" cols="100" />
                    <div>
                        <button onClick={onSubmit}>
                            submit
                        </button>
                    </div>
                    {
                        msg && <div>
                            {msg}
                        </div>
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {
                allBots && allBots.map((b, idx) => (
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            version {idx + 1}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <textarea rows="30" cols="100" value={b} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
            }
        </div>
    );
}

export default BotsDisplay;
