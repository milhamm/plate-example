# Plate Exploration Docs

## Concepts

We work with pure JSON objects. All it requires is that those JSON objects conform to certain interfaces.

### Nodes

The most important types are the `Node` objects:

- Container `Element` nodes that have semantic meaning in your domain.
- And leaf-level `Text` nodes which contain the document's text.

```json
[
  // Element Node
  {
    "type": "p",
    "children": [
      // Text Node
      { "text": "A line of text!" }
    ]
  }
]
```

#### `Element`

Elements make up the middle layers of a rich text document. They are the nodes that are custom to your domain. Their interface is:

```ts
interface Element {
  children: Node[];
}
```

We define custom elements which are differentiated by `type` property. For example:

```json
{
  "type": "h1",
  "align": "center",
  "children": [
    {
      "text": "Example Title"
    }
  ]
}
```

#### `Text`

Text nodes are the lowest-level nodes in the tree, containing the text content of the document, along with any formatting. Their interface is:

```ts
interface Text {
  text: string;
}
```

For example, a string of bold text:

```json
{
  "text": "A string of bold text",
  "bold": true
}
```

We can add one or more attributes for formatting such as `italic` and `underline`. These custom attributes are sometimes called _marks_.

```json
{
  "text": "Italic and underlined",
  "italic": true,
  "underline": true
  // More attributes can be added
}
```

All that matters is that **elements always have a `children` property.**

## Element List

### Paragraph `Element`

Basic paragraph block.

- Type: `p`
- Attributes
  - `align`: `left | right | center | justify`
  - `children`: `Node[]` (typically Text)

Example:

```json
{
  "type": "p",
  "children": [
    {
      "text": "This is "
    },
    {
      "text": "editable",
      "bold": true
    }
  ],
  "align": "left"
}
```

### Heading `Element`

Headers can be used to represent titles, subheadings, etc. They can include alignment and other styling options.

- Type: `h1`, `h2`, `h3`.
- Attributes:
  - `align` : `left | right | center | justify`

### Ordered List `Element`

An ordered list with list items (`li`). Each list item can have multiple children, including text and custom elements.

- Type: `ol`
- Attributes
  - `children`: `Node[]` (`li` elements)

See **List Item `Element`**

Example:

```json
{
  "type": "ol",
  "children": [
    {
      "type": "li",
      "children": []
    },
    {
      "type": "li",
      "children": []
    }
  ]
}
```

### List Item `Element`

A list item within an ordered list (`ol`), unordered list (`ul`), or a custom list.

- Type: `li`
- Attributes
  - `children`: `Node[]` (Children nodes can only include `lic`, `img`, `tips` elements)

Example:

```json
{
  "type": "li",
  "children": [
    // List Item Content
    {
      "type": "lic",
      "children": [
        {
          "text": "Campurkan bahan",
          "bold": true
        }
      ]
    },
    // List Item Content
    {
      "type": "lic",
      "children": [
        {
          "text": "Seduh lipton "
        },

        {
          "text": "Yellow Tea",
          "italic": true
        },
        {
          "text": " dengan 300ml air mendidih, lalu sisihkan. Ikuti langkah sesuai resep di atas. Selamat mencoba!"
        }
      ]
    },
    // Image
    {
      "type": "img",
      "name": "",
      "isUpload": true,
      "placeholderId": "UjmV3XaC_3Ms28CCS6u0X",
      "url": "https://via.placeholder.com/150",
      "children": [{ "text": "" }]
    },
    // Tips
    {
      "type": "tips",
      "children": [
        {
          "text": "Gunakan saringan rapat untuk hasil maksimal"
        }
      ]
    }
  ]
}
```

### List Item Content `Element`

Similar to the **Paragraph `Element`**, but specifically designed for use within list items `(li)`. The `lic` type represents content inside a list item.

- Type: `lic`
- Attributes
  - `align`: `left | right | center | justify` (always default to `left`)
  - `children`: `Node[]`

Example:

```json
{
  "type": "lic",
  "align": "left",
  "children": [
    {
      "text": "This is "
    },
    {
      "text": "editable",
      "bold": true
    }
  ]
}
```

### Image `Element`

An image element that includes a `url` to specify the image source.

- Type: `img`
- Attributes
  - `name` : `string`
  - `isUpload` : `boolean (Ignore, internal use only)`
  - `placeholderId` : `string (Ignore, internal use only)`
  - `children` : An array of a single empty `Text` node

