import React from "react";

function SubjectButton(props) {
  return (
    <div className="box btn-box" onClick={() => {
        props.onSee(props.id, props.name);
      }}>
      <h2>{props.name}</h2>
      </div>
  );
}

export default SubjectButton;
