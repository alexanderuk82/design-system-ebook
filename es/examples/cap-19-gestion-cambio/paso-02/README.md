# ejemplo_19_02

**Capítulo 19: Gestión de cambio** · paso 02 (codemod jscodeshift runnable)

Codemod real de 10 líneas que renombra `<Button intent="...">` a
`<Button variant="...">` en cualquier `.tsx`. La idea es que el DS publica
esto con la breaking change del paso-01 y el product dev lo corre una sola
vez para migrar cincuenta usos en segundos.

## Cómo correrlo

```bash
cd es/examples/cap-19-gestion-cambio/paso-02
npm install
npm run codemod:dry     # ver qué haría (no escribe)
npm run codemod          # aplicar cambios
```

El script opera sobre `fixture/App.tsx`. Después de correr `codemod`, ábrelo
y verás que los cuatro `intent=` se convirtieron en `variant=`.

Para volver al estado inicial antes de experimentar de nuevo:

```bash
npm run reset
```

## Qué hace el transform

```js
root
  .findJSXElements('Button')
  .find(j.JSXAttribute, { name: { name: 'intent' } })
  .forEach((path) => {
    path.node.name.name = 'variant';
  });
```

Cuatro líneas. Encuentra cada JSX del Button, localiza la prop llamada
`intent`, y renombra el identificador a `variant`. No toca el valor
(`"primary"`, `{currentIntent}`, etc.), no toca otros elementos que podrían
tener una prop `intent` (porque el selector empieza filtrando por `Button`).

## Qué no hace (a propósito)

La variable local `currentIntent` en el fixture NO se renombra. Es código
del producto, no del contrato del Button. Renombrarla sería sobrepasar la
responsabilidad del codemod. Si el product dev quiere, lo hace a mano o
escribe su propio codemod encadenado.

Para el lector que venga del libro: esto es parte del contrato de un
codemod bueno. Cubres el breaking change específico, no aprovechas para
"limpiar" el código del consumidor. Esa humildad de alcance es lo que hace
que product devs confíen en correr codemods automáticamente.

## Cómo publicarlo de verdad

En un DS real el flujo es:

1. **Codemod vive en el monorepo del DS**
   (`packages/codemods/button-variant.js`).
2. **Publicado como `@ds/codemods` en npm.**
3. **Product dev corre** `npx @ds/codemods button-variant ./src` en su
   repo.
4. **Revisa el diff, corre los tests, commitea.**

El atajo `npx @ds/codemods button-variant` es lo que hace que sea una
línea de shell en el Slack del team, no un párrafo de README.

## Cosas que vale la pena tocar

- Extiende el transform para buscar `MemberExpression` sobre `props`
  (renombrar `props.intent` dentro de un hipotético `Button.tsx`). Veinte
  minutos de trabajo, otro codemod aparte.
- Aplica el codemod a varios archivos pasando un directorio entero y
  verás cómo jscodeshift reporta "1 ok, 0 nochange, 0 error" por archivo.
- Prueba con `--dry --print` para ver el diff sin escribir nada. Útil en
  CI para detectar si quedan usos pendientes de migrar.

## Volver al libro

- Texto fuente: `SPA/06-governance/cap-19-gestion-cambio.md`, sección
  "Codemods, la herramienta que ahorra horas"
- Cap relacionado: `cap-19-gestion-cambio/paso-01` (changeset que
  introduce esta breaking change)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
