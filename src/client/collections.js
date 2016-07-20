/* eslint-disable import/no-unresolved */
import { Mongo } from 'meteor/mongo';

const AnalyticsUsers = new Mongo.Collection('analyticsusers');  // eslint-disable-line no-undef

export { AnalyticsUsers };
