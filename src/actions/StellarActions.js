import alt from '../alt';
import StellarSource from '../sources/StellarSource'
class StellarActions {

  constructor() {
    this.generateActions(
      "createAddress",
      "updateAccounts",
    );
  }
  fundAccount(address) {
    StellarSource.fundAccount(address)
  }
  fetchAccounts() {
    StellarSource
      .fetchAccounts()
      .then(this.actions.updateAccounts);
  }
}
export default alt.createActions(StellarActions)
