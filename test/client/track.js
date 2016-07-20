/* eslint-disable import/no-unresolved, no-undef, prefer-arrow-callback, func-names */
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { trackEvent } from '../../src/client/track';
import { devUrl, prodUrl } from '../../src/lib/track';

const { assert } = chai;
let xhr;
let requests;

const event = 'TEST';
const data = { thing: 1 };
const user = { _id: 'fakeUserId', email: null };

describe('track', function () {
  before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  after(function () {
    xhr.restore();
  });

  beforeEach(function () {
    requests = [];
  });

  it('makes a single POST request', function () {
    trackEvent(event, data, user);

    assert.equal(requests.length, 1);
    assert.equal(requests[0].method, 'POST');
  });

  it(`sends POST request to ${devUrl} if package run on localhost`, function () {
    trackEvent(event, data, user);
    assert.equal(requests[0].url, devUrl);
  });

  it(`sends POST request to ${prodUrl} if package not run on localhost`, function () {
    const absUrl = sinon.stub(Meteor, 'absoluteUrl');
    absUrl.returns('http://myawesomewebsite.com/');

    trackEvent(event, data, user);
    assert.equal(requests[0].url, prodUrl);

    Meteor.absoluteUrl.restore();
  });

  describe('form of data', function () {
    it('sends event data in proper form when data and user are objects', function () {
      trackEvent(event, data, user);

      const request = requests[0];
      const requestBody = JSON.parse(request.requestBody);

      assert.lengthOf(Object.keys(requestBody), 4);
      assert.property(requestBody, 'event');
      assert.property(requestBody, 'data');
      assert.property(requestBody, 'user');
      assert.property(requestBody, 'appKey');

      assert.typeOf(requestBody.event, 'string');
      assert.typeOf(requestBody.data, 'object');
      assert.typeOf(requestBody.user, 'object');
      assert.typeOf(requestBody.appKey, 'string');

      trackEvent(event, data, user);
    });

    it('sends event data in proper form when data is null and user is object', function () {
      trackEvent(event, null, user);

      const request = requests[0];
      const requestBody = JSON.parse(request.requestBody);

      assert.lengthOf(Object.keys(requestBody), 4);
      assert.property(requestBody, 'event');
      assert.property(requestBody, 'data');
      assert.property(requestBody, 'user');
      assert.property(requestBody, 'appKey');

      assert.typeOf(requestBody.event, 'string');
      assert.typeOf(requestBody.data, 'null');
      assert.typeOf(requestBody.user, 'object');
      assert.typeOf(requestBody.appKey, 'string');

      trackEvent(event, data, user);
    });

    it('sends event data in proper form when data is object and user is null', function () {
      trackEvent(event, data, null);

      const request = requests[0];
      const requestBody = JSON.parse(request.requestBody);

      assert.lengthOf(Object.keys(requestBody), 4);
      assert.property(requestBody, 'event');
      assert.property(requestBody, 'data');
      assert.property(requestBody, 'user');
      assert.property(requestBody, 'appKey');

      assert.typeOf(requestBody.event, 'string');
      assert.typeOf(requestBody.data, 'object');
      assert.typeOf(requestBody.user, 'null');
      assert.typeOf(requestBody.appKey, 'string');

      trackEvent(event, data, user);
    });
  });
});
