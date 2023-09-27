import React from "react";
import {useNavigate} from 'react-router-dom';

function Topicboard(props) {
  const navigate = useNavigate();
  return (
    <div className="box topic-box">
      <h2>{props.title}</h2>
      </div>
  );
}

export default Topicboard;
