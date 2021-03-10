
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import shadows from '@material-ui/core/styles/shadows';

function Header(props) {

    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            marginBottom: "1%"
        },
    });

    const labels = ["Introduction","Entries","Leaderboard","DisplayGame","DisplayCustomGame"];

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.setCurrentView(labels[newValue]);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Introduction" />
                <Tab label="Entries" />
                <Tab label="Leaderboard" />
                <Tab label="DisplayGame" />
                <Tab label="DisplayCustomGame" />
            </Tabs>
        </Paper>
    );
}

export default Header;
