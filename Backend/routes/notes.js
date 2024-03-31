const express = require('express')
const fetchUser  = require('../middleware/fetchUser')
const router = express.Router()
const Notes = require('../models/Notes')
const {body,validationResult} = require('express-validator')


//Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchUser, async (req, res) => {
    try {
        const notes= await Notes.find({user:req.user.id})
    
    res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})
//Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote',fetchUser,[
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'description must be atleast 5 characters').isLength({min:5})
], async (req, res) => {
    try {
        const {title, description, tag}=req.body
    const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
   }
   const note = new Notes({
       title, description, tag, user: req.user.id
   })
   const savedNote = await note.save()
    
    res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})
//Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id',fetchUser, async (req, res) => {
    const {title, description, tag}=req.body
    try {
        //Create a newNote object
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //Find the note to be updated and update it
        const note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
        res.json(updatedNote)


    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})
//Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id',fetchUser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        const note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")

        }
        const deletedNote = await Notes.findByIdAndDelete(req.params.id)
        res.json(deletedNote)

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router