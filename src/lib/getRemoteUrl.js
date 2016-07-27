/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

const devServer = _.has(Meteor, 'settings.public.growjective.devServer') ?
  Meteor.settings.public.growjective.devServer : null;

export const devUrl = devServer ? 'http://localhost:4000/api/' : 'https://www.growjective.com/api/';
export const prodUrl = 'https://www.growjective.com/api/';

export default function getRemoteUrl(route = '') {
  const baseUrl = Meteor.absoluteUrl().search('localhost') > -1 ? devUrl : prodUrl;
  return baseUrl + route;
}
