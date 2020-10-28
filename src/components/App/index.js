import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuAppBar from '../MenuAppBar';
import SimpleTabs from '../SimpleTabs';
import { useState, useEffect } from 'react';

export default function App() {
    const [boards, setBoards] = useState(null);
    const [simpleTabsValue, setSimpleTabsValue] = useState(0);
    const handleSimpleTabsChange = (newValue) => {
        setSimpleTabsValue(newValue);
    }
    useEffect(() => {
        fetch("https://fun-retro-api.herokuapp.com/boards")
            .then(res => res.json())
            .then(
                (boards) => {
                    console.log(boards);
                    setBoards(boards);
                },
            )
    }, []);
    return (

        <React.Fragment>
            <CssBaseline />
            <MenuAppBar />
            <main>
                <SimpleTabs boards={boards} value={simpleTabsValue} onChange={handleSimpleTabsChange} />
            </main>
        </React.Fragment>
    );
}

