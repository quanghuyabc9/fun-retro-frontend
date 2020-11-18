import React from 'react';
import DashboardPage from '../pages/Dashboard';
import SignInPage from '../pages/SignIn';
import BoardDetailPage from '../pages/BoardDetail';
import ProfilePage from '../pages/Profile';
import SignUpPage from '../pages/SignUp';

const routes =  [
    {
        path: '/',
        exact: true,
        main: () => <DashboardPage />
    },
    {
        path: process.env.PUBLIC_URL + '/',
        exact: true,
        // main: ({location}) => <DashboardPage location = {location} />
        main: () => <DashboardPage />
    },
    {
        path: process.env.PUBLIC_URL + '/signin',
        exact: true,
        main: () => <SignInPage />
    },
    {
        path: process.env.PUBLIC_URL + '/signup',
        exact: true,
        main: () => <SignUpPage />
    },
    {
        path: process.env.PUBLIC_URL + '/dashboard',
        exact: true,
        main: () => <DashboardPage />
    },
    {
        path: process.env.PUBLIC_URL + '/board/:id',
        exact: true,
        children: <BoardDetailPage />
    },
    {
        path: process.env.PUBLIC_URL + '/profile',
        exact: true,
        main: () => <ProfilePage />
    },
    {
        path: process.env.PUBLIC_URL + '/signout',
        exact: true,
        main: () => <SignInPage />
    },
    // {
    //     path: process.env.PUBLIC_URL + '/teams',
    //     exact: true,
    //     main: () => <Teams />
    // },
    // {
    //     path: process.env.PUBLIC_URL + '/analytics',
    //     exact: true,
    //     main: () => <Analytics />
    // },
    // {
    //     path: process.env.PUBLIC_URL + '/integrations',
    //     exact: true,
    //     main: () => <Integrations />
    // },
    // {
    //     path: process.env.PUBLIC_URL + '/billing',
    //     exact: true,
    //     main: () => <Billing />
    // },
]

export default routes;