import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, Person as PersionIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        pointerEvents: "auto"
    },
}));

export default function ProfileButton(props) {
    const user = props.user;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [yourProfile, setYourProfile] = useState(false);
    const [signout, setSignOut] = useState(false);

    const handlePopoverOpen01 = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handlePopoverOpen02 = (event) => {
        setAnchorEl(anchorEl);
    };

    const handleClickYourProfile = () => {
        setYourProfile(true);
    }

    const handleClickSignout = () => {
        localStorage.removeItem("accessToken");
        setSignOut(true);
    }

    const open = Boolean(anchorEl);

    if(yourProfile && !props.isOnProfilePage) {
        return <Redirect to={process.env.PUBLIC_URL + "/profile"} />
    }

    if(signout) {
        return <Redirect to={process.env.PUBLIC_URL + "/signout"} />
    }

    return (
        <div>
            <IconButton color="inherit"
                onMouseEnter={handlePopoverOpen01}
                onMouseLeave={handlePopoverClose}>
                <AccountCircle />
            </IconButton>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                PaperProps={{ onMouseEnter: handlePopoverOpen02, onMouseLeave: handlePopoverClose }}>
                <Typography gutterBottom variant="h6" component="h1">
                    {user && user._name}
                </Typography>
                <List>
                    <ListItem button onClick={handleClickYourProfile}>
                        <ListItemIcon >
                            <PersionIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography>Your Profile</Typography>} />
                    </ListItem>
                    <ListItem button onClick={handleClickSignout}>
                        <ListItemIcon >
                            <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography>Sign out</Typography>} />
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
}
