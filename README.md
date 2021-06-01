
# vite-config

Configure vite with sane defaults for our projects.


## Install

```sh
npm i @altipla/vite-config
```


## Usage

## Applications

Use the exported function from this package to configure the `vite.config.js` file in your project:

```js
const { extendConfig } = require('@altipla/vite-config')


module.exports = extendConfig()
```


## Library mode

To build libraries configure the special library mode.

```js
const { extendLibConfig } = require('@altipla/vite-config')


module.exports = extendLibConfig()
```

The default configuration builds a ES module. If you want to customize the outputs to emit the IIFE format for example extend the configuration with a name too:

```js
const { extendLibConfig } = require('@altipla/vite-config')


module.exports = extendLibConfig('example', {
  build: {
    lib: {
      name: 'example',
      formats: ['es', 'iife'],
    },
  },
})
```

Use this library mode with a new command in the `package.json` scripts section:

```json
{
  "scripts": {
    "start": "vite",
    "build": "echo VITE_VERSION=$BUILD_ID > .env.production && NODE_ENV=production vite build && rm .env.production",
    "lib": "echo VITE_VERSION=$BUILD_ID > .env.lib && NODE_ENV=production vite build --mode lib && rm .env.lib"
  }
}
```
