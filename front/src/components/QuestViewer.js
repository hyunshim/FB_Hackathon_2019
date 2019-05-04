import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    card: {
        maxWidth: 345,
    },
    media: {
        objectFit: 'cover',
    },
};

class QuestViewer extends React.Component {
    handleClose = () => {
        this.props.onClose();
    };

    render() {
        let {classes, onClose, display, ...other} = this.props;
        const open = display != null;
        if(!display){
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
                "id": "5ccd7175f780892f6b6cf523"
            }
        }
        return <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title"
                       open={open} {...other}>
            <DialogTitle id="simple-dialog-title">You've found a Quest!</DialogTitle>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="The Pet we seek!"
                        className={classes.media}
                        height="140"
                        image={display.imgurl}
                        title="The animal we would have you seek"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {display.name}
                        </Typography>
                        <Typography component="p">
                            {display.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Found the Pet!
                    </Button>
                </CardActions>
            </Card>
        </Dialog>
    }
}

QuestViewer.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
};

const QuestViewerWrapped = withStyles(styles)(QuestViewer);


export default QuestViewerWrapped;
