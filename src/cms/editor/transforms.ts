import {
  type TElement,
  type TNodeEntry,
  getBlocks,
  getNodeEntry,
  withoutNormalizing,
} from '@udecode/plate-common';
import type { PlateEditor } from '@udecode/plate-common/react';
import { Path } from 'slate';

export const setBlockType = (
  editor: PlateEditor,
  type: string,
  { at }: { at?: Path } = {},
) => {
  withoutNormalizing(editor, () => {
    const setEntry = (entry: TNodeEntry<TElement>) => {
      const [node, path] = entry;

      if (node.type !== type) {
        editor.setNodes<TElement>({ type }, { at: path });
      }
    };

    if (at) {
      const entry = getNodeEntry<TElement>(editor, at);

      if (entry) {
        setEntry(entry);

        return;
      }
    }

    const entries = getBlocks(editor);

    entries.forEach((entry) => setEntry(entry));
  });
};

export const getBlockType = (block: TElement) => {
  return block.type;
};
