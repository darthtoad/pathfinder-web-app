import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import NewCharacter from './Routes/NewCharacter'

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path='/new-character' exact component={NewCharacter} />
  </Switch>;