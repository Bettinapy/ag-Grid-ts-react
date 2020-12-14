import React from 'react';
import logo from './logo.svg';
import './App.css';
import reducers from './reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import Login from './components/login';
import Grid from './components/grid';
import rootSaga from './sagas';

class App extends React.Component{
  store: any;
  constructor(props: any) {
    super(props);
    const sagaMiddleware = createSagaMiddleware()
    this.store = createStore(
      reducers,
      applyMiddleware(sagaMiddleware, logger)
      )
      debugger;
      sagaMiddleware.run(rootSaga);
  }
  render(){
    return (
      <Provider store={this.store}>
        <Router basename={process.env.REACT_APP_BASENAME}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Grid} />
            </Switch>
        </Router>
      </Provider>

    );
  }
}

export default App;
