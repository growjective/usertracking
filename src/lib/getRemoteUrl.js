/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';

export const devUrl = 'http://localhost:4000/api/';
export const prodUrl = 'https://www.growjective.com/api/';

export default function getRemoteUrl(route = '') {
  const baseUrl = Meteor.absoluteUrl().search('localhost') > -1 ? devUrl : prodUrl;
  return baseUrl + route;
}
