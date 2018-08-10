const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Video = require('../models/video');
const Emp = require('../models/emp');

const db = "mongodb://devi:Devi1234@ds153841.mlab.com:53841/videoplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true }, function (err) {
    !err && console.log('Db connected!');
    err && console.error("Error! " + err);
})

router.get('/', function (req, res) {
    res.send("My Api works!");
});
router.get('/employee', function (req, res) {
    Emp.find({})
        .exec(function (err, employee) {
            if (err) {
                console.log("Error in retriving emps");
            } else {
                res.json(employee);
            }
        })
});
router.get('/videos', function (req, res) {
    console.log('Get request for all videos');
    Video.find({})
        .exec(function (err, videos) {
            if (err) {
                console.log("Error in retriving videos");
            } else {
                res.json(videos);
            }
        })
});
router.get('/videos/:id', function (req, res) {
    console.log('Get request for single video');
    Video.findById(req.params.id)
        .exec(function (err, videos) {
            if (err) {
                console.log("Error in retriving video");
            } else {
                res.json(videos);
            }
        })
});
router.post('/video', function (req, res) {
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function (err, insertedVideo) {
        if (err) {
            console.log('Error in Saving video');
        } else {
            res.json(insertedVideo);
        }
    });
});
router.put('/video/:id', function (req, res) {
    console.log('Update Video');
    Video.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                title: req.body.title,
                url: req.body.url,
                description: req.body.description
            }
        },
        {
            new: true
        },
        function (err, updatedVideo) {
            if (err) {
                res.send("Error in Updating Video");
            } else {
                res.json(updatedVideo);
            }
        }
)
});
router.delete('/video/:id', function(req,res){
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id, function(err, deletedVideo){
        if(err){
            res.send("Error deleting video");
        }else{
            res.json(deletedVideo);
        }
    })
})
router.get('/cookie', function(req, res){
    res.cookie('name', 'express cookie',  {maxAge: 360000}).send('cookie set'); //Sets name = express
    console.log('Cookies: ', req.cookies);
 });
module.exports = router;

