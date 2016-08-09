import store from 'store2';

export function initSession() {
  if(!store.has('user')) {
    store.set('user', '1234567890111');
  }
  console.log('getting a user');
  console.log(store.get('user'));
  return store.get('user');
}

export function getUserHex() {
  if(!store.has('user')) {
    store.set('user', '12345678901234567890');
  }
  console.log('getting a user');
  console.log(store.get('user'));
  return store.get('user');
}
