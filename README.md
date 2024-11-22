[![License][badge-license]][license]
[![Version][badge-version]][package]
[![Downloads][badge-downloads]][package]

# esbuild-plugin-lingui-macro

> esbuild plugin to compile [Lingui](https://lingui.dev) macro

## Description

The plugin will add a babel with `@lingui/babel-plugin-lingui-macro` to your esbuild setup.

Plugin will process only files where macro import is found.

If you already have babel or SWC in your esbuild pipeline consider to use `@lingui/babel-plugin-lingui-macro` or `@lingui/swc-plugin` directly.

## Installation

```sh
npm install --save-dev esbuild-plugin-lingui-macro
# yarn add --dev esbuild-plugin-lingui-macro
```

## Usage

```ts
import { pluginLinguiMacro } from "esbuild-plugin-lingui-macro";

await esbuild.build({
  plugins: [pluginLinguiMacro()],
});
```

## License

This package is licensed under [MIT][license] license.

[license]: https://github.com/lingui/js-lingui/blob/main/LICENSE
[linguijs]: https://github.com/lingui/js-lingui
[package]: https://www.npmjs.com/package/timofei-iatsenko/esbuild-plugin-lingui-macro
[badge-downloads]: https://img.shields.io/npm/dw/esbuild-plugin-lingui-macro.svg
[badge-version]: https://img.shields.io/npm/v/timofei-iatsenko/esbuild-plugin-lingui-macro.svg
[badge-license]: https://img.shields.io/npm/l/timofei-iatsenko/esbuild-plugin-lingui-macro.svg
