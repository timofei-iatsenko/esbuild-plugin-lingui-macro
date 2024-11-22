import path from "node:path";
import fs from "node:fs";
import {
  babelRe,
  getBabelParserOptions,
} from "@lingui/cli/api/extractors/babel";
import { transformAsync } from "@babel/core";
import linguiMacroPlugin, {
  LinguiPluginOpts,
} from "@lingui/babel-plugin-lingui-macro";
import { getConfig, LinguiConfigNormalized } from "@lingui/conf";
import { Plugin } from "esbuild";

export type Options = {
  linguiConfig?: LinguiConfigNormalized;
  babelPluginOptions?: LinguiPluginOpts;
};
export const pluginLinguiMacro = (options: Options = {}): Plugin => ({
  name: "linguiMacro",
  setup(build) {
    const linguiConfig =
      options?.linguiConfig || getConfig({ skipValidation: true });
    build.onLoad({ filter: babelRe, namespace: "" }, async (args) => {
      const filename = path.relative(process.cwd(), args.path);

      const contents = await fs.promises.readFile(args.path, "utf8");

      const hasMacroRe = /from ["']@lingui(\/.+)?\/macro["']/g;

      if (!hasMacroRe.test(contents)) {
        // let esbuild process file as usual
        return undefined;
      }

      const result = await transformAsync(contents, {
        babelrc: false,
        configFile: false,

        filename: filename,

        sourceMaps: "inline",
        parserOpts: {
          plugins: getBabelParserOptions(
            filename,
            linguiConfig.extractorParserOptions,
          ),
        },

        plugins: [
          [
            linguiMacroPlugin,
            {
              ...options.babelPluginOptions,
              linguiConfig,
            } satisfies LinguiPluginOpts,
          ],
        ],
      });

      return { contents: result?.code!, loader: "tsx" };
    });
  },
});
