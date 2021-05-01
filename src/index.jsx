import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import MainView from './components/main-view/main-view';
import { moviesApp } from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
// Import statement to indicate that you need to bundle `./index.scss`
import '../src/index.scss';
import RegistrationView from './components/registration-view/registration-view';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return(

        <Provider store={store}>
        <Router>
        <Switch> 
          <Route exact path='/register' component={RegistrationView} />
          <MainView />
          </Switch>
          </Router>
        </Provider>

    );
  }
}

// Tells React to render your app in the root DOM element
ReactDOM.render(<MyFlixApplication />, document.getElementById('root'));