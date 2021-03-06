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
var server = new Server({hostname:'horizon-testnet.stellar.org', secure:true, port:443});

@connectToStores
export default class Address extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [StellarStore];
  }

  static getPropsFromStores() {
    return StellarStore.getState();
  }

  randomSeed() {
    return Keypair.random().seed();
  }

  componentDidMount() {
    // console.log("mounted")
    // StellarActions.createAddress();
    // let source = Keypair.fromSeed(this.state.seed);
    // server.accounts()
    //   .address(source.address())
    //   .call()
    //   .then((account) => {
    //     this.setState({
    //       "balance": account.balances[0].balance,
    //       "sequence": account.sequence
    //     });
    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //   })
  }

  createAddress(){
    StellarActions.createAddress();
  }


  render() {
    let sourceKeyPair = Keypair.fromSeed(this.props.seed);
    let source = new Account(sourceKeyPair.address(), 1);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{sourceKeyPair.address()}</p>
        <button onClick={this.createAddress.bind(this)}>Regenerate</button>
      </div>
    );
  }
}
