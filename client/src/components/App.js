import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Flash from './Flash';
import Home from './Home';
import Beer from './Beer';
import Brewery from './Brewery';
import Beers from './Beers';
import Breweries from './Breweries';
import { Switch, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Segment>
        <NavBar />
        <Flash />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/api/all_beers' component={Beers} />
          <Route exact path='/api/all_breweries' component={Breweries} />
          <Route exact path='/api/beer/:name' component={Beer} />
          <Route exact path='/api/brewery/:id' component={Brewery} />
          <Route component={NoMatch} />
        </Switch>
      </Segment>
    );
  }
}

export default App;
