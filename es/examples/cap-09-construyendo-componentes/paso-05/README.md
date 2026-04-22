# ejemplo_09_05

**Capítulo 9: Construyendo componentes** · paso 05

Card con API compositiva. No tiene props `title`, `subtitle`, `image`, `actions`. Tiene un Root y subcomponentes (`Card.Image`, `Card.Header`, `Card.Title`, `Card.Subtitle`, `Card.Body`, `Card.Footer`) que el consumidor combina como necesita. Composición vence a configuración.

## Cómo correrlo

Abre `index.html`. React UMD desde unpkg, Babel standalone compila el TSX en el navegador. Sin npm install.

## El truco compositivo

```tsx
function CardRoot(props) { return <div className="card" {...props} />; }
function CardImage(props) { return <img className="card-image" {...props} />; }
// ... etc

const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Header: CardHeader,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Body: CardBody,
  Footer: CardFooter,
});
```

`Object.assign` añade propiedades estáticas al componente Root. El consumidor escribe `<Card.Image>`, `<Card.Header>`, etc. Es el mismo patrón que usa Radix internamente, y muchos otros sistemas (Mantine, Headless UI).

La firma del consumidor queda así:

```tsx
<Card>
  <Card.Image src="/cover.jpg" alt="Portada" />
  <Card.Header>
    <Card.Title>Diseno de APIs</Card.Title>
    <Card.Subtitle>Capitulo 8</Card.Subtitle>
  </Card.Header>
  <Card.Body>Aprende a evitar Buttons con 17 props.</Card.Body>
  <Card.Footer>
    <Button variant="primary">Leer</Button>
  </Card.Footer>
</Card>
```

## Por qué composición y no configuración

La versión "props" se ve tentadora al principio:

```tsx
<Card title="..." subtitle="..." image="..." actions={[<Button/>]} />
```

Te ahorra tres líneas de código al escribir. Te cuesta tres semanas de refactor el día que llega el primer caso fuera del molde: dos imágenes, footer dividido en dos columnas, sección custom entre body y footer. La API compositiva absorbe esos casos sin tocar el componente.

La regla del capítulo: si el componente representa un layout flexible, dale composición. Si representa una decisión cerrada (un Button con sus variantes), dale configuración.

## Lo que vale la pena tocar

Mira los tres Cards del demo. Cada uno omite o reordena subcomponentes. El primer Card tiene todo. El segundo no tiene Image ni Subtitle. El tercero pone Body justo después de Image, sin Header. El layout se reorganiza solo porque cada subcomponente es opcional y el flex column del Root absorbe los huecos.

Añade `<Card.Footer>` antes del `<Card.Header>` (orden inverso del clásico). Funciona, porque CSS no impone orden DOM. Diseño y código tienen el mismo modelo mental aquí.

Crea un `Card.Tag` (etiqueta de categoría) extendiendo el `Object.assign`. Solo hay que añadir el subcomponente, decorarlo en CSS, y exponerlo. El Card existente no cambia.

## Volver al libro

- Texto fuente: `SPA/03-componentes/cap-09-construyendo-componentes.md`, sección "Molecule 2, Card compositivo"
- Donde se contrasta composición vs configuración: capítulo 8 (diseño de APIs)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
