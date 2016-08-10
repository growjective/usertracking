/* eslint-disable no-undef */
Package.describe({
  name: 'growjective:usertracking',
  version: '0.0.4',
  summary: 'URL and collection hooks for Growjective',
  documentation: 'README.md',
  git: 'https://github.com/growjective/usertracking',
});

Npm.depends({
  'ifvisible.js': '1.0.6',
  lodash: '4.13.1',
  store2: '2.3.2',
});

const meteorPackagesUsed = [
  'ecmascript',
  'jquery',
  'mongo',
  'http',
  'dburles:mongo-collection-instances@0.3.5',
  'matb33:collection-hooks@0.8.1',
];

Package.onUse(function (api) {  // eslint-disable-line func-names, prefer-arrow-callback
  api.versionsFrom('1.2');
  api.use(meteorPackagesUsed);

  // weak dependencies indicate we will load after the following packages
  // and constrain their versions IF another package, or app brings them in
  // api.use('iron:router@1.0.7', 'client', {weak: true});
  api.use('accounts-base', ['client', 'server'], { weak: true });
  api.use('browser-policy-content', 'server', { weak: true });

  api.use([
    'meteorhacks:flow-router@1.17.2',
    'kadira:flow-router@2.6.0',
  ], 'client', { weak: true });

  // https://forums.meteor.com/t/api-mainmodule-or-api-addfile/22034/4
  // api.mainModule('lib/main-client.js', 'client');
  // api.mainModule('lib/main-server.js', 'server');

  api.addFiles([
    'src/main-client.js',
  ], 'client');

  api.addFiles([
    'src/main-server.js',
  ], 'server');
});

Package.onTest(function (api) { // eslint-disable-line func-names, prefer-arrow-callback
  // api.use('branch8:orion');

  api.versionsFrom('1.2');
  api.use(meteorPackagesUsed);

  // weak dependencies indicate we will load after the following packages
  // and constrain their versions IF another package, or app brings them in
  // api.use('iron:router@1.0.7', 'client', {weak: true});
  api.use('accounts-base', ['client', 'server'], { weak: true });
  api.use('browser-policy-content', 'server', { weak: true });

  api.use([
    'meteorhacks:flow-router@1.17.2',
    'kadira:flow-router@2.6.0',
  ], 'client', { weak: true });

  api.use([
    'practicalmeteor:mocha',
  ], ['client', 'server']);

  api.addFiles([
    'test/client/user.js',
    'test/client/router.js',
    'test/client/track.js',
  ], 'client');

  api.addFiles([
    'test/server/track.js',
  ], 'server');
});
