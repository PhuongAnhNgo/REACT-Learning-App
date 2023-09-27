const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); 
require("dotenv");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/LearnApp");

app.get('/', (req, res) => {
  res.send("This is backend");
});

//------------------------------------------------
//                 Create Schema
//------------------------------------------------
const subjectSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true
    }
});

const wordSchema = new mongoose.Schema({
    subjectId: {
        type: String, 
        require: true
    },
    de: {  //Add a validation
        type: String
    },
    en: {
        type: String
    }
});

//------------------------------------------------
//          Create collection/ table
//------------------------------------------------
const Subject = mongoose.model("Subject", subjectSchema); //Create collection with fruitSchema, name of collection ('Fruit') will
//be automatically transformed into plural
const Word = mongoose.model("Word", wordSchema);


//------------------------------------------------
//                  API Routes
/*                                               
    + Get all subjects:                     /api/getSubjects (get)
    + Get all words of a subject:           /api/getWords/:subjectId (get)
    + Get unfinished words for learnmode:   /api/getLearnMode/:subjectId (get)
    + Add a subject:                        /api/addSubject (post: name)
    + Add a word:                           /api/addWord/:subjectId (post: de, en)
    + Delete a subject:                     /api/deleteSubject/:id (get)
    + Delete a word:                        /api/deleteWord/:id (get)
    + Update name subject:                  /api/updateSubject/:id



*/
//------------------------------------------------
// Get all subjects
app.get("/api/getSubjects", (req,res)=>{
    Subject.find({}).then(function(subjects){   
        return res.send(subjects);
    });
});

// Get all words of a subject
app.get("/api/getWords/:subjectId", (req,res)=>{
    const subjectId = req.params.subjectId;  
    Word.find({subjectId:subjectId}).then(function(words){ 
        return res.send(words);
    });  
});

// Get unfinished words for learnmode
app.get("/api/getLearnMode/:subjectId", (req,res)=>{
    const subjectId = req.params.subjectId;  
    Word.find({subjectId:subjectId, finished: false}).then(function(words){ 
        return res.send(words);
    });  
});

// Add a subject
app.post("/api/addSubject", (req,res)=>{
    const name = req.body.name;
    console.log(name);
    const newSubject = new Subject({
        name: name
    })
    newSubject.save();
});

// Add a word
app.post("/api/addWord/:subjectId", (req,res)=>{
    const newWord = req.body.newWord;
    const de = newWord.de;
    const en = newWord.en;
    const subjectId = req.params.subjectId;

    const addedWord = new Word({
        subjectId: subjectId,
        de: de,
        en:en
    })
   console.log(addedWord);
    addedWord.save();
});

// Route for deleting a subject
app.get("/api/deleteSubject/:id", (req,res)=>{
    const id = req.params.id;

    Subject.deleteOne({_id:id}).then (function() {  })
      .catch(function (err) {
        console.log(err);
      }); 
 
    try {
        Word.deleteMany( { subjectId : id } );
     } catch (e) {
        print (e);
     }
     
});

// Delete a word
app.get("/api/deleteWord/:id", (req,res)=>{
    const id = req.params.id;

    Word.deleteOne({_id:id}).then (function() {  })
      .catch(function (err) {
        console.log(err);
      }); 
     
});

// Route to change subject name
app.post('/api/updateSubject/:id',(req,res)=>{
    const id = req.params.id;
    const newName = req.body.name;

    Subject.updateOne({_id:id}, 
        {name:newName}).then(function (err, docs) {
        if (err){ console.log(err)}
        else{ console.log("Updated Docs : ", docs); }
    });   
});

// Route to change word cards' infos
app.post('/api/updateWord/:id',(req,res)=>{
    const id = req.params.id;
    const de = req.body.de;
    const en = req.body.en;

    Word.updateOne({_id:id}, 
        {de:de, en:en}).then(function (err, docs) {
        if (err){ console.log(err)}
        else{ console.log("Updated Docs : ", docs); }
    });   
});

// Change words to finished
app.post('/api/updateFinished/:id',(req,res)=>{
    const id = req.params.id;

    Word.updateOne({_id:id}, 
        {finished:true}).then(function (err, docs) {
        if (err){ console.log(err)}
        else{ console.log("Updated Docs : ", docs); }
    });   
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });