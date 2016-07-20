function getServices(user) {
  const allServices = user.services || {};
  const accts = ['facebook', 'twitter', 'github', 'google', 'meetup', 'meteor-developer'];
  return accts.reduce((prev, curr) => {
    if (allServices[curr]) {
      const newObj = Object.assign(allServices[curr], {
        service: curr,
        accessToken: null,
        expiresAt: null,
      });
      return prev.concat(newObj);
    }
    return prev;
  }, []);
}

function getEmails(user) {
  const emails = user.emails || [];
  return emails.map(e => e.address);
}

function getLogins(user) {
  // extract tokens array, save login timestamps only
  let loginTokens = [];
  try {
    loginTokens = user.services.resume.loginTokens;
  } catch (e) {
    loginTokens = [];
  }

  // eslint-disable-next-line no-confusing-arrow
  return loginTokens.map(login =>
    login.when ? new Date(login.when) : null);
}

export default function (users) {
  return users.map(user => {
    const logins = getLogins(user);
    return {
      logins,                           // [login timestamp]
      lastLoginAt: Math.max(...logins), // latest login timestamp
      services: getServices(user),      // [{service}]
      email: getEmails(user),           // [email]
      profile: user.profile || {},
      username: user.username || '',
      userId: user._id || '',
      createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
    };
  });
}

