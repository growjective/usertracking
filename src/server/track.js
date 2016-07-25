/* eslint-disable import/no-unresolved, no-console */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import getRemoteUrl from '../lib/getRemoteUrl';
import getSettings from '../lib/getSettings';

const remoteUrl = getRemoteUrl('events');

export function trackEvent(event, data, user) {
  const { appKey, flag } = getSettings();

  if (!appKey) throw new Meteor.Error('No Growjective app key found in Meteor.settings.');
  if (!flag) {
    throw new Meteor.Error(
      'Flag for Growjective app key was not set properly in Meteor.settings.'
    );
  }

  const withAppKey = Object.assign({ appKey, flag }, { event, data, user });

  HTTP.post(remoteUrl, { data: withAppKey }, (err, res) => {
    if (err) console.log('err', err);
    else console.log('res', res);
  });
}
