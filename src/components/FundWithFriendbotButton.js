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
import StellarStore from '../stores/StellarStore.js';
import StellarActions from '../actions/StellarActions.js'
import connectToStores from 'alt/utils/connectToStores';

var defaultDestination = "GDZCATWIBACVBOVZJKKLQXP64UTPP3QFOCKX42RNCVPLXYVVQKDXW2UM";

@connectToStores
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

  static getStores() {
    return [StellarStore];
  }

  static getPropsFromStores() {
    return StellarStore.getState();
  }

  fundAccount(){
    let address = Keypair.fromSeed(this.props.seed).address();
    StellarActions.fundAccount(address);
  }

  render() {
    return (
      <button onClick={this.fundAccount.bind(this)}>Fund Account with Friendbot</button>
    );
  }
}
