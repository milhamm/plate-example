import {
  usePlateEditor,
  Plate,
  PlateContent,
  ParagraphPlugin,
} from '@udecode/plate-common/react';
import type { Value } from '@udecode/plate-common';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { AlignPlugin } from '@udecode/plate-alignment/react';
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break/react';
import {
  BulletedListPlugin,
  ListItemContentPlugin,
  ListItemPlugin,
  ListPlugin,
  NumberedListPlugin,
} from '@udecode/plate-list/react';
import { Box, Divider } from '@chakra-ui/react';
import { useState } from 'react';

import {
  BlockquoteElement,
  BoldLeaf,
  HeadingOneElement,
  HeadingThreeElement,
  HeadingTwoElement,
  ItalicLeaf,
  ListElement,
  ListItemElement,
  ParagraphElement,
  UndelineLeaf,
  UnorderedListElement,
} from './components';
import { defaultValue } from './defaultValue';
import { Toolbar } from './components/toolbar';
import { autoformatListPlugin } from './plugins';
import { ImagePlugin } from '@udecode/plate-media/react';
import { TipsPlugin } from './plugins/tips-plugin';
import { TipsElement } from './components/tips-element';
import { ImageElement } from './components/image-element';

export function SOLEditor() {
  const [debugValue, setDebugValue] = useState<Value>(defaultValue);

  const editor = usePlateEditor({
    plugins: [
      ParagraphPlugin,
      HeadingPlugin,
      BlockquotePlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      AlignPlugin.configure({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            HEADING_KEYS.h1,
            HEADING_KEYS.h2,
            HEADING_KEYS.h3,
          ],
        },
      }),
      ListPlugin.configure({
        options: {
          validLiChildrenTypes: [
            ParagraphPlugin.key,
            NumberedListPlugin.key,
            BulletedListPlugin.key,
            TipsPlugin.key,
            BlockquotePlugin.key,
            ImagePlugin.key,
          ],
        },
      }),
      TipsPlugin,
      autoformatListPlugin,
      SoftBreakPlugin.configure({
        options: {
          rules: [
            { hotkey: 'shift+enter' },
            {
              hotkey: 'enter',
              query: {
                allow: [BlockquotePlugin.key, TipsPlugin.key],
              },
            },
          ],
        },
      }),
      ExitBreakPlugin.configure({
        options: {
          rules: [
            {
              hotkey: 'mod+enter',
            },
            {
              before: true,
              hotkey: 'mod+shift+enter',
            },
          ],
        },
      }),
      ImagePlugin,
    ],
    override: {
      components: {
        [ParagraphPlugin.key]: ParagraphElement,
        [BoldPlugin.key]: BoldLeaf,
        [ItalicPlugin.key]: ItalicLeaf,
        [UnderlinePlugin.key]: UndelineLeaf,
        [BlockquotePlugin.key]: BlockquoteElement,
        [HEADING_KEYS.h1]: HeadingOneElement,
        [HEADING_KEYS.h2]: HeadingTwoElement,
        [HEADING_KEYS.h3]: HeadingThreeElement,
        [BulletedListPlugin.key]: UnorderedListElement,
        [NumberedListPlugin.key]: ListElement,
        [ListItemPlugin.key]: ListItemElement,
        [ListItemContentPlugin.key]: ParagraphElement,
        [TipsPlugin.key]: TipsElement,
        [ImagePlugin.key]: ImageElement,
      },
    },
    value: defaultValue,
  });

  return (
    <Box bg="white" px="6">
      <Plate
        editor={editor}
        onChange={({ value }) => {
          setDebugValue(value);
        }}
      >
        <Toolbar />
        <Box maxW="2xl" mx="auto" px="6">
          <Box as={PlateContent} placeholder="Type..." p="1" />
          <Divider my="10" />
          <pre style={{ fontSize: '10px' }}>
            {JSON.stringify(debugValue, null, 2)}
          </pre>
        </Box>
      </Plate>
    </Box>
  );
}
