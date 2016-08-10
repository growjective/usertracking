/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { trackLogins } from './client/user';
import { initFlowRouter } from './client/router';
import { initTrackAlive } from './client/poll';
import { initSession } from './client/session';

Meteor.startup(() => {
  if (Package['accounts-base']) { // eslint-disable-line no-undef
    Tracker.autorun(trackLogins);
  }
  initSession();
  initTrackAlive();
  initFlowRouter();
});
