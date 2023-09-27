import React from "react";
import Fab from "@mui/material/Fab"; 
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from 'react-router-dom';

function Mainboard(props) {
  const navigate = useNavigate();
  return (
    <div className="box topic-box">
      <h2>{props.title}</h2>
      <Fab id="del" size="small" 
        onClick={() => {
            props.delSub();
            navigate("/");
        }}
    >
        <DeleteIcon />
    </Fab>
      </div>
  );
}

export default Mainboard;
