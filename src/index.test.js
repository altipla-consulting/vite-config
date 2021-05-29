
import test from 'ava'

import extendConfig from './index.js'


test('generate cert', t => {
  let config = extendConfig()
  t.truthy(config.server.https.key)
  t.truthy(config.server.https.cert)
})
