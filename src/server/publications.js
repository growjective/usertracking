/* eslint-disable import/no-unresolved, func-names */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.publish(null, function () {
  if (this.userId) {
    const self = this;
    const query = Meteor.users.find(
      { _id: this.userId },
      { fields: {
        emails: 1,
        'services.facebook.email': 1,
        'services.google.email': 1,
        'services.github.email': 1,
      },
    });

    // eslint-disable-next-line no-underscore-dangle
    Mongo.Collection._publishCursor(query, self, 'analyticsusers');
    return self.ready();
  }
  return this.ready();
});
