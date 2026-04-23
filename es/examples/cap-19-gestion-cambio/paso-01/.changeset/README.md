# Changesets

Carpeta oficial de [changesets](https://github.com/changesets/changesets) donde
cada PR deja un archivo markdown describiendo el cambio que introduce.

Para añadir un nuevo changeset desde la raíz de este ejemplo:

```bash
npm run changeset
```

El CLI pregunta qué packages cambian, de qué tipo es cada uno (major/minor/patch)
y un resumen del cambio. Genera un archivo en esta carpeta con un nombre
aleatorio.
