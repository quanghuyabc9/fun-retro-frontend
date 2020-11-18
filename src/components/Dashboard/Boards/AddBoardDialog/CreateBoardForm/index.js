import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { APIAuthPostCall } from '../../../../../configs/APIAuth';
import formatDate from '../../../../../services/formatDate';

export default function CreateBoardForm(props) {
    const [boardName, setBoardName] = useState("");
    // const [isSuccess, setIsSuccess] = useState(false);
    const handleChange = (event) => {
        setBoardName(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const board = {
            _name: boardName,
            _context: "",
            dateCreated: formatDate(new Date(), "YYYY-MM-DD"),
            url: "",
            userId: user.id,
        }
        APIAuthPostCall('boards/add', JSON.parse(localStorage.getItem('accessToken')), board)
            .then(res => {
                // setIsSuccess(true);
                props.handleBoardsUpdate();
                props.handleClickClose();
            })
            .catch(err => {
                console.log(err);
                // setIsSuccess(false);
            })
    }
    // if (isSuccess)
    //     return <Redirect to={process.env.PUBLIC_URL + "/dashboard"} />
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={handleChange}
                        value={boardName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
}