import { React } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Boards from './Boards';

const useStyles = makeStyles((theme) => ({
    textStyle1: {
        color: "#283593",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
    },
    textStyle2: {
        color: "#283593",
        marginLeft: theme.spacing(3),
        display: 'inline-block',
    },
    textStyle3: {
        color: "#9e9e9e",
        marginLeft: theme.spacing(2),
        fontSize: 17,
        display: 'inline-block'
    }
}));

export default function Dashboard(props) {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.textStyle1} variant="h4" component="h1" align="left" gutterBottom>
                <b>My boards</b>
            </Typography>
            <Typography className={classes.textStyle2} variant="h6" component="h1" align="left" gutterBottom>
                Public boards{' '}
            </Typography>
            <Typography className={classes.textStyle3} variant="h6" component="h1" align="left" gutterBottom>
                {' '}collaborate by sharing URL with people
            </Typography>
            <Boards boards={props.boards} handleBoardsUpdate={props.handleBoardsUpdate} />
        </>
    );
}