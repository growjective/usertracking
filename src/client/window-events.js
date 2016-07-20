import ifvisible from 'ifvisible.js'; // eslint-disable-line import/no-unresolved
import { trackEvent } from './track';
import { user } from './user';

export default function () {
  ifvisible.on('blur', () => {
    trackEvent('BLUR', null, user);
  });

  ifvisible.on('focus', () => {
    trackEvent('FOCUS', null, user);
  });

  ifvisible.on('idle', () => {
    trackEvent('IDLE', null, user);
  });

  ifvisible.on('wakeup', () => {
    trackEvent('WAKEUP', null, user);
  });
}
