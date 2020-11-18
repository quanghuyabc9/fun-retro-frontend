import React, { useState } from 'react';
import { ClickAwayListener, Fade, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Popper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Archive as ArchiveIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@material-ui/icons';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { APIAuthDeleteCall } from '../../../../../configs/APIAuth';


const useStyles = makeStyles((theme) => ({
    textStyle: {
        fontSize: "10px"
    }
}));

export default function PositionedPopper(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const classes = useStyles();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const handleClickOpenConfirmDeleteDialog = () => {
        setOpenConfirmDeleteDialog(true);
    }
    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDeleteDialog(false);
        setOpen(false);
    }

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleDeleteBoard = () => {
        const boardId = props.boardId;
        APIAuthDeleteCall(`boards/${boardId}`, JSON.parse(localStorage.getItem('accessToken')))
        .then(res => {
            handleCloseConfirmDeleteDialog();
            props.handleBoardsUpdate();
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper elevation={0} variant="outlined" square>
                                <List>
                                    <ListItem button>
                                        <ListItemIcon >
                                            <ArchiveIcon color="primary" fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={<Typography color="primary" className={classes.textStyle}>ARCHIVE</Typography>} />
                                    </ListItem>
                                    <ListItem button onClick={handleClickOpenConfirmDeleteDialog}>
                                        <ListItemIcon>
                                            <DeleteIcon color="primary" fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={<Typography color="primary" className={classes.textStyle}>DELETE</Typography>} />
                                    </ListItem>
                                    <ConfirmDeleteDialog open={openConfirmDeleteDialog} handleClose={handleCloseConfirmDeleteDialog} handleDeleteBoard={handleDeleteBoard}/>
                                </List>

                            </Paper>
                        </Fade>
                    )}
                </Popper>
                <IconButton onClick={handleClick('bottom-end')}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </div>
        </ClickAwayListener>
    );
}


// import Popper from '@material-ui/core/Popper';
// import Typography from '@material-ui/core/Typography';
// import Fade from '@material-ui/core/Fade';
// import Paper from '@material-ui/core/Paper';

// import IconButton from '@material-ui/core/IconButton';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import DeleteIcon from '@material-ui/icons/Delete';
// import MoreVertIcon from '@material-ui/icons/MoreVert';