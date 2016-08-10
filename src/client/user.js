/* eslint-disable import/no-unresolved, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { trackEvent } from './track';

let initialized;
let user = null;  // eslint-disable-line import/no-mutable-exports
export function trackLogins() {
  // don't run the first time, but we need to access Meteor.userId()
  // so that it's reactive

  if (Meteor.userId()) {
    user = {
      _id: Meteor.userId(),
    };
  }

  if (initialized) {
    // when Meteor.userId() changes this will run
    if (Meteor.userId()) {
      // TODO I think it's not guaranteed that userEmail has been set because
      // the 'analyticsusers' publication might not be ready yet.
      trackEvent('SIGN_IN', null, user);
    } else {
      trackEvent('SIGN_OUT', null, user);
      user = null;
    }
  }
  initialized = true;
}

export { user };
