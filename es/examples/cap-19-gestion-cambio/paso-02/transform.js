/**
 * Codemod que renombra la prop `intent` de `Button` a `variant`.
 *
 * Uso:
 *   npx jscodeshift --parser=tsx -t transform.js <path>
 *
 * Cubre tres formas de uso:
 *   <Button intent="primary" />        ← JSX atributo
 *   <Button intent={state.intent} />   ← JSX atributo con expresion
 *   Button intent="..." en TS generics ← no cubierto intencionalmente
 *                                        (prueba cultural: hay un PR review)
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
