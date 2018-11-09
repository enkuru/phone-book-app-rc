import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container text>
          <Header/>

        </Container>
      </div>
    );
  }
}

export default App;
