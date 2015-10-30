import {Server} from 'stellar-sdk';
var stellar = new Server({hostname:'horizon-testnet.stellar.org', secure:true, port:443});

export default class StellarSource {
  static fetchAccounts(){
    return stellar.accounts().order("desc").call()
  }

  static fundAccount(address){
    return stellar.friendbot(address).call()
  }
}
