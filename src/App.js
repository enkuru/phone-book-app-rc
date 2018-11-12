import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {Route, Switch} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import PersonsPage from './components/pages/PersonsPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Header/>

          <Container>
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route exact path='/persons' component={PersonsPage}/>
            </Switch>
          </Container>
        </Container>
      </div>
    );
  }
}

export default App;
