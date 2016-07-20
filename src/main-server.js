/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { initHooks } from './server/hooks';
import { initTrackedUsers } from './server/trackedUsers';
import './server/publications';

Meteor.startup(() => {
  initHooks();
  initTrackedUsers();
});
