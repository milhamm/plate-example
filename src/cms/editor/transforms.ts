import {
  type TElement,
  type TNodeEntry,
  getBlocks,
  getNodeEntry,
  withoutNormalizing,
  insertNodes,
  getBlockAbove,
  removeEmptyPreviousBlock,
} from '@udecode/plate-common';
import type { PlateEditor } from '@udecode/plate-common/react';
import { ImagePlugin } from '@udecode/plate-media/react';
import { insertMedia } from '@udecode/plate-media';
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

const insertBlockMap: Record<
  string,
  (editor: PlateEditor, type: string) => void
> = {
  [ImagePlugin.key]: (editor) =>
    insertMedia(editor, {
      type: ImagePlugin.key,
      select: true,
    }),
};

export const insertBlock = (editor: PlateEditor, type: string) => {
  withoutNormalizing(editor, () => {
    if (type in insertBlockMap) {
      insertBlockMap[type](editor, type);
    } else {
      const path = getBlockAbove(editor)?.[1];

      if (!path) return;

      const at = Path.next(path);

      insertNodes(editor, editor.api.create.block({ type }), {
        at,
        select: true,
      });
    }

    removeEmptyPreviousBlock(editor);
  });
};
