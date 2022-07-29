/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */

const {EntitySchema, createConnection} = require('typeorm');

class Setting {
  constructor(id, username, settings) {
    this.id = id;
    this.username = username;
    this.settings = settings;
  }
}

const SettingSchema = new EntitySchema({
  name: 'settings',
  target: Setting,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    username: {
      type: 'varchar'
    },
    settings: {
      type: 'text'
    }
  }
});

module.exports = (core, options) => {
  let connection;

  const settings = Object.assign({
    type: 'mysql',
    host: 'localhost',
    username: 'osjsv3',
    password: 'osjsv3',
    database: 'osjsv3',
    synchronize: true,
    entities: [SettingSchema]
  }, options.connection);

  const getSettings = username => connection.getRepository(Setting)
    .findOne({username: username});

  const setSettings = (username, settings) => {
    const r = connection.getRepository(Setting);

    return getSettings(username)
      .then(row => row ? row : {username})
      .then(row => {
        row.settings = JSON.stringify(settings);
        return r.save(row);
      });
  };

  return {
    init: () => createConnection(settings)
      .then(conn => (connection = conn)),

    save: (req, res) => setSettings(req.session.user.username, req.body)
      .then(() => true),

    load: (req, res) => getSettings(req.session.user.username)
      .then(s => s ? JSON.parse(s.settings) : {})
  };
};
