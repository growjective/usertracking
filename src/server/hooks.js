/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import _ from 'lodash';
import { Mongo } from 'meteor/mongo';
import transform from '../lib/userObjTransform';
import getRemoteUrl from '../lib/getRemoteUrl';

const remoteUrl = getRemoteUrl('trackedUsers');
const appKey = _.has(Meteor, 'settings.public.growjective.appKey') ?
  Meteor.settings.public.growjective.appKey : null;

export function initHooks() {
  Mongo.Collection.get('users').after.insert((userId, doc) => {
    const users = transform([doc]);
    const payload = {
      data: JSON.stringify(users),
      appKey,
    };

    console.log('users after insert', users);

    HTTP.post(remoteUrl, { data: payload }, (error) => {
      // eslint-disable-next-line no-console
      if (error) console.error('error', error);
    });
  });

  const collections = Mongo.Collection.getAll();
  collections.forEach(collection => {
    if (collection.name !== 'users') {
      collection.instance.after.insert((userId, doc) => {
        const data = {
          collectionName: collection.name,
          docId: doc._id,
          userId: doc.userId,
          createdAt: new Date(),
        };

        const payload = {
          data: JSON.stringify(data),
          appKey,
        };
        console.log(payload);
      });
    }

    console.log(collection.name);
  });
}
