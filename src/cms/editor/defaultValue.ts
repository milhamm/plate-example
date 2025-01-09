import type { Value } from '@udecode/plate-common';

export const defaultValue: Value = [
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            align: 'left',
            children: [
              {
                text: 'Persiapan pertama',
                bold: true,
              },
            ],
          },
          {
            type: 'lic',
            align: 'left',
            children: [
              {
                text: 'Campurkan puree stroberi Boiron dengan air dan gula, lalu rebus. Tuang campuran puree ke dalam cetakan es batu.',
              },
            ],
          },
          {
            type: 'lic',
            align: 'left',
            children: [
              {
                text: '',
              },
            ],
          },
          {
            type: 'lic',
            align: 'left',
            children: [
              {
                text: 'Ulangi prosesnya dengan puree lainnya dan tuang ke cetakan es batu. Bekukan semalaman.',
              },
            ],
          },
        ],
      },
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [
              {
                text: 'Campurkan bahan',
                bold: true,
              },
            ],
          },
          {
            type: 'lic',
            children: [
              {
                text: 'Seduh lipton ',
              },

              {
                text: 'Yellow Tea',
                italic: true,
              },
              {
                text: ' dengan 300ml air mendidih, lalu sisihkan. Ikuti langkah sesuai resep di atas. Selamat mencoba!',
              },
            ],
          },
          {
            type: 'img',
            url: 'https://via.placeholder.com/150',
            children: [{ text: '' }],
          },
          {
            type: 'tips',
            children: [
              {
                text: 'Gunakan saringan rapat untuk hasil maksimal',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'blockquote',
    children: [
      {
        text: 'Ini adalah quote',
      },
    ],
  },
  {
    type: 'tips',
    children: [
      {
        text: 'Gunakan saringan rapat untuk hasil maksimal',
      },
    ],
  },
  {
    type: 'h1',
    children: [
      {
        text: 'Example Title',
      },
    ],
    align: 'center',
  },
  {
    type: 'p',
    children: [
      {
        text: 'This is ',
      },
      {
        text: 'editable',
        bold: true,
      },
      {
        text: ' plain ',
      },
      {
        text: 'text',
        italic: true,
      },
      {
        text: ' with react and history ',
      },
      {
        text: 'plugins',
        underline: true,
        italic: true,
      },
      {
        text: ', just like a <textarea>!',
      },
    ],
    align: 'left',
  },
];
