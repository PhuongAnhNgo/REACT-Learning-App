import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Card from "./Card";
import Fab from "@mui/material/Fab"; 
import Grid from '@mui/material/Grid';

import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';

function LearnMode() {
    const {state} = useLocation();
    const {subjectid, name} = state; 
    
    const [words, setWords] = useState([]);
    
    const navigate = useNavigate();
  
    useEffect(()=>{
        const fetchAllWords = async ()=>{
          try{
            const link = "http://localhost:5000/api/getLearnMode/" + subjectid;
    
            const res = await axios.get(link);
            //
            setWords(res.data);
            
          }catch(err){
            console.log(err);
          }
        }
        fetchAllWords(); //run function
      }, [])

    const cards = words.map((card)=>{
        return <Card de={card.de} en={card.en}/>;
    })

    //Pointer to the current card
    const [pt, setPt] = useState(0);
    function prevCard() {
        setPt(pt-1);
    }

    function nextCard() {
        setPt(pt+1);
    }

    const loading = <div className="loading">Loading flashcard content...</div>;


  return (
    <div id="learnmode" className="page-container">
        <Header />
        <br/>

        <div className="big-box">
        {words && words.length > 0 ? (
        <div className="cardNumber">
          <h3>Card {pt + 1} of {words.length}</h3>
        </div>
        ) : ("")}
        {words && words.length > 0 ? cards[pt] : loading}
        {pt > 0 ? (
          <button id="prev" onClick={prevCard}><h3>Previous card</h3></button>
        ) : (
          <button id="prev" className="disabled" disabled>
            <h3>Previous card</h3>
          </button>
        )}
        {pt < words.length - 1 ? (
          <button id="next" onClick={nextCard}><h3>Next card</h3></button>
        ) : (
          <button id="next" className="disabled" disabled>
          <h3>Next card</h3>
          </button>
        )}
        </div>

        <Footer />
    </div>
  );
}

export default LearnMode;
