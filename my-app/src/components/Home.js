import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Topicboard from "./Topicboard";
import SubjectButton from "./SubjectButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Grid from '@mui/material/Grid';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Home() { 
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchAllSubjects = async ()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/getSubjects");
        setSubjects(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllSubjects(); //run function
  }, [subjects]) 

  async function addSubject(name) {
    if(name === ""){
      alert("Please add a name");
    }
  else{
    try{
      await axios.post("http://localhost:5000/api/addSubject", {name:name});     
    }catch(err){
      console.log(err);
    }
  }
    
  }

  async function showSubject(id, name) {
    navigate('/Subject', { state: { subjectid: id, name:name } });
  }

  function handleChange(event) {
    setNewSubject(event.target.value);
  }


  return (
    <div id="page-container">
        <Header />
        <br/>
        <h3 className="home">Hey! Let’s start learning today!</h3>
        <br/>
       <Topicboard title="Topics"/>
       <div className="box content-box">
        <div className="inner-box">
        {subjects.map((subject, index) => {
          return (
            <SubjectButton
              key={index}
              id={subject._id}
              name={subject.name}
              onSee={showSubject}
            />
          );
        })}
        </div>
        <div className="add-subject-box">
        <Grid container spacing={2}>
        <Grid item xs={10}>
        <textarea className="box " placeholder="Add a new subject hier." rows="1"
              value={newSubject}
              onChange={handleChange} ></textarea>
        </Grid>
        <Grid item xs={2}>
        <Fab className="add-btn"
                onClick={() => {
                  addSubject(newSubject);
                  setNewSubject("");
                }}
        >
        <AddIcon />
      </Fab>
  </Grid>
</Grid>
        
        
        
      </div>
     
       </div>
      <Footer />
    </div>
  );
}

export default Home;
