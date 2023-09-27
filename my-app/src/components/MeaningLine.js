import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function MeaningLine(props) {
    const [word, setWord] = useState(props.val);

    function handleChange(event) {
        const { name, value } = event.target;
        setWord((prevValue) => {
          return {
            ...prevValue,
            [name]: value
          };
        });
      }

  return (
   <div>
    
    <Grid container spacing={2}>
        <Grid item xs={5}>
        <textarea className="box word-box float-left" name="de" value={word.de} onChange={handleChange}></textarea>
        </Grid>
        <Grid item xs={5}>
        <textarea className="box word-box float-left" name="en" value={word.en} onChange={handleChange}></textarea>
        </Grid>
        <Grid item xs={2}>
        <Fab id="save" size="small" className="float-left"
        onClick={() => {
            props.updateWord(word);
        }}
    >
        <SaveIcon />
    </Fab>
    <Fab id="del" size="small" className="float-left"
        onClick={() => {
            props.delWord(word._id);
        }}
    >
        <DeleteIcon />
    </Fab>
        </Grid>
        
      </Grid>
    </div>  
  );
}

export default MeaningLine;
