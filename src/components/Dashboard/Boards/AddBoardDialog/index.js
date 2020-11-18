import React from 'react';
import {
  IconButton,
  Grid, DialogTitle, Dialog, DialogContent,
} from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import CreateBoardForm from './CreateBoardForm';

function SimpleDialog(props) {
  const { open, handleClickClose } = props;
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <Grid container
        direction="row"
        justify="space-between"
        alignItems="center"  >
        <Grid item>
          <DialogTitle id="simple-dialog-title">Create Board</DialogTitle>
        </Grid>
        <Grid item>
          <IconButton onClick={handleClickClose}>
            <CloseIcon fontSize="large"></CloseIcon>
          </IconButton>
        </Grid>
      </Grid>
      <DialogContent>
        <CreateBoardForm handleBoardsUpdate={props.handleBoardsUpdate} handleClickClose={handleClickClose}/>
      </DialogContent>
    </Dialog>
  );
}

export default function AddBoardDialog(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <AddIcon fontSize="large" />
      </IconButton>
      <SimpleDialog handleClickClose={handleClickClose} open={open} handleBoardsUpdate={props.handleBoardsUpdate} />
    </div>
  );
}
