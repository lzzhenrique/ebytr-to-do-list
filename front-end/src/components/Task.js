import React from 'react';
import PropTypes from 'prop-types';

function Task({ a }) {
  return (
    <h1>{a}</h1>
  );
}

export default Task;

Task.propTypes = {
  a: PropTypes.number.isRequired,
};
