import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box,
    Typography, makeStyles, MuiThemeProvider, ThemeProvider, Container,
    Paper
} from '@material-ui/core';
import theme from './theme';
import { createMuiTheme } from '@material-ui/core/styles';
import Vegan from '../../fonts/Vegan';
import Alert from './Alert';
import AppTheme from '../../themes/AppTheme';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" >
                FunRetro
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

export default function SignIn(props) {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme} >
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
                        {props.isError ? (<Alert severity="error">Login failed. Email or password is incorrect.</Alert>) : <></>}
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} onSubmit={props.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={props.user.email}
                                onChange={props.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={props.user.password}
                                onChange={props.handleChange}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                        </Button>
                            <MuiThemeProvider theme={AppTheme}>
                                <CssBaseline />
                                <Grid container>
                                    <Grid item xs>
                                        <Link >
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to={process.env.PUBLIC_URL + "/signup"}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </MuiThemeProvider>

                        </form>
                    </div>
                </Paper>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </ThemeProvider>

    );
}