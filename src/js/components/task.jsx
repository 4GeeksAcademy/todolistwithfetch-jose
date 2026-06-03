import React, {useState} from "react";
import PropTypes from "prop-types";

export const Task = (props) => {

  const [isHovered, setIsHovered] = useState(false);


  return (
    <li className="list-group-item d-flex justify-content-between align-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
    <div className="d-flex align-items-center gap-2">
      <input 
        type="checkbox" 
        checked={props.task.is_done} 
        onChange={() => props.updateTask(props.task)} 
        className="form-check-input me-2"
      />

      <span>{props.task.label}</span>

      {props.task.is_done ?
       <span className="ms-2 text-success">V</span> :
       <span className="ms-2 text-danger">X</span>}
      </div>

      {isHovered && (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => props.removeTask(props.id)}
      >
        x
      </button>
  )}
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.object,
  id: PropTypes.number,
  removeTask: PropTypes.func,
  updateTask: PropTypes.func
};