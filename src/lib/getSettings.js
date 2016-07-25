/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

export default function () {
  const appKey = _.has(Meteor, 'settings.public.growjective.appKey') ?
    Meteor.settings.public.growjective.appKey : null;
  const flag = _.has(Meteor, 'settings.public.growjective.flag') &&
    (Meteor.settings.public.growjective.flag === 'test' ||
    Meteor.settings.public.growjective.flag === 'test') ?
    Meteor.settings.public.growjective.flag : null;

  return { appKey, flag };
}
