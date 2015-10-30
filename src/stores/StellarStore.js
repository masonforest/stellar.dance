import alt from '../alt';
import StellarActions from '../actions/StellarActions';
import StellarSource from '../sources/StellarSource';

import {
    Account,
    Asset,
    Keypair,
    Operation,
    TransactionBuilder
    } from 'stellar-base';
import {Server} from 'stellar-sdk';
var stellar = new Server({hostname:'horizon-testnet.stellar.org', secure:true, port:443});

class StellarStore {

  constructor() {
    this.bindActions(StellarActions);

  }

  onFundAccount() {
    let source = Keypair.fromSeed(localStorage.seed);
    stellar.friendbot(source.address())
      .call()
      .then((result) => setTimeout(function(){location.reload()}, 4000))
      .catch((err) => console.log(err))
  }

  onCreateAddress() {
    localStorage.seed = this.randomSeed();

    this.setState({
      seed: localStorage.seed
    });
  }

  onUpdateAccounts(accounts) {
    let addresses = accounts.records.map((account) => account.address)
    this.setState({
      "addresses": addresses
    });
  }

  randomSeed() {
    return Keypair.random().seed();
  }
}

export default alt.createStore(StellarStore, 'StellarStore');
StellarActions.createAddress();
