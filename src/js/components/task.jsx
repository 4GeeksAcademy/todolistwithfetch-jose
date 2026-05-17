import React from "react";
import PropTypes from "prop-types";

export const Task = (props) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span>{props.task}</span>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => props.removeTask(props.id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.string,
  id: PropTypes.number,
  removeTask: PropTypes.func
};