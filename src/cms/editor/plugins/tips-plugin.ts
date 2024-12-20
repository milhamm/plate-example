import { createSlatePlugin } from '@udecode/plate-common';
import { toTPlatePlugin } from '@udecode/plate-common/react';
import { withBlockquote } from '@udecode/plate-block-quote';

const BaseTipsPlugin = createSlatePlugin({
  key: 'tips',
  node: { isElement: true },
  extendEditor: withBlockquote,
  parsers: {
    html: {
      deserializer: {
        rules: [
          {
            validNodeName: 'BLOCKQUOTE',
            validAttribute: 'data-tips',
          },
        ],
      },
    },
  },
});

export const TipsPlugin = toTPlatePlugin(BaseTipsPlugin);
