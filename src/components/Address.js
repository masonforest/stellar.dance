import $ from 'jquery';
import React, { Component } from 'react';
import {
    Account,
    Asset,
    Keypair,
    Operation,
    TransactionBuilder
    } from 'stellar-base';
import {Server} from 'stellar-sdk';
import base32 from 'base32.js';
import Actions from '../actions/Actions.js'

var defaultDestination = "GDZCATWIBACVBOVZJKKLQXP64UTPP3QFOCKX42RNCVPLXYVVQKDXW2UM";
var server = new Server({hostname:'horizon-testnet.stellar.org', secure:true, port:443});

export default class Address extends React.Component {
  constructor(props) {
    super(props);

    if (!localStorage.seed) {
      localStorage.seed = this.randomSeed();
    }

    this.state = {
      seed: localStorage.seed,
    }
  }

  randomSeed() {
    return Keypair.random().seed();
  }

  componentDidMount() {
    let source = Keypair.fromSeed(this.state.seed);
    server.accounts()
      .address(source.address())
      .call()
      .then((account) => {
        this.setState({
          "balance": account.balances[0].balance,
          "sequence": account.sequence
        });
      })
      .catch(function (err) {
        console.error(err);
      })
  }

  createAddress(){
    // Actions.createAddress();
    localStorage.seed = this.randomSeed();
    this.setState({
      seed: localStorage.seed,
      balance: "0"
    })
  }


  render() {
    let sourceKeyPair = Keypair.fromSeed(this.state.seed);
    let source = new Account(sourceKeyPair.address(), 1);

    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{source.address}</p>
        <button onClick={this.createAddress.bind(this)}>Regenerate</button>
      </div>
    );
  }
}
