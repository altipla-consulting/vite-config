
import test from 'ava'

import { extendConfig, extendLibConfig } from './index.js'


test('generate cert', t => {
  let config = extendConfig()
  t.truthy(config.server.https.key)
  t.truthy(config.server.https.cert)
})


test('generate lib config in preview mode', t => {
  let fn = extendLibConfig()
  let config = fn({})
  t.true(config.build.sourcemap)
  t.deepEqual(config.build, {
    sourcemap: true,
  })
})


test('generate lib config in lib mode', t => {
  let fn = extendLibConfig()
  let config = fn({ mode: 'lib' })
  t.true(config.build.sourcemap)
  t.deepEqual(config.build.lib.formats, ['es'])
})


test('generate lib config in preview mode with custom formats', t => {
  let fn = extendLibConfig({
    build: {
      lib: {
        formats: ['iief'],
      },
    },
  })
  let config = fn({})
  t.deepEqual(config.build, {
    sourcemap: true,
  })
})


test('generate lib config in lib mode with custom formats', t => {
  let fn = extendLibConfig({
    build: {
      lib: {
        name: 'example',
        formats: ['iief'],
      },
    },
  })
  let config = fn({ mode: 'lib' })
  t.is(config.build.lib.name, 'example')
  t.deepEqual(config.build.lib.formats, ['iief'])
  t.true(config.build.sourcemap)
})


test('generate lib config with custom build options unrelated to lib', t => {
  let fn = extendLibConfig({
    build: {
      other: 'foo',
    },
  })
  let config = fn({ mode: 'lib' })
  t.deepEqual(config.build.lib.formats, ['es'])
  t.is(config.build.other, 'foo')
  t.true(config.build.sourcemap)
})
