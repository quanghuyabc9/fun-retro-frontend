import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Card, CardContent, CardActions, Button, Typography,
    CardActionArea
} from '@material-ui/core';
import { AccessTime as AccessTimeIcon, FileCopy as FileCopyIcon, AddToPhotos as AddToPhotosIcon } from '@material-ui/icons';
import PositionedPopper from './PositionedPopper';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import formatDate from '../../../../services/formatDate';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: '#ffffff'
    },
    cardContent: {
        flexGrow: 1,
    },
    textStyle: {
        color: "#aeaeae",
        fontSize: "15px"
    },
}));

export default function Board(props) {
    const classes = useStyles();
    const board = props.board;
    const [boardDetail, setBoardDetail] = useState(false);
    const handleClick = () => {
        setBoardDetail(true);
    };
    if(boardDetail)
        return <Redirect to={`${process.env.PUBLIC_URL}/board/${board.id}`} />
    return (
        <Grid item key={board.id} xs={12} sm={6} md={2} zeroMinWidth>
            <Card className={classes.card}>
                <CardActionArea onClick={handleClick}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2" color="secondary">
                            <b>{board._name}</b>
                        </Typography>
                        <Typography color="secondary">
                            {board._context===""? "No context" : board._context}
                        </Typography>
                        <hr />
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center">
                            <Grid
                                item
                                container
                                xs="7"
                                direction="row"
                                justify="flex-start"
                                alignItems="center">
                                <Grid item>
                                    <AccessTimeIcon style={{ color: "#aeaeae", fontSize: 15 }} />
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.textStyle} >{formatDate(new Date(board.dateCreated), "DDMonYYYY")}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.textStyle}>12 cards</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center">
                        <Grid item xs={5}>
                            <Button variant="contained" color="primary" size="small" startIcon={<FileCopyIcon />} className={classes.textActionStyle}>
                                URL
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button variant="contained" color="primary" size="small" startIcon={<AddToPhotosIcon />} className={classes.textActionStyle}>
                                CLONE
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <PositionedPopper handleBoardsUpdate={props.handleBoardsUpdate} boardId={board.id}/>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    )
}