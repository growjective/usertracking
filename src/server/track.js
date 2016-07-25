/* eslint-disable import/no-unresolved, no-console */
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import getRemoteUrl from '../lib/getRemoteUrl';

const remoteUrl = getRemoteUrl('events');

export function trackEvent(event, data, user) {
  const appKey = _.has(Meteor, 'settings.public.growjective.appKey') ?
    Meteor.settings.public.growjective.appKey : null;
  if (!appKey) throw new Meteor.Error('No Growjective app key found in Meteor.settings.');

  const withAppKey = Object.assign({ appKey }, { event, data, user });

  HTTP.post(remoteUrl, { data: withAppKey }, (err, res) => {
    if (err) console.log('err', err);
    else console.log('res', res);
  });
}
