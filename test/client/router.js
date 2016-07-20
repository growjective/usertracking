/* eslint-disable import/no-unresolved, no-undef, prefer-arrow-callback, func-names */
import { sinon } from 'meteor/practicalmeteor:sinon';

let xhr;
let requests;

describe('router', function () {
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

  it('tracks arrival to page');
  it('tracks page change');
  it('tracks closing tab');
  it('tracks page refresh');
});
