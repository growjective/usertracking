/* eslint-disable import/no-unresolved */
import ifvisible from 'ifvisible.js';
import { trackEvent } from './track';
import { user } from './user';
import { flowRouter, makePage } from './router';
import { $ } from 'meteor/jquery';
var currentState = 'ACTIVE'; // eslint-disable-line no-var

function trackAlive() {
  const page = makePage(flowRouter.current());
  page.state = currentState;
  trackEvent('ALIVE', page, user);
  console.log(currentState);
}

ifvisible.setIdleDuration(5);

export function poll() {
  setTimeout(() => {
    if (currentState === 'ACTIVE') {
      trackAlive();
      poll();
    }
  }, 1000);
}

export function initTrackAlive() {
  trackAlive();
  poll();

  ifvisible.on('idle', () => {
    currentState = 'INACTIVE';
    trackAlive();
  });

  ifvisible.on('wakeup', () => {
    currentState = 'ACTIVE';
    trackAlive();
  });

  $(document).ready(() => {
    currentState = 'ACTIVE';
    trackAlive();
  });

  $(window).on('beforeunload', () => {
    currentState = 'INACTIVE';
    trackAlive();
  });
}
