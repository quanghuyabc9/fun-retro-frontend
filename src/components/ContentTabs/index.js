import { React } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';

function a11yProps(index) {
    return {
        id: `tabs-bar-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tabsColor: {
        backgroundColor: "#ffffff",
    }
}));

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 70,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#000000',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

export default function ContentTabs(props) {
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        props.handleTabsChange(newValue);
    };
    return (
        <div className={classes.root}>
            <StyledTabs value={props.curTabIndex} onChange={handleChange} aria-label="content tabs" className={classes.tabsColor}>
                <StyledTab label="DASHBOARD" {...a11yProps(0)} />
                <StyledTab label="TEAMS" {...a11yProps(1)} />
                <StyledTab label="ANALYTICS" {...a11yProps(2)} />
                <StyledTab label="INTEGRATIONS" {...a11yProps(3)} />
                <StyledTab label="BILLING" {...a11yProps(4)} />
            </StyledTabs>
        </div>
    );
}


// switch (newValue) {
//     case TAB_INDEXS.DASHBOARD:
//         return <Redirect to={{
//             pathname: process.env.PUBLIC_URL + '/dashboard',
//             curtabIndex: newValue
//         }} />
//     case TAB_INDEXS.TEAMS:
//         return <Redirect to={{
//             pathname: process.env.PUBLIC_URL + '/teams',
//             curtabIndex: newValue
//         }} />
//     case TAB_INDEXS.ANALYTICS:
//         return <Redirect to={{
//             pathname: process.env.PUBLIC_URL + '/analytics',
//             curtabIndex: newValue
//         }} />
//     case TAB_INDEXS.INTEGRATIONS:
//         return <Redirect to={{
//             pathname: process.env.PUBLIC_URL + '/integrations',
//             curtabIndex: newValue
//         }} />
//     case TAB_INDEXS.BILLING:
//         return <Redirect to={{
//             pathname: process.env.PUBLIC_URL + '/billing',      
//             curTabIndex: newValue     
//         }} />
//     default:
//         return <Redirect to={{
//             pathname: process.env.PUBLIC_URL + '/dashboard',
//             curTabIndex: TAB_INDEXS.DASHBOARD
//         }} />
// }