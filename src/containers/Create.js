import React from 'react';
import Header from '../components/Header';
import PriceForm from '../components/PriceForm';

const Create = ({ match }) => {
  return (
    <React.Fragment>
      <Header>Create Page {match.params.id}</Header>
      <PriceForm
      ></PriceForm>
    </React.Fragment>
  );
};

export default Create;
