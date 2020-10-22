const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//ROUTES

//All Notes
router.get('/', async (req, res) => {
    try {
        const notes = await Post.find();
        res.send(notes);
    }catch(err){
        res.send({message: err});
    }
});

//Post Note
router.post('/', async (req, res) => {
    const note = new Post ({
        title: req.body.title,
        description: req.body.description
    });

    try{
    const savedNote = await note.save();
    res.send(savedNote);
    }catch(err){
    res.send({message: err});
    }

});

//Specific Note
router.get('/:noteId', async (req, res) => {
    try{
    const note = await Post.findById(req.params.noteId);
    res.json(note);
    }catch(err){
        res.send({message: err})
    }
})

//Delete Note
router.delete('/:noteId', async (req, res) => {
    try{
    const deleteNote = await Post.findByIdAndDelete(req.params.noteId);
    res.json(deleteNote);
    }catch{
        res.send({message: err});
    }
})

//Update a post
router.patch('/:noteId', async (req, res) => {
    try {
    const updatePost = await Post.updateOne(
        {_id: req.params.noteId}, 
        { $set: { title: req.body.title,
        description: req.body.description} }
        );
        res.json(updatePost);
    } catch(err) {
        res.send({message: err})
    }
        
})


module.exports = router;