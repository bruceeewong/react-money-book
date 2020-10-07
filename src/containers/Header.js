import React from 'react';
import '../App.css';
import logo from '../logo.svg';

function Header(props) {
  return (
    <header className="App-header">
      <div className="row my-4">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      {props.children}
    </header>
  );
}

export default Header;