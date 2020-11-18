import React, { useEffect, useState } from 'react';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, TextField, Grid, Button, CssBaseline, ClickAwayListener } from '@material-ui/core';
import { APIAuth, APIAuthPutCall } from '../../configs/APIAuth';
import BoardName from './BoardName';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    appBarStyle: {
        background: '#ffffff',
    },
}));

export default function BoardDetailContext(props) {
    const boardId = props.boardId;
    const [board, setBoard] = useState(null);
    const [contextChange, setContextChange] = useState(false);
    const classes = useStyles();
    const theme = createMuiTheme({

    });

    useEffect(() => {
        APIAuth(`boards/${boardId}`, JSON.parse(localStorage.getItem('accessToken')))
            .then(res => {
                setBoard(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const handleChangeBoardName = (newValue) => {
        setBoard({
            id: board.id,
            _name: newValue,
            _context: board._context,
            url: board.url,
            userId: board.userId,
            dateCreated: board.dateCreated
        });
    }

    const handleChangeBoardContext = (event) => {
        setBoard({
            id: board.id,
            _name: board._name,
            _context: event.target.value,
            url: board.url,
            userId: board.userId,
            dateCreated: board.dateCreated
        });
        if(!contextChange)
            setContextChange(true);
    }

    const handleClickAwayBoardContext = () => {
        if(contextChange) {      
            APIAuthPutCall('boards', JSON.parse(localStorage.getItem("accessToken")), board)
            .then(res => {
                setContextChange(!contextChange);
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBarStyle}>
                    <Toolbar variant="dense">
                        <Grid container direction="row" spacing={2} justify="flex-start">
                            <Grid item xs={10} container direction="row" spacing={2}>
                                <Grid item >
                                    <BoardName board={board} handleChangeBoardName={handleChangeBoardName} />
                                </Grid>
                                <Grid item>
                                    <ClickAwayListener onClickAway={handleClickAwayBoardContext}>
                                        <TextField value={board && board._context} fullWidth={true} size='small' placeholder="Set the context here..." variant="outlined" onChange={handleChangeBoardContext} />
                                    </ClickAwayListener>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} container justify="flex-end" alignItems="center">
                                <Button variant="contained" container size="small" color="primary">Share</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        </MuiThemeProvider>
    );
}
