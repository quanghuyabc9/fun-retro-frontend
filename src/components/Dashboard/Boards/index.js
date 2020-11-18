import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card } from '@material-ui/core';
import Board from './Board';
import AddBoardDialog from './AddBoardDialog';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff'
    },
}));

export default function Boards(props) {
    const classes = useStyles();
    const boards = props.boards;
    return (
        <div>
            <Container className={classes.cardGrid} maxWidth={false}>
                <Grid container spacing={4}>
                    <Grid item key={-1} xs={12} sm={6} md={2} zeroMinWidth>
                        <Card variant="outlined" className={classes.card} >                       
                            <AddBoardDialog handleBoardsUpdate={props.handleBoardsUpdate}/>
                        </Card>
                    </Grid>
                    {boards && boards.map((board) => (
                        <Board board={board} handleBoardsUpdate={props.handleBoardsUpdate}/>
                    ))}
                </Grid>
            </Container>
        </div>

    );
}