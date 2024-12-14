import {
  usePlateEditor,
  Plate,
  PlateContent,
  ParagraphPlugin,
} from "@udecode/plate-common/react";
import type { Value } from "@udecode/plate-common";
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { AlignPlugin } from "@udecode/plate-alignment/react";
import { Box, Divider } from "@chakra-ui/react";
import { useState } from "react";

import {
  BlockquoteElement,
  BoldLeaf,
  HeadingOneElement,
  HeadingThreeElement,
  HeadingTwoElement,
  ItalicLeaf,
  ParagraphElement,
  UndelineLeaf,
} from "./components";
import { defaultValue } from "./defaultValue";
import { Toolbar } from "./components/toolbar";

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
        <Box as={PlateContent} placeholder="Type..." p="1" />
        <Divider my="10" />
        <pre style={{ fontSize: "10px" }}>
          {JSON.stringify(debugValue, null, 2)}
        </pre>
      </Plate>
    </Box>
  );
}
