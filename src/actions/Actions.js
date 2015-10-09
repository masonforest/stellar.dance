import { Dispatcher } from 'flux';
import keyMirror from 'keymirror';
import { createStore } from 'redux';
import {
    Keypair,
    } from 'stellar-base';
import {
  EventEmitter
} from 'events';


function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

let store = createStore(counter);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch({ type: 'INCREMENT' });
