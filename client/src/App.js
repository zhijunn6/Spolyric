import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ItemList from "./components/ItemList";
import DisplayLyrics from "./components/DisplayLyrics";
import SpotifyCurrent from "./components/SpotifyCurrent";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Container className="center">
                    <h1>You are now listening to...</h1>
                    <SpotifyCurrent />
                  </Container>
                )}
              />
              <Route exact path="/history" component={ItemList} />
            </Switch>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
