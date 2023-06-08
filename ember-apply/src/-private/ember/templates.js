// @ts-check
import recast from 'ember-template-recast';
import fs from 'fs/promises';

/**
 * Transforms an ember-template file using ember-template-recast.
 * The script at the `filePath` is read, transformed via the provided
 * `plugin`, and then written back to the same file.
 *
 * This can be used to help migrate components, remove deprecated features, etc
 *
 *
 * @example
 * transformTemplate takes an [ember-template-recast][recast] [plugin][example-plugin]
 *
 * ```js
 * import { ember } from 'ember-apply';
 *
 * await ember.transformTemplate('path/to/template.hbs', (env) => {
 *   return {
 *     Hash(node) {
 *      // do something with hash nodes
 *     }
 *   }
 * });
 * ```
 *
 * [recast]: https://github.com/ember-template-lint/ember-template-recast
 * [example-plugin]: https://github.com/ember-template-lint/ember-template-recast/blob/eb1e093a68b6013dd0ce1b0d1f2c2a146de9d3da/src/smoke.test.ts#L200
 *
 * @param {string} filePath to the file to transform
 * @param {import('ember-template-recast').TransformPluginBuilder} plugin
 */
export async function transformTemplate(filePath, plugin) {
  let code = (await fs.readFile(filePath)).toString();
  let transformed = recast.transform(code, plugin);

  await fs.writeFile(filePath, transformed.code);
}
