/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import _ from 'lodash';
import getRemoteUrl from '../lib/getRemoteUrl';

const remoteUrl = getRemoteUrl('events');

export function sendData(data) {
  const appKey = _.has(Meteor, 'settings.public.growjective.appKey') ?
    Meteor.settings.public.growjective.appKey : null;

  if (appKey) {
    const payload = Object.assign(data, { appKey });

    $.ajax({
      type: 'POST',
      url: remoteUrl,
      data: JSON.stringify(payload),
      success: () => {},
      dataType: 'json',
      contentType: 'application/json',
    });
  }
}

export function trackEvent(event, data, user) {
  const eventData = {
    event,
    data,
    user,
  };

  sendData(eventData);
  console.log('trackEvent', eventData, user);   // eslint-disable-line no-console
}
