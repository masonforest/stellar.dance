import React, { Component } from 'react';
import RecentTransactions from './RecentTransactions';
import Identicon from "./Identicon";
import Balance from "./Balance";
import Address from "./Address";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <Address title="Your Address"/>
        <Balance/>
      </div>
  );
  }
}
