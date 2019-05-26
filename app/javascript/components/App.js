import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Collections from './Collections';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/collections" component={Collections} />
        </Switch>
      </div>
    );
  }
}

export default App;
