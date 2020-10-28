import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Dashboard from '../Dashboard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function SimpleTabs(props) {
    const classes = useStyles();
    // const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // setValue(newValue);
        props.onChange(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color ="default">
                <Tabs value={props.value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="DASHBOARD" {...a11yProps(0)} />
                    <Tab label="TEAMS" {...a11yProps(1)} />
                    <Tab label="ANALYTICS" {...a11yProps(2)} />
                    <Tab label="BILLING" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={props.value} index={0}>
                <Dashboard boards = {props.boards}/>
            </TabPanel>
            <TabPanel value={props.value} index={1}>
               
             </TabPanel>
            <TabPanel value={props.value} index={2}>
             
             </TabPanel>
            <TabPanel value={props.value} index={3}>
              
            </TabPanel>
        </div>
    );
}
