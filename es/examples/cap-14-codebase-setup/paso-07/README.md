# ejemplo_14_07

**Capítulo 14: Codebase setup** · paso 07 · `turbo.json`

Pipeline de tareas de Turborepo. Declara qué tareas existen, sus
dependencias, y qué archivos producen.

## Archivo

Vive en `paso-01/turbo.json` dentro del monorepo real:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

## Por qué importa

Turborepo lee este archivo y entiende el grafo de dependencias del monorepo.

`"dependsOn": ["^build"]` significa "antes de buildear este package, buildea
sus dependencias". Cuando corres `pnpm build` en el root, Turborepo ve que
`@ds/react` depende de `@ds/tokens` (vía `package.json`), y orquesta:

1. `@ds/tokens` se builda primero.
2. `@ds/react` espera y luego builda.

Sin Turborepo tendrías que mantener este orden a mano (o que cada package
sepa rebuildear sus deps), lo cual escala mal a diez packages.

`"outputs": ["dist/**"]` declara qué archivos produce la tarea. Esto activa
el cache de Turborepo: cada build se hashea con el contenido del package +
la config. Si corres `pnpm build` dos veces sin cambiar nada, la segunda
tarda cero segundos porque se sirve del cache.

`"cache": false` en `clean` desactiva el cache para esa tarea concreta. Tiene
sentido porque clean borra archivos, no produce nada que cachear.

En equipos grandes el cache se puede compartir en remote (Turborepo Cloud,
o un bucket S3 propio), con lo que un dev que hace `git pull` no rebuild
nada que otro dev ya buildó. Ahorro de horas semanales.

## En acción

```bash
cd ../paso-01
pnpm build      # primer run, ~5s
pnpm build      # segundo run, ~0s (cache hit)
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-14-codebase-setup.md`, sección "turbo.json, el pipeline de tareas"
- Monorepo completo: `paso-01/`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
