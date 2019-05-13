import React, { Component } from 'react';
import Nav from "./components/Nav"
import PageContent from "./components/PageContent"
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Nav />
        <PageContent/>
      </div>
    );
  }
}

export default App;
