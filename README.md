<p align="center">
  <img alt="OS.js Logo" src="https://raw.githubusercontent.com/os-js/gfx/master/logo-big.png" />
</p>

[OS.js](https://www.os-js.org/) is an [open-source](https://raw.githubusercontent.com/os-js/OS.js/master/LICENSE) desktop implementation for your browser with a fully-fledged window manager, Application APIs, GUI toolkits and filesystem abstraction.

[![Support](https://img.shields.io/badge/patreon-support-orange.svg)](https://www.patreon.com/user?u=2978551&ty=h&u=2978551)
[![Back](https://opencollective.com/osjs/tiers/backer/badge.svg?label=backer&color=brightgreen)](https://opencollective.com/osjs)
[![Sponsor](https://opencollective.com/osjs/tiers/sponsor/badge.svg?label=sponsor&color=brightgreen)](https://opencollective.com/osjs)
[![Donate](https://img.shields.io/badge/liberapay-donate-yellowgreen.svg)](https://liberapay.com/os-js/)
[![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/andersevenrud)
[![Community](https://img.shields.io/badge/join-community-green.svg)](https://community.os-js.org/)

# OS.js v3 Database Settings Storage Adapter

This is the Database Settings Storage Adapter for OS.js v3. Built on [TypeORM](http://typeorm.io/).

To set this up, you need to do the following steps:

1. Set up your database
2. Install
3. Configure Server
4. Configure Client

Please see the [OS.js Settings Guide](https://manual.os-js.org/v3/guide/settings/) for general information.

## Set up your database

Before you begin you need to chose a database and set this up on your host system.

This documentation uses `mysql` by default, but you can use any SQL flavor that TypeORM supports.

The database and credentials you set up in this step has to be reflected in the configuration below.

Assuming you have installed mysql (refer to you operating system documentation) and logged into the server:

```bash
# Create a new database called "osjsv3"
mysql> CREATE DATABASE osjsv3;

# Creates a new used called "osjsv3" with password "secret"
mysql> CREATE USER 'osjsv3'@'localhost' IDENTIFIED BY 'secret';

# Give permission for the user to access the database
mysql> GRANT ALL ON osjsv3.* TO 'osjsv3'@'localhost';
```

> *Note that the mysql users are not related to OS.js users.*

<!-- -->

> If you've already installed `@osjs/database-auth` module you can skip this step and use the same database and credentials.

## Installation

Install the required OS.js module and database driver:

```bash
npm install --save --production @osjs/database-settings
npm install --save mysql
```

### Configure Server

To connect the server with the database settings module, you'll have to modify your Server bootstrap script.

In your **`src/server/index.js`** file:

```javascript
// In the top of the file load the library
const dbStorage = require('@osjs/database-settings');

// Locate this line in the file and add the following:
osjs.register(SettingsServiceProvider, {
  args: {
    adapter: dbStorage,
    config: {
      connection: {
        type: 'mysql',
        host: 'localhost',
        username: 'osjsv3',
        password: 'secret',
        database: 'osjsv3',

        // See TypeORM documentation for more settings
      }
    }
  }
});
```

> **NOTE:** You have to restart the server after making these changes.

### Configure Client

You also need to set up your client to send the settings to the server.

In your **`src/client/index.js`** file:

```javascript
// Locate this line in the file and add the following:
osjs.register(SettingsServiceProvider, {
  args: {
    adapter: 'server'
  }
});
```

> **NOTE:** You have to rebuild using `npm run build` after making these changes.

## Contribution

* **Become a [Patreon](https://www.patreon.com/user?u=2978551&ty=h&u=2978551)**
* **Support on [Open Collective](https://opencollective.com/osjs)**
* [Contribution Guide](https://github.com/os-js/OS.js/blob/v3/CONTRIBUTING.md)

## Documentation

See the [Official Manuals](https://manual.os-js.org/v3/) for articles, tutorials and guides.

## Links

* [Official Chat](https://gitter.im/os-js/OS.js)
* [Community Forums and Announcements](https://community.os-js.org/)
* [Homepage](https://os-js.org/)
* [Twitter](https://twitter.com/osjsorg) ([author](https://twitter.com/andersevenrud))
* [Google+](https://plus.google.com/b/113399210633478618934/113399210633478618934)
* [Facebook](https://www.facebook.com/os.js.org)
* [Docker Hub](https://hub.docker.com/u/osjs/)
