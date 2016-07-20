/* eslint-disable no-underscore-dangle */
import { trackEvent } from './track';
import { user } from './user';

/* eslint-disable no-undef */
const _FlowRouter = (Package['kadira:flow-router'] && Package['kadira:flow-router'].FlowRouter) ||
  (Package['meteorhacks:flow-router'] && Package['meteorhacks:flow-router'].FlowRouter) ||
  (Package['kadira:flow-router-ssr'] && Package['kadira:flow-router-ssr'].FlowRouter) ||
  (Package['meteorhacks:flow-router-ssr'] && Package['meteorhacks:flow-router-ssr'].FlowRouter);
/* eslint-enable */

export function makePage(context) {
  const page = {};

  page.path = context.path ? context.path : undefined;
  page.title = context.context && context.context.title ? context.context.title : undefined;
  page.url = window.location.origin + page.path;
  page.name = context.route && context.route.name ? context.route.name : page.path;
  page.search = context.context && context.context.querystring ?
    `? ${context.context.querystring}` : '';
  page.referrer = _FlowRouter.lastRoutePath ?
    window.location.origin + _FlowRouter.lastRoutePath : document.referrer;

  return page;
}

export function initFlowRouter() {
  if (_FlowRouter) {
    // Track initial page load
    const context = _FlowRouter.current();
    const page = makePage(context);
    trackEvent('URL_CHANGE', page, user);

    // something context & context.context don't exist, see: #93
    // Track page changes
    _FlowRouter.triggers.enter([ctx => {
      const page = makePage(ctx); // eslint-disable-line no-shadow
      _FlowRouter.lastRoutePath = page.path;

      trackEvent('URL_CHANGE', page, user);
    }]);
  }
}

export function handleBeforeUnload() {
  trackEvent('LEAVE_SITE', null, user);
}

export const flowRouter = _FlowRouter;
