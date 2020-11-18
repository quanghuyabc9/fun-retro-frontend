import { React, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Vegan from '../../fonts/Vegan';
import { Redirect } from 'react-router-dom';
import ProfileButton from './ProfileButton';
// import VeganWoff2 from '../../fonts/VeganStylePersonalUse-5Y58.woff2';

// const vegan = {
//     fontFamily: 'Vegan',
//     fontStyle: 'normal',
//     fontDisplay: 'swap',
//     fontWeight: 500,
//     src: `
//     local('Vegan'),
//     local('Vegan-Regular'),
//     url(${VeganWoff2}) format('woff2')
//     `,
//     unicodeRange:
//         'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
// };

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
    },

    appBarColor: {
        background: '#2196F3'
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const [returnHome, setReturnHome] = useState(false);


    const handleFunRetroClick = () => {
        setReturnHome(true);
    }

    const theme = createMuiTheme({
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
    if (returnHome && !props.isHome)
        return <Redirect to={process.env.PUBLIC_URL}></Redirect>
    else
        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static" className={classes.appBarColor}>
                        <Toolbar variant="dense">
                            <MuiThemeProvider theme={theme}>
                                <CssBaseline />
                                <Typography className={classes.title} variant="h6" component="h1">
                                    <Link href="#" color="inherit" onClick={handleFunRetroClick}>
                                        {'FunRetro'}
                                    </Link>
                                </Typography>
                            </MuiThemeProvider>
                            <div>
                                {/* <IconButton color="inherit">
                                    <AccountCircle />
                                </IconButton> */}
                                <ProfileButton user = {props.user} isOnProfilePage={props.isOnProfilePage}/>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
}
