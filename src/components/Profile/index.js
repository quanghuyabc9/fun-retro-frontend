import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { PersonOutline as PersonOutlineIcon, CheckCircleOutline as CheckCircleOutlineIcon } from '@material-ui/icons';
import { APIAuthPutCall } from '../../configs/APIAuth';
import { Dialog, DialogActions, DialogContent, DialogTitle, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dialog: {
    padding: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00c853',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#000000',
    },
  },
});

export default function Profile(props) {
  const classes = useStyles();
  const [name, setName] = useState(props.user._name);
  const [email, setEmail] = useState(props.user.email)
  const [password, setPassword] = useState("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: props.user.id,
      email: email,
      _name: name
    };
    if (password !== "")
      user._password = password;
    APIAuthPutCall('users/update', JSON.parse(localStorage.getItem("accessToken")), user)
      .then(res => {
        setOpenSuccessDialog(true);
      }).catch(err => {
        console.log(err);
      })
    // setOpenSuccessDialog(true);
  }
  const handleChange = (event) => {
    if (event.target.name === "name")
      setName(event.target.value);
    else if (event.target.name === "email")
      setEmail(event.target.value);
    else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                fullWidth
                label="Name"
                autoFocus
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Registered"
                value={"26 October 2020"}
                disabled
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
        <MuiThemeProvider theme={theme}>
          <Dialog onClose={handleCloseSuccessDialog} open={openSuccessDialog}>
            <DialogTitle >Update Successfully</DialogTitle>
            <DialogContent>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.dialog}>
              <Grid item xs={12}>
                <CheckCircleOutlineIcon color="primary" fontSize="large" />
              </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.dialog}>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleCloseSuccessDialog} >OK</Button>
              </Grid>
            </Grid>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </div>
    </Container>
  );
}