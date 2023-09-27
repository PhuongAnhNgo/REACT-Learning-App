import React from "react";
import StyleIcon from '@mui/icons-material/Style';

function Card(props) {
  return (
    <div className="flip-card">
        <div className=" flip-card-inner">
                <div className="box flip-card-front">
                <h2>{props.de}</h2>
                </div>
                <div className=" box flip-card-back">
                <h2>{props.en}</h2>
                </div>
        </div>
        
    </div>
  );
}

export default Card;
