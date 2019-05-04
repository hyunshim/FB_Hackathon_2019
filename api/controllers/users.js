const User = require('../models/user');
const mongo = require('mongoose');
const selectFields = '_id name ph address experience quests';

exports.create_user = (req, res, next) => {
    const user = new User({
        _id: new mongo.Types.ObjectId(),
        name: req.body.name,
        ph: req.body.ph,
        address: req.body.address,
        experience: req.body.experience,
        quests: req.body.quests,
        title: req.body.title
    });
    console.log(req.body)
    console.log(user)
    user.save().then(result => {
        res.status(201).json({
            message: `Created user of id '${result._id}' successfully`,
            created_user: {
                _id: result._id,
                name: result.name,
                ph: result.ph,
                address: result.address,
                experience: result.experience,
                quests: result.quests
            }
        })
    });
}

exports.get_user = (req, res, next) => {
    const id = req.params.userId
    User.findOne({_id: id})
        .select(selectFields)
        .exec()
        .then(doc => {
            const response = {
                user: doc
            }
            res.status(200).json(response)
        })
        .catch(error => {res.status(500).json({error: error});
    })
}

exports.get_all_users = (req, res, next) => {
    User.find()
        .select(selectFields)
        .exec()
        .then(docs => {
            const response = {
                users: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        ph: doc.ph,
                        address: doc.address,
                        experience: doc.experience,
                        quests: doc.quests,
                        title: doc.title
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(error => {res.status(500).json({error: error});
    });
}

exports.delete_user = (req, res, next) => {
    const id = req.params.userId;
    User.findOneAndDelete({_id: id})
        .select(selectFields)
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Deleted user of id '${id}' successfully`
            });
        })
        .catch(error => {res.status(500).json({error: error});
    });
}