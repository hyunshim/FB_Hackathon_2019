import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import Collapse from "@material-ui/core/Collapse/Collapse";
import IconButton from "@material-ui/core/IconButton/IconButton";
import classnames from 'classnames';
import {AddAlert} from '@material-ui/icons';
import TextField from "@material-ui/core/TextField/TextField";
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Fab from "@material-ui/core/Fab/Fab";

const titles = [
    "You've found a Quest!",
    "Behold, Adventurer! A Quest",
    "A Quest for you Adventurer"
];

const styles = (theme) => {
    return {
        avatar: {
            backgroundColor: blue[100],
            color: blue[600],
        },
        card: {
            width: "100%",
            overflowY: "auto"
        },
        media: {
            objectFit: 'cover',
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            display: "flex"
        },
    }
};

class QuestViewer extends React.Component {
    handleClose = () => {
        this.props.onClose();
    };


    state = {
        expanded: false
    };
    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    };

   
    render() {
        let {classes, onClose, display, ...other} = this.props;
        const open = display != null;
        if (!display) {
            display = {
                "name": "I lost my cat",
                "author": 123,
                "location": {"coordinates": [37.484116, -122.148244], "type": "Point"},
                "date": "2019-05-04T11:03:17.961Z",
                "reward": "lol",
                "comments": [],
                "description": "He's a 8 year old chonk, I really miss him, please return him",
                "imgurl": "https://i.imgur.com/EaY09jQ.jpg",
                "icon": "vet",
                "id": "5ccd7175f780892f6b6cf523",
            }
        }
        let title = titles[Math.floor(Math.random() * titles.length)];
        return <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title"
                       open={open} {...other}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <Card className={classes.card}>
                <CardActionArea>
                    {display.imgurl &&
                    <CardMedia
                        component="img"
                        alt="The Pet we seek!"
                        className={classes.media}
                        height="140"
                        image={display.imgurl}
                        title="The animal we would have you seek"
                    />
                    }
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {display.name}
                    </Typography>
                    <Typography component="p">
                        {display.description}
                    </Typography>
                </CardContent>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    {display.comments.map((comment) => {
                        return <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="User" className={classes.avatar}>
                                        {comment.author.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}
                                    </Avatar>
                                }
                                action={
                                    <IconButton>
                                    </IconButton>
                                }
                                title={comment.author}
                                subheader={comment.posted}
                            />
                            <CardContent>
                                <Typography component="p">

                                    {comment.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    })}
                    <TextField
                        id="outlined-textarea"
                        label="Add Comment"
                        placeholder={"Comment as " + "John Doe"}
                        multiline
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <Fab color="primary" aria-label="Add" className={classes.textField}>
                        <AddIcon/>
                    </Fab>


                </Collapse>
                <CardActions>
                    <Tooltip title="Track this Quest">
                        <IconButton color="primary">
                            <AddAlert/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                        <a target="_blank" href="https://i.imgur.com/GlOR6rK.png">

                        <IconButton aria-label="Share">
                            <ShareIcon/>
                        </IconButton>
                        </a>
                    </Tooltip>
                    <Tooltip title="See More">
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Dialog>
    }
}

QuestViewer.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    display: PropTypes.object
};

const QuestViewerWrapped = withStyles(styles)(QuestViewer);


export default QuestViewerWrapped;
