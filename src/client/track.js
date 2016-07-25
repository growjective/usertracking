/* eslint-disable import/no-unresolved */
import { $ } from 'meteor/jquery';
import getRemoteUrl from '../lib/getRemoteUrl';
import getSettings from '../lib/getSettings';

const remoteUrl = getRemoteUrl('events');

export function sendData(data) {
  const { appKey, flag } = getSettings();

  if (appKey && flag) {
    const payload = Object.assign(data, { appKey, flag });

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
    userId: user ? user._id : null,
  };

  sendData(eventData);
}
