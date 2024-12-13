import type { Value } from "@udecode/plate-common";

export const defaultValue: Value = [
  {
    type: "h1",
    children: [
      {
        text: "Example Title",
      },
    ],
  },
  {
    type: "p",
    children: [
      {
        text: "This is ",
      },
      {
        text: "editable",
        bold: true,
      },
      {
        text: " plain ",
      },
      {
        text: "text",
        italic: true,
      },
      {
        text: " with react and history ",
      },
      {
        text: "plugins",
        underline: true,
        italic: true,
      },
      {
        text: ", just like a <textarea>!",
      },
    ],
  },
  {
    type: "p",
    children: [
      {
        text: "",
      },
    ],
  },
  {
    type: "blockquote",
    children: [
      {
        text: "const sum = (a, b) => a + b",
      },
    ],
  },
];
