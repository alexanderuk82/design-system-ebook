# ejemplo_14_05

**Capítulo 14: Codebase setup** · paso 05 · `.prettierrc`

Configuración de Prettier compartida. Cinco líneas que evitan debates eternos
de estilo en code review.

## Archivo

Vive en `paso-01/.prettierrc` dentro del monorepo real:

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

## Por qué importa

Prettier resuelve formato a nivel mecánico, no a nivel humano. Cero
discusiones en PR sobre comillas o ancho de línea. El formateador elige por
ti y todo el equipo respeta lo mismo.

`printWidth: 80` es deliberado. Coincide con lo que Kindle reflowable tolera
bien para bloques de código (ver Cap 2 sobre ebook reflow). Si algún snippet
del DS termina publicado en docs o en este libro, no rompe el wrapping.

`trailingComma: "es5"` añade comas finales en arrays y objetos pero no en
firmas de función (donde no son legales en `es5`). Reduce ruido en diffs:
añadir un elemento al final de un array no toca la línea anterior.

## Cómo se aplica

```bash
cd ../paso-01
pnpm format     # corre prettier --write sobre todo el repo
```

Idealmente con un pre-commit hook (Husky + lint-staged) que solo formatee
los archivos staged. Eso queda fuera del scope del Cap 14, pero es el
siguiente paso natural.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-14-codebase-setup.md`, sección "ESLint y Prettier"
- Monorepo completo: `paso-01/`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
