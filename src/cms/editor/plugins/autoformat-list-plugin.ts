import type {
  AutoformatBlockRule,
  AutoformatRule,
} from "@udecode/plate-autoformat";
import { AutoformatPlugin } from "@udecode/plate-autoformat/react";
import {
  getParentNode,
  isElement,
  type SlateEditor,
} from "@udecode/plate-common";
import { toggleList, unwrapList } from "@udecode/plate-list";
import {
  BulletedListPlugin,
  ListItemPlugin,
  NumberedListPlugin,
} from "@udecode/plate-list/react";

export const preFormat: AutoformatBlockRule["preFormat"] = (editor) =>
  unwrapList(editor);

export const format = (editor: SlateEditor, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection);
    if (!parentEntry) return;
    const [node] = parentEntry;
    if (isElement(node)) {
      customFormatting();
    }
  }
};

export const formatList = (editor: SlateEditor, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    })
  );
};

export const autoformatLists: AutoformatRule[] = [
  {
    format: (editor) => formatList(editor, BulletedListPlugin.key),
    match: ["* ", "- "],
    mode: "block",
    preFormat,
    type: ListItemPlugin.key,
  },
  {
    format: (editor) => formatList(editor, NumberedListPlugin.key),
    match: [String.raw`^\d+\.$ `, String.raw`^\d+\)$ `],
    matchByRegex: true,
    mode: "block",
    preFormat,
    type: ListItemPlugin.key,
  },
];

export const autoformatListPlugin = AutoformatPlugin.configure({
  options: {
    enableUndoOnDelete: true,
    rules: [...autoformatLists],
  },
});
