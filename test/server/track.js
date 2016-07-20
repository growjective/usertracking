/* eslint-disable import/no-unresolved, no-undef, prefer-arrow-callback, func-names */
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { trackEvent } from '../../src/server/track';
import { devUrl, prodUrl } from '../../src/lib/track';
import { HTTP } from 'meteor/http';

const { assert } = chai;

let post;

const event = 'TEST';
const data = { thing: 1 };
const user = { _id: 'fakeUserId', email: null };

describe('track', function () {
  before(function () {
    post = sinon.stub(HTTP, 'post');
  });

  after(function () {
    post.restore();
  });

  beforeEach(function () {
    post.reset();
  });

  it('makes a single POST request', function () {
    trackEvent(event, data, user);
    assert(post.calledOnce, true);
  });

  it(`sends POST request to ${devUrl} if package run on localhost`, function () {
    trackEvent(event, data, user);
    const url = post.args[0][0];
    assert(url, devUrl);
  });

  it(`sends POST request to ${prodUrl} if package not run on localhost`, function () {
    const absUrl = sinon.stub(Meteor, 'absoluteUrl');
    absUrl.returns('http://myawesomewebsite.com/');

    trackEvent(event, data, user);
    const url = post.args[0][0];
    assert(url, prodUrl);

    Meteor.absoluteUrl.restore();
  });

  describe('form of data', function () {
    it('sends event data in proper form when data and user are objects', function () {
      trackEvent(event, data, user);

      const callOptions = post.args[0][1];
      assert.property(callOptions, 'data');

      const postedData = callOptions.data;
      assert.lengthOf(Object.keys(postedData), 4);
      assert.property(postedData, 'event');
      assert.property(postedData, 'data');
      assert.property(postedData, 'user');
      assert.property(postedData, 'appKey');

      assert.typeOf(postedData.event, 'string');
      assert.typeOf(postedData.data, 'object');
      assert.typeOf(postedData.user, 'object');
      assert.typeOf(postedData.appKey, 'string');
    });

    it('sends event data in proper form when data is null and user is object', function () {
      trackEvent(event, null, user);

      const callOptions = post.args[0][1];
      assert.property(callOptions, 'data');

      const postedData = callOptions.data;
      assert.lengthOf(Object.keys(postedData), 4);
      assert.property(postedData, 'event');
      assert.property(postedData, 'data');
      assert.property(postedData, 'user');
      assert.property(postedData, 'appKey');

      assert.typeOf(postedData.event, 'string');
      assert.typeOf(postedData.data, 'null');
      assert.typeOf(postedData.user, 'object');
      assert.typeOf(postedData.appKey, 'string');
    });

    it('sends event data in proper form when data is object and user is null', function () {
      trackEvent(event, data, null);

      const callOptions = post.args[0][1];
      assert.property(callOptions, 'data');

      const postedData = callOptions.data;
      assert.lengthOf(Object.keys(postedData), 4);
      assert.property(postedData, 'event');
      assert.property(postedData, 'data');
      assert.property(postedData, 'user');
      assert.property(postedData, 'appKey');

      assert.typeOf(postedData.event, 'string');
      assert.typeOf(postedData.data, 'object');
      assert.typeOf(postedData.user, 'null');
      assert.typeOf(postedData.appKey, 'string');
    });
  });
});
