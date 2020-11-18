import { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import { APIAuthPutCall, APIAuth } from "../../../configs/APIAuth";
import formatDate from "../../../services/formatDate";

const saveButtonTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#00c853",
            contrastText: "#fff"
        },
    },
});
export default function BoardName(props) {
    const board = props.board;
    const [editMode, setEditMode] = useState(false);
    const [showEditIcon, setShowEditIcon] = useState(false);

    // useEffect(() => {
    //     APIAuth(`boards/${boardId}`, JSON.parse(localStorage.getItem('accessToken')))
    //     .then(res => {
    //         setBoard(res.data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, []);
    const handleChange = (event) => {
        // setBoard({
        //     id: board.id,
        //     _name: event.target.value,
        //     _context: board._context,
        //     url : board.url,
        //     userId: board.userId,
        //     dateCreated: board.dateCreated
        // });
        props.handleChangeBoardName(event.target.value);
    }
    const handleClickOpenEditMode = () => {
        setEditMode(true);
    }
    const handleClickSave = () => {
        APIAuthPutCall(`boards`, JSON.parse(localStorage.getItem("accessToken")), board)
        .then(res => {
            setEditMode(false);
            setShowEditIcon(false);
        }).catch(err => {
            console.log(err);
        })
    }
    
    const handleClickCancelEditMode = () => {
        setEditMode(false);
        setShowEditIcon(false);
    }

    const handleMouseMove = () => {
        setShowEditIcon(true);
    }
    const handleMouseLeave = () => {
        setShowEditIcon(false);
    }
    if (!editMode) {
        if (showEditIcon)
            return <Button onMouseLeave={handleMouseLeave} style={{ textTransform: 'none' }} endIcon={<EditIcon />} onClick={handleClickOpenEditMode}><Typography>{board && board._name}</Typography></Button>
        else
            return <Button onMouseMove={handleMouseMove} style={{ textTransform: 'none' }} onClick={handleClickOpenEditMode}><Typography>{board && board._name}</Typography></Button>
    } else {
        return <Grid container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2} >
            <Grid item>
                <TextField value={board && board._name} size="small" variant="outlined" onChange={handleChange}></TextField>
            </Grid>
            <Grid item>
                <MuiThemeProvider theme={saveButtonTheme}>
                    <Button variant="contained" onClick={handleClickSave} size="small" color="primary">Save</Button>
                </MuiThemeProvider>
            </Grid>
            <Grid item>
                <Button onClick={handleClickCancelEditMode} size="small">Cancel</Button>
            </Grid>
        </Grid>
    }
}