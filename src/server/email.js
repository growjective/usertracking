/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { extractEmail } from '../lib/user';

export const getAllEmails = function () {
  const options = {
    fields: {
      emails: 1,
      'services.facebook.email': 1,
      'services.google.email': 1,
      'services.github.email': 1,
    },
  };

  const users = Meteor.users.find({}, options).fetch();
  return users.map(user => extractEmail(user))
    .filter(email => email !== null);
};
