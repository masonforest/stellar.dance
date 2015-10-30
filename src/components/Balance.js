import $ from 'jquery';
import React, { Component } from 'react';
import StellarActions from '../actions/StellarActions.js'
import {
    Account,
    Asset,
    Keypair,
    Operation,
    TransactionBuilder
    } from 'stellar-base';
import {Server} from 'stellar-sdk';
import base32 from 'base32.js';
var defaultDestination = "GDZCATWIBACVBOVZJKKLQXP64UTPP3QFOCKX42RNCVPLXYVVQKDXW2UM";
var server = new Server({hostname:'horizon-testnet.stellar.org', secure:true, port:443});

export default class Balance extends React.Component {
  constructor(props) {
    super(props);

    if (!localStorage.seed) {
      // localStorage.seed = this.randomSeed();
    }

    this.state = {
      seed: localStorage.seed,
      balance: 0,
      addresses: [],
      destinationAddress: defaultDestination
    }
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

    server.accounts()
      .order("desc")
      .call()
      .then((accounts) => {
        let addresses = accounts.records.map((account) => account.address)
        this.setState({
          "addresses": addresses
        });
      })
      .catch(function (err) {
        console.error(err);
      })
  }

  fundAccount() {
    let source = Keypair.fromSeed(this.state.seed);
    server.friendbot(source.address())
      .call()
      .then((result) => setTimeout(function(){location.reload()}, 4000))
      .catch((err) => console.log(err))
  }
  randomSeed() {
    return Keypair.random().seed();
  }

  createAddress(){
    //localStorage.seed = this.randomSeed();
    this.setState({
      seed: localStorage.seed,
      balance: "0"
    })
  }

  setDestination(e){
    e.preventDefault()
    this.setState({"destinationAddress": e.target.getAttribute("data-value")})
  }
  pay(e) {
    e.preventDefault()
    let sourceKeyPair = Keypair.fromSeed(this.state.seed);
    let source = new Account(sourceKeyPair.address(), this.state.sequence);
    let address = React.findDOMNode(this.refs.address).value.trim()
    let amount = React.findDOMNode(this.refs.amount).value.trim()
    console.log(amount)
    let destinationKeyPair = Keypair.random();
    let destination = address;
    let asset = Asset.native();
    let signer = Keypair.master();

    let transaction = new TransactionBuilder(
      source
      )
      .addOperation(Operation.payment({
        source: source.address,
        destination: destination,
        asset: asset,
        amount: amount
      }))
    .addSigner(sourceKeyPair)
    .build();
    let base64 = btoa(String.fromCharCode.apply(null,transaction.toEnvelope().toXDR()))
    console.log(base64)
    $.ajax({
      url: "https://horizon-testnet.stellar.org/transactions?tx="+encodeURIComponent(base64),
      method: "POST",
      success: function(data) {setTimeout(function(){location.reload()}, 5000)},
      error: function(data) {console.log(data)}
    })
  }

  handleDestinationAddressChange(event) {
    this.setState({message: event.target.value});
  }
  render() {
    let sourceKeyPair = Keypair.fromSeed(this.state.seed);
    let source = new Account(sourceKeyPair.address(), 1);

    return (
      <div>
      <h1>Balance</h1>
      <p>{parseFloat(this.state.balance).toFixed(2)}</p>
      <button onClick={this.fundAccount.bind(this)}>Fund Account with Friendbot</button>
      <h1>Pay to</h1>
      <form>
        <label>Address:</label><input type="text" ref="address" defaultValue={this.state.destinationAddress} /><br />
        <label>Amount:</label><input type="text" ref="amount" defaultValue="1" /><br />
        <button onClick={this.pay.bind(this)}>Pay</button>
      </form>
      </div>
    );
  }
}
