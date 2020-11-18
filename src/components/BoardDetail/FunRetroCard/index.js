import { useState } from "react";
import {
    Button, Grid, Typography, 
    Card, CardContent, CardActions, 
    IconButton, createMuiTheme, TextField
} from "@material-ui/core";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles"
import { Edit, DeleteOutline as DeleteOutlineIcon } from "@material-ui/icons";
import { CARD_MODES, CARD_TYPES } from "../../../configs/constraints";
// import { APIAuthPostCall } from "../../../configs/APIAuth";

const useStyles = makeStyles((theme) => ({
    wentWellCardStyle: {
        marginTop: theme.spacing(2),
        backgroundColor: "#009688"
    },
    toImproveCardStyle: {
        marginTop: theme.spacing(2),
        backgroundColor: "#e91e63"
    },
    actionItemsCardStyle: {
        marginTop: theme.spacing(2),
        backgroundColor: "#9c27b0"
    },
    textFieldStyles: {
        color: "#ffffff"
    },
    buttonStyles: {
        marginRight: theme.spacing(1),
    },
    textColor: {
        color: 'white',
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `!important`,
        }
    },
    cssFocused: {},
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
    },
}));

const wentWellTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffffff"
        }
    }
})


export default function FunRetroCard(props) {
    const card = props.card;
    const [mode, setMode] = useState(card.isNew?CARD_MODES.EDIT: CARD_MODES.VIEW);
    const [content, setContent] = useState(props.card.content);
    const classes = useStyles();
    let cardStyles = classes.wentWellCardStyle;
    const type = card._column;
    const handleClickEditButton = () => {
        setMode(CARD_MODES.EDIT);
    }
    const handleChange = (event) => {
        setContent(event.target.value);
    }
    const handleClickAddOrDone = () => {
        const cardNew = card;
        cardNew.content = content;
        setMode(CARD_MODES.VIEW);
        props.handleClickAddOrDone(cardNew);
    }
    const handleClickDeleteCard = () => {
        props.handleClickDeleteCard(card);
    }
    // const handleClickAddOrDone = () => {
    //     const cardNew = {
    //         _column: card._column,
    //         content: content,
    //         numericalOrder: props.curNumericalOrder,
    //         boardId: card.boardId
    //     }
    //     if(isNew) {
    //         APIAuthPostCall('cards/add', JSON.parse(localStorage.getItem("accessToken")), )
    //     }
    //     setMode(CARD_MODES.VIEW);
    // }
    switch (type) {
        case CARD_TYPES.WENT_WELL:
            cardStyles = classes.wentWellCardStyle;
            break;
        case CARD_TYPES.TO_IMPROVE:
            cardStyles = classes.toImproveCardStyle;
            break;
        case CARD_TYPES.ACTION_ITEMS:
            cardStyles = classes.actionItemsCardStyle;
            break;
        default:
            cardStyles = classes.wentWellCardStyle;
    };
    switch (mode) {
        case CARD_MODES.VIEW:
            return (
                <MuiThemeProvider theme={wentWellTheme}>
                    <Card variant="outlined" className={cardStyles}>
                        <CardContent>
                            <Grid container direction="row" alignItems="flex-start" justify="space-between">
                                <Grid item>
                                    <Typography color="primary">
                                        {card.content}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container direction="row" alignItems="flex-start" justify="flex-end">
                                <Grid item>
                                    <IconButton onClick={handleClickEditButton}>
                                        <Edit className={classes.iconStyles} color="primary" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </MuiThemeProvider>

            )
        case CARD_MODES.EDIT:
            return (
                <MuiThemeProvider theme={wentWellTheme}>
                    <Card variant="outlined" className={cardStyles}>
                        <CardContent>
                            <Grid container direction="row" alignItems="flex-start" justify="space-between">
                                <Grid item xs={12}>
                                    <TextField multiline variant="outlined" fullWidth className={classes.textFieldStyles}
                                        InputProps={{
                                            classes: {
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                            },
                                            className: classes.textColor
                                        }}
                                        value={content} 
                                        onChange={handleChange}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container direction="row" alignItems="center" justify="flex-end">
                                <Grid item>
                                    <Button variant="outlined" color="primary" className={classes.buttonStyles} onClick={handleClickAddOrDone}>
                                        {card.isNew? "ADD" : "DONE"}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <IconButton color="primary" onClick={handleClickDeleteCard}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </MuiThemeProvider>
            )
        default:
    }
}