# Simplest app with arui-scripts

Module federation host app example.

```bash
yarn
yarn start
yarn build
```

Remote app setup:

```ts
// arui-scripts.overrides.js

new ModuleFederationPlugin({
  name: 'remote1',
  filename: 'remoteEntry.js',
  exposes: {
    './Remote': './src/bootstrap',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: packageJsonDeps.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: packageJsonDeps['react-dom'],
    },
  },
});
```

```ts
// bootstrap.tsx
const Root = () => {
  return <App />;
};

export function initialize() {
  // ...
}

export default Root;
```
