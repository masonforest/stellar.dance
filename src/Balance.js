import React, { Component } from 'react';
import {
    Account,
    Asset,
    Keypair,
    Operation,
    TransactionBuilder
    } from 'stellar-base';
import base32 from 'base32.js';

export default class Balance extends React.Component {
  constructor() {
    super();
  }

  render() {
    var destinationKeyPair = Keypair.random();
    var sourceKeyPair = Keypair.random();
    var source = new Account("GAC3ZK463UY2XO2IXZQMJGYMS3JKZ33LX7J7YEWD436JLKE4QVPPGO5G", 0);
    var destination = "GD2ZZE7FGCTNIR4L63TGQ37BMQO3QMAAG7QKBXOON73CA2PHBYL5UCSV"//destinationKeyPair.address();
    // console.log(destinationKeyPair.address())
    var amount = "1000";
    var asset = Asset.native();

    var transaction = new TransactionBuilder(source)
      .addOperation(Operation.payment({
        destination: destination,
        asset: asset,
        amount: amount
      }))
    .build();
    console.log(transaction)
    return (
      <div>
      <h1>Your Address</h1>
      <p>{source.address}</p>
      <button>Regenerate</button>
      <h1>Pay to</h1>
      <form onSubmit={this.pay}>
        <label>Address:</label><input defaultValue={destination} /><br />
        <label>Amount:</label><input /><br />
        <button>Pay</button>
      </form>
      <h1>Balance</h1>
      <p>0</p>
      </div>
    );
  }
}
