import store from 'store2';
import { Random } from 'meteor/random';

export function getUserHex() {
  if (!store.has('user')) {
    store.set('user', Random.hexString(32));
  }
  console.log(store.get('user'));
  return store.get('user');
}

export function initSession() {
  return getUserHex();
}
