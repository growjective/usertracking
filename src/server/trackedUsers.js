 /* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import _ from 'lodash';
import { Random } from 'meteor/random';
import getRemoteUrl from '../lib/getRemoteUrl';
import userObjTransform from '../lib/userObjTransform';

const remoteUrl = getRemoteUrl('trackedUsers');

const uploadUserData = (appKey) => {
  const rawUsers = Meteor.users.find().fetch();
  const users = userObjTransform(rawUsers);
  const payload = {
    data: JSON.stringify(users),
    appKey,
  };
  const url = remoteUrl;
  HTTP.post(url, { data: payload }, (error) => {
    // eslint-disable-next-line no-console
    if (error) console.error('error', error);
  });
};

export function initTrackedUsers() {
  const appKey = _.has(Meteor, 'settings.public.growjective.appKey') ?
    Meteor.settings.public.growjective.appKey : null;

  const forceUpdate = _.has(Meteor, 'settings.public.growjective.forceUpdate') ?
    Meteor.settings.public.growjective.forceUpdate : null;

  if (appKey) {
    // GET request to check if this app has been initialized
    const url = `${remoteUrl}/${Random.hexString(32)}/${appKey}`;
    HTTP.get(url, (err, res) => {
      if (err) {
        console.log(err); // eslint-disable no-console
        return;
      }
      const notInitialized = res.data === 0;
      if (notInitialized || forceUpdate) uploadUserData(appKey);
    });
  } else {
    /* eslint-disable no-console */
    console.log('Growjective cannot find your application key in the settings.json file');
    console.log('Please obtain the key from our website and execute your Meteor app by using:');
    console.log('meteor --settings settings.json');
    /* eslint-enable */
  }
}
