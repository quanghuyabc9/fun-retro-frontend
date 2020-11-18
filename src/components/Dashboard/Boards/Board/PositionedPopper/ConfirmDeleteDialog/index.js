import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#e91e63',
        },
    },
});

export default function ConfirmDeleteDialog(props) {

    return (
        <MuiThemeProvider theme = {theme}>
            <CssBaseline />
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Do you want to delete this board?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You cannot recover it after deleting.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleDeleteBoard} color="secondary" style={{ textTransform: 'none' }}
                    variant="contained">
                        Yes, delete it
                    </Button>
                    <Button onClick={props.handleClose} color="primary" style={{ textTransform: 'none' }}
                    variant="contained">
                        No, keep it
                    </Button>
                </DialogActions>
            </Dialog>
        </MuiThemeProvider>
    )
}