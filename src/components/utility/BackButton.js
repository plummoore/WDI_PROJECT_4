import React from 'react';

const BackButton = ({ history }) => {
  return(
    <div>
      <button onClick={console.log('BackButton hitting')}>
        Back
      </button>
    </div>
  );
};

export default BackButton;
