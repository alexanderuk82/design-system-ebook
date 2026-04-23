/**
 * Codemod that renames the `intent` prop of `Button` to `variant`.
 *
 * Usage:
 *   npx jscodeshift --parser=tsx -t transform.js <path>
 *
 * Covers three forms of use:
 *   <Button intent="primary" />        ← JSX attribute
 *   <Button intent={state.intent} />   ← JSX attribute with expression
 *   Button intent="..." in TS generics ← deliberately not covered
 *                                        (cultural test: there is a code review)
 */

module.exports = function transform(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root
    .findJSXElements('Button')
    .find(j.JSXAttribute, { name: { name: 'intent' } })
    .forEach((path) => {
      path.node.name.name = 'variant';
    });

  return root.toSource({ quote: 'double' });
};
