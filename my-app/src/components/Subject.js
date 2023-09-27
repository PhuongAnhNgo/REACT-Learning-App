import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Mainboard from "./Mainboard";
import MeaningLine from "./MeaningLine";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab"; 
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';

function Home() { 
    const {state} = useLocation();
    const {subjectid, name} = state; 
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({
    de: "",
    en: ""
  });
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchAllWords = async ()=>{
      try{
        const link = "http://localhost:5000/api/getWords/" + subjectid;

        const res = await axios.get(link);
        //console.log(res.data);
        setWords(res.data);
        
      }catch(err){
        console.log(err);
      }
    }
    fetchAllWords(); //run function
  }, []) 

  async function delWord(id) { 
    try{ 
        setWords((prevItems) => {
            return prevItems.filter((item) => {
              return item._id !== id;
            });
          });
        const link = "http://localhost:5000/api/deleteWord/" + id
        await axios.get(link); 
    }catch(err){
      console.log(err);
    } 
    
  }

  async function updateWord(word) {
    try{
        const link = "http://localhost:5000/api/updateWord/" + word._id
        await axios.post(link, {de:word.de, en:word.en});     
      }catch(err){
        console.log(err);
      }
  }

  async function addnewWord() {
    try{
        setWords((prevValue) => [...prevValue, newWord]);
        const link = "http://localhost:5000/api/addWord/" + subjectid
        await axios.post(link, {newWord:newWord});  
        
      }catch(err){
        console.log(err);
      }   
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewWord((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    }); 
  }

  async function delSub() {
    try{
        const link = "http://localhost:5000/api/deleteSubject/" + subjectid
        await axios.get(link);  
        
        
      }catch(err){
        console.log(err);
      }   
  }

  async function toLearnMode() {
    navigate('/LearnMode', { state: { subjectid: subjectid,name:name } });
  }

  return (
    <div id="page-container">
        <Header />
        <br/>
       <Mainboard title={name} delSub={delSub}/>
       <div className="box content-box2 ">
       <div className="inner-box2">
                { words.map((word, index) => {
                    return (
                        <MeaningLine key={index} val={word} delWord={delWord} updateWord={updateWord}></MeaningLine>
                    );
                })} 
        </div>
        <br/>
        <Grid container spacing={2}>
        <Grid item xs={5}>
        <textarea className="box word-box2 float-left" name="de" value={newWord.de} onChange={handleChange}></textarea>
        </Grid>
        <Grid item xs={5}>
        <textarea className="box word-box2 float-left" name="en" value={newWord.en} onChange={handleChange}></textarea>
        </Grid>
        <Grid item xs={2}>
        <Fab id="save" size="small" className="float-left" 
            onClick={()=>{addnewWord();
                setNewWord({
            de: "",
            en: ""
                });         }}>
        <AddIcon />
        </Fab>
        </Grid>
        
      </Grid>
      <Fab id="learn-mode" className="big-button" onClick={toLearnMode}>Start Learn <ArrowForwardIosIcon/></Fab>
       </div>
      <Footer />
    </div>
  );
}

export default Home;
