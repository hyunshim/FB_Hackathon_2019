import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Quill from "../Icons/Quill";
import Cat from "../Icons/Cat";
import Slider from '@material-ui/lab/Slider';
import Label from "reactstrap/es/Label";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import {Notes} from "@material-ui/icons"
import {create_quest} from "../Utils";

const titles = [
    "What have ya lost Adventurer?",
    "Need help finding something?",
    "How can we help you with your quest"
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
            margin: theme.spacing.unit,
            display: "flex"
        },
        margin: {
            margin: theme.spacing.unit,
        }

    }
};

class QuestCreator extends React.Component {

    valid_url = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    handleClose = () => {
        this.props.onClose();
    };

    static defaultProps = {
        location: {
            coordinates: [0, 0],
            type: "point"
        }
    };

    state = {
        reward: 100,
        name: "",
        comments: [],
        description: "",
        imgurl: "",
        icon: "vet",
        title: titles[Math.floor(Math.random() * titles.length)]
    };

    create = () => {
        this.setState({
            creating: true
        });
        let data = {
            name: this.state.name,
            author: this.props.author,
            location: this.props.location.coordinates,
            reward: this.state.reward,
            description: this.state.description,
            imgurl: this.state.imgurl,
            icon: this.state.icon,
        };
        create_quest(data).then(result => {
            console.log("create_quest:", result);

            this.props.onClose();
        }).catch(()=>{
            this.setState({
                creating: false
            });
        });
    };

    handleChange = (key) => {
        return (event, value) => {
            this.setState({[key]: value});
        }
    };

    render() {
        let {classes, onClose, open, ...other} = this.props;
        let {imgurl, title, reward} = this.state;
        let valid_url = !!this.valid_url.test(imgurl);
        return <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title"
                       open={open} {...other}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <Card className={classes.card}>

                <CardActionArea>
                    {valid_url &&
                    <CardMedia
                        component="img"
                        alt="The Pet we seek!"
                        className={classes.media}
                        height="140"
                        image={imgurl}
                        title="Is this what you're looking for"
                    />
                    }
                </CardActionArea>
                <CardContent>
                    <FormControl className={classes.textField}>
                        <InputLabel htmlFor="quest-name">What have you lost?</InputLabel>
                        <Input
                            id="quest-name"
                            placeholder={"Name"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Quill/>
                                </InputAdornment>
                            }
                            className={classes.textField}
                            onChange={this.handleChange("name")}

                        />
                    </FormControl>
                    <FormControl className={classes.textField}>
                        <InputLabel htmlFor="Image URL">What does it look like</InputLabel>
                        <Input
                            id="Image URL"
                            placeholder={"Image URL of Picture"}

                            startAdornment={
                                <InputAdornment position="start">
                                    <Cat/>
                                </InputAdornment>
                            }
                            className={classes.textField}
                            onChange={this.handleChange("imgurl")}

                        />
                    </FormControl>
                    <FormControl className={classes.textField}>
                        <InputLabel htmlFor="Description">Is it a Chungus or a Chonk?</InputLabel>
                        <Input
                            id="Description"
                            placeholder={"Description"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Notes/>
                                </InputAdornment>
                            }
                            multiline
                            className={classes.textField}
                            onChange={this.handleChange("description")}
                        />
                    </FormControl>
                    <Label>What's the bounty</Label>
                    <div className={classes.margin}>
                        <Typography className={classes.pos} color="textSecondary">
                            {reward}%
                        </Typography>

                        <Slider
                            id="reward-slider"
                            value={this.state.reward}
                            min={0}
                            max={200}
                            step={20}
                            onChange={this.handleChange("reward")}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button disabled={this.state.creating} color={"primary"} onClick={this.create}><Quill/> Post Quest</Button>
                </CardActions>
            </Card>
        </Dialog>
    }
}

QuestCreator.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    display: PropTypes.object
};

const QuestCreatorWrapped = withStyles(styles)(QuestCreator);


export default QuestCreatorWrapped;
