
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
import { extendConfig } from '@altipla/vite-config'


export default extendConfig()
```


## Library mode

To build libraries configure the special mode:

```js
import { extendLibConfig } from '@altipla/vite-config'


export default extendLibConfig()
```

The default configuration builds a ES module. If you want to customize the outputs to emit the IIFE format for example extend the configuration with a name too:

```js
import { extendLibConfig } from '@altipla/vite-config'


export default extendLibConfig({
  build: {
    lib: {
      name: 'example',
      formats: ['es', 'iife'],
    },
  },
})
```

Use this library mode with a new `npm run lib` command in the `package.json` scripts section:

```json
{
  "scripts": {
    "start": "vite",
    "build": "echo VITE_VERSION=$BUILD_ID > .env.production && NODE_ENV=production vite build && rm .env.production",
    "lib": "echo VITE_VERSION=$BUILD_ID > .env.lib && NODE_ENV=production vite build --mode lib && rm .env.lib"
  }
}
```
