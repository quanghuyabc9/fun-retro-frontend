import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import ContentTabs from '../../components/ContentTabs';
import Footer from '../../components/Footer';
import { APIAuth } from '../../configs/APIAuth';
import AppTheme from '../../themes/AppTheme';
import { TAB_INDEXS } from '../../configs/constraints';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import Profile from "../../components/Profile";
    
export default function ProfilePage() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [isSignIn, setIsSignIn] = useState(false);
    const [curTabIndex, setCurTabIndex] = useState(-1)
    useEffect(() => {
        APIAuth('users/profile', JSON.parse(localStorage.getItem('accessToken')))
            .then(res => {
                setUser(res.data);
                setIsSignIn(true);
                setIsAuth(true)
            })
            .catch(err => {
                console.log(err);
                setIsSignIn(false);
                setIsAuth(true);
            })
    }, []);
    const handleTabsChange = (newTabIndex) => {
        setCurTabIndex(newTabIndex);
    }
    if (!isAuth)
        return <></>;
    if (!isSignIn)
        return <Redirect to={`${process.env.PUBLIC_URL}/signin`} />;
    switch (curTabIndex) {
        case TAB_INDEXS.DASHBOARD:
            return <Redirect to={process.env.PUBLIC_URL + '/dashboard'} />;
        case TAB_INDEXS.TEAMS:
            return <Redirect to={process.env.PUBLIC_URL + '/teams'} />;
        case TAB_INDEXS.ANALYTICS:
            return <Redirect to={process.env.PUBLIC_URL + '/analytics'} />;
        case TAB_INDEXS.INTEGRATIONS:
            return <Redirect to={process.env.PUBLIC_URL + '/integrations'} />;
        case TAB_INDEXS.BILLING:
            return <Redirect to={process.env.PUBLIC_URL + '/billing'} />;
        default:
    }
    return (
        <MuiThemeProvider theme={AppTheme}>
            <CssBaseline />
            <Header isHome={false} user={user} isOnProfilePage={true} />
            <ContentTabs curTabIndex={curTabIndex} handleTabsChange={handleTabsChange} />
            <Profile user={user} />
            <Footer />
        </MuiThemeProvider>
    );
}