import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div className="toggleDiv" style={hideWhenVisible}>
        <button className="greenButton" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div className="toggleDiv" style={showWhenVisible}>
        {props.children}
        <button className="redButton" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export { Togglable };
