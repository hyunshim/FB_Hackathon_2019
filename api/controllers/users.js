const User = require('../models/user');
const mongo = require('mongoose');
const selectFields = '_id name ph address points';

exports.get_all_users = (req, res, next) => {
    Mark.find()
        .select(selectFields)
        .exec()
        .then(docs => {
            const response = {
                marks: docs.map(doc => {
                    return {
                        name: doc.name,
                        ph: doc.ph,
                        address: doc.address,
                        id: doc._id,
                        points: doc.points
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(error => {res.status(500).json({error: error});
    });
}

exports.get_points = (req, res, next) => {
    Mark.findOne({_id: id})
        .select(selectFields)
        .exec()
        .then(doc => {
            const response = {
                poin: doc
            }
            res.status(200).json(response)
        })
        .catch(error => {res.status(500).json({error: error});
    })
}

exports.create_mark = (req, res, next) => {
    const mark = new Mark({
        _id: new mongo.Types.ObjectId(),
        title: req.body.title,
        score: req.body.score,
        average: req.body.average
    });
    mark.save().then(result => {
        res.status(201).json({
            message: `Created mark of id '${result._id}' successfully`,
            created_mark: {
                _id: result._id,
                title: result.title,
                mark: result.mark,
                average: result.average
            }
        })
    });
}

exports.delete_mark = (req, res, next) => {
    const id = req.params.markId;
    Mark.findOneAndDelete({_id: id})
        .select(selectFields)
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Deleted mark of id '${id}' successfully`
            });
        })
        .catch(error => {res.status(500).json({error: error});
    });
}