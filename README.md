# Simple User Growth Tracking for Meteor
Growjective is a simple zero-config user growth tracking tool for Meteor.

[Go to Growjective.com](https://growjective.com)

## What this package can do

Growjective hooks into your Meteor app's user accounts system so you can track your app's user growth without having to install and configure an admin panel or dig through the database yourself.

- **Zero-Configuration** — 1 minute installation to your existing Meteor app.
- **Goal Tracking** — Set and track a daily target for new user registrations.
- **Growth Monitoring** — See the number of new users on one simple dashboard at [growjective.com](https://growjective.com).
- **Basic User Stats** — Track each user's total active time, date of registration, and last active time.


## Installation
1. Install the Growjective Meteor package.
  ```
  meteor add growjective:usertracking
  ```

2. Add the Growjective key to your `settings.json` file. It is recommended that settings.json for Meteor apps be located in the root of your Meteor project.
  ```
  {
    "public": {
      "growjective": {
        "appKey": "<Your Growjective Key>"
      }    
    }
  }
  ```

3. Run your Meteor app using the settings.json file.
  ```
  meteor --settings settings.json
  ```
