
import * as path from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { homedir } from 'os'

import execa from 'execa'
import tempy from 'tempy'
import { merge } from 'lodash-es'
import vue from '@vitejs/plugin-vue'
import mkdirp from 'mkdirp'


let https, certGenerated


export default function (userConfig) {
  if (!certGenerated) {
    certGenerated = true

    let config = path.join(homedir(), '.config', 'vite-config', 'certs.json')
    if (existsSync(config)) {
      https = JSON.parse(readFileSync(config, 'utf-8'))
    }

    let tmpcert = tempy.file()
    let tmpkey = tempy.file()
    execa.sync('mkcert', ['-cert-file', tmpcert, '-key-file', tmpkey, 'localhost'])

    let cert = readFileSync(tmpcert, 'utf-8')
    let key = readFileSync(tmpkey, 'utf-8')
    https = { key, cert }

    mkdirp.sync(path.dirname(config))
    writeFileSync(config, JSON.stringify(https), 'utf-8')
  }

  // Find common dependencies between the app and its local libraries
  // to dedupe them everywhere.
  let dedupe = []
  let pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
  for (let name in pkg.dependencies) {
    if (!pkg.dependencies[name].startsWith('workspace:')) {
      continue
    }

    let resolved = require.resolve(`${name}/package.json`, {
      paths: [process.cwd()],
    })
    let external = JSON.parse(readFileSync(resolved, 'utf-8'))
    for (let externalName in external.dependencies) {
      if (pkg.dependencies[externalName] && !dedupe.includes(externalName)) {
        dedupe.push(externalName)
      }
    }
  }

  return merge({
    resolve: {
      dedupe,
      alias: {
        '/platform': path.resolve(process.cwd(), 'src', 'platform'),
        '/components': path.resolve(process.cwd(), 'src', 'components'),
        '/images': path.resolve(process.cwd(), 'src', 'images'),
      },
    },
    plugins: [
      vue(),
    ],
    server: {
      https,
    },
  }, userConfig)
}
