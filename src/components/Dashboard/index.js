import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const cards = [1, 2, 3];
    const boards = props.boards;
    const TextTypography1 = withStyles({
        root: {
            color: "#283593"
        }
    })(Typography);
    const TextTypography2 = withStyles({
        root: {
            color: "#6971A8"
        }
    })(Typography);
    return (
        <div>
            <TextTypography1 variant="h4" component="h2" align="left" gutterBottom>
                My boards
            </TextTypography1>
            <TextTypography2 variant="h6" component="h2" align="left" color="textPrimary" gutterBottom>
                Public boards
            </TextTypography2>
            <Container className={classes.cardGrid} maxWidth={false}>
                <Grid container spacing={4}>
                    {boards && boards.map((board) => (
                        <Grid item key={board.id} xs={12} sm={6} md={3}>
                            <Card className={classes.card} color={"#ffffff"}>
                               
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {board._name}
                                    </Typography>
                                    <Typography>
                                        {board._context} 
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        URL
                                    </Button>
                                    <Button size="small" color="primary">
                                        CLONE
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>

    );
}