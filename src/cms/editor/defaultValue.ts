import type { Value } from "@udecode/plate-common";

export const defaultValue: Value = [
  {
    type: "h1",
    children: [
      {
        text: "Example Title",
      },
    ],
    align: "center",
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
    align: "left",
  },
  {
    type: "ol",
    children: [
      {
        type: "li",
        children: [
          {
            type: "lic",
            align: "left",
            children: [
              {
                text: "First ",
              },
              {
                text: "Item",
                italic: true,
              },
            ],
          },
          {
            type: "ol",
            children: [
              {
                type: "li",
                children: [
                  {
                    type: "lic",
                    children: [
                      {
                        text: "Nested Item",
                        bold: true,
                        underline: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "li",
        children: [
          {
            type: "lic",
            children: [
              {
                text: "Second Item",
              },
            ],
          },
          {
            type: "lic",
            children: [
              {
                text: "Ini adalah Shift+Enter",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    children: [
      {
        children: [
          {
            children: [
              {
                text: "First",
              },
            ],
            type: "lic",
          },
        ],
        type: "li",
      },
      {
        children: [
          {
            children: [
              {
                text: "Second",
              },
            ],
            type: "lic",
          },
        ],
        type: "li",
      },
    ],
    type: "ul",
  },
  {
    type: "p",
    align: "right",
    children: [
      {
        text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم",
      },
    ],
  },
  {
    type: "p",
    align: "right",
    children: [
      {
        text: "Bismillahirrahmanirrahim",
        italic: true,
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
  {
    type: "p",
    children: [
      {
        text: "",
      },
    ],
  },
];
