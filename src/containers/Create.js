import React from 'react';

const Create = ({ match }) => {
  return (
    <h1>Create Page {match.params.id}</h1>
  );
};

export default Create;