Example:

```json
{
  "type": "img",
  "name": "",
  "isUpload": true,
  "placeholderId": "UjmV3XaC_3Ms28CCS6u0X",
  "url": "https://via.placeholder.com/150",
  "children": [{ "text": "" }]
}
```

### Tips `Element`

A custom element used to provide tips in the recipe.

- Type: `tips`
- Attributes:
  - children: `Node[]` (typically Text)

Example:

```json
{
  "type": "tips",
  "children": [
    {
      "text": "Use fresh ingredients for better taste."
    }
  ]
}
```

### Blockquote `Element`

Used for embedding quoted text.

- Type: `blockquote`
- Attributes:
  - children: `Node[]` (typically Text)

Example:

```json
{
  "type": "blockquote",
  "children": [
    {
      "text": "This is a motivational quote."
    }
  ]
}
```

## Text Marks

Marks are used to apply formatting to text. A mark can either have a value of `true` to indicate that a certain formatting is applied, or it can be omitted altogether to indicate that the formatting is not applied.

- Value: `true` (to enable the format) or the absence of the property (to indicate the format is not applied).

### Example Bold

```json
{
  "text": "A string of bold text",
  "bold": true
}
```

### Example Italic

```json
{
  "text": "A string of italic text",
  "italic": true
}
```

### Example Underline

```json
{
  "text": "A string of underline text",
  "underline": true
}
```

### Example No Formatting

```json
{
  "text": "A string of text"
}
```

## Serializing / Rendering

Slate's data model has been built with serialization in mind. Specifically, its text nodes are defined in a way that makes them easier to read at a glance, but also easy to serialize to common formats like HTML, JSX, Markdown or Flutter Widget.

### Plain Text

```ts
function isText(value) {
  return typeof value.text === 'string';
}

function nodeToString(node) {
  if (isText(node)) return node.text;
  return node.children.map((n) => nodeToString(n)).join('');
}

function serialize(nodes) {
  return nodes.map((n) => nodeToString(n)).join('\n');
}
```

For an input of

```json
[
  {
    "type": "p",
    "children": [{ "text": "An opening paragraph..." }]
  },
  {
    "type": "tips",
    "children": [{ "text": "A wise tips." }]
  },
  {
    "type": "p",
    "children": [{ "text": "A closing paragraph!" }]
  }
]
```

You'd end up with:

```
An opening paragraph...
A wise tips.
A closing paragraph!
```

### HTML

For example, here's a similar `serialize` function for HTML:

```ts
function isText(value) {
  return typeof value.text === 'string';
}

function serialize(nodes) {
  if (isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    return string;
  }

  const children = nodes.children.map((n) => serialize(n)).join('');

  switch (node.type) {
    case 'tips':
      return `<div class="tips">Tips: <p>${children}</p></div>`;
    case 'p':
      return `<p>${children}</p>`;
    case 'img':
      return `<img href="${escapeHtml(node.url)}">${children}</img>`;
    case 'blockquote':
      return `<blockquote><p>${children}</p></blockquote>`;
    default:
      return children;
  }
}
```

### JSX

```tsx
function isText(value) {
  return typeof value.text === 'string';
}

function serializeToJSX(nodes) {
  if (isText(nodes)) {
    return (
      <span
        style={{
          fontWeight: nodes.bold ? 'bold' : 'normal',
          fontStyle: nodes.italic ? 'italic' : 'normal',
          textDecoration: nodes.underline ? 'underline' : 'normal',
        }}
      >
        {nodes.text}
      </span>
    );
  }

  const children = nodes.children.map((n) => serializeToJSX(n));

  switch (nodes.type) {
    case 'p':
      return <ParagraphElement>{children}</ParagraphElement>;
    case 'ol':
      return <OrderedListElement>{children}</OrderedListElement>;
    case 'li':
      return <ListItemElement>{children}</ListItemElement>;
    case 'lic':
      return <ListItemContentElement>{children}</ListItemContentElement>;
    case 'img':
      return (
        <div>
          <Image src={nodes.url} />
          {children}
        </div>
      );
    case 'tips':
      return <TipsElement>{children}</TipsElement>;
    default:
      return null;
  }
}

export function SerializingPage() {
  return values.map((node) => serializeToJSX(node));
}
```
