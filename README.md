<p align="center">
  <img alt="OS.js Logo" src="https://raw.githubusercontent.com/os-js/gfx/master/logo-big.png" />
</p>

[OS.js](https://www.os-js.org/) is an [open-source](https://raw.githubusercontent.com/os-js/OS.js/master/LICENSE) desktop implementation for your browser with a fully-fledged window manager, Application APIs, GUI toolkits and filesystem abstraction.

[![Community](https://img.shields.io/badge/join-community-green.svg)](https://community.os-js.org/)
[![Donate](https://img.shields.io/badge/liberapay-donate-yellowgreen.svg)](https://liberapay.com/os-js/)
[![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=andersevenrud%40gmail%2ecom&lc=NO&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
[![Support](https://img.shields.io/badge/patreon-support-orange.svg)](https://www.patreon.com/user?u=2978551&ty=h&u=2978551)

# OS.js v3 Database Settings Storage Adapter

This is the Database Settings Storage Adapter for OS.js v3

## Installation

```bash
npm install --save @osjs/database-settings

# You can use any driver you want that knex supports
npm install --save mysql
```

## Usage

Uses http://typeorm.io/

All the `connection` properties below are the TypeORM options.

Please see https://manual.os-js.org/v3/guide/settings/ for settings setup guide.

### Server

In your server bootstrap script (`src/server/index.js`) modify the provider registration:

```javascript
const dbStorage = require('@osjs/database-settings');

core.register(SettingsServiceProvider, {
  args: {
    adapter: dbStorage,
    config: {
      connection: {
        type: 'mysql',
        host: 'localhost',
        username: 'osjsv3',
        password: 'osjsv3',
        database: 'osjsv3',
      }
    }
  }
});
```
