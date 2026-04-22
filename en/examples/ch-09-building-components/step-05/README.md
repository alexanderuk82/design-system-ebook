# example_09_05

**Chapter 9: Building components** · step 05

Card with a compositional API. No `title`, `subtitle`, `image`, `actions` props. Just a Root and subcomponents (`Card.Image`, `Card.Header`, `Card.Title`, `Card.Subtitle`, `Card.Body`, `Card.Footer`) that the consumer combines as they need. Composition beats configuration.

## How to run it

Open `index.html`. React UMD from unpkg, Babel standalone compiles the TSX in the browser. No npm install.

## The compositional trick

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

`Object.assign` adds static properties to the Root component. The consumer writes `<Card.Image>`, `<Card.Header>`, etc. Same pattern Radix uses internally, and many other systems (Mantine, Headless UI).

The consumer signature ends up like this:

```tsx
<Card>
  <Card.Image src="/cover.jpg" alt="Cover" />
  <Card.Header>
    <Card.Title>API design</Card.Title>
    <Card.Subtitle>Chapter 8</Card.Subtitle>
  </Card.Header>
  <Card.Body>Learn to avoid Buttons with 17 props.</Card.Body>
  <Card.Footer>
    <Button variant="primary">Read</Button>
  </Card.Footer>
</Card>
```

## Why composition and not configuration

The "props" version looks tempting at first:

```tsx
<Card title="..." subtitle="..." image="..." actions={[<Button/>]} />
```

It saves you three lines of code when you write it. It costs you three weeks of refactor the day the first case outside the mould lands: two images, footer split into two columns, custom section between body and footer. The compositional API absorbs those without touching the component.

The chapter rule: if the component represents a flexible layout, give it composition. If it represents a closed decision (a Button with its variants), give it configuration.

## Things worth tweaking

Look at the three Cards in the demo. Each one omits or reorders subcomponents. The first has everything. The second has no Image, no Subtitle. The third puts Body right after Image with no Header. The layout reflows on its own because each subcomponent is optional and the Root's flex column absorbs the gaps.

Add `<Card.Footer>` before the `<Card.Header>` (inverse of the classic order). It works, because CSS imposes no DOM order. Design and code share the same mental model here.

Create a `Card.Tag` (category badge) by extending the `Object.assign`. Just add the subcomponent, decorate it in CSS, expose it. The existing Card stays put.

## Back to the book

- Source text: `ENG/03-components/ch-09-building-components.md`, section "Molecule 2, Compositional Card"
- Where composition vs configuration is contrasted: chapter 8 (API design)

## Licence

MIT. See [LICENSE](../../../../LICENSE) at the repo root.
