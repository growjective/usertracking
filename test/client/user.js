/* eslint-disable import/no-unresolved, no-undef, prefer-arrow-callback, func-names */

// import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

// const { assert } = chai;
let xhr;
let requests;

// const event = 'TEST';
// const data = { thing: 1 };
// const user = { _id: 'fakeUserId', email: null };

describe('user', function () {
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

  it('tracks logins with proper user info');
  it('tracks logouts with proper user info');
  it('creates a client side collection');
  it('tracks account creation');
});
