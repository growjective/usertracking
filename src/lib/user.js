import _ from 'lodash';

export function extractEmail(user) {
  const hasEmail = u => u.emails && u.emails.length > 0 && u.emails[0].address;

  if (hasEmail(user)) return user.emails[0].address;
  else if (_.has(user, 'services.facebook.email')) return user.services.facebook.email;
  else if (_.has(user, 'services.google.email')) return user.services.google.email;
  else if (_.has(user, 'services.github.email')) return user.services.github.email;

  return null;
}
