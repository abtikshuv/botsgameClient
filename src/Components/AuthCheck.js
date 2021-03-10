import React, { useRef, useState } from 'react';
import Axios from 'axios';
import { BASEURL } from '../config.js';
import { Button, TextField } from '@material-ui/core';

const AuthCheck = ({ setCurrentView }) => {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [msg, setMsg] = useState();

    const onLogin = (e) => {
        e.preventDefault();

        Axios.post(BASEURL + '/auth/login', {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }).then(res => {
            if (res.status !== 200) {
                setMsg('error logging in');
                return;
            }

            sessionStorage.setItem('loggedIn', "true");
            setCurrentView("Introduction");
        }).catch(reason => {
            setMsg('error logging in');
        });

        return false;
    };

    return (
        <div>
            <form onSubmit={onLogin} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gridTemplateRows: 'auto auto auto',
                gridTemplateAreas: '". username ." ". password ." ". login ." ". msg ."',
                gridGap: '1em',
                paddingTop: '1em'
            }}>
                <TextField variant="outlined" title="username" label="username" inputRef={usernameRef} style={{ gridArea: 'username' }} />
                <TextField variant="outlined" type="password" title="password" label="password" inputRef={passwordRef} style={{ gridArea: 'password' }} />
                <Button type="submit" color="primary" variant="contained" style={{ gridArea: 'login' }}> login </Button>
                {
                    msg &&
                    <div style={{ gridArea: 'msg' }}>
                        {msg}
                    </div>
                }
            </form>
        </div>
    );
};

export default AuthCheck;