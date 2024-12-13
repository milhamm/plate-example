import {
  usePlateEditor,
  Plate,
  PlateContent,
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
import { Divider } from "@chakra-ui/react";
import { useState } from "react";

import {
  BlockquoteElement,
  BoldLeaf,
  HeadingOneElement,
  HeadingThreeElement,
  HeadingTwoElement,
  ItalicLeaf,
  UndelineLeaf,
} from "./components";
import { defaultValue } from "./defaultValue";
import { Toolbar } from "./components/toolbar";

export function SOLEditor() {
  const [debugValue, setDebugValue] = useState<Value>(defaultValue);

  const editor = usePlateEditor({
    plugins: [
      HeadingPlugin,
      BlockquotePlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
    ],
    override: {
      components: {
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
    <Plate
      editor={editor}
      onChange={({ value }) => {
        setDebugValue(value);
      }}
    >
      <Toolbar />
      <PlateContent placeholder="Type..." />
      <Divider my="10" />
      <pre style={{ fontSize: "10px" }}>
        {JSON.stringify(debugValue, null, 2)}
      </pre>
    </Plate>
  );
}
