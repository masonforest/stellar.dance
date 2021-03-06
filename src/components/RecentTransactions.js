import React, { Component } from 'react';
import StellarStore from '../stores/StellarStore.js';
import StellarActions from '../actions/StellarActions.js'
import connectToStores from 'alt/utils/connectToStores';

@connectToStores
class RecentTransactions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StellarActions.fetchAccounts();
  }

  static getStores() {
    return [StellarStore];
  }

  static getPropsFromStores() {
    return StellarStore.getState();
  }

  render() {
    return (
      <div>
        <h1>Recently Created Addresses</h1>
        <div>
          {this.props.addresses.map((address) => {
            return <div key={address}>{address}</div>;
          })}
        </div>
      </div>
    );
  }
}

RecentTransactions.defaultProps = {addresses: []}
export default RecentTransactions
