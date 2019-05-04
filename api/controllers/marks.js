const Mark = require('../models/mark');
const mongo = require('mongoose');
const selectFields = '_id title score average';

exports.get_all_marks = (req, res, next) => {
    Mark.find()
        .select(selectFields)
        .exec()
        .then(docs => {
            const response = {
                marks: docs.map(doc => {
                    return {
                        title: doc.title,
                        score: doc.score,
                        average: doc.average,
                        id: doc._id
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(error => {res.status(500).json({error: error});
    });
}

exports.get_mark = (req, res, next) => {
    Mark.findOne({_id: id})
        .select(selectFields)
        .exec()
        .then(doc => {
            const response = {
                mark: doc
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