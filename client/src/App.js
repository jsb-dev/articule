import React from 'react';
import logo from './logo.svg';
import env from 'react-dotenv';
import './App.css';

function App() {
  const { REACT_APP_API_URL } = env;
  const connect = async () => {
    const response = await fetch(`${REACT_APP_API_URL}connect`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data.message);
  };

  // call connect on page load
  connect();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
