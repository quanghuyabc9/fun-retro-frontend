import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, IconButton, Button } from '@material-ui/core';
import Crop32RoundedIcon from '@material-ui/icons/Crop32Rounded';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import FunRetroCard from './FunRetroCard';

const useStyles = makeStyles((theme) => ({
    wentWellStyle: {
        color: "#009688"
    },
    toImproveStyle: {
        color: "#e91e63"
    },
    actionItemsStyle: {
        color: "#9c27b0"
    }
}));

export default function BoardDetail(props) {
    const classes = useStyles();
    const wentWellCards = props.cards.wentWell;
    const toImproveCards = props.cards.toImprove;
    const actionItemsCards = props.cards.actionItems;
    return (
        <Container maxWidth="false" >
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                spacing={3}>
                <Grid item xs={12} sm={4}
                    container
                    direction="column"
                    justify="space-between">
                    <Grid item container direction="row" alignItems="center">
                        <Grid container item direction="row" xs={10}>
                            <Crop32RoundedIcon className={classes.wentWellStyle} />
                            <Typography className={classes.wentWellStyle} >Went Well</Typography>
                        </Grid>
                        <Grid container item xs={2} justify="flex-end">
                            <IconButton>
                                <DeleteOutlineIcon className={classes.wentWellStyle} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth startIcon={<AddIcon />} onClick={props.handleClickAddWentWellCard}></Button>
                    </Grid>
                    {wentWellCards && wentWellCards.map((card) => (
                        <Grid item xs={12}>
                            < FunRetroCard card={card} handleClickAddOrDone={props.handleClickAddOrDone}
                            handleClickDeleteCard={props.handleClickDeleteCard}/>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} sm={4}
                    container
                    direction="column">
                    <Grid item container direction="row" alignItems="center">
                        <Grid container item direction="row" xs={10}>
                            <Crop32RoundedIcon className={classes.toImproveStyle} />
                            <Typography className={classes.toImproveStyle}>To Improve</Typography>
                        </Grid>
                        <Grid container item xs={2} justify="flex-end">
                            <IconButton>
                                <DeleteOutlineIcon className={classes.toImproveStyle} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth startIcon={<AddIcon />} onClick={props.handleClickAddToImproveCard}></Button>
                    </Grid>
                    {toImproveCards && toImproveCards.map((card) => (
                        <Grid item xs={12}>
                            < FunRetroCard card= {card} handleClickAddOrDone={props.handleClickAddOrDone}
                            handleClickDeleteCard={props.handleClickDeleteCard}/>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} sm={4}
                    container
                    direction="column">
                    <Grid item container direction="row" alignItems="center">
                        <Grid container item direction="row" xs={10}>
                            <Crop32RoundedIcon className={classes.actionItemsStyle} />
                            <Typography className={classes.actionItemsStyle}>Action Items</Typography>
                        </Grid>
                        <Grid container item xs={2} justify="flex-end">
                            <IconButton>
                                <DeleteOutlineIcon className={classes.actionItemsStyle} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth startIcon={<AddIcon />} onClick={props.handleClickAddActionItemsCard}></Button>
                    </Grid>
                    {actionItemsCards && actionItemsCards.map((card) => (
                        <Grid item xs={12}>
                            < FunRetroCard card={card} handleClickAddOrDone={props.handleClickAddOrDone}
                            handleClickDeleteCard={props.handleClickDeleteCard}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}