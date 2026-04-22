# ejemplo_10_01

**Capítulo 10: Accesibilidad** · paso 01

Helper reutilizable de a11y testing. Una función pequeña (`expectNoA11yViolations`) que cualquier dev del equipo puede invocar desde su test de cualquier componente. El test base que el capítulo 10 propone como check obligatorio en CI.

```
src/
  a11y-helper.ts        # La funcion. 12 lineas, copiable a cualquier proyecto.
  components.tsx        # Tres componentes de ejemplo: Button, Input, Card.
  components.test.tsx   # Auditoria a11y aplicada a cada uno + meta-test.
  setup.ts              # Extiende matchers con jest-dom.
vitest.config.ts
tsconfig.json
package.json
```

## Cómo correrlo

```bash
cd es/examples/cap-10-accesibilidad/paso-01
npm install
npm test
```

Validado localmente: las 4 pruebas pasan en ~2.5s.

## El helper

```ts
export async function expectNoA11yViolations(jsx: ReactElement) {
  const { container } = render(jsx);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
```

Doce líneas. Copia el archivo a tu proyecto, importa la función desde el test de cualquier componente, listo.

```ts
await expectNoA11yViolations(<Button>Accesible</Button>);
await expectNoA11yViolations(<Input label="Correo" />);
```

La separación entre "helper" y "test específico de componente" tiene un beneficio fundamental: si mañana cambia la API de jest-axe, o quieres añadir reglas extra (por ejemplo cargar reglas experimentales), tocas un archivo. Cien componentes, una sola edición.

## El meta-test, demostración de que el helper funciona

El cuarto test del demo es el meta-test:

```tsx
it("BrokenButton sin label falla con violacion clara", async () => {
  await expect(
    expectNoA11yViolations(<BrokenButton onClick={() => {}} />)
  ).rejects.toThrow();
});
```

`BrokenButton` es un `<button>` sin texto interno y sin `aria-label`. Para un screen reader es indistinguible de cualquier otro botón sin etiquetar. El test verifica que el helper **detecta** el problema (lanza un error). Si en el futuro alguien rompe el helper (típica regresión: el helper no extiende los matchers correctamente y todos los assertions pasan en silencio), este test rojo te avisa.

Es la regla del "test del test": cuando construyes una herramienta de validación, asegúrate de que la herramienta sí detecta lo que tiene que detectar. Si todas tus pruebas siempre pasan, no estás verificando.

## Lo que axe detecta y lo que no

axe-core detecta el 30-50% de problemas reales de accesibilidad según research de Deque. Lo que cubre bien:
- Contraste de color sobre fondo plano
- ARIA atributos mal aplicados
- Form elements sin label
- Headings fuera de orden
- Imágenes sin alt
- Landmarks duplicados sin aria-label
- Roles implícitos rotos por div onClick

Lo que **no** detecta y necesita verificación humana:
- Si la animación causa malestar
- Si el foco se mueve donde el usuario espera
- Si los anuncios dinámicos del screen reader son útiles o ruidosos
- Si la navegación con teclado puro permite completar tareas reales
- Si el contraste sobre imágenes o gradientes es legible

La regla operativa del capítulo: cada componente nuevo del DS pasa por una sesión de quince minutos de validación a11y antes de mergear. Teclado puro primero, screen reader después, axe al final. Si las tres pasan, mergea. Si falla alguna, se itera. Quince minutos por componente nuevo es coste insignificante comparado con el rework cuando llega la auditoría externa.

## Volver al libro

- Texto fuente: `SPA/03-componentes/cap-10-accesibilidad.md`, sección "Mirada de dev"
- Donde se aplica al Button: `cap-09-construyendo-componentes/paso-08`
- Donde se conecta a CI: capítulo 16 (testing) y capítulo 12 (DS Sync)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
