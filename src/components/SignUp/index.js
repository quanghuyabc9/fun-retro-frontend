import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Vegan from '../../fonts/Vegan';
import theme from './theme';
import { Paper ,ThemeProvider, MuiThemeProvider, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import AppTheme from '../../themes/AppTheme';
import { CheckCircleOutline as CheckCircleOutlineIcon } from '@material-ui/icons';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const themeTitle = createMuiTheme({
    typography: {
        fontFamily: 'Vegan, Arial',
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [Vegan],
            },
        },
    },
});

const themeSuccessDialog = createMuiTheme({
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

export default function SignUp(props) {
    const newUser = props.newUser;
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <MuiThemeProvider theme={themeTitle}>
                    <CssBaseline />
                    <div className={classes.title}>
                        <Typography component="h1" variant="h4" color="primary">
                            FunRetro
                            </Typography>
                    </div>
                </MuiThemeProvider>
                <Paper>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className={classes.form} onSubmit={props.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Name"
                                        autoFocus
                                        value={newUser._name}
                                        onChange
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        value={newUser.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={newUser._password}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <MuiThemeProvider theme={AppTheme}>
                                        <CssBaseline />
                                        <Link to={process.env.PUBLIC_URL + "/signin"}>
                                            {"Already have an account? Sign in"}
                                        </Link>
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
                <Box mt={5}>
                    <Copyright />
                </Box>
                <MuiThemeProvider theme={themeSuccessDialog}>
                    <Dialog onClose={props.handleCloseSuccessDialog} open={props.openSuccessDialog}>
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
                                    <Button variant="contained" color="primary" onClick={props.handleCloseSuccessDialog} >OK</Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
            </Container>
        </ThemeProvider>
    );
}