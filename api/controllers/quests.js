const Quest = require('../models/quest');
const mongo = require('mongoose');
const selectFields = '_id name author location date reward comments description imgurl';

exports.get_all_quests = (req, res, next) => {
    Quest.find()
        .select(selectFields)
        .exec()
        .then(docs => {
            const response = {
                quests: docs.map(doc => {
                    return {
                        name: doc.name,
                        author: doc.author,
                        coordinates: doc.coordinates,
                        date: doc.date,
                        reward: doc.reward,
                        comments: doc.comments,
                        description: doc.description,
                        imgurl: doc.imgurl,
                        icon: doc.icon,
                        id: doc._id
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(error => {res.status(500).json({error: error});
    });
}

// exports.get_mark = (req, res, next) => {
//     Quest.findOne({_id: id})
//         .select(selectFields)
//         .exec()
//         .then(doc => {
//             const response = {
//                 mark: doc
//             }
//             res.status(200).json(response)
//         })
//         .catch(error => {res.status(500).json({error: error});
//     })
// }

exports.create_quest = (req, res, next) => {
    const quest = new Quest({
        _id: new mongo.Types.ObjectId(),
        name: req.body.tnameitle,
        author: req.body.author, // get logged in userid!
        coordinates:req.body.coordinates.split(',').map(Number),
        reward: req.body.reward,
        description: req.body.description,
        imgurl: req.body.imgurl,
        icon: req.body.icon
    });
    mark.save().then(result => {
        res.status(201).json({
            message: `Created quest of id '${result._id}' successfully`,
            created_quest: {
                _id: result._id,
                name: result.tnameitle,
                coordinates: result.coordinates,
                author: result.author, // get logged in userid!
                reward: result.reward,
                description: result.description,
                imgurl: result.imgurl,
                icon: result.icon
            }
        })
    });
}

exports.delete_quest = (req, res, next) => {
    const id = req.params.markId;
    Quest.findOneAndDelete({_id: id})
        .select(selectFields)
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Deleted quest of id '${id}' successfully`
            });
        })
        .catch(error => {res.status(500).json({error: error});
    });
}