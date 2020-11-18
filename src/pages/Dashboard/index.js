import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import ContentTabs from '../../components/ContentTabs';
import Dashboard from '../../components/Dashboard';
import Footer from '../../components/Footer';
import { APIAuth } from '../../configs/APIAuth';
import AppTheme from '../../themes/AppTheme';
import { TAB_INDEXS } from '../../configs/constraints';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

export default function DashboardPage(props) {
    // const [isSignIn, setIsSignIn] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [boards, setBoards] = useState(null);
    const [user, setUser] = useState(null);
    const [isSignIn, setIsSignIn] = useState(false);
    const [curTabIndex, setCurTabIndex] = useState(TAB_INDEXS.DASHBOARD);
    // const [boardsUpdate, setBoardsUpdate] = useState(false);
    const handleBoardsUpdate = () => {
        APIAuth('boards', JSON.parse(localStorage.getItem('accessToken')))
            .then(res => {
                setBoards(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        APIAuth('users/profile', JSON.parse(localStorage.getItem('accessToken')))
            .then(resProfile => {
                APIAuth('boards', JSON.parse(localStorage.getItem('accessToken')))
                    .then(resBoards => {
                        setBoards(resBoards.data);
                        setUser(resProfile.data);
                        setIsSignIn(true);
                        setIsAuth(true)
                    })
            })
            .catch(err => {
                console.log(err);
                setIsSignIn(false);
                setIsAuth(true);
            });
        // APIAuth('boards', JSON.parse(localStorage.getItem('accessToken')))
        //     .then(res => {
        //         setBoards(res.data);
        //         setIsSignIn(true);
        //         setIsAuth(true)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setIsSignIn(false);
        //         setIsAuth(true);
        //     });
    }, []);
    const handleTabsChange = (newTabIndex) => {
        setCurTabIndex(newTabIndex);
    }
    if (!isAuth)
        return <></>;
    if (!isSignIn)
        return <Redirect to={`${process.env.PUBLIC_URL}/signin`} />;
    if (curTabIndex !== TAB_INDEXS.DASHBOARD) {
        switch (curTabIndex) {
            case TAB_INDEXS.TEAMS:
                return <Redirect to={process.env.PUBLIC_URL + '/teams'} />
            case TAB_INDEXS.ANALYTICS:
                return <Redirect to={process.env.PUBLIC_URL + '/analytics'} />
            case TAB_INDEXS.INTEGRATIONS:
                return <Redirect to={process.env.PUBLIC_URL + '/integrations'} />
            case TAB_INDEXS.BILLING:
                return <Redirect to={process.env.PUBLIC_URL + '/billing'} />
            default:
        }
    }
    return (
        <MuiThemeProvider theme={AppTheme}>
            <CssBaseline />
            <Header isHome={true} user={user} isOnProfilePage={false} />
            <ContentTabs curTabIndex={TAB_INDEXS.DASHBOARD} handleTabsChange={handleTabsChange} />
            <Dashboard boards={boards} handleBoardsUpdate={handleBoardsUpdate} />
            <Footer />
        </MuiThemeProvider>
    );
}
