import React, { Component } from 'react';
import Identicon from "./Identicon";
var baseUrl = "https://horizon-testnet.stellar.org";
var effectTypes = {
  "0": "created",
  "1": "removed",
  "2": "credited",
  "3": "debited",
  "10": "signer_created"
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {effects: []};
    this.load();
  }
  load() {
    var that = this;
    fetch(`${baseUrl}/effects`)
    .then(response => response.json())
    .then(data => {
        this.setState({effects: data._embedded.records})
        return data._embedded.records;
      }
    );
  }

  render() {

    var effects = this.state.effects.map(function(effect){
      var data = new Identicon(effect.account, 20).toString();
      data = "data:image/png;base64," + data
      return (
        <li>
          <img width="20" height="20" src={data} alt={effect.account}></img>
          {effectTypes[effect.type]} {effect.amount}
        </li>
      );
    });
    return (
    <p>
    <h1>Recent Transactions</h1>
      <ul>
        {effects}
      </ul>
    </p>
    );
  }
}
